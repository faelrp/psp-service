import apigwHandler from '../../utils/event-source-wrapper/apigwHandler';
import inputValidator from '../../common/input-validator';
import schema from './schema';

import enqueueTransaction from '../../utils/sqs/enqueueTransaction';

const handler = async ({ body: transaction }) => {
  const error = inputValidator.validate(schema, transaction);
  if (error) throw error;

  await enqueueTransaction({ transaction });

  return { success: true };
};

export const receiveTransactionsHandler = apigwHandler(handler);
