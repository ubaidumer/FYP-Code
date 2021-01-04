const express    = require("express");
const router     = express.Router();
const bodyparser = require("body-parser");
const decode     = require("jwt-decode");
//const decode     = require("jsonwebtoken");
const { Task , validateTask  } = require('../../models/Customer/PostTask');
const {Payment}= require("../../models/Customer/Payment");
const {Customer}= require("../../models/Customer/Customer");
const email = require("./email");
const { ServiceProvider } = require("../../models/Service Provider/ServiceProvider");
const { Admin } = require("../../models/Admin/Admin");
router.use(bodyparser.json());
router.use(bodyparser.urlencoded({ extended: false }));




// Customer posting a task fr-
router.post('/postTask', async ( req , res ) =>{
  const jwt = decode(req.header("x-auth-token"));
  let cus= await Customer.findOne({_id:jwt.id});
  // Validate Schema
  const { error } = validateTask(req.body);
  if (error) {
    console.log("validation Error", error);
    return res.status(400).send(error.details[0].message);
  }
  // Check if this Task already exisits
  let user = await Task.findOne({ title: req.body.title});
  if (user) {
    console.log("Task already exists");
    return res.status(400).send("Task already exists!");
  }
  // Insert the new Task if they do not exist yet
  else {
 
    try {
      user = new Task({
          customer: jwt.id,
          customeremail:cus.email,
          title: req.body.title,
          servicetype: req.body.servicetype,
          location: req.body.location,
          perhour: req.body.perhour,
          permonth:req.body.permonth,
          pertask:req.body.pertask,
          starttime: req.body.starttime,
          endtime: req.body.endtime,
          month:req.body.month,
          status: "pending",
          description:req.body.description

      });
    } catch (ex) {
      console.log("Error in posting task", ex);
    }
    await user.save();
    res.send(user);
  }
});
//gets all tasks
router.get("/view", async (req, res) => {
  const task = await Task.find();
  if (!task) res.status(400);
  res.send(task);
});
router.get("/viewS", async (req, res) => {
  const jwt = decode(req.header("x-auth-token"));
  const task = await Task.find({serviceprovider:jwt.id});
  if (!task) res.status(400);
  res.send(task);
});
//gets all customer tasks waiting for acceptServiceProvider
router.get("/fetch", async (req, res) => {
  const jwt = decode(req.header("x-auth-token"));
  const task = await Task.find({customer:jwt.id});
  if (!task) res.status(400);

  res.send(task);
});

// Service Provider Accepting a Task fr-
router.put('/acceptTask:id', async ( req , res )=>{
    const jwt = decode(req.header("x-auth-token"));
    let user = await Task.findOne({_id:req.params.id});
    let ser= await ServiceProvider.findOne({_id:jwt.id});

    let t= await Task.findOne({serviceprovider:jwt.id,status:"in progress"});

if(!t){
    await Task.findByIdAndUpdate(
        user._id,
        {
          $set: {
            serviceprovider:jwt.id,
            serviceprovideremail:ser.email
          },
        },
        { new: true }
      );

      res.send("successfully accepted");
      }else{
        res.send("already in progress with someone else");
      }
});
//Customer to accepet Service Provider
router.put('/acceptServiceProvider:id', async ( req , res)=>{
  let user = await Task.findOne({_id:req.params.id});
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();    
  await Task.findByIdAndUpdate(
    user._id,
    {
      $set: {
        accepttaskdate:date,
        status:"in progress"
      },
    },
    { new: true }
  );
  res.send(200);
});
//Customer to cancel Service Provider
router.put('/cancelServiceProvider:id', async ( req , res)=>{
  let user = await Task.findOne({_id:req.params.id});  
  await Task.findByIdAndUpdate(
    user._id,
    {
      $set: {
        serviceprovider:undefined,
        serviceprovideremail:""
      },
    },
    { new: true }
  );
  res.send(200);
});
// Service Provider Task Completion fr-
router.put('/taskCompletion:id', async ( req , res )=>{
     
     
    const jwt = decode(req.header("x-auth-token"));
    let user = await Task.findOne({_id:req.params.id});
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
   

    if(user.status === "in progress"){
        await Task.findByIdAndUpdate(
            user._id,
            {
              $set: {
                endtaskdate: date,
                status:"end"
    
              },
            },
            { new: true }
          );
    // saving post in history of customer and service provider and deleting from collection post task because task completed
    let table = await Task.findById(req.params.id);
    
        //Payment
        pay = new Payment({
          customer:table.customer,
          customeremail:table.customeremail,
          title:table.title,
          servicetype:table.servicetype,
          location:table.location,
          perhour:table.perhour,
          permonth:table.permonth,
          pertask:table.pertask,
          starttime:table.starttime,
          endtime:table.endtime,
          month:table.month,
          status:table.status,
          description:table.description,
          accepttaskdate:table.accepttaskdate,
          endtaskdate:table.endtaskdate,
          serviceprovider:table.serviceprovider,
          serviceprovideremail:table.serviceprovideremail
          });
          await pay.save();


    let cemail= table.customeremail;
    let ti= table.title;
    let ad= table.accepttaskdate;
    let ed= table.endtaskdate;
          
    //Delete table from post a task collection
    table.deleteOne({_id:req.params.id});



    const u = await ServiceProvider.findById({ _id: jwt.id });
    if (!u)
      res.status(404).json({
        status: false,
      });
    else {
      const text =
        "Your Task is Successfully ended. "+"Your Customer was Email:"+cemail+".Task Title:"+ti+".Task Started at Date:"+ad+".Task End at Date:"+ed+".";
      try {
        email(u.email, " Task Completion ", text);
        const admin = await Admin.findOne();
        const t="Task Ended With Title:"+ti+".between customer:"+cemail+" and ServiceProvider:"+u.email+"";
        email(admin.email, " Task Completion ", t);
        res.send(200);
      } catch (exp) {
        console.log("Error is sending email");
        console.log(exp);
        res.status(404).json({ msg: "Error in sending the email" });
      }
    }


          res.send(200);

    }else{

        res.send("Task completion failed because task is "+user.status);

    }

});

// Customer deleting a Task fr-
router.post('/delete', async ( req , res ) => {

    let user = await Task.findById({_id:req.body.id});
    try{
    if("pending" === user.status.trim()){

    user.deleteOne({_id:req.body.id});
    res.send(user);

    }else{

        res.send("Cannot Delete because task is "+user.status);

    }
}catch(err){
    console.log("Error in deleting Task by customer", err);
}
});
router.post('/edit', async ( req , res ) => {

  let table = await Task.findById({_id:req.body.id});
  try{
if(table){

  await Task.update(
    {_id:req.body.id},
    {
      $set: {
        title: req.body.title,
        servicetype: req.body.servicetype,
        location: req.body.location,
        perhour: req.body.perhour,
        permonth:req.body.permonth,
        pertask:req.body.pertask,
        starttime: req.body.start,
        endtime: req.body.end,
        month:req.body.month,
        description:req.body.description
      },
    },
    { new: true }
  );
  res.send(200);
}
else{res.send(400);}
}catch(err){
  console.log("Error in editing Task by customer", err);
}
});

router.update;
module.exports = router;