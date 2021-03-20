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
  console.log("I am here");
    Question.findOne({question: req.body.question}, function(err, foundQuestion){
        if (foundQuestion){
          res.status(400).send("Alredy exist");
        } else {
          Question.create(req.body, function(err, doc){
              if (doc){
                  res.send(doc);
              }else {
                  res.status(400).json({message: "could not create a question"});
              };
          });
        }
    })
};
