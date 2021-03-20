import mongoose from "mongoose";
import { questionSchema, userSchema } from "./db.schema.js";

//create model

export const Question = mongoose.model("question", questionSchema);
export const User = mongoose.model("user", userSchema);
