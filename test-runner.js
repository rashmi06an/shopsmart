#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * Unified test runner for CI/CD.
 * Flow:
 * 1) Unit tests
 * 2) Integration tests
 * 3) Cypress E2E tests
 *
 * Uses execSync so failures bubble up with non-zero exit code.
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT_DIR = __dirname;
const REPORTS_DIR = path.join(ROOT_DIR, 'reports');
const LOGS_DIR = path.join(REPORTS_DIR, 'logs');

const SERVER_HEALTH_URL = 'http://127.0.0.1:3001/api/health';
const FRONTEND_URL = 'http://127.0.0.1:5173';

const summary = {
    startedAt: new Date().toISOString(),
    steps: [],
    totals: {
        tests: 0,
        passed: 0,
        failed: 0,
        durationMs: 0
    }
};

let serverPid = null;
let frontendPid = null;

function timestamp() {
    return new Date().toISOString();
}

function log(message) {
    console.log(`[${timestamp()}] ${message}`);
}

function ensureReportDirs() {
    fs.mkdirSync(REPORTS_DIR, { recursive: true });
    fs.mkdirSync(LOGS_DIR, { recursive: true });
}

function sleep(ms) {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

function runCommand(command, options = {}) {
    execSync(command, {
        cwd: options.cwd || ROOT_DIR,
        stdio: 'inherit',
        env: { ...process.env, ...(options.env || {}) }
    });
}

function waitForUrl(url, timeoutMs) {
    const started = Date.now();
    while (Date.now() - started < timeoutMs) {
        try {
            execSync(`curl -fsS "${url}"`, { stdio: 'ignore' });
            return true;
        } catch (error) {
            sleep(1000);
        }
    }
    return false;
}

function parseJsonReport(filePath) {
    if (!fs.existsSync(filePath)) {
        return { tests: 0, passed: 0, failed: 0 };
    }

    const report = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const tests = report.numTotalTests || 0;
    const passed = report.numPassedTests || 0;
    const failed = report.numFailedTests || 0;
    return { tests, passed, failed };
}

function parseJunitTotals(reportDir) {
    const xmlFiles = fs.readdirSync(reportDir).filter((file) => file.endsWith('.xml'));
    let tests = 0;
    let failed = 0;
    let durationSeconds = 0;

    for (const file of xmlFiles) {
        const xml = fs.readFileSync(path.join(reportDir, file), 'utf8');
        const testsMatch = xml.match(/tests="(\d+)"/);
        const failuresMatch = xml.match(/failures="(\d+)"/);
        const timeMatch = xml.match(/time="([\d.]+)"/);
        tests += testsMatch ? Number(testsMatch[1]) : 0;
        failed += failuresMatch ? Number(failuresMatch[1]) : 0;
        durationSeconds += timeMatch ? Number(timeMatch[1]) : 0;
    }

    return {
        tests,
        passed: Math.max(0, tests - failed),
        failed,
        durationMs: Math.round(durationSeconds * 1000)
    };
}

function runStep(stepName, stepFn) {
    const startedAt = Date.now();
    log(`Running ${stepName}...`);

    try {
        const result = stepFn() || {};
        const durationMs = Date.now() - startedAt;
        summary.steps.push({
            name: stepName,
            status: 'passed',
            durationMs,
            ...result
        });
        log(`${stepName} PASSED (${durationMs}ms)`);
    } catch (error) {
        const durationMs = Date.now() - startedAt;
        summary.steps.push({
            name: stepName,
            status: 'failed',
            durationMs,
            error: error.message
        });
        log(`${stepName} FAILED (${durationMs}ms)`);
        throw error;
    }
}

function startServicesForE2E() {
    const backendLog = path.join(LOGS_DIR, 'backend.log');
    const frontendLog = path.join(LOGS_DIR, 'frontend.log');

    serverPid = Number(
        execSync(
            `PORT=3001 npm --prefix "${path.join(ROOT_DIR, 'server')}" run dev > "${backendLog}" 2>&1 & echo $!`,
            { encoding: 'utf8' }
        ).trim()
    );

    frontendPid = Number(
        execSync(
            `npm --prefix "${path.join(ROOT_DIR, 'client')}" run dev -- --host 127.0.0.1 --port 5173 > "${frontendLog}" 2>&1 & echo $!`,
            { encoding: 'utf8' }
        ).trim()
    );

    if (!waitForUrl(SERVER_HEALTH_URL, 120000)) {
        throw new Error(`Backend failed to become ready at ${SERVER_HEALTH_URL}`);
    }
    if (!waitForUrl(FRONTEND_URL, 120000)) {
        throw new Error(`Frontend failed to become ready at ${FRONTEND_URL}`);
    }
}

function stopServicesForE2E() {
    for (const pid of [frontendPid, serverPid]) {
        if (!pid) continue;
        try {
            process.kill(pid);
        } catch (error) {
            // Process may already be terminated; ignore.
        }
    }
}

function finalizeSummary() {
    summary.finishedAt = new Date().toISOString();
    summary.totals.durationMs = summary.steps.reduce((acc, step) => acc + (step.durationMs || 0), 0);
    summary.totals.tests = summary.steps.reduce((acc, step) => acc + (step.tests || 0), 0);
    summary.totals.passed = summary.steps.reduce((acc, step) => acc + (step.passed || 0), 0);
    summary.totals.failed = summary.steps.reduce((acc, step) => acc + (step.failed || 0), 0);

    fs.writeFileSync(path.join(REPORTS_DIR, 'summary.json'), JSON.stringify(summary, null, 2));
}

function hasClientUnitTests() {
    const clientSrc = path.join(ROOT_DIR, 'client', 'src');
    if (!fs.existsSync(clientSrc)) return false;
    return fs.readdirSync(clientSrc, { recursive: true }).some((file) => String(file).endsWith('.test.jsx') || String(file).endsWith('.test.js'));
}

function main() {
    ensureReportDirs();

    try {
        runStep('Unit Tests', () => {
            if (!hasClientUnitTests()) {
                log('No client unit tests found. Skipping unit test step.');
                return { tests: 0, passed: 0, failed: 0 };
            }

            const unitReportFile = path.join(REPORTS_DIR, 'unit-tests.json');
            runCommand(`npm --prefix "${path.join(ROOT_DIR, 'client')}" run test -- --run --reporter=default --reporter=json --outputFile="${unitReportFile}"`);
            return parseJsonReport(unitReportFile);
        });

        runStep('Integration Tests', () => {
            const integrationReportFile = path.join(REPORTS_DIR, 'integration-tests.json');
            runCommand(
                `npx jest --config "${path.join(ROOT_DIR, 'server', 'jest.config.js')}" --runInBand --json --outputFile="${integrationReportFile}" "${path.join(ROOT_DIR, 'server', 'tests')}"`,
                { env: { NODE_OPTIONS: '--localstorage-file=/tmp/shopsmart-localstorage' } }
            );
            return parseJsonReport(integrationReportFile);
        });

        runStep('E2E Tests', () => {
            startServicesForE2E();
            const e2ePattern = path.join(REPORTS_DIR, 'cypress-[hash].xml');
            runCommand(`npx cypress run --project "${ROOT_DIR}" --reporter junit --reporter-options "mochaFile=${e2ePattern},toConsole=true" --posix-exit-codes`);
            return parseJunitTotals(REPORTS_DIR);
        });

        finalizeSummary();
        log(`All tests passed. Total: ${summary.totals.tests}, Passed: ${summary.totals.passed}, Failed: ${summary.totals.failed}, Duration: ${summary.totals.durationMs}ms`);
        process.exit(0);
    } catch (error) {
        finalizeSummary();
        console.error(`[${timestamp()}] Test pipeline failed: ${error.message}`);
        process.exit(1);
    } finally {
        stopServicesForE2E();
    }
}

main();
