import jwt from 'jsonwebtoken'

import User from '../models/User.js'

// @desc    Register user
// @route   POST /auth/register
// @access  Public
export const register = async (req, res) => {
  const {
    email,
    firstName,
    lastName,
    password,
    picturePath,
    friends,
    location,
    occupation,
  } = req.body

  try {
    const newUser = new User({
      email,
      firstName,
      lastName,
      password,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    })

    const savedUser = await newUser.save()
    res.status(201).json(savedUser)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// @desc    Login user
// @route   POST /auth/login
// @access  Public
export const login = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email }).select('+password')

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    const isMatch = await user.comparePasswords(password)

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
    delete user.password
    res.status(200).json({ token, user })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
