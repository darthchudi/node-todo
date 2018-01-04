var taskController = require('../controllers/taskController');
var userController = require('../controllers/userController');
var asyncHandler = require('../handlers/asyncHandler');

module.exports = (router, passport)=>{
	router.get('/', taskController.showAddTask);

	router.get('/home', isLoggedIn, function(req, res){
		res.send(req.user);
	});

	router.get('/signup', userController.showSignup);

	router.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/home',
		failureRedirect: '/signup',
		failureFlash: true
	}));

	router.post('/add', asyncHandler(taskController.addTask));

	router.get('/test', (req, res)=>{
		console.log(req.session);
		res.send(req.isAuthenticated());
	});

	router.get('/login', (req, res)=>{
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
}

//Middleware to verify user is logged in
function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}

	res.redirect('/');
}