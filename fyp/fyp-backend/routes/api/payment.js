const express    = require("express");
const router     = express.Router();
const bcrypt     = require("bcryptjs");
const bodyparser = require("body-parser");
const decode     = require("jwt-decode");
const email = require("./email");
const { Customer } = require("../../models/Customer/Customer");
const { ServiceProvider }= require("../../models/Service Provider/ServiceProvider");
const {Payment} = require("../../models/Customer/Payment");
const {OrderHistory}= require("../../models/Customer/OrderHistory");
const {WorkHistory}= require("../../models/Service Provider/WorkHistory");
const {CProfile}= require("../../models/Customer/CProfile");
const {SProfile} = require("../../models/Service Provider/SProfile");

const stripe = require('stripe')("sk_test_51I1Ax7HfaNOMnRYnhGtD1OuSKcTpC1jIG9nxIyKAwsqfzRCqaJWnfGR9n871Fn6C65b27JKTrvk3FUNdeFHNgRKa00JRDe8RsD");

router.use(bodyparser.json());
router.use(bodyparser.urlencoded({ extended: false }));



router.get('/view',async ( req, res)=>{

  const jwt = decode(req.header("x-auth-token"));
  let table = await Payment.findOne({customer:jwt.id});
  if (!table) res.status(400);
  res.send(table);

});


router.get('/paymentbyCash', async( req , res )=>{
   
    const jwt = decode(req.header("x-auth-token"));
    const user = await Customer.findById({ _id: jwt.id });
    if (!user)
      res.status(404).json({
        status: false,
      });
    else {
      const text =
        "Your Task is completed and payment method has been selected as Cash on spot. ";
      try {
        email(user.email, " Task Completion ", text);
        let table = await Payment.findOne({customer:user._id});
        //Work History
  work=new WorkHistory({
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

    await work.save();

    //Order History
    order = new OrderHistory({
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
      serviceprovideremail:table.serviceprovideremail,
      isRated:"no"
    });
    await order.save();

    const profile = await CProfile.findOne({customer:jwt.id});

    let t=profile.taskcompleted;
    let c=profile.creditspent;

    await CProfile.findOneAndUpdate({customer:jwt.id},{

      $set:{

        taskcompleted:t+1,
        creditspent:c+Math.abs(((order.month*order.permonth)+(order.pertask)+(order.perhour*(parseInt(order.endtime)-parseInt(order.starttime))*(order.month*30)))),
      },
    },{new:true})


    const pro = await SProfile.findOne({serviceprovider:order.serviceprovider});

    let ta=pro.ordercompleted;
    let ca=pro.creditearn;

    await SProfile.findOneAndUpdate({serviceprovider:order.serviceprovider},{

      $set:{

        ordercompleted:ta+1,
        creditearn:ca+Math.abs(((order.month*order.permonth)+(order.pertask)+(order.perhour*(parseInt(order.endtime)-parseInt(order.starttime))*(order.month*30)))),
      },
    },{new:true})

    table.deleteOne({customer:user._id});
        res.send(200);
      } catch (exp) {
        console.log("Error is sending email");
        console.log(exp);
        res.status(404).json({ msg: "Error in sending the email" });
      }
    }
});
router.get('/paymentbyCard', async( req , res )=>{
  const jwt = decode(req.header("x-auth-token"));
  const user = await Customer.findById({ _id: jwt.id });
  if (!user)
    res.status(404).json({
      status: false,
    });
  else {
    const text =
      "Your Task is completed and payment method has been selected as payment with credit Card. ";
    try {
      email(user.email, " Task Completion ", text);
      let table = await Payment.findOne({customer:user._id});
          //Work History
    work=new WorkHistory({
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
  
      await work.save();
  
      //Order History
      order = new OrderHistory({
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
        serviceprovideremail:table.serviceprovideremail,
        isRated:"no"
      });
      await order.save();

      table.deleteOne({customer:user._id});
      res.send(200);
    } catch (exp) {
      console.log("Error is sending email");
      console.log(exp);
      res.status(404).json({ msg: "Error in sending the email" });
    }
  }
});

router.post('/pay', async (req, res) => {
    const {email} = req.body.email;
    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.bill+"00",
        currency: 'PKR',
        metadata: {integration_check: 'accept_a_payment'},
        receipt_email: email,
      });

      res.json({'client_secret': paymentIntent['client_secret']})
});


router.update;
module.exports = router;