exports.handler = async () => {
  try {
    data = {
      "users": [
        { "id": 1, "name": "Alice" },
        { "id": 2, "name": "Bob" }
      ]
    }
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
