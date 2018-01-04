exports.showSignup = (req, res)=>{
	res.render('signup', {
		error: req.flash('error')
	});
}