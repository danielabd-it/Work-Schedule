

const mongoose = require("mongoose");

let workModel = mongoose.Schema({
    Name: String,
    Sun: String,
    Mon: String,
    Tue: String,
    Wed: String,
    Thu: String,
    Fri: String,
    Sat: String
},
{
    collection:"work"
});
module.exports =mongoose.model('Work',workModel);
