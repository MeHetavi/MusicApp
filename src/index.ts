import { app } from './app';
import { logger } from './utils';
import { initializeSocketIO } from './socket';
import { config } from './config';
import index_routes from './routes/index.routes';
import bodyParser from 'body-parser';
import { sequelize } from './config/database';
import { setupAssociations } from './models/associations';
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Register routes BEFORE starting the server
app.use('/api', index_routes);

// Start the server
const startServer = async (): Promise<void> => {
  try {

    try {
      await sequelize.sync({ alter: true }); // In dev; use migrations in production
      setupAssociations();
      console.log(' DB synced and models ready.');
      console.log('✅ DB synced and models ready.');
    } catch (err) {
      console.error(' Sync failed:', err);
      console.error('❌ Sync failed:', err);
    }

    logger.info('Connected to PostgreSQL successfully');

    // Start listening
    const server = app.listen(config.port, () => {
      // eslint-disable-next-line no-console
      console.log(`Server is running on port ${config.port}`);
      logger.info(`Server is running on port ${config.port}`);
    });

    // Initialize Socket.IO with the server
    initializeSocketIO(server);
    logger.info('Socket.IO initialized successfully');

  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Handle uncaught exceptions and rejections
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (error) => {
  logger.error('Unhandled Rejection:', error);
  process.exit(1);
});

startServer();
