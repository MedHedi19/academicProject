const User = require("../models/userSchema");
const Crypt = require("crypto-js");
const jwt = require("jsonwebtoken");


async function Login(req, res) {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(401).json("Wrong credentials - User not found");
        }

        const hashedPassword = Crypt.AES.decrypt(
            user.password,
            process.env.PASS_SEC
        );

        const originalPassword = hashedPassword.toString(Crypt.enc.Utf8);

        if (originalPassword !== req.body.password) {
            return res.status(401).json("Wrong credentials - Incorrect password");
        }
        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin,
        }, process.env.JWT_KEY, { expiresIn: "3d" })
        const { password, ...others } = user._doc;
        res.status(200).json({ ...others, accessToken });
    } catch (err) {
        res.status(500).json(err);
    }
}
async function getAllUsers(req, res) {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
}
async function addUser(req, res) {
    try {
        const { username, email, phoneNumber, password, isAdmin } = req.body;

        if (!username || !email || !phoneNumber || !password) {
            return res.status(400).json("All fields are required");
        }

        const existingUser = await User.findOne({
            $or: [{ username }, { email }, { phoneNumber }]
        });

        if (existingUser) {
            return res.status(400).json("those info are already in use.");
        }

        const hashedPassword = Crypt.AES.encrypt(password, process.env.PASS_SEC).toString();

        const newUser = new User({
            username,
            email,
            phoneNumber,
            password: hashedPassword,
            isAdmin: isAdmin || false,
        });

        // Save the new user
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);

    } catch (err) {
        res.status(500).json(err);
    }
}
async function deleteUser(req, res) {
    try {
        const { userId } = req.params;

        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json("User not found");
        }

        res.status(200).json("User has been deleted");
    } catch (err) {
        res.status(500).json(err);
    }
}
async function updateUserRole(req, res) {
    try {
        const userId = req.params.id;
        const { isAdmin } = req.body;


        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: { isAdmin } },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}


module.exports = {
    Login,
    getAllUsers,
    addUser,
    deleteUser,
    updateUserRole
};
