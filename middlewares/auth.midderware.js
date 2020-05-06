var db = require("../db.js");

module.exports.requireAuth = (req, res, next) => {
	if (!req.cookies.userId) {
		res.redirect('auth/login');
		return;
	}

	var user = db.get('users').find( {id: req.cookies.userId}).value();

	if (!user) {
		res.redirect('auth/login');
		return;
	}
	next();
};

module.exports.isAdmin = (req, res, next) => {
	var user = db.get('users').find( {id: req.cookies.userId}).value();
	if (user.isAdmin === true){
		next();
	}

//xử lý chỉ cho truy cập vào transaction

	else {
	 	res.redirect('/');
		return;
	}
	next();
}