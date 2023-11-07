const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');

const app = express();
const port = 3000;

app.get('/scrape', async (req, res) => {
  const url = req.query.url; // Get the 'url' query parameter

  if (!url) {
    res.status(400).json({ message: 'Please provide a valid URL.' });
    return;
  }

  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    // Your scraping logic goes here
    const title = $('h1').text();
    const description = $('p').text();
    const spans = $('span').text();

    const scrapedData = {
      title,
      description,
      spans,
    };

    res.json(scrapedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while scraping data.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
