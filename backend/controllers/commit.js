const {
    v4: uuidv4
} = require('uuid')
const fs = require('fs').promises
const path = require('path');
// const {
//     asyncWrapProviders
// } = require('async_hooks');
// const {
//     json
// } = require('stream/consumers');



async function commitRepo(message) {
    const repoPath = path.resolve(process.cwd(), ".apnaGit");
    const stagedPath = path.resolve(repoPath, "staging");
    const commitPath = path.resolve(repoPath, "commits")

    try {
        const commitID = uuidv4();
        const commitDir = path.join(commitPath, commitID)
        await fs.mkdir(commitDir, {
            recursive: true
        })

        const files = await fs.readdir(stagedPath);
        for (const file of files) {
            await fs.copyFile(path.join(stagedPath, file), path.join(commitDir, file))
        }
        await fs.writeFile(path.join(commitDir, "commit.json"), JSON.stringify({
            message,
            date: new Date().toISOString()
        }))
        console.log(`commit ${commitID} created with message ${message}`)
    } catch (error) {
        console.log("Error in commit Part", error)

    }
}

module.exports = {
    commitRepo
}