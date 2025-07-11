// Desc: User routes
const router = require('express').Router();
const {User, validateUser} = require('../models/user');
const {hashPassword} = require('../utils/hash');
const auth = require('../middleware/auth');
const rateLimit = require("express-rate-limit");
const { body } = require('express-validator'); // validationResult removed, body kept for sanitizers

//-------------------------------------------------------------
// Create a rate limiter object
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // limit each IP to 5 requests per windowMs
  message: "Too many requests from this IP, please try again later"
});

//-------------------------------------------------------------
router.post('/', limiter, async (req, res) => {
    const { error } = validateUser(req.body);

    if (error) {
        return res.status(400).json(error.detail[0].message);
    }

    try {
        // Sanitize and escape the user-provided input
        const sanitizedUsername = req.body.username.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

        // Check if the username is already taken using Mongoose unique index
        const existingUser = await User.findOne({ username: new RegExp('^' + sanitizedUsername + '$', 'i') });

        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists.' });
        }

        // If the username is unique, create a new user
        const user = new User(req.body);
        user.password = await hashPassword(user.password);
        await user.save();

        res.sendStatus(201);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



//-------------------------------------------------------------
//get current user with rate limiting
router.get('/', limiter, auth, async(req,res)=>{
res.send({currentUser: req.user});
});

module.exports = router; // Export API routes

//----------------...ooo000 End of file 000ooo...------------------------