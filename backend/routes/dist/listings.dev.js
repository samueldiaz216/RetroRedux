"use strict";

var express = require('express');

var fetch = require('node-fetch');

var cheerio = require('cheerio');

var router = express.Router();
router.get('/', function _callee(req, res) {
  var access_token, requestOptions, response, data, errorData;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(getAccessToken());

        case 2:
          access_token = _context.sent;
          requestOptions = {
            'method': 'GET',
            'headers': {
              'x-api-key': '3o11obtplbty1mhwh5hqy3gz',
              'Authorization': "Bearer ".concat(access_token)
            }
          };
          _context.next = 6;
          return regeneratorRuntime.awrap(fetch('https://openapi.etsy.com/v3/application/shops/25644150/listings', requestOptions));

        case 6:
          response = _context.sent;

          if (!response.ok) {
            _context.next = 15;
            break;
          }

          _context.next = 10;
          return regeneratorRuntime.awrap(response.json());

        case 10:
          data = _context.sent;
          console.log(data.results);
          res.json(data.results);
          _context.next = 21;
          break;

        case 15:
          // Log http status to the console
          console.log(response.status, response.statusText); // For non-500 errors, the endpoints return a JSON object as an error response

          _context.next = 18;
          return regeneratorRuntime.awrap(response.json());

        case 18:
          errorData = _context.sent;
          console.log(errorData);
          res.json("oops");

        case 21:
        case "end":
          return _context.stop();
      }
    }
  });
});
router.get('/:id/images', function _callee2(req, res) {
  var access_token, requestOptions, response, data, errorData;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(getAccessToken());

        case 2:
          access_token = _context2.sent;
          requestOptions = {
            'method': 'GET',
            'headers': {
              'x-api-key': '3o11obtplbty1mhwh5hqy3gz',
              'Authorization': "Bearer ".concat(access_token)
            }
          };
          _context2.next = 6;
          return regeneratorRuntime.awrap(fetch("https://openapi.etsy.com/v3/application/shops/".concat(process.env.SHOP_ID, "/listings/").concat(req.params.id, "/images"), requestOptions));

        case 6:
          response = _context2.sent;

          if (!response.ok) {
            _context2.next = 14;
            break;
          }

          _context2.next = 10;
          return regeneratorRuntime.awrap(response.json());

        case 10:
          data = _context2.sent;
          res.json(data.results);
          _context2.next = 20;
          break;

        case 14:
          // Log http status to the console
          console.log(response.status, response.statusText); // For non-500 errors, the endpoints return a JSON object as an error response

          _context2.next = 17;
          return regeneratorRuntime.awrap(response.json());

        case 17:
          errorData = _context2.sent;
          console.log(errorData);
          res.json("oops");

        case 20:
        case "end":
          return _context2.stop();
      }
    }
  });
});

function getAccessToken() {
  var requestOptions, response, data, errorData;
  return regeneratorRuntime.async(function getAccessToken$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          requestOptions = {
            method: 'POST',
            body: JSON.stringify({
              grant_type: "refresh_token",
              client_id: "3o11obtplbty1mhwh5hqy3gz",
              refresh_token: "377763137.0DFLAVVM088POxyh_1R3FAFcD5Gk4iJueVBpP1mlbuOvX8tEpjdZAslOe7oJaq1mRUPxDnhmoCMvy1IAk0yHRX-A-M"
            }),
            headers: {
              'Content-Type': 'application/json'
            }
          };
          _context3.next = 3;
          return regeneratorRuntime.awrap(fetch('https://api.etsy.com/v3/public/oauth/token', requestOptions));

        case 3:
          response = _context3.sent;

          if (!response.ok) {
            _context3.next = 11;
            break;
          }

          _context3.next = 7;
          return regeneratorRuntime.awrap(response.json());

        case 7:
          data = _context3.sent;
          return _context3.abrupt("return", data.access_token);

        case 11:
          // Log http status to the console
          console.log(response.status, response.statusText); // For non-500 errors, the endpoints return a JSON object as an error response

          _context3.next = 14;
          return regeneratorRuntime.awrap(response.json());

        case 14:
          errorData = _context3.sent;
          console.log(errorData);

        case 16:
        case "end":
          return _context3.stop();
      }
    }
  });
}

module.exports = router;