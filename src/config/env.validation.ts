import * as Joi from 'joi';

export const EnvVariablesValidationSchema = Joi.object({
  APP_PORT: Joi.string().allow('', null),

  LOG_LEVEL: Joi.string().valid('error', 'info', 'debug'),
  LOGS_PATH: Joi.string().allow('', null),
  SERVICE_NAME: Joi.string().allow('', null),
});
