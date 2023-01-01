import User from '../models/User.js'
import Post from '../models/Post.js'

// @desc    Create Post
// @route   POST /posts
// @access  Private
export const createPost = async (req, res) => {
  const { userId, description, picturePath } = req.body

  try {
    const user = await User.findById(userId)

    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    })

    await newPost.save()

    const posts = await Post.find()
    res.status(201).json(posts)
  } catch (err) {
    res.status(409).json({ message: err.message })
  }
}

// @desc    Get All Posts
// @route   GET /posts
// @access  Private
export const getFeedPosts = async (req, res) => {
  try {
    const posts = await Post.find()
    res.status(200).json(posts)
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}

// @desc    Get User Posts
// @route   GET /:userId/posts
// @access  Private
export const getUserPosts = async (req, res) => {
  const { userId } = req.params

  try {
    const posts = await Post.find({ userId })
    res.status(200).json(posts)
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}

// @desc    Add or Remove Like
// @route   PATCH /:postId/like
// @access  Private
export const likePost = async (req, res) => {
  const { postId } = req.params
  console.log(postId)

  const { userId } = req.body
  console.log(userId)

  try {
    const post = await Post.findById(postId)
    // likes - Map data type
    const isLiked = post.likes.get(userId)

    if (isLiked) {
      post.likes.delete(userId)
    } else {
      post.likes.set(userId, true)
    }

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { likes: post.likes },
      { new: true }
    )

    res.status(200).json(updatedPost)
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}
