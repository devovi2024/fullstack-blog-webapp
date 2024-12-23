const mongoose = require('mongoose');
const User = require('./User');  
const Category = require('./Category');

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  tags: [String],
  image: String,
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
