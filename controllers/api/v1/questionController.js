const Question = require('../../../models/questionSchema');
const Option = require('../../../models/optionsSchema');
const base_url = require('../../../config/base_url');


//for creating a question
module.exports.create = async (req, res) => {
    var question = req.body.question;
    console.log(question);
    //checking if question is empty 
    if (question !== undefined && question !== "") {
        try {
            //creating the question
            var result = await Question.create({
                question: question
            });
            //returning the status with question object
            return res.status(201).send({ message: 'Question created sucessfully.', data: result });
        } catch (err) {
            console.log(err);
            return res.status(500).send({ message: 'Internal Server error.' })
        }
    } else {
        return res.status(400).send({ message: 'Incomplete informtion.' })
    }
    // return res.send('create');
}

module.exports.optionCreate = async (req, res) => {
    var id = req.params.id;
    var options = req.body.options;
    if (id !== '') {

        try {
            if (Array.isArray(options)) {
                //if there are multiple options
                options.forEach(async (element, index) => {
                    var temp = await Option.create({
                        question: id,
                        option: element,
                    });
                    //adding dynamic link for upvote
                    temp.link = `${base_url}options/${temp._id}/add_vote`;
                    //adding dynamci link for downvote
                    temp.downlink = `${base_url}options/${temp._id}/down_vote`;
                    //savaing the option 
                    await temp.save();
                })
                //returning the response
                return res.status(200).send({ message: 'Options created sucessfully.' });

            } else {
                var temp = await Option.create({
                    question: id,
                    option: options,
                });
                //adding dynamic link for upvote
                temp.link = `${base_url}options/${temp._id}/add_vote`;
                //adding dynamci link for downvote
                temp.downlink = `${base_url}options/${temp._id}/down_vote`;
                //savaing the option 
                await temp.save();
                //returning the response
                return res.status(200).send({ message: 'Options created sucessfully.' });
            }


        } catch (err) {
            console.log(err);
            return res.status(500).send('Failed');
        }

    } else {
        return res.status(500).send('Incomplete information');
    }
};

module.exports.delete = async (req, res) => {
    var id = req.params.id;
    if (id !== '') {
        try {
            //fetching options associated with the question
            var optionArray = await Option.find({ question: id });
            //setting flag in case it;s option has an upvote
            var flagVote = false;
            //checking for upvote
            optionArray.forEach(element => {
                if (element.upvote >= 1) {
                    flagVote = true;
                }
            });
            if (!flagVote) {
                //removing question
                var resultQuestion = await Question.findByIdAndRemove(id);
                //removing options of that question
                var resultOption = await Option.deleteMany({ question: id })
                //returning the data
                return res.status(200).send({ message: 'Question deleted sucessfully.', dataQuestion: resultQuestion, dataOption: resultOption });
            } else {
                return res.status(500).send({ message: `Question's option has an upvote so question can not be deleted.` });
            }
        } catch (err) {
            console.log(err);
            return res.status(500).send('Incomplete information');
        }
    } else {
        return res.status(500).send('Incomplete information');
    }
};

//home controller that is shown all info
module.exports.home = async (req, res) => {
    var id = req.params.id;
    try {
        //load question
        var resultQuestion = await Question.findById(id);
        //load options
        var resultOption = await Option.find({ question: id });
        //merge them
        var result = { question: resultQuestion, options: resultOption };
        //send response and return
        return res.status(200).send({ message: 'data load sucessfully', data: result });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Internal Server Error.' })

    }
};

