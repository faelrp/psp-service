import sqsHandler from '../../utils/event-source-wrapper/sqsHandler';

import balance, { BalanceEvent } from '../../utils/dynamodb/balance';

interface Params {
  payload: BalanceEvent;
}

const handler = async ({ payload: balanceEvent }: Params) => balance.update(balanceEvent);

export const processBalanceConsolidationQueueHandler = sqsHandler(handler);
