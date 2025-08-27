const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { getZodiacSign } = require('../helpers/zodiacSign');

let authController = {
    signup: async (req, res) => {
        try{
            const { name, email, password, birthdate } = req.body;
            const zodiacSign = getZodiacSign(new Date(birthdate));

            const data = await User.findOne({email: email});
            if(data)    return res.status(401).json({code: "INVALID_REQUEST", error: "Email already present"});

            const user = new User({ name, email, password, birthdate, zodiacSign });
            await user.save();

            res.status(201).json({ message: 'User created', zodiac_sign: zodiacSign });
        }catch(err){
            res.status(401).json({code: "INVALID_REQUEST", error: "Invalid Request"});
        }
    },

    login: async (req, res) => {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ code: 'INVALID_CRED', error: 'Invalid credentials' });
        }

        const jwtToken = process.env.JWT_SECRET || "anclknlksncklnlkcnlknkcn";
        const token = jwt.sign({ userId: user._id }, jwtToken, {
            expiresIn: '1d',
        });

        res.json({ token });
    }
};

module.exports = authController;