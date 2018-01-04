const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
var userSchema = new mongoose.Schema({
	name: {
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

userSchema.methods.verifyPassword = function(password){
	return bcrypt.compareSync(password, this.password);
}

userSchema.methods.hashPassword = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(6), null);
}

var User = mongoose.model('User', userSchema);
module.exports = User;