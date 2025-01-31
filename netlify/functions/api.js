// api.js
const fetch = require('node-fetch');
exports.handler = async () => {
  try {
    const response = await fetch('https://reliable-bunny-d4f022.netlify.app/db.json'); // Replace with your site URL
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
