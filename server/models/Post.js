const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    user: {
        type: Schema.Types.Object,
        required: true,
    },
    text: {
        type: String,
        required: false,
    },
    postImage:{
        type: String,
        required: false
    },
    tags:{
        type: Array,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
});

module.exports = mongoose.model('Post', postSchema);
