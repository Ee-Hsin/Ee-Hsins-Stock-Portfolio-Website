const Joi = require('joi');

module.exports.stockSchema = Joi.object({
    stock: Joi.object({
        name: Joi.string().required(), //title has to be a string and is required
        ticker: Joi.string().required(), 
        price: Joi.number().required(),
        IV: Joi.string(),
        category: Joi.string().required()
    }).required()
});