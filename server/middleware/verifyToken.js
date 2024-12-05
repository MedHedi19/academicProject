const jwt = require("jsonwebtoken");


const checkAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json("Token missing");
        }

        jwt.verify(token, process.env.JWT_KEY, (err, user) => {
            if (err) {
                return res.status(403).json("Token is invalid");
            }
            req.user = user;
            next();
        });
    } else {
        return res.status(401).json("You are not authenticated!");
    }
};


const checkAdmin = (req, res, next) => {
    checkAuth(req, res, () => {  // Use checkAuth here
        if (req.user.isAdmin) {
            next();
        } else {
            res.status(403).json("You are not allowed to do that!");
        }
    });
};


module.exports = {
    checkAuth,
    checkAdmin
}