const express    = require("express");
const router     = express.Router();
const bcrypt     = require("bcryptjs");
const bodyparser = require("body-parser");
const decode     = require("jwt-decode");
const { Customer , validateCustomer, validateLogin } = require('../../models/Customer/Customer');
const { setToken } = require("../../auth/auth");
const {OrderHistory}= require('../../models/Customer/OrderHistory');
const {CProfile}    = require('../../models/Customer/CProfile');
const { Task } = require('../../models/Customer/PostTask');
const { date } = require("joi");

const cloudinary= require('./cloudinary');
router.use(bodyparser.json({limit: '50mb', extended: true}));
router.use(bodyparser.urlencoded({limit: '50mb', extended: true}));


// Customer sign-up fr-
router.post("/signup", async (req,res) => {

    console.log(
        "signUp Backend ",
        req.body.firstname,
        req.body.lastname,
        req.body.email,
        req.body.password,
        req.body.contactno
      );
  

  // Check if this Customer already exisits
  let user = await Customer.findOne({ email: req.body.email });
  if (user) {
    console.log("Customer already exists");
    return res.status(400).send("Customer already exists!");
  } 
  // Insert the new Customer if they do not exist yet
  else {
    try {
      user = new Customer({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        contactno: req.body.contactno,
        isAdmin: false,
        isApproved: false,
      });
    } catch (ex) {
      console.log("Error in creating Customer", ex);
    }
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();


    let date= new Date();
    let d=""+date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear()+"";
    let profile= new CProfile({
      customer: user._id,
      customername: ""+user.firstname+" "+user.lastname+"",
      taskcompleted:0,
      creditspent:0,
      joindate: d,  
      Latitude:req.body.lat,
      Longitude:req.body.lng
    });

     await profile.save();

    const token = setToken(user._id, user.isApproved, user.email, user.isAdmin);
    console.log("token", token);
    res
      .header("x-auth-token", token)
      .header("access-control-expose-headers", "x-auth-token")
      .send(token);
  }

 });

 // Customer Log-in fr-
 router.post("/login", async (req, res) => {
    const { error } = validateLogin(req.body);
  
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
  
    let user = await Customer.findOne({ email: req.body.email });
    if (user) {
      const validatePassword = await bcrypt.compare(req.body.password,user.password);
      if (!validatePassword)
      {
           res.status(400)
      }    
      try{
      const token = setToken(user._id, user.email, user.isAdmin, user.isApproved);
      res
        .header("x-auth-token", token)
        .header("access-control-expose-headers", "x-auth-token")
        .send(token)
        .status(200)
      }
      catch(ex){
         console.log("Setting token Exception" , ex)
      }
    } else res.status(400).send("No Registered Customer exists");
  });
  router.get("/view", async (req, res) => {
    const jwt = decode(req.header("x-auth-token"));
    const task = await OrderHistory.find({customer:jwt.id});
    if (!task) res.status(400);
    res.send(task);
  });
  router.get("/info", async (req, res) => {
    const jwt = decode(req.header("x-auth-token"));
    const task = await OrderHistory.findOne({customer:jwt.id,isRated:"no"});
    if (!task) res.status(400);
    res.send(task);
  });
  router.get("/email:id", async (req, res) => {
    const task = await Customer.findById({_id:req.params.id});
    if (!task) res.status(400);
    res.send(task.email);
  });

  router.get("/profile", async ( req , res )=>{
    const jwt = decode(req.header("x-auth-token"));
    const profile = await CProfile.findOne({customer:jwt.id});
    if(!profile)res.status(400);
    res.send(profile);
  });
  router.get("/postedtasks", async ( req , res )=>{
    const jwt = decode(req.header("x-auth-token"));
    const task = await Task.find({customer:jwt.id,status:"pending"});
 
    console.log(task);
    res.send(task);
  });
  router.get("/activetasks", async ( req , res )=>{
    const jwt = decode(req.header("x-auth-token"));
    const task = await Task.find({customer:jwt.id,status:"in progress"});
 
    res.send(task);
  });
  router.post("/edit", async (req, res )=>{
    const jwt = decode(req.header("x-auth-token"));

    const salt = await bcrypt.genSalt(10);
    const newp= await bcrypt.hash(req.body.pass,salt);
 
    await Customer.update(
      {_id:jwt.id},
      {
        $set: {
          firstname:req.body.fname,
          lastname:req.body.lname,
          password:newp,
          contactno:req.body.contact
        },
      },
      { new: true }
    );
    await CProfile.update(
      {customer:jwt.id},
      {
        $set: {
          customername:""+req.body.fname+" "+req.body.lname+"",
        },
      },
      { new: true }
    );



    res.send(200);

  });

  router.post('/upload',async(req,res)=>{
    try{
    const jwt = decode(req.header("x-auth-token"));
    const result= await cloudinary.uploader.upload(req.body.imagestring,{upload_preset:'customer_pictures'});

    await CProfile.update(
      {customer:jwt.id},
      {
        $set: {
          imageURL:result.secure_url,
          imageCLOUDID:result.public_id
        },
      },
      { new: true }
    );



    }catch(err){
      console.log(err);
    }
    res.send(200);
  });

  
  router.post('/savelocation',async(req,res)=>{
    try{
    const jwt = decode(req.header("x-auth-token"));
    await CProfile.update(
      {customer:jwt.id},
      {
        $set: {
          Latitude:req.body.lat,
          Longitude:req.body.lng
        },
      },
      { new: true }
    );


    }catch(err){
      console.log(err);
    }
    res.send(200);
  });


 router.update;
 module.exports = router;