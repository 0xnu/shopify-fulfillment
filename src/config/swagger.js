exports.options = {
  routePrefix: '/docs',
  exposeRoute: true,
  swagger: {
    info: {
      title: 'Shopify Fulfillment API',
      description: 'This is a Shopify Fulfillment API. It enable app developers to give merchants more control and visibility into order fulfillment. It lets you access and change data inside the application from remote. The request must use the protocol HTTPS. Note - it shows feature of an application that is still in development and as such, can change.',
      version: '1.0.0',
      termsOfService: "http://macromade.com/terms/"
    },
    externalDocs: {
      url: 'https://macromade.com',
      description: 'Find out more about us',
    },
    host: 'localhost:5000',
    basePath: '/api',
    securityDefinitions: {
      OauthSecurity: {
        type: 'oauth2',
        flow: 'accessCode',
        authorizationUrl: 'https://accounts.google.com/o/oAuth2/v2/auth',
        tokenUrl: 'https://www.googleapis.com/oAuth2/v4/token',
        scopes: {
          read: 'Read Data',
          write: 'Write Data',
        }
      }
    },
    security: {
      OauthSecurity: {
        scopes: ['read', 'write']
      }
    },
    tags: {
      user: {
        name: 'user',
        description: 'User login authentication and authorization',
        paths: '/get_user'
      },
      order: {
        name: 'order',
        description: 'Retrieve info of a specific order'
      },
      orders: {
        name: 'orders',
        description: 'Retrieve info of all the orders made in the last 31 days'
      },
      article: {
        name: 'article',
        description: 'Retrieve a single article inside the warehouse'
      },
      articles: {
        name: 'articles',
        description: 'Retrieve info of all articles inside the warehouse'
      },
      cargo: {
        name: 'cargo',
        description: 'Retrieve info of a single cargo'
      },
      cargos: {
        name: 'cargos',
        description: 'Retrieve info of all cargos made in the last 31 days'
      }
    },
    schemes: ['https', 'http'],
    consumes: ['application/json'],
    produces: ['application/json'],
  },
};
