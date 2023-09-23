import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import connectDB from './mongodb/connect.js';
import userRoutes from './routes/userRoutes.js';

// get env variables
dotenv.config();

// initialize express
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/user', userRoutes);

app.get('/', async (req, res) => {
	res.send('Hello world!');
});

const startServer = async () => {
	try {
		connectDB(process.env.MONGODB_URL);
		app.listen(8080, () => console.log('Server is running on port 8080'));
	} catch (error) {
		console.log(error);
	}
};

startServer();
