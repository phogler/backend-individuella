require("dotenv").config();
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

exports.generateToken = (user) => {
    return jwt.sign({ _id: user._id, username: user.username }, JWT_SECRET_KEY);
};

exports.verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        req.userData = await jwt.verify(token, JWT_SECRET_KEY);
        next();
    } catch {
        res.status(401).json({ message: "Invalid token" });
    }
};
