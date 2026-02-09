const mongoose = require("mongoose");
const Repository = require("../model/repoModel");
const Issue = require("../model/issueModel");
const User = require("../model/userModel");
const Issue = require("../model/issueModel");


async function createIsuue(req, res) {
    const {
        title,
        description
    } = req.body;
    const repoId = req.params;

    try {
        const issue = new Issue({
            title,
            description,
            repository: repoId
        })
        await issue.save();
        res.status(201).json({
            message: "issue created"
        })
    } catch (err) {
        console.error("error during creating issue in repo", err.message);
        res.status(500).send("Server Error");
    }
}
async function updateIssueById(req, res) {
    const issueId = req.params;
    const {
        title,
        description,
        status
    } = req.body;
    try {
        const updateIssue = await Issue.findById(issueId);
        if (!updateIssue) {
            return res.status(404).json({
                error: "Issue not found"
            })
        }

        Issue.title = title;
        Issue.description = description;
        Issue.status = status;

    } catch (err) {
        console.error("error during updating issue", err.message);
        res.status(500).send("Serve Error")
    }
}

async function deleteIssueById(req, res) {
    const {
        id
    } = req.params;
    try {
        const deleteIssue = await Issue.findByIdAndDelete(id);
        if (!deleteIssue) {
            res.status(404).json({
                eror: "Issue not found"
            })
        }
        res.json({
            message: "issue deleted"
        })
    } catch (err) {
        console.log("error during deleting issue", err.message);
        res.status(500).send("Server Error")
    }
}
//  in this issue functin all repo issue feaching
async function getAllIssue(req, res) {

    const {
        id
    } = req.params

    try {
        const issues = await Issue.findById({
            Repository: id
        });
        if (!issues) {
            return res.status(404).json({
                message: "Issue not found"
            })
        }
        res.status(201).send(issues);
    } catch (err) {
        console.error("Error during feaching all Issues", err.message);
        res, status(500).send("server error")
    }
}
// in this we use a particular issue feaching by issue id
async function getIssueById(req, res) {
    const {
        id
    } = req.params;
    try {
        const Issue = await Issue.findById(id)
        if (!Issue) {
            return res.status(404).json({
                message: "Issue not found"
            })
        }
        res.status(201).send(Issue);
    } catch (err) {
        console.error("Error during feaching all Issues", err.message);
        res, status(500).send("server error")

    }
}

module.exports = {
    getIssueById,
    getAllIssue,
    deleteIssueById,
    updateIssueById,
    createIsuue
}