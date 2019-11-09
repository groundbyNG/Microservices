import mongoose from 'mongoose';
import Tax from './tax';

const TaxSchema = Tax.schema;

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    incomeSum: {
        type: Number,
        required: true
    },
    taxes: {
        type: [TaxSchema],
    },
    taxRate: {
        type: Number,
    }
})

export default mongoose.model('User', userSchema);