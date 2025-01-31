// api.js
const axios = require("axios");

exports.handler = async () => {
  try {
    const response = await axios.get('https://reliable-bunny-d4f022.netlify.app/db.json'); // Replace with your site URL
    const data = await response.json();
    return {
      statusCode: 200,
      body: data,
      headers: { "Content-Type": "application/json" },
    };
  } catch (error) {
    console.error("Error reading db.json:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to process GET request" }),
    };
  }
};
