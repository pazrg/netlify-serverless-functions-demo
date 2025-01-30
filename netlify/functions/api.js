// api.js
const fs = require('fs').promises;
const path = require('path');

exports.handler = async () => {
  try {
    const filePath = path.join(__dirname, 'db.json'); // Ensure db.json is inside functions
    const data = await fs.readFile(filePath, 'utf-8');

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
