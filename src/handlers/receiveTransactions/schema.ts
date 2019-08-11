import * as yup from 'yup';

export default yup.object().shape({
  id: yup.string().required(),
  type: yup.string().required(),
  description: yup.string().required(),
  card: yup.object().required().shape({
    number: yup.string().required(),
    name: yup.string().required(),
    exp: yup.string().required(),
    cvv: yup.string().required(),
  }),
  amount: yup.number().required(),
});
