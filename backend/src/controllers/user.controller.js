import { User } from "../models/user.model.js";

const registerUser = async (req, res) => {
    try {
        const { username, password, email } = req.body;
        if (!username || !password || !email) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        //check if user already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }

        // Create new user
        const newUser = await User.create({ username, password, email: email.toLowerCase(), loggedIn: false });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully', newUser: { _id: newUser._id, username: newUser.username, email: newUser.email.toLowerCase() } });

    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email: email.toLowerCase() })
        if (!user) return res.status(400).json({ message: "user nt found" })
        const isMatch = await user.comparePassword(password)
        if (!isMatch) return res.status(400).json({ message: "invalid credentials" })
        user.loggedIn = true
        await user.save()
        res.status(200).json({ message: "login successful", user: { _id: user._id, username: user.username, email: user.email.toLowerCase() } })
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

const logOutUser = async (req, res) => {
    try {
        const { email } = req.body
        const user = await User.findOne({ email: email.toLowerCase() })
        if (!user) return res.status(400).json({ message: "user not found" })
        user.loggedIn = false
        await user.save()
        res.status(200).json({ message: "logout successful", user: { _id: user._id, username: user.username, email: user.email.toLowerCase() } })
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

export { registerUser, loginUser ,logOutUser}