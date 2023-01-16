const Joi = require("joi");

module.exports = {
  AddCat: Joi.object({
    name: Joi.string().required(),
    image: Joi.string().required(),
  }),
  RegisterSchema: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(8).max(11).required(),
    password: Joi.string().min(6).max(25).required(),
  }),
  PostSchema: Joi.object({
    cat: Joi.string().regex(/^[0-9a-fA-f]{24}$/),
    title: Joi.string().required(),
    image: Joi.string().required(),
    desc: Joi.string().required(),
    user:Joi.optional()
  }),
  allSchema: {
    id: Joi.object({
      id: Joi.string().regex(/^[0-9a-fA-f]{24}$/),
    }),
    image: Joi.object({
      image: Joi.string().required(),
    }),
  },
};
