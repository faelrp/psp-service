import DynamoDB from './connector';
import config from '../../config';

import { PayablesType } from './payables';

const documentClient = DynamoDB.getDocumentClient();

export interface BalanceEvent {
  status: PayablesType;
  amount: number;
}

interface InitParams {
  status: PayablesType;
}

const {
  aws: {
    dynamodb: { payablesBalanceTable },
  },
} = config;

const init = async (balance: InitParams) => {
  const params = {
    TableName: payablesBalanceTable,
    Item: {
      ...balance,
      amount: 0,
    },
    ConditionExpression: 'attribute_not_exists(#status)',
    ExpressionAttributeNames: { '#status': 'status' },
  };

  try {
    await documentClient.put(params).promise();
  } catch (error) {
    // ConditionalCheckFailedException means that the balance was
    // already initiated, so its good to go.
    if (error.code !== 'ConditionalCheckFailedException') {
      throw error;
    }
  }
};

const update = async ({ status, amount }: BalanceEvent) => {
  await init({ status });

  const params = {
    TableName: payablesBalanceTable,
    Key: {
      status,
    },
    UpdateExpression: 'set amount = amount + :value',
    ExpressionAttributeValues: { ':value': Number(amount) },
  };

  await documentClient.update(params).promise();
};

const get = async ({ status }) => {
  const params = {
    TableName: payablesBalanceTable,
    Key: {
      status,
    },
  };

  const { Item } = await documentClient.get(params).promise();

  return Item || {};
};

export default {
  init,
  update,
  get,
};
