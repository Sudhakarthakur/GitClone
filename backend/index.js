const path = require("path");
require("dotenv").config({
    path: require("path").resolve(__dirname, "../../.env")
})
// const dotenv = require("dotenv");
const AWS = require("aws-sdk");
const yargs = require("yargs");
const {
    hideBin
} = require("yargs/helpers");
const http = require("http");
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const maninRouter = require("./routes/main.router")


// dotenv.config();


const {
    initRepo
} = require("./controllers/init");
const {
    addRepo
} = require("./controllers/add");
const {
    commitRepo
} = require("./controllers/commit");
const {
    pullRepo
} = require("./controllers/pull");
const {
    pushRepo
} = require("./controllers/push");
const {
    revertRepo
} = require("./controllers/revert");
const {
    Socket
} = require("dgram");
const {
    userInfo
} = require("os");
const {
    Server
} = require("socket.io");



yargs(hideBin(process.argv))
    .command("start", "start a new server", {}, startServer)
    .command("init", "initialize a new repository", {}, initRepo)
    .command(
        "add <file>",
        "Add a file to the repository  ",
        (yargs) => {
            yargs.positional("file", {
                describe: "file to add to the staging area",
                type: "string",
            });
        },
        (argv) => {
            addRepo(argv.file);
        },
    )
    .command(
        "commit <message>",
        "Add message for commit  ",
        (yargs) => {
            yargs.positional("message", {
                describe: "commit message",
                type: "string",
            });
        },
        (argv) => {
            commitRepo(argv.message);
        },
    )
    .command("push", "push commit to s3", {}, pushRepo)
    .command("pull", "push commit from s3", {}, pullRepo)
    .command(
        "revert <commitID>",
        "revert to specific  commit  ",
        (yargs) => {
            yargs.positional("commitID", {
                describe: "commit id to revert to ",
                type: "string",
            });
        },
        (argv) => {
            revertRepo(argv.commitID);
        },
    )
    .demandCommand(1, "you need at least one command")
    .help().argv;

function startServer() {
    const app = express();
    const port = process.env.PORT || 3000;

    app.use(bodyParser.json());
    app.use(express.json());

    const MongoUrl = process.env.MONGO_URL;
    console.log(MongoUrl);
    // console.log("RAW ENV:", process.env);
    // console.log("MONGO_URL VALUE:", process.env.MONGO_URL);
    // console.log("TYPE:", typeof process.env.MONGO_URL);


    mongoose
        .connect(MongoUrl)
        .then(() => console.log("mongodb connected...."))
        .catch((err) => {
            console.log("error while connecting mongodb..", err);
        });

    app.use(
        cors({
            origin: "*",
        }),
    );

    app.use("/", maninRouter);

    let user = "test";
    const httpServer = http.createServer(app);
    const io = new Server(httpServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket) => {
        socket.on("joinRoom", (userID) => {
            user = userID;
            console.log("====");
            console.log(user);
            console.log("====");
            socket.join(userID);
        });
    });

    const db = mongoose.connection;

    db.once("open", async () => {
        console.log("CRUD operations called");
    });

    httpServer.listen(port, () => {
        console.log(`server is running on port ${port}`);
    });
}