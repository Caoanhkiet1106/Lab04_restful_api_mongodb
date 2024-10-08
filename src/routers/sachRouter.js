const express = require('express');
const router = express.Router();
const multer = require('multer');
const sachController = require('../app/controllers/SachController')
const path = require('path');
// 
router.get('/', sachController.getAllbooks)
// 
router.post('/books', sachController.creatBook)
// 
router.get('/books/:id', sachController.getIdbooks)
// 
router.put('/books/:id', sachController.updatedBook)
// 
router.delete('/books/:id', sachController.deleteBook)


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/public/images'); // Set the destination for uploaded files
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Tên file độc nhất
    }
});

const upload = multer({ storage: storage });

router.post('/upload-book',upload.single('image'),sachController.upload_images)
router.delete('/delete-image/:id', sachController.delete_image)
module.exports = router;
