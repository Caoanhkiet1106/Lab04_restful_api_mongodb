const express = require('express');
const router = express.Router();

const sachController = require('../controllers/SachController')

// 
router.get('/books',sachController.getAllbooks)
// 
router.post('/books',sachController.creatBook)
// 
router.get('/books/:id',sachController.getIdbooks)
// 
router.put('/books/:id',sachController.updatedBook)
// 
router.delete('/books/:id',sachController.deleteBook)

module.exports = router;
