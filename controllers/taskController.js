var express = require('express');
var Task = require('../models/Task');

exports.showAddTask = (req, res)=>{
	res.render('addTask');
}

exports.addTask = async (req, res)=>{
	var task = await new Task({
		task: req.body.task
	}).save();
	
	
	res.send(`Created task: ${task.task}`);
}