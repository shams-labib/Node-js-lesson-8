/*
title: Not Found Handler! ekhane amra je path gulo pabo se path gulo jonno notFound handler call kore debo
*/

// Module scaffolding

const handler = {};
handler.notFoundHandler = (requestProperties, callback) => {
  callback(404, {
    message: "Your Requested Url Was Not Found",
  });
};

module.exports = handler;
