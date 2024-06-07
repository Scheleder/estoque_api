const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const host = process.env.APP_HOST;

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Estoque API',
    version: '1.0.0',
    description: 'Documentação da API',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'scheleder.com',
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
  apis: ['./share/routes/*.js'], // Caminho para os arquivos que contém as definições da API
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
