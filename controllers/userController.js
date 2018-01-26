exports.showSignup = (req, res)=>{
	console.log(req.flash);
	res.render('signup', {
		error: req.flash('error'),
		success: req.flash('success')
	});
}