import apigwHandler from '../../utils/event-source-wrapper/apigwHandler';
import transactions from '../../utils/dynamodb/transactions';

const handler = async () => transactions.list();

export const getTransactionsHandler = apigwHandler(handler);
