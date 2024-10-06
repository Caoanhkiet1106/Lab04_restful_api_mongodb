const SachModel = require("../models/sach");

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
        if(!books){
            return res.status(404).json({message:"không tìm thấy"})
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