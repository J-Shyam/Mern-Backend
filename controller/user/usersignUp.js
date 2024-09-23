
const bcrypt = require('bcryptjs');
const userModel = require('../../models/userModel');

async function userSignUpController(req, res) {
    try {
        const { email, password, name } = req.body

        const user = await userModel.findOne({ email })

        if (user) {
            throw new Error("Already user exists.");
        }

        if (!email) {
            return res.status(400).json({
                message: "Please provide an email",
                error: true,
                success: false,
            });
        }
        if (!password) {
            return res.status(400).json({
                message: "Please provide a Password",
                error: true,
                success: false,
            });
        }
        if (!name) {
            return res.status(400).json({
                message: "Please enter full name",
                error: true,
                success: false,
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        if (!hashPassword) {
            throw new Error("Something is wrong")
        }

        const payload = {
            ...req.body,
            role : "USER",
            password: hashPassword
        };

        const userData = new userModel(payload);
        const saveUser = await userData.save();

        res.status(201).json({
            data: saveUser,
            success: true,
            error: false,
            message: "User Id created successfully!"
        });

    }catch(err){
        res.status(500).json({
            message: err.message || "Internal Err",
            error: true,
            success: false,
        });
    }
}

module.exports = userSignUpController;