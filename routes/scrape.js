const express = require("express");
const router = express.Router();
const db = require("../models");
const request = require("request");
const cheerio = require("cheerio");


router.get("/test", (req, res) => {
    db.Article.create({
        headline: "Hello this is dawg",
        summary: "A dog that says hello",
        URL: "google.com"

    }).then(data => console.log(data));
    res.send("Hello");
})
    .post("/scrape", (req, res) => {
        let data = req.body
        let dataToSend = [];
        request(data.URL, (err, response, html) => {
            const $ = cheerio.load(html);
            
            $("div.item").each((i, ele) => {
                
                if(i < 10) {
                  let title = $(ele).find("h3").children("a").text();
                  let url = $(ele).find("h3").children("a").attr("href");

                  if(url !== undefined && !url.includes("https://")) {
                      url = "https://www.cnet.com" + url;
                  }
                  dataToSend.push({title, url});
                  
                }
            });
            
            res.send(dataToSend);
        });
        
        
    })
    .post("/save", function(req, res) {
        console.log(req.body);
        const headline = req.body.headline;
        const url = req.body.url;

        db.Article.create({headline, URL: url})
            .then((data) => {
            })
    })
    .post("/comment", (req, res) => {
        console.log(req.body.comment, req.body.id);
        
        db.Comment.create({body: req.body.comment})
            .then(function(dbComment) {
            // If a Note was created successfully, find one User (there's only one) and push the new Note's _id to the User's `notes` array
            // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
            // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
            return db.Article.findOneAndUpdate({_id: req.body.id}, { $push: { comments: dbComment._id } }, { new: true });
            })
            .then(function(dbArticle) {
            // If the User was updated successfully, send it back to the client
            db.Article.find({_id: dbArticle._id})
                // Specify that we want to populate the retrieved users with any associated notes
                .populate("comments")
                .then(function(data) {
                // If able to successfully find and associate all Users and Notes, send them back to the client
                res.json(data);
                })
                .catch(function(err) {
                // If an error occurs, send it back to the client
                res.json(err);
                });
            })
            .catch(function(err) {
            // If an error occurs, send it back to the client
            res.json(err);
            });
            
    })
    .delete("/delete/:id", (req, res) => {
        
        db.Article.deleteOne({_id: req.params.id}, (err) => {
            res.send("Deleted");
        });
    })
    .delete("/delete", (req, res) => {
        db.Comment.deleteMany({}, (err) => {
            db.Article.deleteMany({}, (err) => {
                res.send("Deleted");
            });
        });
    });


//Export our router object
module.exports = router;