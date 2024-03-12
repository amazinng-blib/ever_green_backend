const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Backend API for EVERGREENFXX',
      description:
        'This API is strictly for EVERGREENFXX, built with express JS',
      version: 'V1',
    },
    servers: [
      {
        url: 'http://localhost:5000',
      },
    ],
    paths: {
      '/register': {
        post: {
          tags: ['Authentication'],
          summary: '',
          description: 'This Route registers new user',
          operationId: 'registerUser',
          requestBody: {
            description: ` 
              This route registers user .Please check register schema for currency,plan_subscribed, payment_status enums`,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/register',
                },
              },
              'application/x-www-form-urlencoded': {
                schema: {
                  $ref: '#/components/schemas/register',
                },
              },
            },
          },
          responses: {
            default: {
              description: 'User Registered Successfully',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/authModel',
                  },
                },
              },
            },
          },
          'x-swagger-router-controller': 'authModel',
        },
      },
    },
    components: {
      schemas: {
        authModel: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: 'agjknknbb67887jjkdkl',
            },
            first_name: {
              type: 'string',
              example: 'John',
            },
            last_name: {
              type: 'string',
              example: 'Doe',
            },
            email: {
              type: 'string',
              example: 'johndoe@gmail.com',
            },
            phone_number: {
              type: 'string',
              example: '09065456723',
            },
            telegram_id: {
              type: 'string',
              example: 'tyiionskdkl6787687',
            },
            profile_picture: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  url: {
                    type: 'string',
                    format: 'url',
                    example:
                      'https://res.cloudinary.com/amazing1917/image/upload/v1701102769/pvoufpkyfut4peej7xwb.png',
                  },
                  _id: {
                    type: 'string',
                    example: '6564c4b178d42edec9fce408',
                  },
                },
                required: ['url', '_id'],
              },
            },

            plan: {
              type: 'object',
              properties: {
                amount: {
                  type: 'number',
                  example: 2356000,
                },
                currency: {
                  type: 'string',
                  enum: ['NGN', 'USD'],
                  default: 'NGN',
                },
                hasCompletedPlan: {
                  type: 'boolean',
                  default: false,
                },
                plan_subscribed: {
                  type: 'string',
                  default: 'Intro',
                  enum: ['Intro', 'Pro', 'Vip'],
                },
              },
              required: ['amount', 'hasCompletedPlan', 'plan_type'],
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              example: '2024-02-19T09:58:53.385Z',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              example: '2024-02-19T09:58:53.385Z',
            },
          },
        },
        register: {
          type: 'object',

          properties: {
            first_name: {
              type: 'string',
              example: 'John',
            },
            last_name: {
              type: 'string',
              example: 'Doe',
            },
            email: {
              type: 'string',
              example: 'johndoe@gmail.com',
            },
            password: {
              type: 'password',
              example: 'johndoe@gmail.com',
            },
            phone_number: {
              type: 'string',
              example: '09065456723',
            },
            telegram_id: {
              type: 'string',
              example: 'tyiionskdkl6787687',
            },
            plan: {
              type: 'object',
              properties: {
                amount: {
                  type: 'number',
                  example: 2356000,
                },
                currency: {
                  type: 'string',
                  enum: ['NGN', 'USD'],
                  default: null,
                },
                hasCompletedPlan: {
                  type: 'boolean',
                  default: false,
                },
                plan_subscribed: {
                  type: 'string',
                  default: null,
                  enum: ['Intro', 'Pro', 'Vip'],
                },

                payment_status: {
                  type: 'string',
                  default: null,
                  enum: [
                    'SUCCESS',
                    'PENDING',
                    'PROCESSING',
                    'FAILED',
                    'DECLINED',
                  ],
                },
              },
              required: ['amount', 'hasCompletedPlan', 'plan_subscribed'],
            },
          },
        },
      },
    },
  },
  apis: ['../routes/*.js'],
};

module.exports = swaggerOptions;
