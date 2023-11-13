const Question = require('../../../models/questionSchema');
const Option = require('../../../models/optionsSchema');

module.exports.delete = async (req, res) => {
    let id = req.params.id;
    try {
        //conditions for upvote
        var condition = await Option.findById(id);
        //upvote flag for determining if vote exists on option
        var flagVote = false;
        if (condition.upvote >= 1) {
            flagVote = true;
        }
        //if vote is 0
        if (!flagVote) {
            var result = await Option.findByIdAndRemove(id);
            return res.status(200).send({ message: 'deleted option sucessfully', data: result });
        } else {
            //vote is >1
            return res.status(400).send({ message: 'Option can not be deleted it has an upvote' });

        }

    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: `Internal Server Error` });
    }
};

module.exports.add_vote = async (req, res) => {
    let id = req.params.id;
    try {
        //find the option for updating upvote
        var optionObject = await Option.findById(id);
        //store it temporalily in another variable
        var upvote = optionObject.upvote;
        //increase that variable
        upvote += 1;
        //update the object
        optionObject.upvote = upvote;
        //save the object
        optionObject.save();
        //return the response
        return res.status(200).send({ message: 'Upvoted option sucessfully', data: optionObject });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Internal Server Error' });

    }

};

module.exports.down_vote = async (req, res) => {
    let id = req.params.id;
    try {
        //find the option for updating upvote
        var optionObject = await Option.findById(id);
        //store it temporalily in another variable
        var downvote = optionObject.downvote;
        //increase that variable
        downvote += 1;
        //update the object
        optionObject.downvote = downvote;
        //save the object
        optionObject.save();
        //return the response
        return res.status(200).send({ message: 'Downvoted option sucessfully', data: optionObject });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Internal Server Error' });

    }

};