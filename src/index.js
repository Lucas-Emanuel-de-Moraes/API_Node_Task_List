import express from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from '../swagger.js'
import cors from 'cors'
import router from './view/routes.js'
import { conect } from './db/postgres.js'

const app = express()

app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use(cors())
app.use(router)

app.listen(8000, () => {
  console.log('Server is running at PORT 8000')
})

conect()