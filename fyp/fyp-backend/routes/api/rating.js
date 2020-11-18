const express    = require("express");
const router     = express.Router();
const bcrypt     = require("bcryptjs");
const bodyparser = require("body-parser");
const decode     = require("jwt-decode");
const {Rating}= require("../../models/Customer/Rating");
const {Customer} = require("../../models/Customer/Customer");
const { OrderHistory } = require("../../models/Customer/OrderHistory");
router.use(bodyparser.json());
router.use(bodyparser.urlencoded({ extended: false }));

router.post('/rate' , async( req, res )=>{

    const jwt = decode(req.header("x-auth-token"));

    let cus = await Customer.findOne({ _id: jwt.id});

    let rate = new Rating({

        customer: jwt.id,
        customeremail: cus.email,
        reviewtitle: req.body.rtitle,
        review: req.body.rreview,
        like:0,
        star:req.body.rstar,
        serviceprovider:req.body.sid,
        serviceprovideremail:req.body.se

    });
    await rate.save();

    await OrderHistory.findByIdAndUpdate(
        req.body.id,
        {
          $set: {
             isRated:"yes"

          },
        },
        { new: true }
      );
      res.send(200);

});


router.get("/view:id", async (req, res) => {

    const task = await Rating.find({serviceprovider:req.params.id});
    if (!task) res.status(400);

    res.send(task);
  });


router.update;
module.exports = router;