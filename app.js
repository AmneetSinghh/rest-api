//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const datetime = require('node-datetime');
var format = require("dateformat");



const ejs = require("ejs");
const _ = require("lodash");
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


// Data-Base
mongoose.connect("mongodb+srv://harry:Rajman1234@mflix.aoygq.mongodb.net/taskmanagement", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }); // connection to mongo db server;


//Create a schema;
const task_schema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    creator: { type: String, required: true },
    duration: { type: Number, required: true },
    created_at: {
        type: Date,
        default: Date.now,
        index: { expires: '0m' }
    }
});
//

// Object of the ;Schema
const Task_management = new mongoose.model("Task", task_schema);

app.get("/", function(req, res) {
    res.render("frontpage");
});

app.get("/list", function(req, res) {
    Task_management.find({}, function(err, list_of_tasks) {
        res.render("home", {
            tasks_list: list_of_tasks
        });
    });

});

app.get("/add", function(req, res) {
    res.render("compose");
});



app.post("/add", function(req, res) {

    var d = (req.body.date_of);
    console.log(d);

    const task = new Task_management({
        name: req.body.taskname,
        description: req.body.taskdes,
        creator: req.body.creator,
        duration: req.body.duration,
    });

    // task.createIndex({ "expire_at": 1 }, { expireAfterSeconds: 5 });

    // just refresh the expre property;


    // // console.log((req.body.date_of).toISOString().replace(/T/, ' ').replace(/\..+/, ''));
    // console.log(dd);
    task.save(function(err) {
        if (!err) res.redirect("/list");
        else console.log(err);
    });

});





app.listen(3000, function() {
    console.log("Server started on port 3000");
});