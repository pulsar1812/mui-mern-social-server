import jwt from 'jsonwebtoken'

export const verifyToken = async (req, res, next) => {
  let token = req.headers.authorization

  if (!token) {
    return res.status(401).send('Access Denied')
  }

  try {
    if (token.startsWith('Bearer')) {
      token = token.split(' ')[1]
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET)
    req.user = verified

    next()
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
