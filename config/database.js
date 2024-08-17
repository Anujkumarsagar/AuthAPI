const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          
        });
        console.log("DB Connection Successful");
    } catch (error) {
        console.error("Error in connecting to DB:", error);
        process.exit(1);
    }
};

// Close the Mongoose connection when the application exits
process.on("SIGINT", async () => {
    await mongoose.connection.close();
    console.log("DB Connection closed");
    process.exit(0);
});

module.exports = dbConnect;