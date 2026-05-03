#!/usr/bin/env node
/**
 * Backward-compatible wrapper so `npm test` inside `server/`
 * runs the unified root-level test pipeline.
 */
const { execSync } = require('child_process');
const path = require('path');

const rootRunner = path.resolve(__dirname, '..', 'test-runner.js');
execSync(`node "${rootRunner}"`, { stdio: 'inherit' });
