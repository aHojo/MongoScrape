const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const scrape = require("./routes/scrape");
const displayPage = require("./routes/display");
const PORT = process.env.PORT || 8000;
MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use express.static to serve the public folder as a static directory
app.use("/public", express.static(__dirname + "/public"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use("/", displayPage);
app.use("/api", scrape);


// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);;


// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });