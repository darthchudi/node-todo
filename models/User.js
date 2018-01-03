const mongoose = require('mongoose');
var userSchema = new mongoose({
	student: {
		type: String,
		required: 'Please enter a name'
	},
	matric_no:{
		type: String,
		unique: true
	},
	password:{
		type: String,
		required: true
	}
});

var User = mongoose.model('User', userSchema);
module.exports = User;