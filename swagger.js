const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config(); 

const host = process.env.APP_HOST;
const port = process.env.APP_PORT;

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Estoque API',
    version: '1.0.0',
    description: 'Documentação da API',
  },
  servers: [
    {
      url: `http://${host}:${port}`,
      description: 'API Estoque',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Insira o token no formato: Bearer {token}'
      }
    }
  },
  security: [
    {
      bearerAuth: []
    }
  ]
};

const options = {
  swaggerDefinition,
  apis: ['./share/docs/tags.yaml'], // Caminho para os arquivos que contém as definições da API
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    swaggerOptions: {
      requestInterceptor: (request) => {
        //request.headers['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzE2ODU4MjYyfQ.ZkFHaoiYCTX52O2OL9UYJNRX8M0-izD7OtULQEr6rx4';
        request.headers['Accept'] = '*/*';
        return request;
      }
    }
  }));
};
