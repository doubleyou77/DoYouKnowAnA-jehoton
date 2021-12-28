const { Schema, model } = require('mongoose');

const directorSchema = new Schema({
    directorName: { type: String, required: true },
    directorInf: { type: String, required: true }
});

const director = model('director', directorSchema);

module.exports = director;