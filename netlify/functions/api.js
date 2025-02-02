require("dotenv").config();
const axios = require("axios");
const process = require("process")

exports.handler = async (event, context) => {
  try {
    const { topic, id, name } = event.queryStringParameters;

    // Fetch the db.json data
    const response = await axios.get('https://reliable-bunny-d4f022.netlify.app/db.json'); 
    const data = await response.json(); 

    // Debug: Check if data is an object
    /*if (typeof data !== "object" || Array.isArray(data)) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Unexpected db.json format", received: data }),
      };
    }*/

    // Validate topic (should be a key inside data)
    /*
    if (!topic || !data[topic]) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: `Invalid topic. Available topics: ${Object.keys(data).join(", ")}` }),
      };
    }*/

    /*let result = data[topic]; // Get the requested topic data

    // Filter by ID (if provided)
    if (id) {
      result = result.filter(item => item.id === Number(id));
    }

    // Filter by Name (if provided)
    if (name) {
      result = result.filter(item => item.name.toLowerCase().includes(name.toLowerCase()));
    }
    */
    return {
      statusCode: 200,
      body: JSON.stringify(data),
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
