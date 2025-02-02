require("dotenv").config();
const axios = require("axios");
const process = require("process");

exports.handler = async (event, context) => {
  // export async function handler(event, context) {
  try {
    data = {
      "users": [
        { "id": 1, "name": "Alice" },
        { "id": 2, "name": "Bob" }
      ]
    }
    /*const { keyword } = event.queryStringParameters;
    let response = await axios.get(
      `https://pixabay.com/api/?key=${process.env.PIXABAY_API_KEY}&q=${keyword}&image_type=photo&safesearch=true&per_page=3`,
      {
        headers: { Accept: "application/json", "Accept-Encoding": "identity" },
        params: { trophies: true },
      }
    );

    let imageURL = response.data.hits;*/

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error }),
    };
  }
};
