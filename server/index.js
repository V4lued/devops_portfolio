import express from 'express';
import cors from 'cors';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Data file path
const dataFilePath = path.join(__dirname, 'data', 'viewCount.json');

// Ensure data directory exists
await fs.ensureDir(path.dirname(dataFilePath));

// Initialize view count data if it doesn't exist
const initializeData = async () => {
  try {
    const exists = await fs.pathExists(dataFilePath);
    if (!exists) {
      await fs.writeJson(dataFilePath, { viewCount: 0, lastUpdated: Date.now() });
    }
  } catch (error) {
    console.error('Error initializing data:', error);
  }
};

// Get view count
app.get('/api/viewCount', async (req, res) => {
  try {
    await initializeData();
    const data = await fs.readJson(dataFilePath);
    res.json({ viewCount: data.viewCount });
  } catch (error) {
    console.error('Error reading view count:', error);
    res.status(500).json({ error: 'Failed to get view count' });
  }
});

// Increment view count
app.post('/api/viewCount', async (req, res) => {
  try {
    await initializeData();
    const data = await fs.readJson(dataFilePath);
    
    // Check if this is a new visit (using IP and user agent as basic fingerprint)
    const clientId = req.ip + req.get('User-Agent');
    const lastVisit = data.visits?.[clientId] || 0;
    const currentTime = Date.now();
    const visitThreshold = 60 * 60 * 1000; // 1 hour in milliseconds
    
    if (!data.visits) {
      data.visits = {};
    }
    
    // Only increment if it's a new visit or last visit was more than 1 hour ago
    if (!lastVisit || (currentTime - lastVisit) > visitThreshold) {
      data.viewCount += 1;
      data.visits[clientId] = currentTime;
      data.lastUpdated = currentTime;
      
      await fs.writeJson(dataFilePath, data, { spaces: 2 });
    }
    
    res.json({ viewCount: data.viewCount });
  } catch (error) {
    console.error('Error updating view count:', error);
    res.status(500).json({ error: 'Failed to update view count' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`View count server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
  console.log(`View count API: http://localhost:${PORT}/api/viewCount`);
}); 