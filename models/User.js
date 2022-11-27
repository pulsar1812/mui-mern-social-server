import { model, Schema } from 'mongoose'
import bcrypt from 'bcrypt'

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
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
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    picturePath: {
      type: String,
      default: '',
    },
    friends: {
      type: Array,
      default: [],
    },
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number,
  },
  { timestamps: true }
)

// Encrypt password using bcrypt
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

// Match user entered password to hashed password in database
UserSchema.methods.comparePasswords = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

const User = model('User', UserSchema)

export default User
