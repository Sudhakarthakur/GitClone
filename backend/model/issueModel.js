const mongoose = require('mongoose');
const {
    Schema
} = mongoose;

const IssueSchema = new Schema({
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    status: {
        type: String,
        enum: ["open", "closed"],
        default: "open",
    },
    repository: {
        type: Schema.Types.ObjectId,
        ref: "Repository",
        require: true,
    }
})

const Issue = mongoose.model("Issue", IssueSchema);
export default Issue;