/*
title: sample Handler! ekhane amra sample gulo call korle konta kon function e jabe setar kaj korbo
*/

// Module scaffolding

const handler = {};
handler.sampleHandler = (requestProperties, callback) => {
  console.log(requestProperties);
  callback(200, {
    message: "This is url",
  });
};

module.exports = handler;
