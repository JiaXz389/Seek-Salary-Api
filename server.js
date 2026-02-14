const express = require('express');
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

// Function to fetch content from URL using curl
async function fetch(url) {
  try {
    const { stdout, stderr } = await execPromise(`curl -s "${url}"`);
    return stdout;
  } catch (error) {
    throw new Error(`Failed to fetch URL: ${error.message}`);
  }
}

// Function to calculate salary by iterating through salary ranges
async function calculateSalary(baseUrl, salaryRanges) {
  const results = [];

  for (const range of salaryRanges) {
    const url = `${baseUrl}${range}`;
    try {
      const content = await fetch(url);
      const jsonData = JSON.parse(content);
      results.push({
        range: range,
        data: jsonData
      });
    } catch (error) {
      results.push({
        range: range,
        error: error.message
      });
    }
  }

  return results;
}

// API endpoint for fetch
app.post('/api/fetch', async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const content = await fetch(url);
    res.json({ content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API endpoint for calculate salary
app.post('/api/calculate-salary', async (req, res) => {
  const { baseUrl, salaryRanges } = req.body;

  if (!baseUrl || !salaryRanges || !Array.isArray(salaryRanges)) {
    return res.status(400).json({
      error: 'baseUrl and salaryRanges (array) are required'
    });
  }

  try {
    const results = await calculateSalary(baseUrl, salaryRanges);
    res.json({ results });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`SeekSalaryApi running on http://localhost:${PORT}`);
});
