const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const bcrypt = require("bcrypt");


const saltRounds = 10;

const app = express();
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));

function create_new_obj(obj) {
    let new_obj = {
        ...obj
    }

    delete new_obj.password;
    console.log(new_obj);

    return new_obj
}

const db_password = process.env.ATLAS_PASSWORD;
const db_name = process.env.ATLAS_NAME; 

mongoose.connect(`mongodb+srv://admin-admin:diracALA1@cluster0.3nywu.mongodb.net/HangCareer`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// mongoose.connect("mongodb://localhost:27017/HangCareer", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

mongoose.set('useFindAndModify', false);

//create schema

const questionSchema = mongoose.Schema({
    topic: {
        type: String,
        required: false
    },
    question: {
        type: String,
        required: true
    },
    level: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    hint: {
        type: [],
        required: false
    },
    choices: {
        type: [],
        required: false
    },
    answer: {
        type: String,
        reuired: true
    }
})

const userSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    user_classification: {
        type: String,
        required: true
    },
    faculty: {
        type: String,
        required: false
    },
    promotion: {
        type: String,
        required: false
    },
    level: {
        type: Number,
        required: false,
        min: 0,
        max: 3
    },
    score: {
        type: Number,
        required: false,
        min: 0,
        max: 100
    },
    question_answered: {
        type: [questionSchema],
        required: false
    }
});

//create model

const Question = mongoose.model("question", questionSchema);
const User = mongoose.model("user", userSchema);


//////// Functions //////////////







function get_all_users(req, res) {
    User.find({}, function (err, foundUsers) {
        if (!err) {
            res.send(foundUsers);
        } else {
            res.send(err);
        }
    });
}


function get_one_user(req, res, param) {
    User.findOne({
        email: param
    }, function (err, foundUser) {
        console.log(param);
        if (foundUser) {
            res.send(foundUser);
        } else {
            res.status(404).send("No article found");
        };
    });
}

function add_new_user(req, res) {
    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
        req.body.password = hash;
        if (!err) {
            User.findOne({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email
            }, function (err, foundUser) {
                if (foundUser) {
                    //if user already exist
                    res.status(400).send("user already exist");
                } else {
                    User.create(req.body, function (err) {
                        if (err) {
                            res.send("error");
                        } else {
                            res.status(200).send("created new student");
                        }
                    });
                }
            });
        };
    });
};





/////////////// update one user //////////////

function update_one_user(req, res, param) {
    let new_data = create_new_obj(req.body);
    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
        User.findOneAndUpdate({
                email: param
            },
            new_data, {
                new: true
            },
            function (err, doc) {
                if (!err) {
                    res.status(200).send(doc);
                } else {
                    res.status(400).send("didn't update");
                };
            });
    });
};


function login(req, res) {
    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
        req.body.password = hash;
        User.findOne({
            email: req.body.email,
            password: req.body.password
        }, function (err, foundUser) {
            if (!err) {
                res.send(foundUser);
            } else {
                res.status(400).send("Not a user");
            };
        });
    });
};

function delete_one_user(req, res) {
    User.findOneAndRemove({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email
    }, function (err, doc) {
        if (!err) {
            res.send(doc);
        } else {
            res.send(400).send("cound not delete the user");
        };
    });
}




function get_all_questions(req, res) {
    Question.find({}, function (err, foundTopics) {
        if (foundTopics) {
            res.send(foundTopics);
        } else {
            res.satus(404).send("Not found");
        }
    });
};



function add_new_question(req, res) {
    Question.create(req.body, function(err, doc){
        if (!err){
            res.send(doc);
        } else {
            res.status(400).send("could not create a question");
        };
    });
};





/////////////// Request targeting all articles ////////////////////



app.get("/login", (req, res) => login(req, res));

app.route("/users")
    .get((req, res) => get_all_users(req, res))
    .post((req, res) => add_new_user(req, res))
    .delete((req, res) => delete_one_user(req, res));

app.route("/users/:specific_user")
    .get((req, res) => get_one_user(req, res, req.params.specific_user))
    .put((req, res) => update_one_user(req, res, req.params.specific_user))



app.route("/questions")
    .get((req, res) => get_all_questions(req, res))
    .post((req, res) => add_new_question(req, res));






let port;

if (!process.env.PORT) {
    port = 3000;
} else {
    port = process.env.PORT;
}

app.listen(port, function () {
    console.log("app is ruining on port", port);
});