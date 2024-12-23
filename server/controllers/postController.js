const Post = require('../models/Post');
const Category = require('../models/Category');

const getCategory = async (categoryName) => {
  let categoryDoc = await Category.findOne({ name: categoryName });
  if (!categoryDoc) {
    categoryDoc = await Category.create({ name: categoryName });
  }
  return categoryDoc;
};

exports.createPost = async (req, res) => {
  const { title, content, category, tags } = req.body;
  const userId = req.user.id;

  try {
    const categoryDoc = await getCategory(category);
    const newPost = await Post.create({
      title,
      content,
      author: userId,
      category: categoryDoc._id,
      tags,
      image: req.file ? req.file.path.replace(/\\/g, '/') : null,
    });

    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'name email')
      .populate('category', 'name');

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'name email')
      .populate('category', 'name');

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updatePost = async (req, res) => {
  const { title, content, category, tags } = req.body;

  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const categoryDoc = await getCategory(category);

    post.title = title || post.title;
    post.content = content || post.content;
    post.category = categoryDoc._id;
    post.tags = tags || post.tags;
    post.image = req.file ? req.file.path.replace(/\\/g, '/') : post.image;

    const updatedPost = await post.save();
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await Post.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
