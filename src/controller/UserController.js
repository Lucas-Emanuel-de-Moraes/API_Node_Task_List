import yup from 'yup'
import { UserModel } from "../db/postgres.js"
import { isValidEmail } from "../utils/validators.js"

const userController = {
  getUser: async(req, res) => {
    try {
      const users = await UserModel.findAll()
      if (users.length === 0) {
        return res.status(404).json({ error: 'No users found' })
      }
      return res.status(200).json(users.map(user => ({
          id: user.id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        })
      ))
    } catch (error) {
      console.log(error)
      return res.status(500).json({ error: 'Internal server error' })
    }
  },
  postUser: async(req, res) => {
    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().required(),
      password: yup.string().required()
    })
    if(await schema.isValid(req.body)){
      try {
        const { email } = req.body
        const checkEmail = await UserModel.findOne({ where: { email: email }})
        if(checkEmail === null) {
          const { id, name, email, createdAt, updatedAt } = await UserModel.create(req.body)
          return res.status(200).json({
            id,
            name,
            email,
            createdAt,
            updatedAt
          })
        } else {
          return res.status(400).json({ error: 'Email already registered' })
        }
      } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Internal server error' })
      }
    } else {
      return res.status(400).json({ error: 'Invalid request parameters' })
    }
  },
  updateUser: async(req, res) => {
    if(req.headers.id !== undefined){
      try {
        const user = await UserModel.findByPk(req.headers.id)
        if(user === null) {
          return res.status(404).json({ error: 'User not found' })
        }
        const { email } = req.body
        if(email !== undefined) {
          if(isValidEmail(email)) {
            const checkEmail = await UserModel.findOne({ where: { email: email }})
            if(checkEmail) {
              return res.status(400).json({ error: 'Email already registered' })
            } else {
              const userUpdated = await user.update(req.body)
              return res.status(200).json({
                id: userUpdated.id,
                name: userUpdated.name,
                email: userUpdated.email,
                createdAt: userUpdated.createdAt,
                updatedAt: userUpdated.updatedAt
              })
            }
          } else {
            return res.status(400).json({ error: 'Invalid email' })
          }
        } else {
          const userUpdated = await user.update(req.body)
          return res.status(200).json({
            id: userUpdated.id,
            name: userUpdated.name,
            email: userUpdated.email,
            createdAt: userUpdated.createdAt,
            updatedAt: userUpdated.updatedAt
          })
        }
      } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Internal server error' })
      }
    } else {
      return res.status(400).json({ error: 'Invalid request parameters' })
    }
  },
  deleteUser: async(req, res) => {
    const { id } = req.headers
    if(id !== undefined) {
      try {
        const user = await UserModel.findByPk(id)
        if(user !== null) {
          await UserModel.destroy({ where: { id: id }})
          return res.status(200).json({ message: 'User deleted successful' })
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

export default userController