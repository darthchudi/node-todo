const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');
const taskSchema = new Schema({
	task: {
		type: String,
		required: 'Please enter a task'
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	created: {
		type: Date,
		default: Date.now
	}
});

var Task = mongoose.model('Task', taskSchema);
module.exports = Task;
