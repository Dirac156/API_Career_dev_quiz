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

