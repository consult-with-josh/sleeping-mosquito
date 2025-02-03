import 'zod-openapi/extend';
import * as fs from "fs";
import { z } from 'zod';
import { createDocument } from 'zod-openapi';


// Define schemas
const userId = z.string().openapi({
  description: 'A unique identifier for a user',
  example: 'user123',
  ref: 'userId',
});

const username = z.string().openapi({
  description: 'Username',
  example: 'johndoe',
});

const email = z.string().email().openapi({
  description: 'User email',
  example: 'john@example.com',
});

const password = z.string().min(6).openapi({
  description: 'User password',
  example: 'password123',
});
// Create OpenAPI document
const document: { openapi: string; info: { title: string; version: string } } = createDocument({
  openapi: '3.1.0',
  info: {
    title: 'User Authentication API',
    version: '1.0.0',
  },

  servers: [
    {
      url: "http://localhost:3333",
      description: "Local development server",
    },
  ],

  paths: {
    '/login': {
      post: {
        summary: 'User Login',
        requestBody: {
          content: {
            'application/json': {
              schema: z.object({ username, password }),
            },
          },
        },
        responses: {
          '200': {
            description: 'Successful login',
            content: {
              'application/json': {
                schema: z.object({
                  token: z.string().openapi({
                    description: 'Authentication token',
                    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                  }),
                }),
              },
            },
          },
        },
      },
    },
    '/register': {
      post: {
        summary: 'User Registration',
        requestBody: {
          content: {
            'application/json': {
              schema: z.object({ username, email, password }),
            },
          },
        },
        responses: {
          '201': {
            description: 'User registered successfully',
            content: {
              'application/json': {
                schema: z.object({
                  userId,
                  username,
                  email,
                }),
              },
            },
          },
        },
      },
    },
    '/user': {
      get: {
        summary: 'Get User Details',
        parameters: [
          {
            name: 'user',
            in: 'path',
            required: true,
            // schema: userId,
          },
        ],
        responses: {
          '200': {
            description: 'User details retrieved successfully',
            content: {
              'application/json': {
                schema: z.object({
                  userId,
                  username,
                  email,
                }),
              },
            },
          },
        },
      },
    },
  },
});



const openApiSchema = document;
fs.writeFileSync("openapi.json", JSON.stringify(openApiSchema, null, 2));
console.log("✅ OpenAPI JSON file generated: openapi.json");

export { openApiSchema };