import {
  alpha_spaces as alphaSpaces,
  confirmed,
  email,
  max,
  max_value as maxVal,
  min,
  min_value as minVal,
  not_one_of as excluded,
  // eslint-disable-next-line comma-dangle
  required
} from '@vee-validate/rules';
import {

  defineRule,
  ErrorMessage,
  Field as VeeField,
  // eslint-disable-next-line comma-dangle
  Form as VeeForm
} from 'vee-validate';

export default {
  install(app) {
    app.component('VeeForm', VeeForm);
    app.component('VeeField', VeeField);
    app.component('ErrorMessage', ErrorMessage);

    defineRule('required', required);
    defineRule('min', min);
    defineRule('max', max);
    defineRule('alpha_spaces', alphaSpaces);
    defineRule('email', email);
    defineRule('min_value', minVal);
    defineRule('max_value', maxVal);
    defineRule('confirmed', confirmed);
    defineRule('excluded', excluded);
  },
};
