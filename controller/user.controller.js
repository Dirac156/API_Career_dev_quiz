import bcrypt from "bcrypt";
import {
    User
} from "../db/db.model.js";

const saltRounds = 10;

//////// Functions //////////////
export function get_all_users(req, res) {
    User.find({}, function (err, foundUsers) {
        if (foundUsers) {
            res.send(foundUsers);
        } else {
            res.status(400).json({
                message: "users not found"
            });
        }
    });
}


export function get_one_user(req, res, param) {
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

export function add_new_user(req, res) {
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

export function update_one_user(req, res, param) {
    // let new_data = create_new_obj(req.body);
    let new_data = req.body;
    User.findOneAndUpdate({
            email: param
        },
        new_data, {
            new: true
        },
        function (err, doc) {
            if (doc) {
                res.status(200).send(doc);
            } else {
                res.status(400).send("didn't update");
            };
        });
};


export function login(req, res) {
    const {
        password,
        email
    } = req.body;
    User.findOne({
        email: email,
    }, function (err, foundUser) {
        if (foundUser) {
            bcrypt.compare(password, foundUser.password, function (err, result) {
                if (result) {
                    res.send(foundUser);
                } else {
                    res.status(500).send("Incorrect password");
                }
            });
        } else {
            res.status(400).send("User not found");
        };
    });
};

export function delete_one_user(req, res) {
    User.findOneAndRemove({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email
    }, function (err, doc) {
        if (doc) {
            res.send(doc);
        } else {
            res.send(400).send("cound not delete the user");
        };
    });
}