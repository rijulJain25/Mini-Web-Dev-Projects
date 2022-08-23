const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https")

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});


app.post("/", function(req, res){
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const emails = req.body.email;
  const data = {
    members: [
      {
        email_address: emails,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };


// this for converting the data into a json format string
  const jasonData = JSON.stringify(data);

  const url = "https://us9.api.mailchimp.com/3.0/lists/e94c1ebf44";

  const options = {
    method: "POST",
    auth: "Rijul1:8b2b122468651c941b4ccba1764e6458-us9"
  }

  const request = https.request(url, options, function(response){

    if(response.statusCode ==  200){
      res.sendFile(__dirname + "/success.html");
    }else{
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", function(data){
      console.log(JSON.parse(data));
    })
  })

  request.write(jasonData);
  request.end();

});

app.post("/failure", function(req, res){
  res.redirect("/");
});

app.listen(3000, function(){
  console.log("Sever is running on port 3000");
});

//
// API Key
// 8b2b122468651c941b4ccba1764e6458-us9

// Audience id
// e94c1ebf44
