let mongoose = require('mongoose');

var aggregatePaginate = require("mongoose-aggregate-paginate-v2");
let Schema = mongoose.Schema;

let AssignmentSchema = Schema({
    id: Number,
    dateDeRendu: Date,
    nom: String,
    rendu: Boolean
});

AssignmentSchema.plugin(aggregatePaginate);

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
// Le 3ème paramètre force le nom de la collection à 'assignments'
module.exports = mongoose.model('Assignment', AssignmentSchema, 'assignments');
