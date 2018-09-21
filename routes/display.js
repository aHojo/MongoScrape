const express = require("express");
const router = express.Router();
const db = require("../models");


router
    .get("/", (req, res) => {
    res.render("index");
})
    .get("/saved", (req, res) => {
        db.Article.find({})
        .populate("comments")
        .then(data => {
            res.render("saved", {article: data});
        });
        
    });


//Export our router object
module.exports = router;