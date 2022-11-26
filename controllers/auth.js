import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import User from '../models/User'

export const register = async (req, res) => {
  try {
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
  } catch (err) {}
}
