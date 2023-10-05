import mongoose from 'mongoose';

const url = 'mongodb+srv://caroarayac17:5k7753Km3Z9FBgXv@cluster0.cpgb4zj.mongodb.net/?retryWrites=true&w=majority'

const connectToDB = () => {
    try {
        mongoose.connect(url)
        console.log('connected to DB e-commerce')
    } catch (error) {
        console.log(error);
    }
};

export default connectToDB