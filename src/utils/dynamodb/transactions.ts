import DynamoDB from './connector';
import config from '../../config';

const documentClient = DynamoDB.getDocumentClient();

interface Card {
  number: string;
  name: string;
  exp: string;
  cvv: string;
}

export interface Transaction {
  id: string;
  type: string;
  description: string;
  card: Card;
  amount: number;
}

interface Add {
  hash: string;
  transaction: Transaction;
}

const add = async ({ hash, transaction }: Add) => {
  const {
    aws: {
      dynamodb: { transactionsTable },
    },
  } = config;

  const { id } = transaction;
  const ts = new Date().getTime();
  const params = {
    TableName: transactionsTable,
    Item: {
      id,
      hash,
      transaction: JSON.stringify(transaction),
      ts,
    },
    ConditionExpression: 'attribute_not_exists(#hash)',
    ExpressionAttributeNames: { '#hash': 'hash' },
  };

  await documentClient.put(params).promise();
};

export default {
  add,
};
