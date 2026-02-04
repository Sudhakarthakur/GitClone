const mongoose = require('mongoose');
const {
    boolean
} = require('yargs');
const {
    Schema
} = mongoose;

const RepositorySchema = new Schema({
    name: {
        typw: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
    },
    content: {
        type: String,
    },
    visibility: {
        type: boolean,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    issues: [{
        type: Schema.Types.ObjectId,
        ref: "Issue",
    }]
})

const Repository = mongoose.model("Repository", RepositorySchema);
export default Repository;