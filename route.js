/*
title: ekhane amra route er kaj korbo
*/

// step-11: ekhane age sampleHandler ta niye aste hobe file er akare, then eta je route er jonno kaj korbe sei route er sathe add kore dite hobe

// dependencies
const { sampleHandler } = require("./handlers/routerHandlers/sampleHandler");

const routes = {
  sample: sampleHandler,
};

module.exports = routes;
