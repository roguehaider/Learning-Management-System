const Joi = require('joi');
const mongoDbIdPattern = /^[0-9a-fA-F]{24}$/;
const User = require('../../models/user')