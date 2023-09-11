const express = require("express");
const moment = require("moment");

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json("Welcome! Hit the /api endpoint with the appropriate parameters to get results");
});

app.get("/api", (req, res) => {
  try {
    // Destructure request query for parameters
    const { slack_name, track } = req.query;

    // Handle possible missing parameter
    if (!slack_name || !track) {
      throw new Error("Both slack_name and track parameters are required.");
    }

    // Get current day of the week
    const current_day = moment().format("dddd");

    // Get current UTC time
    const utc_time = moment().utc().format();

    // GitHub URLs
    const github_repo_url = "https://github.com/pikarestiv/hngx-stage-one-assessment";
    const github_file_url = `${github_repo_url}/blob/main/server.js`;

    //JSON response
    const response = {
      slack_name,
      current_day,
      utc_time,
      track,
      github_file_url,
      github_repo_url,
      status_code: 200,
    };

    res.json(response);
  } catch (error) {
    // Handle errors
    res.status(400).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
