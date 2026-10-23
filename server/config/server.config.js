/**
 * Server Network & Runtime Configuration
 *
 * Configures network binding parameters:
 * - PORT: Service port (default: 5000)
 * - HOST: Host bind address (default: 0.0.0.0)
 */

const rawPort = process.env.PORT;
const parsedPort = rawPort ? parseInt(rawPort, 10) : NaN;

export const SERVER_CONFIG = {
  // Service port (default: 5000)
  port: !isNaN(parsedPort) && parsedPort > 0 ? parsedPort : 5000,

  // Host bind address (default: 0.0.0.0)
  host: process.env.HOST || '0.0.0.0',

  // Allowed CORS origins
  corsOrigins: process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(',').map(s => s.trim())
    : ['https://tomesphere.in', 'https://www.tomesphere.in', 'http://localhost:3000']
};

export const { port: PORT, host: HOST } = SERVER_CONFIG;
