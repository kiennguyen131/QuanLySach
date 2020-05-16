var db = require("../db.js");

module.exports.requireAuth = (req, res, next) => {
	if (!req.signedCookies.userId) {
		res.redirect('auth/login');
		return;
	}

	var user = db.get('users').find( {id: req.signedCookies.userId}).value();

	if (!user) {
		res.redirect('auth/login');
		return;
	}
	res.locals.user = user;
	next();
};

module.exports.isAdmin = (req, res, next) => {
	var user = db.get('users').find( {id: req.signedCookies.userId}).value();
	if (user.isAdmin === true){
		next();
	}

	else {
	 	res.redirect('/');
		return;
	}
}