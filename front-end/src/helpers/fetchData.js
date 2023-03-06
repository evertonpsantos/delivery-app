async function fetchData(endpoint) {
  try {
    const response = await fetch(endpoint);
    const json = await response.json();

    if (!json) throw new Error('Error');

    return json;
  } catch (error) {
    return error.message;
  }
}

module.exports = fetchData;
