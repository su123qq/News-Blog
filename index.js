import express from "express";
import bodyParser from "body-parser";


const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

const posts = [];

function changetoUpperCase(str){
    str = str.substring(0,1).toUpperCase() + str.substring(1);
    for (let i = 0; i < str.length; i++) {
        if (str.charAt(i) == " ") {
            str = str.substring(0,i+1) + str.charAt(i+1).toUpperCase() + str.substring(i+2);      
        }
    }
    return str;
}


//user first time viewing the page
app.get("/op-ed", (req,res) => {    
    res.render("op-ed.ejs", {posts: posts});
});

app.get("/form", (req,res) => {
    res.render("form.ejs");
});    

app.post("/submit",(req,res) => {
    if (req.body.name != "" && req.body.text != "" && req.body.title != ""){
        posts.push(req.body);

    }
    res.render("op-ed.ejs", {posts: posts, changetoUpperCase: changetoUpperCase});
});

app.post("/expand", (req,res) => {

    res.render("expand.ejs", {post: posts[req.body.id], id: req.body.id});
});

app.post("/delete", (req,res) => {

    for (let i = 0; i < posts.length; i++) {
        if (i == req.body.id) {
            posts.splice(i, 1);
        }
    }
    res.render("op-ed.ejs", {posts: posts});
});

var editPost = posts[0];
var editIndex = 0;
app.post("/edit", (req,res) => { 
    for (let i = 0; i < posts.length; i++) {
        if (i == req.body.id) {
            editPost = posts[i];
            editIndex = i;
        }
    }
    res.render("edit.ejs", {post: posts[editIndex]});
});

app.post("/edited", (req,res) => {
    for (let i = 0; i < posts.length; i++) {
        if (i == editIndex) {
            posts[i].name = req.body.name;
            posts[i].text = req.body.text;
            posts[i].title = req.body.title;
        }
    }
    res.render("op-ed.ejs", {posts: posts});
});
    

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});