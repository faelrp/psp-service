import AWS from 'aws-sdk';
import config from '../../config';
import { Transaction } from '../dynamodb/transactions';

interface Params {
  transaction: Transaction;
}

const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });

export default async ({ transaction }: Params) => {
  const {
    aws: {
      sqs: { creditCardOpsQueue },
    },
  } = config;

  const params = {
    QueueUrl: creditCardOpsQueue,
    MessageBody: JSON.stringify(transaction),
  };

  console.log('Enqueuing credit card op', transaction);
  return sqs.sendMessage(params).promise();
};
