const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/download', async (req, res) => {
  const { url } = req.body;

  if (!url) return res.status(400).json({ error: "Missing URL" });

  try {
    let apiURL = "", headers = {};

    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      apiURL = `https://youtube-mp36.p.rapidapi.com/dl?url=${encodeURIComponent(url)}`;
      headers = {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
      };
    } else if (url.includes("instagram.com")) {
      apiURL = `https://instagram-downloader-download-instagram-videos.p.rapidapi.com/index?url=${encodeURIComponent(url)}`;
      headers = {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'instagram-downloader-download-instagram-videos.p.rapidapi.com'
      };
    } else if (url.includes("facebook.com")) {
      apiURL = `https://facebook-reel-and-video-downloader.p.rapidapi.com/app/main.php?url=${encodeURIComponent(url)}`;
      headers = {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'facebook-reel-and-video-downloader.p.rapidapi.com'
      };
    } else {
      return res.status(400).json({ error: "Unsupported platform" });
    }

    const response = await axios.get(apiURL, { headers });
    res.json(response.data);

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to fetch from API" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
