const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");



const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function(request,response)
{
    response.sendFile(__dirname + "/signup.html");
});

app.post("/", function(request, response)
{
  const fName = request.body.fname;
  const lName = request.body.lname;
  const mail = request.body.email;

  const data = {
    members: [
      {
        email_address: mail,
        status: "subscribed",
        marge_fields: {
          FNAME: fName,
          LNAME: lName
        }
      }
    ]
  };
  const jsonData = JSON.stringify(data);

  const url = "https://us7.api.mailchimp.com/3.0/lists/d8d0fbaedf";
  const options = {

    method: "post",
    auth: 'tanu03:617bfecdaf77f26563736b807f4b3a40-us7'
  }

  const req = https.request(url,options, function(res)
  {
    if(res.statusCode === 200)
    {
      response.sendFile(__dirname + "/success.html");
    }
    else{
      response.sendFile(__dirname + "/failure.html");
    }
     res.on("data", function(data)
     {
       console.log(JSON.parse(data));
     })
  })
  req.write(jsonData);
  req.end();
})

app.post("/failure", function(request,response)
{
  response.redirect("/");
})

app.listen(3000,function()
{
    console.log("Server is running on port 3000");
});

//API KEY
//183a8edff5319474f8a7061968ee8335-us7

//Id
//d8d0fbaedf


