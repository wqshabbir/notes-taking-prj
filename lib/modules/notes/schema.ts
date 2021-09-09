import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
    title: String,
    description: String,
    owner: String,
    creationDate: Date,
    modificationDate: Date
});

export default mongoose.model('notes', schema);