require("dotenv").config();
const axios = require("axios");
const process = require("process");

exports.handler = async () => {
  try {     
    const response = await axios.get('https://reliable-bunny-d4f022.netlify.app/db.json'); 
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    };
  } catch (error) {
    console.error("Error fetching db.json:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to process GET request", details: error.message }),
    };
  }
};
