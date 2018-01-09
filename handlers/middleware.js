//Middleware to verify user is logged in
exports.isLoggedIn = (req, res, next)=>{
	if(req.isAuthenticated()){
		return next();
	}

	res.redirect('/login');
}

//Midleware to prevent user from accessing signup/login page
exports.alreadyLoggedIn = (req, res, next)=>{
	if(req.isAuthenticated()){
		res.redirect('/home');
		return;
	}
	return next();
}