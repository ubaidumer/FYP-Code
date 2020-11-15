const mongoose = require("mongoose")

const config = {
	autoIndex: false,
	useNewUrlParser: true,
};
const uri = 'mongodb://localhost/XsSupport'
const connectDB = async () => {
	try {

		await mongoose.connect(uri, config)
			.then(() => {
				console.log('Now you are connected to MongoDB DataBase...')
			})
			.catch(err => console.error('Could not connect to MongoDB DataBase...', err));
	} catch (err) {
		console.error(err.message);
		process.exit(1);
	}
};

module.exports = connectDB;