import jwt from 'jsonwebtoken'
import yup from 'yup'
import { UserModel } from "../db/postgres.js"
import auth from '../db/auth.js'

const loginController = {
  loginToken: async(req, res) => {
    const schema = yup.object().shape({
      email: yup.string().required(),
      password: yup.string().required()
    })
    if(await schema.isValid(req.body)) {
      try {
        const { email, password } = req.body
        const user = await UserModel.findOne({ where: { email: email }})
        if(user !== null) {
          if(await user.checkPassword(password)) {
            const { id } = user
            return res.status(200).json({ token: `Bearer ${jwt.sign({ id }, auth.secret, { expiresIn: auth.expiresIn })}`})
          } else {
            return res.status(401).json({ error: 'Password incorrect' })
          }
        } else {
          return res.status(404).json({ error: 'User not found' })
        }
      } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Internal server error' })
      }
    } else {
      return res.status(400).json({ error: 'Invalid request parameters' })
    }
  }
}

export default loginController