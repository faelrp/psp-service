const success = (statusCode, data) => ({
  statusCode,
  body: JSON.stringify(data),
});

export default targetHandler => async event => {
  try {
    let body;
    if (event.httpMethod !== 'GET') {
      body = JSON.parse(event.body);
    }

    const data = await targetHandler({
      body,
    });

    return success(200, data);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
