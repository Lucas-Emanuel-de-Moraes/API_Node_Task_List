import { Router } from 'express'
import userController from '../controller/UserController.js'
import loginController from '../controller/LoginController.js'
import authToken from '../middlewares/auth.js'
import taskController from '../controller/TaskController.js'

const router = new Router()

/**
 * @swagger
 * tags:
 *   name: Login
 *   description: Operations related to login
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login in application
 *     tags: [Login]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email.
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: 123456
 *     responses:
 *       200:
 *         description: User logged successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: token for the user.
 *                   example: eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9
 *       400:
 *         description: Invalid request parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid request parameters
 *       401:
 *         description: Password incorrect
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Password incorrect
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: User not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */
router.post('/login', loginController.loginToken)


/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Operations related to users
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of users
 *     tags: [Users]
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token for authentication
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The user ID.
 *                     example: 1
 *                   name:
 *                     type: string
 *                     description: The user's name.
 *                     example: Jane Doe
 *                   email:
 *                     type: string
 *                     description: The user's email.
 *                     example: janedoe@example.com
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: The date the user was created.
 *                     example: 2024-08-30T14:53:00.000Z
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: The date the user was last updated.
 *                     example: 2024-08-30T14:53:00.000Z
 *       404:
 *         description: No users found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: No users found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */
router.get('/users', authToken, userController.getUser)

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token for authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's name.
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 description: The user's email.
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: 123456
 *     responses:
 *       200:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The user ID.
 *                   example: 1
 *                 name:
 *                   type: string
 *                   description: The user's name.
 *                   example: John Doe
 *                 email:
 *                   type: string
 *                   description: The user's email.
 *                   example: johndoe@example.com
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date the user was created.
 *                   example: 2024-08-30T14:53:00.000Z
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date the user was last updated.
 *                   example: 2024-08-30T14:53:00.000Z
 *       400:
 *         description: Invalid request parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid request parameters
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */
router.post('/users', authToken, userController.postUser)

/**
 * @swagger
 * /users:
 *   put:
 *     summary: Update an existing user
 *     tags: [Users]
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token for authentication
 *       - in: header
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's name.
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 description: The user's email.
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: 123456
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The user ID.
 *                   example: 1
 *                 name:
 *                   type: string
 *                   description: The user's name.
 *                   example: John Doe
 *                 email:
 *                   type: string
 *                   description: The user's email.
 *                   example: johndoe@example.com
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date the user was created.
 *                   example: 2024-08-30T14:53:00.000Z
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date the user was last updated.
 *                   example: 2024-08-30T14:53:00.000Z
 *       400:
 *         description: Invalid request parameters or email already registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid request parameters"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */
router.put('/users', authToken, userController.updateUser)

/**
 * @swagger
 * /users:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token for authentication
 *       - in: header
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User deleted successfully"
 *       400:
 *         description: Invalid request parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid request parameters"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */
router.delete('/users', authToken, userController.deleteUser)


/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Operations related to login
 */

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Retrieve a list of tasks for a user
 *     tags: [Tasks]
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token for authentication
 *     responses:
 *       200:
 *         description: A list of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The task ID.
 *                     example: 1
 *                   task:
 *                     type: string
 *                     description: The task title.
 *                     example: "Finish project"
 *                   description:
 *                     type: string
 *                     description: A brief description of the task.
 *                     example: "Complete the final project by end of the week."
 *                   check:
 *                     type: boolean
 *                     description: Indicates whether the task is completed.
 *                     example: false
 *                   user_id:
 *                     type: integer
 *                     description: The ID of the user who created the task.
 *                     example: 1
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: The date the task was created.
 *                     example: 2024-08-30T14:53:00.000Z
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: The date the task was last updated.
 *                     example: 2024-08-30T14:53:00.000Z
 *       400:
 *         description: Invalid request parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid request parameters
 *       404:
 *         description: No tasks found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: No tasks found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */
router.get('/tasks', authToken, taskController.getTask)

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token for authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - task
 *               - description
 *             properties:
 *               task:
 *                 type: string
 *                 description: The task's name.
 *                 example: Finish project
 *               description:
 *                 type: string
 *                 description: The task's description.
 *                 example: Complete the final project by end of the week.
 *     responses:
 *       200:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The user ID.
 *                   example: 1
 *                 task:
 *                   type: string
 *                   description: The task's name.
 *                   example: Finish project
 *                 description:
 *                   type: string
 *                   description: The task's description.
 *                   example: Complete the final project by end of the week.
 *                 check:
 *                   type: boolean
 *                   description: Indicates whether the task is completed.
 *                   example: false
 *                 user_id:
 *                   type: integer
 *                   description: The task creator user id.
 *                   example: 1
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date the user was created.
 *                   example: 2024-08-30T14:53:00.000Z
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date the user was last updated.
 *                   example: 2024-08-30T14:53:00.000Z
 *       400:
 *         description: Invalid request parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid request parameters
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */
router.post('/tasks', authToken, taskController.postTask)

/**
 * @swagger
 * /tasks:
 *   put:
 *     summary: Update an existing task
 *     tags: [Tasks]
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token for authentication
 *       - in: header
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - task
 *               - description
 *             properties:
 *               task:
 *                 type: string
 *                 description: The task's name.
 *                 example: Finish project
 *               description:
 *                 type: string
 *                 description: The task's description.
 *                 example: Complete the final project by end of the week.
 *     responses:
 *       200:
 *         description: Task updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The user ID.
 *                   example: 1
 *                 task:
 *                   type: string
 *                   description: The task's name.
 *                   example: Finish project
 *                 description:
 *                   type: string
 *                   description: The task's description.
 *                   example: Complete the final project by end of the week.
 *                 check:
 *                   type: boolean
 *                   description: Indicates whether the task is completed.
 *                   example: false
 *                 user_id:
 *                   type: integer
 *                   description: The task creator user id.
 *                   example: 1
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date the task was created.
 *                   example: 2024-08-30T14:53:00.000Z
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date the task was last updated.
 *                   example: 2024-08-30T14:53:00.000Z
 *       400:
 *         description: Invalid request parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid request parameters"
 *       401:
 *         description: Not authorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Not authorized"
 *       404:
 *         description: Task not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Task not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */
router.put('/tasks', authToken, taskController.putTask);

/**
 * @swagger
 * /tasks/check-change:
 *   put:
 *     summary: Check change for task
 *     tags: [Tasks]
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token for authentication
 *       - in: header
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The task ID
 *     responses:
 *       200:
 *         description: Task check change successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The task ID.
 *                   example: 1
 *                 task:
 *                   type: string
 *                   description: The task's name.
 *                   example: Finish project
 *                 description:
 *                   type: string
 *                   description: The task's description.
 *                   example: Complete the final project by end of the week.
 *                 check:
 *                   type: boolean
 *                   description: Indicates whether the task is completed.
 *                   example: true
 *                 user_id:
 *                   type: integer
 *                   description: The task creator user id.
 *                   example: 1
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date the task was created.
 *                   example: 2024-08-30T14:53:00.000Z
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date the task was last updated.
 *                   example: 2024-08-30T14:53:00.000Z
 *       400:
 *         description: Invalid request parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid request parameters"
 *       401:
 *         description: Not authorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Not authorized"
 *       404:
 *         description: Task not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Task not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */
router.put('/tasks/check-change', authToken, taskController.checkChangeTask);

/**
 * @swagger
 * /tasks:
 *   delete:
 *     summary: Delete a task
 *     tags: [Tasks]
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token for authentication
 *       - in: header
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The task ID
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Task deleted successfully"
 *       400:
 *         description: Invalid request parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid request parameters"
 *       401:
 *         description: Not authorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Not authorized"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */
router.delete('/tasks', authToken, taskController.deleteTask)

export default router
