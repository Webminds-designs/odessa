import mongoose from 'mongoose';

const connectDB = async () => {

    try {
        if (!process.env.MONGO_DB_URI) {
            throw new Error('MONGO_DB_URI environment variable is not defined');
        }
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log('MongoDB connected');
        
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
};

export default connectDB;