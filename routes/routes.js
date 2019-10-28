
module.exports = (app,docClient) => {


  app.get("/", (req, res) => {
        res.render("home");
  });

  app.get("/data",(req,res)=>{
   var params = {
         TableName: "Dumbeldore",
         Key: {
             "trip_id": "00a76811960117221a63f9e810c7ef"
         }
      };
     docClient.get(params, function (err, data) {
         if (err) {
          throw err;
         }
         else {
             console.log("users::fetchOneByKey::success - " + JSON.stringify(data, null, 2));
             res.render('data',{doc:data.Item.payload});
         }

     });

  });

  app.post("/data",(req,res) => {
    var params = {
     TableName:"Dumbeldore",
     Key:{
          "trip_id": "00a76811960117221a63f9e810c7ef"
     },
     UpdateExpression: "set payload.fuel_level = :r",

     ExpressionAttributeValues:{
        ":r":req.body.fuel,
     },
     ReturnValues:"UPDATED_NEW"
   };

 console.log("Updating the item...");
 docClient.update(params, function(err, data) {
     if (err) {
         console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
     } else {
         console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
     }
  });

   res.redirect("data")
  });



};
