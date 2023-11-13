const mongoose = require('mongoose');


const optionSchema = new mongoose.Schema({

    question: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the Question model
        ref: 'Question',
        required: true
    },
    option: {
        type: String
    },
    upvote: {
        type: Number,
        default: 0
    },
    downvote: {
        type: Number,
        default: 0
    },
    link: {
        type: String
    },
    downlink: {
        type: String
    }

});

const Option = mongoose.model('Option', optionSchema);

module.exports = Option;