import * as Joi from 'joi';

interface ILogin {
  email: string;
  password: string;
}

const REQUIRED_FIELD = 'JoiError|400|All fields must be filled';
const MIN_LENGTH = 'JoiError|401|{#label} length must be at least {#limit} characters long';
const INCORRECT_FORMAT = 'JoiError|401|Incorrect email or password';

const loginValidate = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': REQUIRED_FIELD,
    'string.empty': REQUIRED_FIELD,
    'string.email': INCORRECT_FORMAT,
  }),
  password: Joi.string().min(6).required().messages({
    'any.required': REQUIRED_FIELD,
    'string.empty': REQUIRED_FIELD,
    'string.min': MIN_LENGTH,
  }),
});

export { ILogin, loginValidate };
