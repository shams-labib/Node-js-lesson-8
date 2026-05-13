/*
title: Handle Request Response
*/

// dependencies
// step-1, ekhane node js er default url value er maddome amra path er kaj korbo
const url = require("url");
const { StringDecoder } = require("string_decoder");
// step-11 : ekhane amra routes handler ta niye ashbo, sathe not Found path er jonno notFound Path
const routes = require("../route");
const {
  notFoundHandler,
} = require("../handlers/routerHandlers/notFoundHandler");

// Module Scaffolding
const handler = {};

handler.handleReqRes = (req, res) => {
  // step-2: ekhon amra url take parse kore dekhbo ekhane amra ki posci, ekhane true dile /about?a=6&b-7 esb soho pabo, ar false dile just path ta pabo
  const parseUrl = url.parse(req.url, true);
  const path = parseUrl.pathname;
  //   step-3: ekhane user path ta /about/ evabeo dite pare, but amake sothik path ta pete nicher regular expression ta use korte hobe
  const trimmedPath = path.replace(/^\/+|\/+$/g, "");
  //    step-4 : ekhon path er modde boro hok ba choto amake path ta right way te pete method ta tolowercase e convert kore nite hobe
  const method = req.method.toLowerCase();
  //   step-5: amra parseUrl console.log er somoy dekhesilam query property er modde query gulo passilam
  const queryStringObject = parseUrl.query;
  //   step-6: ami header somporke temon ekta jantam na, headers er modde onk gulo data thake, eta check korte
  const headersObject = req.headers;
  //   step-7: ekhon amra age dekhsilam stream and buffer er kahini, so ekhon jokhon ekjon user post korbe kisu seta string akare paoayar jonno node js amader ekta jinish dey, name : "string_decoder", eta amra opur theke niye eshe kaj korchi, caile eta tumi dekhte paro:

  const decoder = new StringDecoder("utf-8");
  //   step-8: je data ta buffer hoye stream e aste thakbe seta amra realData er modde rekhe kaj korbo
  let realData = "";

  //   Step-13 : ekhon jehetu step-12 er sob gulo handler baire theke asbe so amader sob data gulo ekta object er modde rekhe baire pathay dite hobe

  const requestProperties = {
    parseUrl,
    path,
    trimmedPath,
    method,
    queryStringObject,
    headersObject,
  };

  //   step-12: ekhane amra chose korbo je path ta thakbe setar jonno sei path, ar path ta jdi na thake tahole Not Found handle diye dibo

  const chosenHandler = routes[trimmedPath]
    ? routes[trimmedPath]
    : notFoundHandler;

  // step-14 : ekhon amra chosenhandler er modde property pathabo and payload hisebe output nibo and check korbo
  chosenHandler(requestProperties, (statusCode, payload) => {
    // step-15: ekhon amader ekhane check kore nite hobe "statusCode and payload" thik vabe kaj kortese ki na!
    statusCode = typeof statusCode === "number" ? statusCode : 500;
    payload = typeof payload === "object" ? payload : {};
    // step-16 : ekhon ekhane just payload take server e pathailei hobe na sathe take valid JSON.stringyfy e convert kore thene pathate hobe
    const payloadString = JSON.stringify(payload);
    // step-17: finally ekhon amader response mal ke dekhar pala
    res.writeHead(statusCode);
    res.end(payloadString);
  });

  req.on("data", (buffer) => {
    realData += decoder.write(buffer);
  });

  //   step-9: ekhon ei data to nischi, etake off korar jonnno ei function ta korte hobe
  req.on("end", () => {
    realData += decoder.end();
    console.log(realData);

    res.end("Hello world");
  });
};

module.exports = handler;
