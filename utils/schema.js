const Joi = require("joi");

module.exports = {
  AddCat: Joi.object({
    name: Joi.string().required(),
    image: Joi.string().required(),
    user: Joi.optional(),
  }),
  RegisterSchema: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(8).max(11).required(),
    password: Joi.string().min(6).max(25).required(),
  }),
  CommentSchema: Joi.object({
    postId: Joi.string().regex(/^[0-9a-fA-f]{24}$/),
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    context: Joi.string().required(),
    user: Joi.optional(),
  }),
  PostSchema: Joi.object({
    cat: Joi.string().regex(/^[0-9a-fA-f]{24}$/),
    tag: Joi.string().regex(/^[0-9a-fA-f]{24}$/),

    title: Joi.string().required(),
    image: Joi.string().required(),
    desc: Joi.string().required(),
    user: Joi.optional(),
  }),
  allSchema: {
    id: Joi.object({
      id: Joi.string().regex(/^[0-9a-fA-f]{24}$/),
    }),
    image: Joi.object({
      image: Joi.string().required(),
    }),
    page : Joi.object({
      page : Joi. number().required()
    })
  },
};
