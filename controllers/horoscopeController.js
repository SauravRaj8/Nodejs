const {content} = require('../constants/horoscopeConstant');
const User = require('../models/user');
const Horoscope = require('../models/horoscope');

let horoscopeController = {
    getTodayHoroscope: async (req, res) => {
        try{
            const user = await User.findById(req.userId);
            const sign = user.zodiacSign;
            const today = new Date().toDateString();
        
            const data = content[sign] || "Have a balanced day.";
        
            await Horoscope.create({ userId: req.userId, date: today, content: data });
        
            res.json({ date: today, sign, content: data });
        }catch(err){
            res.status(401).json({code: "INVALID_DATA", error: "Invalid data"});
        }
    },

    getHistory: async (req, res) => {
        try{
            const history = await Horoscope.find({ userId: req.userId })
            .sort({ date: -1 })
            .limit(7);
            
            let response = history?.map(his => {
                return {user_id: his.userId,
                    date: his.date,
                    content: his.content
                }
            })
            res.json({ history: response });
        }catch(err){
            res.status(401).json({code: "INVALID_DATA", error: "Invalid data"});
        }
    }
};

module.exports = horoscopeController;