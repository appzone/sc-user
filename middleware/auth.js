const jwt = require("jsonwebtoken");
module.exports = function(req, res, next) {
	const auth = req.header("Authorization");
	if(!auth) return res.status(401).json({ status: "failed", message: "Auth Error" });
	const token = auth.split('Bearer ')[1]
  	if (!token) return res.status(401).json({ status: "failed", message: "Auth Error" });
  	try {
		const decoded = jwt.verify(token, "secret");
    	req.user = decoded.user;
    	next();
  	} catch (e) {
    	console.error(e);
    	res.status(401).send({
			status: "failed", 
			message: "Invalid Token" 
		});
  	}
};