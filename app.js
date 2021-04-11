import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import { get_all_users, get_one_user, login, add_new_user, 
    update_one_user, delete_one_user, getUserByClassification} from "./controller/user.controller.js";

import { get_all_questions, add_new_question } from "./controller/question.controller.js";

import { connect_to_db } from "./db/connection.js";

const app = express();
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(helmet());
// app.use(cors());
app.use(morgan('combined'));

connect_to_db();

app.get("/", (req, res) => res.send("Welcome to the HangCareer APi"));

app.get("/login", (req, res) => login(req, res));

app.route("/users")
    .get((req, res) => get_all_users(req, res))
    .post((req, res) => add_new_user(req, res))
    .delete((req, res) => delete_one_user(req, res));

app.route("/users/:specific_user")
    .get((req, res) => get_one_user(req, res, req.params.specific_user))
    .put((req, res) => update_one_user(req, res, req.params.specific_user))

app.route("/users/all/:userClassification")
    .get((req, res) => getUserByClassification(req, res, req.params.userClassification));

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
