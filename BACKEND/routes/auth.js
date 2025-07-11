// Desc: Authentication routes
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const { isValidPassword } = require('../utils/hash');
const rateLimit = require("express-rate-limit");
const { body, validationResult } = require('express-validator');

// Set up rate limiter: maximum of 100 requests per hour
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 100 // limit each IP to 100 requests per windowMs
});

//-------------------------------------------------------
// Authenticate user with rate limiting
router.post('/',
    limiter,
    [
        body('username')
            .trim()
            .notEmpty().withMessage('Username is required.')
            .isLength({ min: 3, max: 50 }).withMessage('Username must be between 3 and 50 characters.')
            .escape(),
        body('password')
            .notEmpty().withMessage('Password is required.')
            .isLength({ min: 8, max: 50 }).withMessage('Password must be between 8 and 50 characters.')
            // Note: Do not escape passwords, they need to be checked as is and then hashed.
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            // req.body.username is now the sanitized and validated username
            const user = await User.findOne({ username: req.body.username }); // Using sanitized username

            if (!user)
                return res.status(401).json({ error: 'Invalid username or password' });

            const isValid = await isValidPassword(req.body.password, user.password);

            if (!isValid)
                return res.status(401).json({ error: 'Invalid username or password' });

            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);
            res.send({ token });

        } catch (error) {
            console.error(error); // Log the error for debugging
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });


// Export router
module.exports = router;
//----------------...ooo000 End of file 000ooo...------------------------