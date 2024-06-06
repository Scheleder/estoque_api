const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Configurações para o Swagger
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Estoque API',
    version: '1.0.0',
    description: 'Documentação da API',
  },
  servers: [
    {
      url: 'https://estoque.scheleder.com',
      description: 'Controle de Estoque',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Bearer {token}'
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
  app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
