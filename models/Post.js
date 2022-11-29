import { model, Schema } from 'mongoose'

const PostSchema = new Schema(
  {
    userId: {
      type: Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    firstName: {
      type: String,
      required: true,
      maxLength: 30,
    },
    lastName: {
      type: String,
      required: true,
      maxLength: 30,
    },
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    likes: {
      type: Map,
      of: Boolean,
    },
    comments: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
)

const Post = model('Post', PostSchema)

export default Post
