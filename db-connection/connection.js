const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });





const dbConnect = () => {
  // Connect to the database
  const dbConnectionString = process.env.DATABASE.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD
  );
    console.log(dbConnectionString) 
  // REMOTE DATABASE 
  mongoose
    .connect(dbConnectionString, {
      useNewUrlParser: true,
    })
    .then(() => {
      console.log("Successfully connected to database");
    });
};


module.exports = dbConnect;
