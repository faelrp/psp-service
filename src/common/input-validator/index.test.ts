import * as yup from 'yup';
import inputValidator from './index';

describe('Schema validator', () => {
  test('should not be valid if input not respect the field type', () => {
    const schema = yup.object().shape({
      test: yup.string(),
    });
    const payload = { test: 123 };

    expect(inputValidator.validate(schema, payload)).toMatchSnapshot();
  });

  test('should not be valid if required field is missing', () => {
    const schema = yup.object().shape({
      test: yup.string().required(),
    });
    const payload = {};

    expect(inputValidator.validate(schema, payload)).toMatchSnapshot();
  });

  test('should return null if optional field is missing', () => {
    const schema = yup.object().shape({
      test: yup.string(),
    });
    const payload = {};

    expect(inputValidator.validate(schema, payload)).toMatchSnapshot();
  });
});
