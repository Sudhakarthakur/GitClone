const fs = require("fs").promises;
const path = require("path");

async function addRepo(filepath) {
    const repopath = path.resolve(process.cwd(), ".apnaGit");
    const stagingPath = path.join(repopath, "staging")

    try {
        await fs.mkdir(stagingPath, {
            recursive: true
        });
        const filename = path.basename(filepath);
        await fs.copyFile(filepath, path.join(stagingPath, filename));
        console.log(`file ${filename} added to staging area`);
    } catch (error) {
        console.log("Error adding file", error)
    }

}

module.exports = {
    addRepo
}