require("dotenv").config();
const axios = require("axios");

exports.handler = async (event, context) => {
  try {
    /*
    // Extract query parameters
    //const { nombre, tamaño, sexo, edad, ppp, salud, antiguedad } = event.queryStringParameters;

    // Convert repeated parameters into arrays
    const parseQueryParam = param => (Array.isArray(param) ? param.map(p => p.toLowerCase()) : [param.toLowerCase()]);

    const sizeArray = tamaño ? parseQueryParam(tamaño) : null;
    const sexArray = sexo ? parseQueryParam(sexo) : null;
    const ageRangeArray = edad ? parseQueryParam(edad) : null;
    */

    // Fetch the db.json data
    let response = await axios.get("https://buscador-lasanimal.netlify.app/perro.json", {
      headers: { Accept: "application/json", "Accept-Encoding": "identity" },
    });
    let data = JSON.parse(JSON.stringify(response.data).trim());
    let result = data.slice(0,5)

    /*
    // Filter by Name if provided (case-insensitive)
    if (nombre) {
      result = result.filter(item => item.nombre.toLowerCase().includes(nombre.toLowerCase()));
    }

    // Filter by Size if provided
    if (sizeArray) {
      result = result.filter(item => item.tamaño && sizeArray.includes(item.tamaño.toLowerCase()));
    }

    // Filter by Sex if provided
    if (sexArray) {
      result = result.filter(item => item.sexo && sexArray.includes(item.sexo.toLowerCase()));
    }

    // Filter by Age Range if provided
    if (ageRangeArray) {
      result = result.filter(item => item.edad_tramo && ageRangeArray.includes(item.edad_tramo.toLowerCase()));
    }

    // Filter by PPP if provided (expects "true" or "false")
    if (ppp) {
      const isPPP = ppp.toLowerCase() === "true";
      result = result.filter(item => item.ppp === isPPP);
    }

    if (antiguedad) {
      const isVeteran = antiguedad.toLowerCase() === 'veterano';
      if (isVeteran){
        result = result.filter(item => item.antiguedad_numero && item.antiguedad_numero > 3);
      }
    }
    if (salud) {
      const isSick = salud.toLowerCase() === "enfermo";
      if(isSick){
        result = result.filter(item => item.estado_salud != null);
      }
    }
    */
    
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
