// const mongoose = require("mongoose");

// const mongourl = "mongodb+srv://kumarsudhakar0815_db_user:GitClone@gitclone.qs87lro.mongodb.net/";


// const connectDb = async () => {
//     try {
//         await mongoose.connect(mongourl);
//         console.log("mongodb connected")
//     } catch (err) {
//         console.log("error while connecting mongodb", err);
//         // process.exit(1);
//     }
// }
// mongoose.connect(mongourl)
//     .then(() => console.log("mongodb connected...."))
//     .catch((err) => {
//         console.log("error while connecting mongodb..", err);
//     });

const connectDb = require("./conectDB");
connectDb();