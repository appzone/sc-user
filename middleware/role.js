const { urlencoded } = require("body-parser");

module.exports = function(req, res, next) {
	const user = req.user
  	try {
		if (user.role === 'admin') {
			next()
		}
		else {
			throw new Error("error")
		}
  	} catch (e) {
    	console.error(e);
    	res.status(403).send({
			status: "failed", 
			message: "Unauthorized" 
		});
  	}
};