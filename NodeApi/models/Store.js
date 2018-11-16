const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Course
var Store = new Schema({
    startTime: {
        type: String
    },
    endTime: {
        type: String
    },
    slots: [{
        startTime: {
            type: String
        },
        endTime: {
            type: String
        },
        firstName: {
            type: String
        },
        lastName: {
            type: String
        },
        phone: {
            type: Number
        },
    }]
});

module.exports = mongoose.model('Store', Store);