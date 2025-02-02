require("dotenv").config();
const axios = require("axios");

exports.handler = async (event) => {
  try {
    // Fetch the full db.json file
    const response = await axios.get('https://reliable-bunny-d4f022.netlify.app/db.json');
    const data = response.data;

    // Extract query parameters
    const { topic, id, name } = event.queryStringParameters;

    // Validate topic (only supports "users" for now)
    if (!data[topic]) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: `Invalid topic. Available topics: ${Object.keys(data).join(", ")}` }),
      };
    }

    let result = data[topic]; // Start with the full topic data

    // Filter by ID (if provided)
    if (id) {
      result = result.filter(item => item.id === Number(id));
    }

    // Filter by Name (if provided)
    if (name) {
      result = result.filter(item => item.name.toLowerCase() === name.toLowerCase());
    }

    return {
      statusCode: 200,
      body: JSON.stringify(result),
      headers: { "Content-Type": "application/json" },
    };

  } catch (error) {
    console.error("Error fetching or filtering db.json:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to process GET request", details: error.message }),
    };
  }
};

