import { DataTypes } from "sequelize"
import bcrypt from 'bcryptjs'
import { db } from "../db/postgres.js"

export const createUserModel = async() => {
  const User = db.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.VIRTUAL,
      allowNull: false
    },
    password_hash: {
      type: DataTypes.STRING
    }
  })

  User.addHook('beforeSave', async (user) => {
    console.log('tentando alimentar password_hash')
    if(user.password) {
      console.log('alimentando password_hash')
      user.password_hash = await bcrypt.hash(user.password, 8)
    }
  })

  User.prototype.checkPassword = function(password) {
    return bcrypt.compare(password, this.password_hash)
  }

  return User
}