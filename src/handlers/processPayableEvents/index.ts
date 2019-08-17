import payableStreamHandler from '../../utils/event-source-wrapper/payableStreamHandler';
import enqueueBalanceConsolidation from '../../utils/sqs/enqueueBalanceConsolidation';

const handler = async payableEvent => enqueueBalanceConsolidation(payableEvent);

export const processPayableEventsHandler = payableStreamHandler(handler);
