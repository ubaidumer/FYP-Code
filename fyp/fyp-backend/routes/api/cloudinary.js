
const cloudinary = require('cloudinary').v2;

cloudinary.config({

    cloud_name:"xssupport",
    api_key:"891153761523149",
    api_secret:"uMJk6IQMx4h3FcasnqCGTIWRPaI",
});

module.exports=cloudinary;