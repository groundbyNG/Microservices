import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const taxSchema = new Schema({
    destination: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    tax: {
        type: Number,
        required: true
    },
})

export default mongoose.model('Tax', taxSchema);