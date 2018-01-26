var express = require('express');
var Task = require('../models/Task');
var User = require('../models/User');


exports.homeView = (req, res)=>{
	Task.find({user: req.user._id}, function(err, tasks){
		res.render('home');
	});
}

exports.addTask = async (req, res)=>{
	var task = await new Task({
		task: req.body.task,
		user: req.user._id
	}).save();

	Task.find({user: req.user._id}, function (err, tasks){
		if(err){
			res.send(err);
		}

		if(tasks){
			res.send(tasks);
		}
	});
	
}


exports.deleteTask = async (req, res)=>{
	await Task.remove({_id: req.body.id});
	Task.find({user: req.user._id}, function (err, tasks){
		if(err){
			res.send(err);
		}

		if(tasks){
			res.send(tasks);
		}
	});
}

exports.completeTask = async(req, res)=>{
	await Task.findByIdAndUpdate(req.body.id, {status: 'Completed'})
	Task.find({user: req.user._id}, function(err, tasks){
		if(err){
			res.send(err)
		}

		res.send(tasks);
	})
}

exports.getAll = async(req, res)=>{
	var tasks = await Task.find({user: req.user._id});
	res.send(tasks);
}

exports.getCompleted = async (req,res)=>{
	var completedTasks = await Task.find({user: req.user._id}).find({status: 'Completed'});
	res.send(completedTasks);
}

exports.getUncompleted = async (req,res)=>{
	var uncompletedTasks = await Task.find({user: req.user._id, status: 'Uncompleted'});
	res.send(uncompletedTasks);
}

