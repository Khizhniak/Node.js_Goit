const Joi = require("joi");
const {
    HttpCode
} = require('../helpers/constants')

const schemaCreateContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().required(),
  phone: Joi.number().required(),
});

const schemaUpdateContact = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).optional(),
    email: Joi.string().optional(),
    phone: Joi.number().optional(),
  });

const validate = (schema, body, next) => {
    const { error } = schema.validate(body)
    if(error) {
        const [{message}] = error.details
        return next({
            status: HttpCode.BAD_REQUEST,
            message: `Filed: ${message.replace(/"/g, '')}`,
            data: 'Bad Request'
        })
    }
    next()
}

module.exports.validateCreateContact = (req, res, next) => {
    return validate(schemaCreateContact, req.body, next)
}
module.exports.validateUpdateContact = (req, res, next) => {
    return validate(schemaUpdateContact, req.body, next)
}
