import 'zod-openapi/extend';
import * as fs from "fs";
import { z } from 'zod';
import { createDocument } from 'zod-openapi';

const joke = z.string().openapi({
    description: 'A humorous text.',
    example: 'Why don’t programmers like nature? It has too many bugs.',
});

const mood = z.string().openapi({
    description: 'The current mood of the API.',
    example: '🤖 Debugging mode',
});

const fortune = z.string().openapi({
    description: 'A random fortune message.',
    example: 'Your next coffee will be the best one yet.',
});

const document: { openapi: string; info: { title: string; version: string } } = createDocument({
    openapi: '3.1.0',
    info: {
        title: 'User Authentication API',
        version: '1.0.0',
    },



    servers: [
        {
            url: 'http://localhost:3333',
            description: 'Local development server',
        },
        {
            "url": "https://partyinhell.onrender.com",
            "description": "Production development server"
        }
    ],
    paths: {
        '/joke': {
            get: {
                summary: 'Get a Random Joke',
                responses: {
                    '200': {
                        description: 'A random joke',
                        content: {
                            'application/json': {
                                schema: z.object({
                                    joke,
                                }),
                            },
                        },
                    },
                },
            },
            post: {
                summary: 'Add a New Joke',
                requestBody: {
                    content: {
                        'application/json': {
                            schema: z.object({
                                joke,
                            }),
                        },
                    },
                },
                responses: {
                    '201': {
                        description: 'Joke added successfully',
                        content: {
                            'application/json': {
                                schema: z.object({
                                    message: z.string(),
                                    joke,
                                }),
                            },
                        },
                    },
                    '400': {
                        description: 'Invalid joke format',
                        content: {
                            'application/json': {
                                schema: z.object({
                                    error: z.string(),
                                }),
                            },
                        },
                    },
                },
            },
        },
        '/fortune': {
            get: {
                summary: 'Get a Fortune Cookie Message',
                responses: {
                    '200': {
                        description: 'A random fortune cookie message',
                        content: {
                            'application/json': {
                                schema: z.object({
                                    fortune,
                                }),
                            },
                        },
                    },
                },
            },
        },
        '/mood': {
            get: {
                summary: 'Get Current Mood',
                responses: {
                    '200': {
                        description: 'Current mood of the API',
                        content: {
                            'application/json': {
                                schema: z.object({
                                    mood,
                                }),
                            },
                        },
                    },
                },
            },
            patch: {
                summary: 'Update Mood',
                requestBody: {
                    content: {
                        'application/json': {
                            schema: z.object({
                                mood,
                            }),
                        },
                    },
                },
                responses: {
                    '200': {
                        description: 'Mood updated successfully',
                        content: {
                            'application/json': {
                                schema: z.object({
                                    message: z.string(),
                                    mood,
                                }),
                            },
                        },
                    },
                    '400': {
                        description: 'Invalid mood format',
                        content: {
                            'application/json': {
                                schema: z.object({
                                    error: z.string(),
                                }),
                            },
                        },
                    },
                },
            },
        },
    },
});

fs.writeFileSync('openapi.json', JSON.stringify(document, null, 2));
console.log('✅ OpenAPI JSON file generated: openapi.json');

export { document as openApiSchema };
