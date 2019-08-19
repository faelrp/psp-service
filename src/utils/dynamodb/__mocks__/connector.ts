const promise = jest.fn();

const documentClient = {
  put: jest.fn().mockReturnValue({ promise }),
  update: jest.fn().mockReturnValue({ promise }),
  get: jest.fn().mockReturnValue({ promise }),
};

export default {
  getDocumentClient: () => documentClient,
  getPromise: () => promise,
};
