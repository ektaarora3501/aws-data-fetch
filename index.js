const express = require("express");
const app = express();
const router = require("./routes/routes");
const AWS = require("aws-sdk");
const path = require("path");
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");

let awsConfig = {
    "region": "us-west-2",
    "endpoint": "http://dynamodb.us-west-2.amazonaws.com",
    "accessKeyId": "***************", "secretAccessKey": "********************"
};

AWS.config.update(awsConfig);

let docClient = new AWS.DynamoDB.DocumentClient();


app.use(bodyParser.urlencoded({
  extended: true
}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(__dirname + "/public"));



router(app,docClient);

app.listen(port, () => console.log(`server started on port ${port}`));
