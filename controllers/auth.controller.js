const bcrypt = require('bcrypt');
const saltRounds = 10;
require('dotenv').config();

const db = require("../db.js");

module.exports.login = (req, res) => {
  res.render("auth/login");
};

module.exports.postLogin = (req, res) => {
	var email = req.body.email;
	var password = req.body.password;

	var user = db.get('users').find({email: email}).value();

	if(!user) {
		res.render('auth/login', {
			errors: [
				'User does not exist.'
			],
			values: req.body
		});
		return;
	}

	bcrypt.compare(password, user.password, function(err, result) {
		if(!result){
			if(process.env.TEMP_WRONG_LOGIN < 3){
				process.env.TEMP_WRONG_LOGIN++;
				res.render('auth/login', {
				errors: [
					'Wrong password.'
				],
				values: req.body
				});
				return;
			}
			else {
				process.env.TEMP_WRONG_LOGIN = 0;
				res.render('auth/login', {
				errors: [
					'You have entered too many wrong password, please check your email to change the password.'
				],
				});
				return;
			}
		}
		else {
			res.cookie('userId', user.id, {
				signed: true
			});
			res.redirect('/');
		}
	})

}