const express    = require("express");
const router     = express.Router();
const bodyparser = require("body-parser");
const decode     = require("jwt-decode");
//const decode     = require("jsonwebtoken");
const {  PTask, validateTask  } = require('../../models/Customer/PrivateTask');
const {Task} = require('../../models/Customer/PostTask');
const {Payment}= require("../../models/Customer/Payment");
const {Customer}= require("../../models/Customer/Customer");
const { ServiceProvider } = require("../../models/Service Provider/ServiceProvider");
router.use(bodyparser.json());
router.use(bodyparser.urlencoded({ extended: false }));

router.post('/pTask', async ( req , res ) =>{
    const jwt = decode(req.header("x-auth-token"));
    let cus= await Customer.findOne({_id:jwt.id});
    // Check if this Task already exisits
    let user = await PTask.findOne({ title: req.body.title});
    if (user) {
      console.log("Task already exists");
      return res.status(400).send("Task already exists!");
    }
    // Insert the new Task if they do not exist yet
    else {
   
      try {
        user = new PTask({
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
            description:req.body.description,
            serviceprovider:req.body.serviceprovider
  
        });
      } catch (ex) {
        console.log("Error in posting task", ex);
      }
      await user.save();
      res.send(user);
    }
  });

  router.get("/view", async (req, res) => {
    const jwt = decode(req.header("x-auth-token"));
    const task = await PTask.find({serviceprovider:jwt.id});
    if (!task) res.status(400);
    res.send(task);
  });
  router.put('/acceptTask', async ( req , res )=>{
    const jwt = decode(req.header("x-auth-token"));
    let user = await PTask.findOne({_id:req.body.taskid});
    let ser= await ServiceProvider.findOne({_id:jwt.id});

    await PTask.findByIdAndUpdate(
        user._id,
        {
          $set: {
            serviceprovider:jwt.id,
            serviceprovideremail:ser.email
          },
        },
        { new: true }
      );

      res.send(200);

});
router.put('/rejectTask', async ( req , res )=>{
  let user = await PTask.findOne({_id:req.body.taskid});

  user.deleteOne({_id:user._id});
    res.send(200);

});
router.get("/fetch", async (req, res) => {
  const jwt = decode(req.header("x-auth-token"));
  const task = await PTask.find({customer:jwt.id});
  if (!task) res.status(400);

  res.send(task);
});
router.put('/acceptServiceProvider:id', async ( req , res)=>{
  let user = await PTask.findOne({_id:req.params.id});
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();    
  await PTask.findByIdAndUpdate(
    user._id,
    {
      $set: {
        accepttaskdate:date,
        status:"in progress"
      },
    },
    { new: true }
  );
  let table= await PTask.findOne({_id:req.params.id});
  
    work=new Task({
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
    serviceprovider:table.serviceprovider,
    serviceprovideremail:table.serviceprovideremail
    });

    await work.save();
    table.deleteOne({_id:user._id});
  res.send(200);
});
router.put('/cancelServiceProvider', async ( req , res )=>{
  let user = await PTask.findOne({_id:req.body.taskid});

  user.deleteOne({_id:user._id});
    res.send(200);

});
router.update;
module.exports = router;