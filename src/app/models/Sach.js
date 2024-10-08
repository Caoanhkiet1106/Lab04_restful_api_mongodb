const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SachSchema = new Schema({
    tensach: { type: String, maxLength: 255, },
    moTa: { type: String, maxLength: 255, },
    urlHinh: { type: String},
    anhien: { type: Boolean, }, // Ensure this is a boolean
    gia: { type: String, maxLength: 255, },
    idloai: { type: String, maxLength: 255, }
  }, {
      timestamps: true
  });

const SachModel = mongoose.model('books', SachSchema);

module.exports = SachModel;
