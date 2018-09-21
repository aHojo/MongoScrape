const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Article = mongoose.model("Article", new Schema({
    headline: {
        type: String,
        required: true,
        unique: true,
        dropDups: true
    },
    URL: {
        type: String,
        required: true,
        unique: true,
        dropDups: true
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comments"
    }]
}));

module.exports = Article;