import mongoose from "mongoose";

//create schema

export const questionSchema = mongoose.Schema({
    topic: {
        type: String,
        required: false
    },
    question: {
        type: String,
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
    options: {
        type: [],
        required: false
    },
    answer: {
        type: Number,
        reuired: true
    }
})

export const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
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
    userClassification: {
        type: String,
        required: true
    },
    rank: {
        type: String,
        required: false
    },
    score: {
        type: Number,
        required: false,
    },
    numberOfQuestionsAnswered: {
        type: Number,
        requred: false,
    },
    questionAnswered: {
        type: [questionSchema],
        required: false
    }
});

