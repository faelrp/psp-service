import AWS from 'aws-sdk';
import config from '../../config';

const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });

export default async payableEvent => {
  const {
    aws: {
      sqs: { balanceConsolidationQueue },
    },
  } = config;

  const params = {
    QueueUrl: balanceConsolidationQueue,
    MessageBody: JSON.stringify(payableEvent),
  };
  console.log('Enqueuing payable in order to update payable balance', payableEvent);
  return sqs.sendMessage(params).promise();
};
