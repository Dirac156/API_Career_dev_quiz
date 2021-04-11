import { Question } from "../db/db.model.js";

export function get_all_questions(req, res) {
    Question.find({}, function (err, foundTopics) {
        if (foundTopics) {
            res.send(foundTopics);
        } else {
            res.status(404).json({message: "questions not found"});
        }
    });
};



export function add_new_question(req, res) {
    Question.create(req.body, function(err, doc){
        if (doc){
            res.send(doc);
        }else {
            res.status(400).json({message: "could not create a question"});
        };
    });
};
