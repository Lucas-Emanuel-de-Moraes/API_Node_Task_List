import yup from 'yup'
import { TaskModel } from '../db/postgres.js'

const taskController = {
  getTask: async(req, res) => {
    try {
      const task = await TaskModel.findAll({ where: { user_id: req.userId } })
      if(task.length === 0){
        return res.status(404).json({ error: 'No tasks found' })
      }
      return res.status(200).json(task)
    } catch (error) {
      console.log(error)
      return res.status(500).json({ error: 'Internal server error' })
    }
  },
  postTask: async(req, res) => {
    const schema = yup.object().shape({
      task: yup.string().required(),
      description: yup.string().required(),
    })
    if(await schema.isValid(req.body)){
      try {
        const task = await TaskModel.create({ ...req.body, check: false, user_id: req.userId })
        return res.status(200).json(task)
      } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Internal server error' })
      }
    } else {
      return res.status(400).json({ error: 'Invalid request parameters' })
    }
  },
  putTask: async(req, res) => {
    if(req.headers.id !== undefined) {
      try {
        const taskUnique = await TaskModel.findByPk(req.headers.id)
        if (taskUnique === null) {
          return res.status(404).json({ error: 'User not found' })
        }
        if (taskUnique.user_id !== req.userId) {
          return res.status(404).json({ error: 'Not autorized' })
        }
        const { task, description } = req.body
        const updateTask = await taskUnique.update({
          task: task !== undefined ? task: taskUnique.task,
          description: description !== undefined ? description: taskUnique.description 
        })
        return res.status(200).json(updateTask)
      } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Internal server error' })
      }
    } else {
      return res.status(400).json({ error: 'Invalid request parameters' })
    }
  },
  checkChangeTask: async(req, res) => {
    if(req.headers.id !== undefined) {
      try {
        const taskUnique = await TaskModel.findByPk(req.headers.id)
        if (taskUnique === null) {
          return res.status(404).json({ error: 'Task not found' })
        }
        if (taskUnique.user_id !== req.userId) {
          return res.status(404).json({ error: 'Not autorized' })
        }
        const updateTask = await taskUnique.update({ check: !taskUnique.check })
        return res.status(200).json(updateTask)
      } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Internal server error' })
      }
    } else {
      return res.status(400).json({ error: 'Invalid request parameters' })
    }
  },
  deleteTask: async(req,res) => {
    if(req.headers.id !== undefined) {
      try {
        const taskUnique = await TaskModel.findByPk(req.headers.id)
        if (taskUnique === null) {
          return res.status(404).json({ error: 'Task not found' })
        }
        if (taskUnique.user_id !== req.userId) {
          return res.status(404).json({ error: 'Not autorized' })
        }
        await TaskModel.destroy({ where: { id: req.headers.id }})
        return res.status(200).json({ message: 'Task deleted successful' })
      } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Internal server error' })
      }
    } else {
      return res.status(400).json({ error: 'Invalid request parameters' })
    }
  }
}

export default taskController