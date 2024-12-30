import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Task Management API',
      version: '1.0.0',
      description: 'Test user: humbertoezequiel.z.c@gmail.com | Password: A12345678b'
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Development server'
      }
    ],
    tags: [
      { name: 'Users', description: 'User management endpoints' },
      { name: 'Tasks', description: 'Task management endpoints' }
    ],
    paths: {
      '/register': {
        post: {
          tags: ['Users'],
          summary: 'Register new user',
          requestBody: {
            required: true,
            content: {
              'multipart/form-data': {
                schema: {
                  type: 'object',
                  properties: {
                    names: { type: 'string', example: 'John' },
                    lastnames: { type: 'string', example: 'Doe' },
                    age: { type: 'number', example: 25 },
                    email: { type: 'string', example: 'test@gmail.com' },
                    password: { type: 'string', example: 'A12345678b' },
                    profileImage: { type: 'string', format: 'binary' }
                  }
                }
              }
            }
          },
          responses: {
            201: {
              description: 'User created successfully'
            }
          }
        }
      },
      '/login': {
        post: {
          tags: ['Users'],
          summary: 'Login user',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    email: { type: 'string', example: 'humbertoezequiel.z.c@gmail.com' },
                    password: { type: 'string', example: 'A12345678b' }
                  }
                }
              }
            }
          },
          responses: {
            200: {
              description: 'Login successful'
            }
          }
        }
      },
      '/profile': {
        get: {
          tags: ['Users'],
          security: [{ cookieAuth: [] }],
          responses: {
            200: {
              description: 'User profile retrieved successfully'
            }
          }
        }
      },
      '/tasks': {
        get: {
          tags: ['Tasks'],
          security: [{ cookieAuth: [] }],
          responses: {
            200: {
              description: 'Tasks retrieved successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Task'
                    }
                  }
                }
              }
            }
          }
        },
        post: {
          tags: ['Tasks'],
          security: [{ cookieAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    title: { type: 'string', example: 'New Task' },
                    description: { type: 'string', example: 'Task description' }
                  }
                }
              }
            }
          },
          responses: {
            201: {
              description: 'Task created successfully'
            }
          }
        }
      },
      '/tasks/{id}': {
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'string'
            }
          }
        ],
        get: {
          tags: ['Tasks'],
          security: [{ cookieAuth: [] }],
          responses: {
            200: {
              description: 'Task retrieved successfully'
            }
          }
        },
        put: {
          tags: ['Tasks'],
          security: [{ cookieAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    title: { type: 'string' },
                    description: { type: 'string' },
                    completed: { type: 'boolean' }
                  }
                }
              }
            }
          },
          responses: {
            200: {
              description: 'Task updated successfully'
            }
          }
        },
        delete: {
          tags: ['Tasks'],
          security: [{ cookieAuth: [] }],
          responses: {
            200: {
              description: 'Task deleted successfully'
            }
          }
        }
      }
    },
    components: {
      schemas: {
        Task: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            title: { type: 'string' },
            description: { type: 'string' },
            completed: { type: 'boolean' },
            createAt: { type: 'string', format: 'date-time' },
            user: { type: 'string' }
          }
        }
      },
      securitySchemes: {
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'auth_token'
        }
      }
    }
  },
  apis: ['./routes/*.ts']
};

export const specs = swaggerJsdoc(options);