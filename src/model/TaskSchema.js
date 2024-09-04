import { DataTypes } from "sequelize"
import { db } from "../db/postgres.js"

export const createTaskModel = async() => {
  const Task = db.define('Task', {
    task: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    check: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      reference: { model: 'Users', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: false
    }
  })
  return Task
}