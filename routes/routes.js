const express = require('express');
var router = express.Router();
var taskController = require('../controllers/taskController');
var asyncHandler = require('../handlers/asyncHandler');

router.get('/', taskController.showAddTask);

router.post('/add', asyncHandler(taskController.addTask));

module.exports = router;