var taskController = require('../controllers/taskController');
var userController = require('../controllers/userController');
var asyncHandler = require('../handlers/asyncHandler');
var middleware = require('../handlers/middleware.js');

module.exports = (router, passport)=>{
	/* Routes for Handling User login and registeration */

	router.get('/signup', middleware.alreadyLoggedIn, userController.showSignup);

	router.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/home',
		failureRedirect: '/test',
		failureFlash: true,
	}));

	router.get('/login', middleware.alreadyLoggedIn, (req, res)=>{
		res.render('login', {
			error: req.flash('error')
		});
	})

	router.post('/login', passport.authenticate('local-login', {
		successRedirect: '/home',
		failureRedirect: '/login',
		failureFlash: true
	}))

	router.get('/logout', (req, res)=>{
		req.logout();
		res.redirect('/login');
	});

	router.get('/test', (req, res)=>{
		console.log(req.flash('error')[0]);
		res.send(req.isAuthenticated());
	});

	/* Routes for handling tasks */


	router.get('/home', middleware.isLoggedIn, taskController.homeView);

	router.post('/add', middleware.isLoggedIn, asyncHandler(taskController.addTask));

	router.post('/delete', asyncHandler(taskController.deleteTask));

	router.post('/complete', asyncHandler(taskController.completeTask));

	router.get('/tasks/all', asyncHandler(taskController.getAll));

	router.get('/tasks/completed', asyncHandler(taskController.getCompleted));

	router.get('/tasks/uncompleted', asyncHandler(taskController.getUncompleted));


	

	
}

