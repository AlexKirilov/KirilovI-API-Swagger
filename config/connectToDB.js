import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config({ path: 'variables.env'});

mongoose.set('useCreateIndex', true);
mongoose.Promise = Promise;

export async function connectDB() {
    await mongoose.connect(
    process.env.MONGODB_URI || devEnv, 
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    }, 
    (err, db) => {
        if (!err) {
            console.log('connected to mongo ');
        } else {
            console.log('Connection ERROR => ', err);
        }
    });
}