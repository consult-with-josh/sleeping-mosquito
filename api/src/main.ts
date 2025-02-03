import express, { Request, Response } from 'express';
import * as path from 'path';
import swaggerUi from 'swagger-ui-express';
import { openApiSchema } from './docs';

const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(express.json());

// Serve Swagger UI
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openApiSchema));

// In-memory storage for jokes and moods
const jokes: string[] = [
  "Why don’t programmers like nature? It has too many bugs.",
  "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
  "I told my wife she was drawing her eyebrows too high. She looked surprised!"
];

let currentMood: string = "🤖 Debugging mode";

//  GET Random Joke
app.get('/joke', (req: Request, res: Response) => {
  const joke = jokes[Math.floor(Math.random() * jokes.length)];
  res.json({ joke });
});


// POST Add a New Joke
app.post('/joke', (req: Request, res: Response): any => {
  const { joke } = req.body;
  if (!joke || typeof joke !== 'string') {
    return res.status(400).json({ error: 'Invalid joke format!' });
  }
  jokes.push(joke);
  res.status(201).json({ message: 'Joke added successfully!', joke });
  jokes.push(joke);
  res.status(201).json({ message: 'Joke added successfully!', joke });
});

//  GET Fortune Cookie Message
app.get('/fortune', (req: Request, res: Response) => {
  const fortunes: string[] = [
    "You will debug a problem so well that it will never reappear. Ever.",
    "A wise developer once said: 'Commit often, push when sober.'",
    "Your next coffee will be the best one yet."
  ];
  const fortune = fortunes[Math.floor(Math.random() * fortunes.length)];
  res.json({ fortune });
});

// GET Mood Checker
app.get('/mood', (req: Request, res: Response) => {
  res.json({ mood: currentMood });
});

// PATCH Update Mood
app.patch('/mood', (req: Request, res: Response): any => {
  const { mood } = req.body;
  if (!mood || typeof mood !== 'string') {
    return res.status(400).json({ error: 'Invalid mood format!' });
  }
  currentMood = mood;
  res.json({ message: 'Mood updated!', mood: currentMood });
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
server.on('error', console.error);
