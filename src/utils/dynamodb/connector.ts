import AWS from 'aws-sdk';

const getDocumentClient = () => new AWS.DynamoDB.DocumentClient();

export default { getDocumentClient };
