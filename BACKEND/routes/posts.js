// Desc: API routes for boards
const router = require('express').Router();
const auth = require('../middleware/auth');
const { Board, validateBoard } = require('../models/board');
const { body, param, validationResult } = require('express-validator');

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

//get all boards
router.get('/', auth, async(req,res)=>{
    const boards = await Board.find();
    res.send(boards);
});

//-------------------------------------------------------------
//create new board
router.post('/',
    auth,
    [
        body('title').trim().escape(),
        body('description').trim().escape(),
        body('departmentCode').trim().escape()
    ],
    handleValidationErrors, // Added to handle any potential errors from express-validator
    async(req,res)=>{
        // Joi validation runs on (potentially) sanitized req.body
        const {error} = validateBoard(req.body);
        if (error) {
            // Joi returns error.details (plural) not error.detail
            return res.status(400).json({ error: error.details[0].message });
        }

        const board = new Board(req.body);
        await board.save();
        res.send(board);
    }
);

//-------------------------------------------------------------
//get a single board
router.get('/:id',
    auth,
    [
        param('id').isMongoId().withMessage('Invalid board ID format.')
    ],
    handleValidationErrors, // Use the error handler for param validation
    async(req,res)=>{
        const board = await Board.findById(req.params.id);
        if(board) return res.send(board);
        res.status(404).send('The board with the given ID was not found');
    }
);

//-------------------------------------------------------------
//delete a single board
router.delete('/:id',
    auth,
    [
        param('id').isMongoId().withMessage('Invalid board ID format.')
    ],
    handleValidationErrors, // Use the error handler for param validation
    async(req,res)=>{
        const result = await Board.deleteOne({_id:req.params.id});
        // Check if any document was actually deleted
        if (result.deletedCount === 0) {
            return res.status(404).send('The board with the given ID was not found or already deleted.');
        }
        res.send(result);
    }
);

module.exports = router;// Export API routes

//----------------...ooo000 End of file 000ooo...------------------------