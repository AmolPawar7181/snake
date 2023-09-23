import mongoose from 'mongoose';

const connectDB = (url) => {
	// will need this for searching
	mongoose.set('strictQuery', true);

	// connect to db with given url
	mongoose
		.connect(url)
		.then(() => console.log('MongoDB connected'))
		.catch((err) => console.log(err));
};

export default connectDB;
