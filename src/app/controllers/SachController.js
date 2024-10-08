const SachModel = require("../models/sach");
const multer = require('multer');
const fs = require('fs');
exports.getAllbooks = async (req, res) => {
    try {
        const books = await SachModel.find()
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: 'lỗi trích xuất', error: error.message })
    }
};
exports.getIdbooks = async (req, res) => {
    try {
        const books = await SachModel.findById(req.params.id)
        if (!books) {
            return res.status(404).json({ message: "không tìm thấy" })
        }
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: 'lỗi trích xuất', error: error.message })
    }
};
exports.creatBook = async (req, res) => {
    try {

        const newBook = new SachModel(req.body);
        const savedBook = await newBook.save();
        res.status(201).json({
            message: 'Nhập thành công',
            book: savedBook
        });
    } catch (error) {

        res.status(500).json({ message: 'Lỗi tạo sách', error: error.message });
    }
};
exports.updatedBook = async (req, res) => {
    const id = req.params.id
    const updateData = req.body
    try {
        const updatedBook = await SachModel.findByIdAndUpdate(id, updateData, { new: true }).lean();

        if (!updatedBook) {
            return res.status(404).json({ message: 'Không tìm thấy sách' });
        }
        res.status(201).json({
            message: 'Update thành công',
            book: updatedBook
        });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi update sách', error: error.message });
    }
};

exports.deleteBook = async (req, res) => {
    const id = req.params.id
    try {
        const deletebook = await SachModel.findByIdAndDelete(id)
        if (!deletebook) {
            return res.status(404).json({ message: 'Không tìm thấy sách' });
        }
        res.status(201).json({
            message: 'Delete thành công',
        });
    } catch (error) {
        res.status(500).json({ message: 'lỗi xóa', error: error.message })
    }
};

exports.upload_images = async (req, res) => {
    try {
        const { tensach, moTa, anhien, gia, idloai } = req.body;
        const urlHinh = req.file ? req.file.path : null;
        const newBook = new SachModel({
            tensach,
            moTa,
            urlHinh,
            anhien,
            gia,
            idloai
        });
        await newBook.save()
        res.status(201).json({ message: 'Book uploaded successfully', newBook });
    } catch (error) {
        res.status(500).json({ message: 'Failed to upload book', error: error.message })
    }
};

exports.delete_image = async (req, res) => {
    const { id } = req.params; // ID của sách mà bạn muốn xóa ảnh

    try {
        // Tìm sách theo ID
        const book = await SachModel.findById(id);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        const imagePath = book.urlHinh; // Lấy đường dẫn ảnh

        // Xóa ảnh khỏi hệ thống tệp
        fs.unlink(imagePath, async (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to delete image from file system' });
            }

            // Xóa tài liệu khỏi cơ sở dữ liệu
            try {
                await SachModel.deleteOne({ _id: id }); // Xóa tài liệu có ID tương ứng
                res.status(200).json({ message: 'Image and book deleted successfully' });
            } catch (deleteError) {
                console.error(deleteError);
                res.status(500).json({ error: 'Failed to delete book from database' });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete image' });
    }
};
