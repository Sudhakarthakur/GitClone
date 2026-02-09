const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")
const {
    MongoClient
} = require("mongodb");
const dotenv = require("dotenv");
const {
    default: mongoose
} = require("mongoose");
var ObjectId = require("mongodb").ObjectId

dotenv.config();

const url = process.env.MONGO_URL;
let client;


async function connectClient() {
    if (!client) {
        client = new MongoClient(url);
        await client.connect();
    }
}

async function getAllUsers(req, res) {
    try {
        await connectClient();
        const db = client.db("githubClone")
        const userCollection = db.collection("users");
        const users = await userCollection.find({}).toArray();
        res.json(users)
    } catch (err) {
        console.error("error durning login", err.message);
        res.status(500).send("Server Error")
    }
}

async function signup(req, res) {
    const {
        username,
        password,
        email
    } = req.body;
    try {
        await connectClient();
        const db = client.db("githubClone")
        const userCollection = db.collection("users");
        const user = await userCollection.findOne({
            username
        })
        if (user) {
            return res.status(400).json({
                message: "User already exits"
            })
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt)

        const newUser = {
            username,
            password: hashPassword,
            email,
            repositories: [],
            followedUsers: [],
            starRepos: []
        }

        const result = await userCollection.insertOne(newUser);
        const token = jwt.sign({
            id: result.insertId
        }, process.env.JWT_SECRET_KEY, {
            expiresIn: "1h"
        })
        res.json(token)
    } catch (err) {
        console.error("Error during signup ", err.message);
        res.status(500).send("Server error")
    }

}

async function login(req, res) {
    const {
        email,
        password
    } = req.body;
    try {
        await connectClient();
        const db = client.db("gitgubClone")
        const userCollection = db.collection("user");
        const user = await userCollection.findOne({
            email
        })
        if (!user) {
            return res.status(400).json({
                message: " Invalid credintals  "
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "invalid credintals  "
            })
        }
        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET_KEY, {
            expiresIn: "1h"
        })
        res.json({
            token,
            userId: user._id
        })
    } catch (err) {
        console.error("error durning login", err.message);
        res.status(500).send("Server Error")
    }

}

async function getUserProfile(req, res) {
    const CurrentID = req.params.id;
    try {
        await connectClient();
        const db = client.db("gitgubClone");
        const usersCollection = db.collection("user");
        const user = await usersCollection.findOne({
            _id: new ObjectId(CurrentID),
        })
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });


        }
        return res.status(200).json(user);
    } catch (err) {
        console.error("Error arrive while featching userdata", err);
        return res.status(500).send("Server Error")
    }

}

const updateUserProfile = (req, res) => {
    res.send("feaching all users");
}

async function deleteUserProfile(req, res) {
    const CurrentId = req.params.id;
    try {
        await connectClient();
        const db = client.db("gitgubClone");
        const usersCollection = db.collection("user");
        const result = await usersCollection.findOne({
            _id: new ObjectId(CurrentId),
        })
        if (result.deletedCount == 0) {
            return res.status(400).json({
                message: "user not found"
            })
        }
        res.json("user profile deleted")
    } catch (err) {
        console.error("Error during deleleting user profile", err);
        return res.status(500).send("Server Error")
    }
}

module.exports = {
    getAllUsers,
    signup,
    login,
    deleteUserProfile,
    updateUserProfile,
    getUserProfile
}