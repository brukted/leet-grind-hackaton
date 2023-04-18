const Joi = require('joi');

const createGigSchema = Joi.object({
    title: Joi.string().min(3).max(50).required(),
    description: Joi.string().min(5).max(255).required(),
    tags: Joi.array().items(Joi.string()).required(),
});


const validateCreateGig = (req, res, next) => {
    const { error } = createGigSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
}

module.exports = {
    validateCreateGig
}