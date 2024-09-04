import jwt from 'jsonwebtoken'
import { promisify } from 'util'
import auth from '../db/auth.js'

const authToken = async(req, res, next) => {
  const authHeader = req.headers.token
  if (!authHeader) {
    return res.status(401).json({ error: 'Not authorized' })
  }
  const [, token] = authHeader.split(' ')
  if(!token) {
    return res.status(401).json({ error: 'Not autorized' })
  }
  try {
    const decoded = await promisify(jwt.verify)(token, auth.secret)
    req.userId = decoded.id
    return next()
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

export default authToken