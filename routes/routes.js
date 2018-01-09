var taskController = require('../controllers/taskController');
var userController = require('../controllers/userController');
var asyncHandler = require('../handlers/asyncHandler');
var middleware = require('../handlers/middleware.js');

module.exports = (router, passport)=>{
	router.get('/signup', middleware.alreadyLoggedIn, userController.showSignup);

	router.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/home',
		failureRedirect: '/signup',
		failureFlash: true,
		successFlash: true
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
		res.redirect('/');
	});

	router.get('/test', (req, res)=>{
		console.log(req.session);
		res.send(req.isAuthenticated());
	});

	router.get('/home', middleware.isLoggedIn, taskController.showTasks);

	router.post('/add', middleware.isLoggedIn, asyncHandler(taskController.addTask));
}

