const validate = (schema, payload) => {
  try {
    const options = { strict: true };
    schema.validateSync(payload, options);
  } catch (error) {
    return error;
  }

  return null;
};

export default { validate };
