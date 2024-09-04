import swaggerJSDoc from "swagger-jsdoc"

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Node API Project',
      version: '1.0.0'
    },
    servers: [
      {
        url: 'http://localhost:8000/'
      }
    ]
  },
  apis: ['./src/view/routes.js']
}

const swaggerSpec = swaggerJSDoc(options)

export default swaggerSpec