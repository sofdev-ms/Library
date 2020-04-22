const express = require('express');
const bookController = require('../controllers/bookController');
const goodReadService = require('../services/goodReadService');

const bookRouter = express.Router();

const { getIndex, getById, middleware } = bookController(goodReadService);
bookRouter.use(middleware);
bookRouter.route('/')
  .get(getIndex);

bookRouter.route('/:id')
  .get(getById);
module.exports = bookRouter;
