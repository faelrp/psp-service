import balance from './balance';
import DynamoDB from './connector';
import { PayablesType } from './payables';

jest.mock('./connector');

// @ts-ignore
const dynamoPromise = DynamoDB.getPromise();
const { put, update, get } = DynamoDB.getDocumentClient();

describe('DynamoDb - Balance', () => {
  beforeAll(() => dynamoPromise.mockResolvedValue());
  afterEach(() => jest.clearAllMocks());

  describe('init', () => {
    test('Happy path should work', async () => {
      await balance.init({ status: PayablesType.PAID });

      expect(put).toHaveBeenCalledTimes(1);
      // @ts-ignore
      expect(put.mock.calls).toMatchSnapshot();
    });
  });
  describe('update', () => {
    test('Happy path should work', async () => {
      await balance.update({ status: PayablesType.PAID, amount: 10 });

      expect(update).toHaveBeenCalledTimes(1);
      // @ts-ignore
      expect(update.mock.calls).toMatchSnapshot();
    });
  });
  describe('get', () => {
    test('Happy path should work', async () => {
      dynamoPromise.mockResolvedValue({ Item: { unit: 'test' } });
      const balanceResult = balance.get({ status: PayablesType.PAID });

      expect(balanceResult).resolves.toMatchSnapshot();

      expect(get).toHaveBeenCalledTimes(1);
      // @ts-ignore
      expect(get.mock.calls).toMatchSnapshot();
    });
  });
});
