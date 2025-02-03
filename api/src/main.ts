/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';
import swaggerUi from "swagger-ui-express";
import { openApiSchema } from "./docs";




const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(express.json());

// Serve Swagger UI
app.use("/docs", swaggerUi.serve, swaggerUi.setup(openApiSchema));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to api!' });
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
server.on('error', console.error);
