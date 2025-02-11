require("dotenv").config();
const axios = require("axios");

exports.handler = async (event, context) => {
  try {
    // Extract query parameters
    const { nombre } = event.queryStringParameters;
    const parseQueryParam = param => (Array.isArray(param) ? param.map(p => p.toLowerCase()) : [param.toLowerCase()]);

    const sexo = event.multiValueQueryStringParameters?.sexo; // Gets all values as an array
    const sexArray = sexo ? parseQueryParam(sexo) : null;

    const tamaño = event.multiValueQueryStringParameters?.tamaño; // Gets all values as an array
    const sizeArray = tamaño ? parseQueryParam(tamaño) : null;

    const edad = event.multiValueQueryStringParameters?.edad; // Gets all values as an array
    const ageArray = edad ? parseQueryParam(edad) : null;

    const vulnerabilidad = event.multiValueQueryStringParameters?.vulnerabilidad; // Gets all values as an array
    const vulnerabilidadArray = vulnerabilidad ? parseQueryParam(vulnerabilidad) : null;
    
    // Fetch the db.json data
    let response = await axios.get("https://buscador-lasanimal.netlify.app/perro.json", {
      headers: { Accept: "application/json", "Accept-Encoding": "identity" },
    });
    let result = JSON.parse(JSON.stringify(response.data).trim());

    // Filter by Name if provided (case-insensitive)
    if (nombre) {
      result = result.filter(item => item.nombre.toLowerCase().includes(nombre.toLowerCase()));
    }
    // Filter by Sex if provided
    if (sexArray) {
      result = result.filter(item => item.sexo && sexArray.includes(item.sexo.toLowerCase()));
    }
    // Filter by Size if provided
    if (sizeArray) {
      result = result.filter(item => item.tamaño && sizeArray.includes(item.tamaño.toLowerCase()));
    }
    // Filter by Size if provided
    if (ageArray) {
      result = result.filter(item => item.edad_tramo && ageArray.includes(item.edad_tramo.toLowerCase()));
    }

     if (vulnerabilidadArray) {
      const isPPP = vulnerabilidadArray.includes("ppp")
      if (isPPP){
        result = result.filter(item => item.ppp && item.ppp === true);
      }
      const isVet = vulnerabilidadArray.includes("veterano")
      if (isVet){
        result = result.filter(item => item.antiguedad_numero && item.antiguedad_numero > 3);
      }
      const isSick = vulnerabilidadArray.includes("enfermo")
      if (isSick){
        result = result.filter( item => item.estado_salud != null );
      }  
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
