import mongoose from 'mongoose';

const postShcema = mongoose.Schema({
    title: String,
    message: String,
    name: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likes: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date, 
        default: new Date()
    }
})

const PostMessage = mongoose.model("PostMessage", postShcema);

export default PostMessage;