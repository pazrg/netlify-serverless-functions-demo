const fs = require('fs').promises;
const path = require('path');

exports.handler = async () => {
  try {
    const filePath = path.resolve(__dirname, 'db.json'); // Ensure correct path
    console.log("Attempting to read:", filePath);

    const data = await fs.readFile(filePath, 'utf-8');
    console.log("File read successfully");

    return {
      statusCode: 200,
      body: data,
      headers: { "Content-Type": "application/json" },
    };
  } catch (error) {
    console.error("Error reading db.json:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to process GET request", details: error.message }),
    };
  }
};
