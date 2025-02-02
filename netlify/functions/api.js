require("dotenv").config();
const axios = require("axios");

exports.handler = async (event, context) => {
  try {
    // Extract query parameters
    const { topic, id, name } = event.queryStringParameters;

    // Fetch the db.json data
    let response = await axios.get("https://reliable-bunny-d4f022.netlify.app/db.json", {
      headers: { Accept: "application/json", "Accept-Encoding": "identity" },
    });

    let data = response.data;

    // Validate topic
    if (!topic || !data[topic]) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: `Invalid topic. Available topics: ${Object.keys(data).join(", ")}` }),
      };
    }

    let result = data[topic]; // Start with full topic data

    // Filter by ID if provided
    if (id) {
      result = result.filter(item => item.id === Number(id));
    }

    // Filter by Name if provided (case-insensitive)
    if (name) {
      result = result.filter(item => item.name.toLowerCase().includes(name.toLowerCase()));
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
