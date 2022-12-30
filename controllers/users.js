import User from '../models/User.js'

// @desc    Get User
// @route   GET /users/:userId
// @access  Private
export const getUser = async (req, res) => {
  const { userId } = req.params

  try {
    const user = await User.findById(userId)

    res.status(200).json(user)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// @desc    Get User Friends
// @route   GET /users/:userId/friends
// @access  Private
export const getUserFriends = async (req, res) => {
  const { userId } = req.params

  try {
    const user = await User.findById(userId)

    const friends = await Promise.all(
      user.friends.map((itemId) => User.findById(itemId))
    )

    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => ({
        _id,
        firstName,
        lastName,
        occupation,
        location,
        picturePath,
      })
    )

    res.status(200).json(formattedFriends)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// @desc    Add or Remove Friends
// @route   PATCH /users/:userId/:friendId
// @access  Private
export const addRemoveFriend = async (req, res) => {
  const { userId, friendId } = req.params

  try {
    const user = await User.findById(userId)
    const friend = await User.findById(friendId)

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((itemId) => itemId !== friendId)
      friend.friends = friend.friends.filter((itemId) => itemId !== userId)
    } else {
      user.friends.push(friendId)
      friend.friends.push(userId)
    }

    await user.save()
    await friend.save()

    const friends = await Promise.all(
      user.friends.map((itemId) => User.findById(itemId))
    )

    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => ({
        _id,
        firstName,
        lastName,
        occupation,
        location,
        picturePath,
      })
    )

    res.status(200).json(formattedFriends)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
