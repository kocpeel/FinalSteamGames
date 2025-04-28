const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const port = 5173;

app.use(cors());

app.get("/api/steam", async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "URL parameter is required" });
  }

  try {
    const response = await axios.get(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Steam API Error:", error);
    res.status(500).json({
      error: "Failed to fetch from Steam API",
      details: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
