const express  = require("express");
const cors     = require("cors");
const dotenv   = require("dotenv");
dotenv.config();

const admin           = require("./routes/api/admin");
const serviceprovider = require("./routes/api/serviceprovider");
const customer        = require("./routes/api/customer");
const task            = require("./routes/api/postTask");
const payment         = require("./routes/api/payment");
const rating         = require("./routes/api/rating");
const connectDB       = require("./config/database");


const app = express();
app.use(cors());
app.use(express.json({limit: '50mb', extended: true}));
app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use("/api/admin", admin);
app.use("/api/serviceprovider", serviceprovider);
app.use("/api/customer", customer);
app.use("/api/postTask", task);
app.use("/api/payment",payment);
app.use("/api/rating",rating);
connectDB();
const port = process.env.PORT || 5555;
app.listen(port,()=> console.log(`Activating project on port ${port}...`));