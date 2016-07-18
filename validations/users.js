'use strict';

const Joi = require('joi');

module.exports.post = {
  body: {
    firstName: Joi.string()
      .label('First Name')
      .required()
      .trim(),
    lastName: Joi.string()
      .label('Last Name')
      .required()
      .trim(),
    email: Joi.string()
      .label('Email')
      .required()
      .email()
      .trim(),
    password: Joi.string()
      .label('Password')
      .trim()
      .required()
      .min(8),
    city: Joi.string()
      .label('City')
      .optional()
      .trim(),
    state: Joi.string()
      .label('State')
      .optional()
      .max(2)
      .trim(),
    party: Joi.string()
      .label('Political Party')
      .optional()
      .trim(),
    bio: Joi.string()
      .label('Biography')
      .optional()
      .trim()
  }
};
