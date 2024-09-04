import { Model, Sequelize } from "sequelize"
import { createUserModel } from "../model/UserSchema.js"
import { createTaskModel } from "../model/TaskSchema.js"

const db = new Sequelize('projeto_02', 'postgres', '7247', {
  host: 'localhost',
  dialect: 'postgres'
})

let UserModel = Model
let TaskModel = Model

const conect = async () => {
  try {
    await db.authenticate()

    UserModel = await createUserModel()
    TaskModel = await createTaskModel()

    await db.sync()
    console.log('Database Synced')
  } catch(error) {
    console.log(error)
  }
}

export {
  db,
  conect,
  UserModel,
  TaskModel
}
