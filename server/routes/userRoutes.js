const express = require('express');
const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} = require('../controllers/postController');
const { isAuthenticated } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

const router = express.Router();

router.post('/', isAuthenticated, upload.single('image'), createPost);
router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.put('/:id', isAuthenticated, upload.single('image'), updatePost);
router.delete('/:id', isAuthenticated, deletePost);

module.exports = router;
