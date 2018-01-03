const express = require('express');
var router = express.Router();
var taskController = require('../controllers/taskController');

router.get('/', taskController.showAddTask);

router.post('/add', taskController.addTask);

module.exports = router;