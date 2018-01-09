var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/User');

module.exports = function(passport){
	//Serialize the user
	passport.serializeUser(function(user, done){
		done(null, user.id);
	});	

	//Deserialize the User
	passport.deserializeUser(function(id, done){
		User.findById(id, function(err, user){
			done(err, user);
		});
	});

	//Set up Sign up strategy
	passport.use('local-signup', new LocalStrategy(
		{
			usernameField: 'matric_no',
			passwordField: 'password',
			passReqToCallback: true
		},
		function(req, matric_no, password, done){
			//Async function
			process.nextTick(function(){
				User.findOne({'matric_no': matric_no}, function(err, user){
					if(err){
						return done(err);
					}

					if(user){
						return done(null, false, req.flash('error', 'Matric Number exists already'));
					}

					if(!user){
						var newUser = new User();
						newUser.name = req.body.name;
						newUser.matric_no = matric_no;
						newUser.password = newUser.hashPassword(password);
						newUser.save(function(e){
							if(e){
								return done(e);
							}
							return done(null, newUser, req.flash('success', 'Signed Up!'));
						});
					}

				});
			});
		}
	));


	//Set up login strategy
	passport.use('local-login', new LocalStrategy({
		usernameField: 'matric_no',
		passwordField: 'password',
		passReqToCallback: true
	},
	function(req, matric_no, password, done){
		process.nextTick(function(){
			User.findOne({'matric_no': matric_no}, (err, user)=>{
				if(err){
					return done(err);
				}

				if(!user){
					return done(null, false, req.flash('error', 'Account does not exist!'));
				}

				if(!user.verifyPassword(password)){
					return done(null, false, req.flash('error', 'Password do not match'));
				}

				return done(null, user);
			})
		});
	}

	));
}