import mongoose from 'mongoose';


mongoose.set('useCreateIndex', true);
mongoose.Promise = Promise;

export async function connectDB() {
    await mongoose.connect(
    process.env.MONGODB_URI, 
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