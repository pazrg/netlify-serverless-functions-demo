// api.js
const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
  if (event.httpMethod === 'GET') {
    try {
      // Process the GET request as needed
      const filePath = path.join(__dirname, 'db.json'); // Adjusted path
      const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

      // Return the data as the response
      return {
        statusCode: 200,
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      };
    } catch (error) {
      // Return an error response if there was an issue processing the request
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to process GET request' }),
      };
    }
  }
};
