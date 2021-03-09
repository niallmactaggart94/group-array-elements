
/**
 * @file
 * @module Group Array Elements controller
 * @description Will call the controllers getData function if the request is a GET
 */

const express = require('express');
const controller = require('./groupArrayElements.controller');
const router = express.Router();

/**
 * @name route GET
 * @function
 * @description Requests to get the contents of an array divided into N equally sized arrays
 * @param {string} Route that following functions will be applied to
 */
router.get('/',
  controller.getData
);

/**
 * @name route ALL
 * @function
 * @description Will return a 404 if none of the above URLs are matched
 * @param {string} Route that following functions will be applied to
 */
router.all('/*', (req, res) => res.status(404).send({message: "API Not Found"}));

module.exports = router;
