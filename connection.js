import mongoose from 'mongoose';

export async function connectMongoDb(url) {
    return mongoose
        .connect(url)
        .then(() => console.log('mongodb connected'))
        .catch((err) => console.log('mongo error', err));
}
