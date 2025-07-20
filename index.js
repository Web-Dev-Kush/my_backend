import express from 'express';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
const app = express();
const port = process.env.PORT;

// __dirname workaround for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// API route to serve jokes
app.get('/api/jokes', async (req, res) => {
  try {
    const data = await fs.readFile(path.join(__dirname, 'jokes.json'), 'utf-8');
    const jokes = JSON.parse(data);
    res.json(jokes);
  } catch (err) {
    res.status(500).json({ message: 'Error reading jokes file' });
  }
});

app.get('/', (req, res) => {
  res.send('Welcome to the Jokes API');
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
