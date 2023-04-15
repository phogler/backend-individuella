const User = require("../schemas/userSchema");
const bcrypt = require("bcryptjs");
const auth = require("../authentication/auth");

exports.getAllUsers = async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
};

exports.createNewUser = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            message: "Username and Password cannot be empty, please fill in the fields",
        });
    }

    const userExist = await User.findOne({ username });
    if (userExist) {
        return res
            .status(400)
            .json({ message: "User exist, please login or choose different username" });
    }

    const bcryptSalt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, bcryptSalt);

    try {
        const user = await User.create({
            username,
            password: hashedPassword,
        });
        res.status(200).json({ message: "User created successfully", token: auth.generateToken(user) });
    } catch (error) {
        return res.status(400).json({ message: "Server error: Unable to create user" });
    }
};

exports.loginExistingUser = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "You need to fill in all the fields" });
    }

    const existingUser = await User.findOne({ username });

    if (!existingUser) {
        return res.status(400).json({ message: "Wrong username or password" });
    }

    const passwordMatches = await bcrypt.compare(password, existingUser.password);

    if (!passwordMatches) {
        return res.status(400).json({ message: "Wrong username or password" });
    }

    res.status(200).json({ sucessful: true, token: auth.generateToken(existingUser) });
};
