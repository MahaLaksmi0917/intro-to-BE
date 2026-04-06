import dotenv from 'dotenv'; //extrat env variables from .env file
import connectDB from './config/database.js';
import app from './app.js';

dotenv.config({
    path: './.env'
}); // load environment variables from .env file

const startServer = async () => {
    try {
        await connectDB();
        app.on("error", (error) => {
            console.error(`Error: ${error.message}`);
            throw error
        });
        app.listen(process.env.PORT || 8000,()=>{
            console.log(`Server is running on port ${process.env.PORT || 8000}`);
        })
    }
    catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

startServer();