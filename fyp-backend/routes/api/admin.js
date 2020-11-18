const express      = require("express");
const router       = express.Router();
const bcrypt       = require("bcryptjs");
const bodyparser   = require("body-parser");
const decode     = require("jwt-decode");
const { ServiceProvider , validateServiceProvider} = require('../../models/Service Provider/ServiceProvider');
const { Admin , validateAdmin , validateLogin }           =require('../../models/Admin/Admin'); 
const { setToken } = require("../../auth/auth");

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

// Admin reset password or Edit password
router.put('/resetpassword', async ( req , res ) => {

    const a="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmN2UxOWY4NTBkZjcyMmNkOGFiNTI4YyIsImlzQWRtaW4iOnRydWUsImVtYWlsIjoidWJhaWQyMzFAZ21haWwuY29tIiwiaWF0IjoxNjAyMDk5NzA0fQ.ylyHyp5R4mvuvgkevCmwLMCLYjsEACt3vac660BsV6k";
    const j=decode(a);

    let admin = await Admin.findOne({_id:j.id});

    if(admin){
        const v= await bcrypt.compare(req.body.oldpassword,admin.password);    
        if(v){

            const salt = await bcrypt.genSalt(10);
            const pass = await bcrypt.hash(req.body.newpassword, salt);

    await Admin.findByIdAndUpdate(
        admin._id,
        {
          $set: {
              password:pass
          },
        },
        { new: true }
      );

      res.send(200);
    }else{
        console.log(admin.password);
        console.log("old password doesnt match !");
        res.send(404);
    }


    }else{

        res.send(400);
        console.log("unauthorized admin");

    }
});


// Admin deleting a Service Provider
router.delete('/delete', async ( req ,res ) => {

    const s = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmN2Q4NWUxMTUyYjY1NDFlMGFlNmZiNyIsImlzQWRtaW4iOmZhbHNlLCJlbWFpbCI6InViYWlkMTVAZ21haWwuY29tIiwiaWF0IjoxNjAyMDYxODEyfQ.gVNRPZH8Zeu8wU3yBErTWGggd9JI2Ii-7le1nqL63QQ";
    const j = decode(s);

    let user = await ServiceProvider.findOne({_id:j.id});
    
    if(user){

        user.deleteOne({_id:j.id});
        res.send(200);
    }
    else{

        console.log("user not found");
        return res.status(400).send("user not exists!");

    }

});

router.update;
module.exports = router;