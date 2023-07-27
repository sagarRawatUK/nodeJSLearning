const joi = require('joi');

const userSchema = joi.object(
    {
        firstName:joi.string().min(1).max(50).required(),
        lastName:joi.string().min(1).max(50).required(),
        email: joi.string().email().required(),
    }
);

module.exports = {
    userSchema
}