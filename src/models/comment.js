const mongoose = require('mongoose');
const { Schema } = mongoose;
const ObjectId = Schema.ObjectId;

const CommentSchema = new Schema({
  name: String,
  email: String,
  gravatar: String,
  comment: String,
  imageId:{ type: ObjectId }
}, { timestamps: true });

module.exports = mongoose.model('comments', CommentSchema);
