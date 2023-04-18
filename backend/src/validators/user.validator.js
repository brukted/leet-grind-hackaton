const Joi = require('joi');

const userSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    lastname: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    phone: Joi.string().min(5).max(255).required().regex(/^\+\d{12}$/).messages(
        { 'string.pattern.base': 'Phone number must be in international format (e.g. +251901234567)' }),
    linkedin: Joi.string().min(5).max(255).required().regex(/^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9]+\/?$/).messages(
        { 'string.pattern.base': 'LinkedIn profile must be a valid URL (e.g. https://www.linkedin.com/in/username)' }),
    github: Joi.string().min(5).max(255).required().regex(/^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9]+\/?$/).messages(
        { 'string.pattern.base': 'GitHub profile must be a valid URL (e.g. https://www.github.com/username)' }),
    telegram: Joi.string().min(5).max(255).required().regex(/^(https?:\/\/)?(www\.)?t.me\/[a-zA-Z0-9]+\/?$/).messages(
        { 'string.pattern.base': 'Telegram profile must be a valid URL (e.g. https://t.me/username)' }),
});

const registerSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    lastname: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
    phone: Joi.string().min(5).max(255).required().regex(/^\+\d{12}$/).messages(
        { 'string.pattern.base': 'Phone number must be in international format (e.g. +251901234567)' }),
    linkedin: Joi.string().min(5).max(255).required().regex(/^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9]+\/?$/).messages(
        { 'string.pattern.base': 'LinkedIn profile must be a valid URL (e.g. https://www.linkedin.com/in/username)' }),
    github: Joi.string().min(5).max(255).required().regex(/^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9]+\/?$/).messages(
        { 'string.pattern.base': 'GitHub profile must be a valid URL (e.g. https://www.github.com/username)' }),
    telegram: Joi.string().min(5).max(255).required().regex(/^(https?:\/\/)?(www\.)?t.me\/[a-zA-Z0-9]+\/?$/).messages(
        { 'string.pattern.base': 'Telegram profile must be a valid URL (e.g. https://t.me/username)' }),
});

const loginSchema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
});

const validateSignup = (req, res, next) => {
    const { error } = registerSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

const validateLogin = (req, res, next) => {
    const { error } = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

const validateUser = (req, res, next) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

module.exports = {
    validateUser,
    validateRegister: validateSignup,
    validateLogin
};
