const Joi = require('joi');
const message = require('../messages');
const { ErrorHandler } = require('../middleware/handleError');

module.exports = async (req, res, next) => {
    try {
        const schema = Joi.object().keys({

            partnerId: Joi.number().required(),
            clientType: Joi.string().required(),
            releaseDate: Joi.string().required(),
            totalValue: Joi.number().required().positive(),
            rate: Joi.number().required(),
            quotaAmount: Joi.number().required(),
            firstDueDate: Joi.string().required(),
            iofValue: Joi.number().required(),
            commission: Joi.number().required(),
            cessionValue: Joi.number().required(),
            quotaValue: Joi.number().required(),
            client : {
                document: Joi.string().required(),
                nameOrCompanyName: Joi.string(),
                postalCode: Joi.string().required(),
                address: Joi.string().required(),
                district: Joi.string().required(),
                city: Joi.string().required(),
                state: Joi.string().required(),
                phone: Joi.string().required(),
                email: Joi.string().required(),
                score: Joi.number().required(),
                rating: Joi.string().required(),
                billing: Joi.number().required()
            }
           
        });

        const { error, value } = schema.validate(req.body, { abortEarly: false });

        let detailError = "";

        if (error) {

            error.details.forEach(element => {
                if (detailError.length == 0) {
                    detailError = element.message.replace(/\"/g, "");
                } else {
                    detailError = detailError + ' , ' + element.message.replace(/\"/g, "");
                }
            });
            await message.addMessageData(res, {
                validateBody: 'Invalid',
                details: detailError
            });
            return next(new ErrorHandler(400, detailError));
        } else {
            //caso o formulário seja validado ele passa a req.bodySchema
            await message.addMessage(res, 'Body', 'valid');
            req.bodySchema = value;
            return next();
        }

    } catch (e) {
        return next(new ErrorHandler(500, e.message));
    }
}