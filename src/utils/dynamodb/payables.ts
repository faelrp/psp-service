import DynamoDB from './connector';
import config from '../../config';

const documentClient = DynamoDB.getDocumentClient();

export enum PayablesType {
  PAID = 'paid',
  WAITING_FUNDS = 'waiting_funds',
}

export interface Payable {
  cardNumber: string;
  tnxHash: string;
  status: PayablesType;
  amount: number;
  paymentDate: string;
  transactionAmount: number;
}

interface Add {
  payable: Payable;
}

const add = async ({ payable }: Add) => {
  const {
    aws: {
      dynamodb: { payablesTable },
    },
  } = config;

  const ts = new Date().getTime();
  const params = {
    TableName: payablesTable,
    Item: {
      ...payable,
      ts,
    },
    ConditionExpression: 'attribute_not_exists(#tnxHash)',
    ExpressionAttributeNames: { '#tnxHash': 'tnxHash' },
  };

  await documentClient.put(params).promise();
};

export default {
  add,
};
