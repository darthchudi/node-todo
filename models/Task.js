const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
	task: {
		type: String,
		required: 'Please enter a task'
	},
	created: {
		type: Date,
		default: Date.now
	}
});

var Task = mongoose.model('Task', taskSchema);
module.exports = Task;
