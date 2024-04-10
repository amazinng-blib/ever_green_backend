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
        url: 'https://ever-green-backend.onrender.com',
      },
    ],
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
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
      '/forgot-password': {
        post: {
          tags: ['Authentication'],
          summary: '',
          description: 'Forgot Password Route',
          operationId: 'forgotPassword',
          requestBody: {
            description: ` 
              Forgot password route`,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/forgotPasswordField',
                },
              },
              'application/x-www-form-urlencoded': {
                schema: {
                  $ref: '#/components/schemas/forgotPasswordField',
                },
              },
            },
          },
          responses: {
            default: {
              description: 'Email sent',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/forgotPasswordSchema',
                  },
                },
              },
            },
          },
          'x-swagger-router-controller': 'forgotPasswordSchema',
        },
      },
      '/reset-password/${token}': {
        put: {
          tags: ['Authentication'],
          summary: '',
          description: 'Reset Password Route.',
          operationId: 'resetPassword',
          requestBody: {
            description: ` 
              Reset password route`,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/resetPasswordField',
                },
              },
              'application/x-www-form-urlencoded': {
                schema: {
                  $ref: '#/components/schemas/resetPasswordField',
                },
              },
            },
          },
          responses: {
            default: {
              description: 'Your Passsword reset is Successfull',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/resetPasswordSchema',
                  },
                },
              },
            },
          },
          security: [
            {
              bearerAuth: [],
            },
          ],
          'x-swagger-router-controller': 'resetPasswordSchema',
        },
      },

      '/login': {
        post: {
          tags: ['Authentication'],
          summary: '',
          description: 'Login Route.',
          operationId: 'login',
          requestBody: {
            description: ` 
              Login Route`,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/loginField',
                },
              },
              'application/x-www-form-urlencoded': {
                schema: {
                  $ref: '#/components/schemas/loginField',
                },
              },
            },
          },
          responses: {
            default: {
              description: 'Logged in  Successfully',
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
      '/user': {
        get: {
          tags: ['Authentication'],
          summary: 'Get Single User by Id',
          description:
            'This Route filters single user and it is a protected route (token required)',
          operationId: 'filterUserByUserId',
          // parameters: [
          //   {
          //     in: 'header',
          //     name: 'Authorization',
          //     description: 'Bearer token for authentication',
          //     required: true,
          //     schema: {
          //       type: 'string',
          //     },
          //   },
          // ],
          responses: {
            200: {
              description: 'Successful operation',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/authModel',
                  },
                },
              },
            },
            400: {
              description: 'Invalid ID supplied',
            },
            404: {
              description: 'No User found',
            },
          },
          security: [
            {
              bearerAuth: [],
            },
          ],
          'x-swagger-router-controller': 'authModel',
        },
      },
      '/change-profile-image': {
        put: {
          tags: ['Authentication'],
          summary: 'Change profile image route',
          description: 'Change profile Image Route.',
          operationId: 'changeProfileImage',
          // parameters: [
          //   {
          //     in: 'header',
          //     name: 'Authorization',
          //     description: 'Bearer token for authentication',
          //     required: true,
          //     schema: {
          //       type: 'string',
          //     },
          //   },
          // ],
          requestBody: {
            description: ` 
            Change profile Image Route.`,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/changeProfileField',
                },
              },
              'application/x-www-form-urlencoded': {
                schema: {
                  $ref: '#/components/schemas/changeProfileField',
                },
              },
            },
          },
          responses: {
            default: {
              description: 'Upload Success',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/authModel',
                  },
                },
              },
            },
          },
          security: [
            {
              bearerAuth: [],
            },
          ],
          'x-swagger-router-controller': 'authModel',
        },
      },

      '/update-user-details': {
        put: {
          tags: ['Authentication'],
          summary: 'Update User Details route',
          description: 'Update User Details Route.',
          operationId: 'updateUserDetails',
          // parameters: [
          //   {
          //     in: 'header',
          //     name: 'Authorization',
          //     description: 'Bearer token for authentication',
          //     required: true,
          //     schema: {
          //       type: 'string',
          //     },
          //   },
          // ],
          requestBody: {
            description: ` 
            Update User Details Route.`,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/updateUserDetailsField',
                },
              },
              'application/x-www-form-urlencoded': {
                schema: {
                  $ref: '#/components/schemas/updateUserDetailsField',
                },
              },
            },
          },
          responses: {
            default: {
              description: 'Upload Success',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/authModel',
                  },
                },
              },
            },
          },
          security: [
            {
              bearerAuth: [],
            },
          ],
          'x-swagger-router-controller': 'authModel',
        },
      },
      '/all-users': {
        get: {
          tags: ['Authentication'],
          summary: 'Get  all users',
          description: 'This Route Gets all Users',
          operationId: 'getAllusers',

          responses: {
            200: {
              description: 'Successful operation',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/UserModelArray',
                  },
                },
              },
            },
            400: {
              description: 'Invalid ID supplied',
            },
            404: {
              description: 'No User found',
            },
          },
          security: [
            {
              bearerAuth: [],
            },
          ],
          'x-swagger-router-controller': 'UserModelArray',
        },
      },
      '/request-license-key': {
        post: {
          tags: ['License'],
          summary: 'Request license-key',
          description: 'Request license-key Route.',
          operationId: 'requestLicenseKey',
          requestBody: {
            description: ` 
            Request license-key Route.`,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/licenseField',
                },
              },
              'application/x-www-form-urlencoded': {
                schema: {
                  $ref: '#/components/schemas/licenseField',
                },
              },
            },
          },
          responses: {
            default: {
              description: 'Request Sent',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/licenseModel',
                  },
                },
              },
            },
          },

          'x-swagger-router-controller': 'licenseModel',
        },
      },
      '/assign-license-key': {
        put: {
          tags: ['License'],
          summary: 'Assign License to user by admin',
          description: 'Assign License Route.',
          operationId: 'assignLicense',
          // parameters: [
          //   {
          //     in: 'header',
          //     name: 'Authorization',
          //     description: 'Bearer token for authentication',
          //     required: true,
          //     schema: {
          //       type: 'string',
          //     },
          //   },
          // ],
          requestBody: {
            description: ` 
            Assign License Route.`,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/assignLicenseField',
                },
              },
              'application/x-www-form-urlencoded': {
                schema: {
                  $ref: '#/components/schemas/assignLicenseField',
                },
              },
            },
          },
          responses: {
            default: {
              description: 'License assigned successfully',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/licenseModel',
                  },
                },
              },
            },
          },
          security: [
            {
              bearerAuth: [],
            },
          ],
          'x-swagger-router-controller': 'licenseModel',
        },
      },
      '/expire-license': {
        put: {
          tags: ['License'],
          summary: 'Change user License status to expired by  admin',
          description: 'Change user License status to expired Route.',
          operationId: 'expireLicense',

          requestBody: {
            description: ` 
            Change user License status to expired Route.`,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/licenseExpiredField',
                },
              },
              'application/x-www-form-urlencoded': {
                schema: {
                  $ref: '#/components/schemas/licenseExpiredField',
                },
              },
            },
          },
          responses: {
            default: {
              description: 'License Key toggled to expired',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/licenseModel',
                  },
                },
              },
            },
          },
          security: [
            {
              bearerAuth: [],
            },
          ],
          'x-swagger-router-controller': 'licenseModel',
        },
      },
      '/subscribe-to-news-letter': {
        post: {
          tags: ['SubscribeToNewsLetter'],
          summary: 'Subscribe to news Letter',
          description: `This Route registers  user's email for newsLetter`,
          operationId: 'subToNewsLetter',
          requestBody: {
            description: ` 
            This Route registers  user's email for newsLetter`,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/SubscribeToNewsLetterField',
                },
              },
              'application/x-www-form-urlencoded': {
                schema: {
                  $ref: '#/components/schemas/SubscribeToNewsLetterField',
                },
              },
            },
          },
          responses: {
            default: {
              description:
                'You have successfully Subscribed to our news letter',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/SubscribeToNewsLetterModel',
                  },
                },
              },
            },
          },
          'x-swagger-router-controller': 'SubscribeToNewsLetterModel',
        },
      },
      '/post-news': {
        post: {
          tags: ['SubscribeToNewsLetter'],
          summary: 'Post news Letter by admin',
          description: `This Route post newsLetter`,
          operationId: 'postNewsLetter',
          requestBody: {
            description: ` 
            This Route post newsLetter`,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/PostNewsLetterField',
                },
              },
              'application/x-www-form-urlencoded': {
                schema: {
                  $ref: '#/components/schemas/PostNewsLetterField',
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
                    $ref: '#/components/schemas/PostNewsLetterModel',
                  },
                },
              },
            },
          },
          'x-swagger-router-controller': 'PostNewsLetterModel',
        },
      },
      '/contact-us': {
        post: {
          tags: ['Contact-Us'],
          summary: 'Contact us',
          description: `Contact us route`,
          operationId: 'postNewsLetter',
          requestBody: {
            description: ` 
            Contact us route`,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ContactUsField',
                },
              },
              'application/x-www-form-urlencoded': {
                schema: {
                  $ref: '#/components/schemas/ContactUsField',
                },
              },
            },
          },
          responses: {
            default: {
              description:
                'Thank You ${name} for contacting us. we will get back to you as soon as possible',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ContactUsModel',
                  },
                },
              },
            },
          },
          'x-swagger-router-controller': 'ContactUsModel',
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
              example: 'jhjkasjk767889qqw845898',
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
        loginField: {
          type: 'object',

          properties: {
            email: {
              type: 'string',
              example: 'johndoe@gmail.com',
            },
            password: {
              type: 'password',
              example: 'jhjkasjk767889qqw845898',
            },
          },
        },

        forgotPasswordSchema: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example:
                "A password reset Link has been sent to the email and phone number you provided. Check your email inbox but if you can't find it, check your spam folder",
            },
          },
        },

        forgotPasswordField: {
          type: 'object',
          properties: {
            password: {
              type: 'password',
              example: 'jhjkasjk767889qqw845898',
            },
          },
        },
        resetPasswordSchema: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: 'Your Passsword reset is Successfull',
            },
          },
        },

        resetPasswordField: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              example: 'johndoe@gmail.com',
            },
          },
        },
        changeProfileField: {
          type: 'object',
          properties: {
            profile_picture: {
              type: 'string',
              example: 'local file path',
            },
          },
        },
        updateUserDetailsField: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              example: 'johndoe@gmail.com',
            },
            email: {
              type: 'string',
              example: 'johndoe@gmail.com',
            },
            first_name: {
              type: 'string',
              example: 'john',
            },
            last_name: {
              type: 'string',
              example: 'doe',
            },
            telegram_Id: {
              type: 'string',
              example: '562989827hjjkash6sfg',
            },
            phone_number: {
              type: 'number',
              example: '09087665653',
            },
          },
        },
        UserModelArray: {
          type: 'array',
          items: {
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
                required: ['amount', 'hasCompletedPlan', 'plan_subscribed'],
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
        },
        licenseModel: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: 'agjknknbb67887jjkdkl',
            },
            user_id: {
              type: 'string',
              eaxmaple: '65f813aacdaa9ceae8f6fb34',
            },
            license_key: {
              type: 'string',
              example: '65f813aacdaa9ceae8f6fb34kdkldfkl',
            },
            trading_Id: {
              type: 'string',
              example: '65df4921624b33976cd40238',
            },
            date_purchased: {
              type: 'string',
              example: '2024-04-23',
            },
            amount: {
              type: 'number',
              example: 2383889,
            },
            status: {
              type: 'string',
              default: 'active',
              enum: ['active', 'expired', 'pending'],
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

        licenseField: {
          type: 'object',
          properties: {
            trading_Id: {
              type: 'string',
              example: '65df4921624b33976cd40238',
            },
          },
        },
        assignLicenseField: {
          type: 'object',
          properties: {
            license_Id: {
              type: 'string',
              example: '65df4921624b33976cd40238',
            },
            license_key: {
              type: 'string',
              example: '65df4921624b33976cd40238',
            },
          },
        },
        licenseExpiredField: {
          type: 'object',
          properties: {
            license_Id: {
              type: 'string',
              example: '65df4921624b33976cd40238',
            },
          },
        },
        SubscribeToNewsLetterModel: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: 'You have successfully Subscribed to our news letter',
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
        PostNewsLetterModel: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: 'News Letter sent successfully',
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
        SubscribeToNewsLetterField: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              example: 'johndoe@gmail.com',
            },
          },
        },
        PostNewsLetterField: {
          type: 'object',
          properties: {
            title: {
              type: 'string',
              example: 'title',
            },
            body: {
              type: 'string',
              example: 'body',
            },
          },
        },
        ContactUsField: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              example: 'John Doe',
            },
            email: {
              type: 'string',
              example: 'johndoe@gmail.com',
            },
            phone_number: {
              type: 'string',
              example: '09187654327',
            },

            subject: {
              type: 'string',
              example: 'subject',
            },
            message: {
              type: 'string',
              example: 'message',
            },
          },
        },
        ContactUsModel: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example:
                'Thank You ${name} for contacting us. we will get back to you as soon as possible',
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
      },
    },
  },
  apis: ['../routes/*.js'],
};

module.exports = swaggerOptions;
