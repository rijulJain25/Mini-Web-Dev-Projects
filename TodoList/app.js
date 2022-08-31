const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js")

const app = express();

app.set('view engine', 'ejs');

const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", function(req, res){

  const day = date.giveDate();

  res.render("list", {listTitle: day, newListItems: items});
});

app.post("/", function(req, res){
  const item = req.body.newItem;

  if(req.body.list === "Work"){
    workItems.push(item);
    res.redirect("/work");
  }
  else{
    items.push(item);
    res.redirect("/");
  }
});

app.delete("/", function(req, res){
  const itemDel = req.body.delItem;
  for(var i = 0; i<items.length; i++){
    if(itemDel === items[i]){
      items.splice(i,1);
    }
  }
  alert("There no such item in list");
});

app.get("/work", function(req, res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
})

app.get("/about", function(req, res){
  res.render("about");
})


app.listen(3000, function(){
  console.log("Server is running on port 3000!");
})
