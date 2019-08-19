import crypto from 'crypto';
import hash from './index';

describe('Hash Helper', () => {
  test('should not be valid if input not respect the field type', () => {
    const createHashSpy = jest.spyOn(crypto, 'createHash');

    expect(hash.getTransactionHash({ transaction: 'test' })).toMatchSnapshot();

    expect(createHashSpy).toHaveBeenCalledTimes(1);
    expect(createHashSpy).toHaveBeenCalledWith('sha256');
  });
});
