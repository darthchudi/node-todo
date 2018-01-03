var express = require('express');
var Task = require('../models/Task');

exports.showAddTask = (req, res)=>{
	res.render('addTask');
}

exports.addTask = async (req, res, next)=>{
	try{
		var task = await new Task({
			task: req.body.task
		}).save();
	}
	catch(e){
		next(e);
	}
	
	res.send(`Created task: ${task.task}`);
}