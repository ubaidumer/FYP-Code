const express      = require("express");
const router       = express.Router();
const bcrypt       = require("bcryptjs");
const bodyparser   = require("body-parser");
const decode     = require("jwt-decode");
const { ServiceProvider , validateServiceProvider} = require('../../models/Service Provider/ServiceProvider');
const { Admin , validateAdmin , validateLogin }           =require('../../models/Admin/Admin'); 
const { setToken } = require("../../auth/auth");
const {Customer} =require('../../models/Customer/Customer');
const {CProfile} = require('../../models/Customer/CProfile');
const {SProfile} = require('../../models/Service Provider/SProfile');
const {OrderHistory}= require('../../models/Customer/OrderHistory');
const {WorkHistory} =require('../../models/Service Provider/WorkHistory');
const {Task} =require('../../models/Customer/PostTask');
const email = require("./email");
router.use(bodyparser.json());
router.use(bodyparser.urlencoded({ extended: false }));

// service provider registeration by admin fr-
router.post('/register', async ( req , res ) => {

// validate Schema
const { error } = validateServiceProvider(req.body);
if (error) {
    console.log(error.details[0].message)
    return res.status(400).send(error.details[0].message);
}

//check already exist or not? if not then add new service provider
let user = await ServiceProvider.findOne({ email: req.body.email });
if (!user) {
    user = new ServiceProvider({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        servicetype: req.body.servicetype,
        password: req.body.password,
        contactno: req.body.contactno
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    let date= new Date();
    let d=""+date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear()+"";
    let profile= new SProfile({
      serviceprovider: user._id,
      serviceprovidername: ""+user.firstname+" "+user.lastname+"",
      ordercompleted:0,
      creditearn:0,
      joindate: d,
      servicetype:user.servicetype,
      Latitude:74,
      Longitude:32
    });

     await profile.save();
    const token = setToken(user._id, user.email, user.isAdmin, user.isApproved)
    res
        .header("x-auth-token", token)
        .header("access-control-expose-headers", "x-auth-token")
        .send(token)

}
else
    res.send("Already existing!")
});

// Admin Sign-up fr-
router.post('/signup', async ( req , res )=> {
// validate Schema
const { error } = validateAdmin(req.body);
if (error) {
    console.log(error.details[0].message)
    return res.status(400).send(error.details[0].message);
}

//check already exist or not? if not then add new Admin
let user = await Admin.findOne({ email: req.body.email });
if (!user) {
    user = new Admin({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        contactno: req.body.contactno
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    const token = setToken(user._id, user.email, user.isAdmin, user.isApproved)
    res
        .header("x-auth-token", token)
        .header("access-control-expose-headers", "x-auth-token")
        .send(token)

}
else
    res.send("Already existing!")


});

// Admin log-in fr-
router.post('/login', async ( req , res ) => {

    // validate Schema

    const { error } = validateLogin(req.body)
    if (error) {
        console.log(error.details[0].message)
        return res.status(400).send(error.details[0].message)
    }

    // authentication of email and password 
    let user = await Admin.findOne({ email: req.body.email });
    if (user) {
        const validatePassword = bcrypt.compare(req.body.password, user.password)
        if (!validatePassword){
            res.status().send("Invalid email and password")
        }
        else{
        const token = setToken(user._id, user.email, user.isAdmin, user.isApproved)
        res
            .header("x-auth-token", token)
            .header("access-control-expose-headers", "x-auth-token")
            .send(token)         
            .status(200)
            
        }
    }
    else{
        res.status(400).send("No Registered Admin exists")
    }

});

router.post('/allrecordsC',async (req,res)=>{
    const jwt = decode(req.header("x-auth-token"));
    const admin= await Admin.find({_id:jwt.id});
    if(admin){


        const cus= await Customer.find();
        res.send(cus);
    }else{
        res.send(400);
    }
})
router.post('/allrecordsS',async (req,res)=>{
    const jwt = decode(req.header("x-auth-token"));
    const admin= await Admin.find({_id:jwt.id});
    if(admin){


        const cus= await ServiceProvider.find();
        res.send(cus);
    }else{
        res.send(400);
    }
})
router.post('/allrecordsCp',async (req,res)=>{
    const jwt = decode(req.header("x-auth-token"));
    const admin= await Admin.find({_id:jwt.id});
    if(admin){


        const cus= await CProfile.find();
        res.send(cus);
    }else{
        res.send(400);
    }
})
router.post('/allrecordsSp',async (req,res)=>{
    const jwt = decode(req.header("x-auth-token"));
    const admin= await Admin.find({_id:jwt.id});
    if(admin){


        const cus= await SProfile.find();
        res.send(cus);
    }else{
        res.send(400);
    }
})
router.post('/allrecordso',async (req,res)=>{
    const jwt = decode(req.header("x-auth-token"));
    const admin= await Admin.find({_id:jwt.id});
    if(admin){


        const cus= await OrderHistory.find();
        console.log("hahahah"+cus);
        res.send(cus);
    }else{
        res.send(400);
    }
})
router.post('/allrecordsh',async (req,res)=>{
    const jwt = decode(req.header("x-auth-token"));
    const admin= await Admin.find({_id:jwt.id});
    if(admin){


        const cus= await WorkHistory.find();
        res.send(cus);
    }else{
        res.send(400);
    }
})
router.get("/dep" , async (req,res)=>{
    const jwt = decode(req.header("x-auth-token"));
    const admin= await Admin.find({_id:jwt.id});
    let sum=0;
    if(admin){
    const s= await SProfile.find();
    
    for(let i=0;i<s.length;i++){
        sum+=s[i].creditearn;
    }
    console.log(sum);
    res.send(sum)

    }else{
        res.send(400);
    }
})
router.post("/workus" , async (req,res)=>{
    const admin= await Admin.findOne();
    if(admin){
        const text ="User Name:"+req.body.name+".Email by: "+req.body.email+". Message:"+req.body.message+". ";
        email(admin.email, " Contact Us ", text);
    res.send(200);

    }else{
        res.send(400);
    }
})
router.post("/postedtaskview" , async (req,res)=>{
  const table= await Task.find({status:"pending"});
    if(table){
      
    res.send(table);

    }else{
        res.send(400);
    }
})

router.post("/sendrpcode" , async (req,res)=>{
    
    const admin = await Admin.findOne({email:req.body.email});
    if(admin){

        let number=100000 + Math.floor(Math.random() * 900000);

        const text ="Your Verification Code is: "+number+" ";
        email(req.body.email, " Verification Code ", text);
        await Admin.update(
            {_id:admin._id},
            {
              $set: {
               code:number
              },
            },
            { new: true }
          );
          res.send(200);

    }else{
        res.send(404);
    }
});
router.post("/reset" , async (req,res)=>{
    
    const admin = await Admin.findOne({email:req.body.email});

    if(admin.code===parseInt(req.body.rpcode)){

        const salt = await bcrypt.genSalt(10);
        const p = await bcrypt.hash(req.body.rppass, salt);
        await Admin.update(
            {_id:admin._id},
            {
              $set: {
               password:p
              },
            },
            { new: true }
          );

          res.send(200);
    }else{
        res.send(404);
    }
});
router.post("/sendrpcodeuser" , async (req,res)=>{
    
    const cus = await Customer.findOne({email:req.body.email});
    const ser = await ServiceProvider.findOne({email:req.body.email});
    if(cus){

        let number=100000 + Math.floor(Math.random() * 900000);

        const text ="Your Verification Code is: "+number+" ";
        email(req.body.email, " Verification Code ", text);
        await Customer.update(
            {_id:cus._id},
            {
              $set: {
               code:number
              },
            },
            { new: true }
          );
          res.send(200);

    }else if(ser){

        let number=100000 + Math.floor(Math.random() * 900000);

        const text ="Your Verification Code is: "+number+" ";
        email(req.body.email, " Verification Code ", text);
        await ServiceProvider.update(
            {_id:ser._id},
            {
              $set: {
               code:number
              },
            },
            { new: true }
          );
          res.send(200);

    }else{
        res.send(404);
    }
});
router.post("/resetuser" , async (req,res)=>{
    
    const cus = await Customer.findOne({email:req.body.email});
    const ser = await ServiceProvider.findOne({email:req.body.email});

    if(cus){
    if(cus.code===parseInt(req.body.rpcode)){

        const salt = await bcrypt.genSalt(10);
        const p = await bcrypt.hash(req.body.rppass, salt);
        await Customer.update(
            {_id:cus._id},
            {
              $set: {
               password:p
              },
            },
            { new: true }
          );

          res.send(200);
    }else{
        res.send(404);
    }
}
    
 if(ser){   
    if(ser.code===parseInt(req.body.rpcode)){

        const salt = await bcrypt.genSalt(10);
        const p = await bcrypt.hash(req.body.rppass, salt);
        await ServiceProvider.update(
            {_id:ser._id},
            {
              $set: {
               password:p
              },
            },
            { new: true }
          );

          res.send(200);
    }else{
        res.send(404);
    }
}
});
router.update;
module.exports = router;