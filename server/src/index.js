require('dotenv').config();

const app = require('./app');

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3001;
const MAX_PORT_RETRIES = 5;

const startServer = (port, retriesLeft) => {
    const server = app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });

    server.on('error', (error) => {
        if (error.code === 'EADDRINUSE' && retriesLeft > 0 && !process.env.PORT) {
            const nextPort = port + 1;
            console.warn(`Port ${port} is in use. Retrying on port ${nextPort}...`);
            startServer(nextPort, retriesLeft - 1);
            return;
        }

        console.error(`Failed to start server on port ${port}:`, error.message);
        process.exit(1);
    });
};

startServer(DEFAULT_PORT, MAX_PORT_RETRIES);
