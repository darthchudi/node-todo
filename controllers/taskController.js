var express = require('express');
var Task = require('../models/Task');
var User = require('../models/User');


exports.addTask = async (req, res)=>{
	var task = await new Task({
		task: req.body.task,
		user: req.user._id
	}).save();
	req.flash('Added', `Successfully added Task: ${task.task}`);
	res.redirect('/home');
}

exports.showTasks = (req, res)=>{
	Task.find({'user': req.user._id}).populate('user', 'name').exec(function(err, tasks){
		res.render('home', {'tasks':tasks});
	});
}