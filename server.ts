import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { API_PORT } from './utils/config';

const app = express();

app.use(cors());
app.use(express.json());

const dataFile = path.join(__dirname, 'data.json');

// Ensure data file exists
async function ensureDataFile() {
  try {
    await fs.access(dataFile);
  } catch (error) {
    // File doesn't exist, create it with an empty array
    await fs.writeFile(dataFile, '[]');
  }
}

// Read events
app.get('/api/events', async (req, res) => {
  try {
    await ensureDataFile();
    const data = await fs.readFile(dataFile, 'utf8');
    res.json(JSON.parse(data || '[]'));
  } catch (err) {
    console.error(err);
    res.status(500).send('Error reading data');
  }
});

// Save events
app.post('/api/events', async (req, res) => {
  try {
    await ensureDataFile();
    const events = req.body;
    await fs.writeFile(dataFile, JSON.stringify(events));
    res.status(200).send('Data saved successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving data');
  }
});

app.listen(API_PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${API_PORT}`);
});
