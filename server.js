require('dotenv').config();

const app = require('./app');
const connectDB = require('./config/db');
const logger = require('./utils/logger');

const PORT = process.env.PORT || 8080;

const startServer = async () => {
    try {

        // Connect MongoDB
        await connectDB();

        // Start Express server
        app.listen(PORT, () => {
            logger.info(`Server running on port ${PORT}`);

            console.log(
                `Server running on http://localhost:${PORT}`
            );
        });

    } catch (error) {

        logger.error(`Server startup failed: ${error.message}`);

        process.exit(1);
    }
};

startServer();