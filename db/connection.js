import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connect_to_db = async function(){
    const db_password = process.env.DB_PASSWORD;
    const db_name = process.env.DB_NAME;

    try {
        await mongoose.connect(`mongodb+srv://${db_name}:${db_password}@cluster0.3nywu.mongodb.net/Career-dev-quiz`, 
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        // mongoose.connect("mongodb://localhost:27017/HangCareer", {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true
        // });

        console.log(">>> Succesfully connected ");

        mongoose.set('useFindAndModify', false);

    } catch (errors) {
        console.log(" >>> Connection error: ", errors);
    }
}
