import apigwHandler from '../../utils/event-source-wrapper/apigwHandler';
import balance from '../../utils/dynamodb/balance';
import { PayablesType } from '../../utils/dynamodb/payables';

const handler = async () => {
  const paidBalance = await balance.get({ status: PayablesType.PAID });
  const waitingBalance = await balance.get({ status: PayablesType.WAITING_FUNDS });

  return {
    [PayablesType.PAID]: paidBalance.amount || 0,
    [PayablesType.WAITING_FUNDS]: waitingBalance.amount || 0,
  };
};

export const getBalanceHandler = apigwHandler(handler);
