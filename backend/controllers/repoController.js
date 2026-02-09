const mongoose = require("mongoose");
const Repository = require("../model/repoModel");
const Issuses = require("../model/issueModel");
const User = require("../model/userModel");



async function createRepositories(req, res) {
    const {
        owner,
        name,
        issues,
        content,
        description,
        visibility
    } = req.body;

    try {
        if (!name) {
            return res.status(400).json({
                error: "Repository name is required"
            })
        }

        if (!mongoose.Types.ObjectId.isValid(owner)) {
            return res.status(400).json({
                error: "Invalid user ID"
            })
        }

        const newRepository = new Repository({
            owner,
            name,
            issues,
            content,
            description,
            visibility,
        })

        const result = await newRepository.save();

        res.status(200).json({
            message: "Repository created",
            repositoryId: result._id
        })


    } catch (err) {
        console.error("error creating repository", err.message);
        res.status(500).send("Server error ")
    }
    // res.send("create repo here");
}

async function getAllRepositories(req, res) {
    try {
        const repositories = await Repository.find({}).populate("owner").populate("issues");
        res.json(repositories);

    } catch (err) {
        console.error("error during repo featching", err.message)
        res.status(500).send("server error")
    }
}

async function fetchRepositoryById(req, res) {
    const repoId = req.params.id;
    try {
        const repository = await Repository.findOne({
            _id: repoId
        }).populate("owner").populate("issues");

        if (!repository) {
            return res.status(404).json({
                message: "Repository not found"
            });
        }

        res.json(repository);

    } catch (err) {
        console.error("error during  featching reposatoryid", err.message)
        res.status(500).send("server error")
    }
}
async function fetchRepositoryByName(req, res) {
    const repoName = req.params.name;
    try {
        const repository = await Repository.find({
            name: repoName
        }).populate("owner").populate("issues");

        if (!repository) {
            return res.status(404).json({
                message: "Repository not found"
            });
        }

        res.json(repository);

    } catch (err) {
        console.error("error during  featching reposatory name", err.message)
        res.status(500).send("server error")
    }
}


async function featchRepositoriesForCurrentUser(req, res) {
    const currentUser = req.User;

    try {
        const repository = await Repository.find({
            owner: currentUser
        });
        if (!repository || repository.length === 0) {
            return res.status(404).json({
                error: "page not found"
            });
        }

        res.json(repository);
    } catch (err) {
        console.log("error during featching repo for currnet user ", err.message);
        res.status(500).send("Server Error")
    }
}


async function updateRepositoriesById(req, res) {
    const {
        id
    } = req.params;
    const {
        content,
        description
    } = req.body;

    try {
        const repository = await Repository.findById(id);
        if (!repository) {
            return res.status(404).json({
                error: "repository not found"
            })
        }

        repository.content.push(content);
        repository.description.push(description);

        const updatedRopo = await repository.save();

        res.json({
            message: "repository updated",
            repository: updatedRopo
        })
    } catch (err) {
        console.error("error during updating repo", err.message);
        res.status(500).send("Server Error")
    }
}

async function toggleVisibilityById(req, res) {
    const {
        id
    } = req.params;


    try {
        const repository = await Repository.findById(id);
        if (!repository) {
            return res.status(404).json({
                error: "repository not found"
            })
        }

        repository.visibility = !repository.visibility;

        const updatedRopo = await repository.save();

        res.json({
            message: "repository visibility toggled change successfully",
            repository: updatedRopo
        })
    } catch (err) {
        console.error("error during visibility change", err.message);
        res.status(500).send("Server Error")
    }
}


async function deleteRepositoryById(req, res) {
    const {
        id
    } = req.params;
    try {
        const deletedRepo = await Repository.findByIdAndDelete(id);
        if (!deletedRepo) {
            return res.status(404).json({
                error: "repository not found"
            })
        }
        res.json({
            message: "repository deleted successfully"
        })
    } catch (err) {
        console.error("error during deleting repo", err.message);
        res.status(500).send("Server Error");
    }
}

module.exports = {
    deleteRepositoryById,
    toggleVisibilityById,
    updateRepositoriesById,
    featchRepositoriesForCurrentUser,
    fetchRepositoryByName,
    fetchRepositoryById,
    getAllRepositories,
    createRepositories
}