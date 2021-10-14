"use strict";

// Import the express and fetch libraries
var express = require('express');

var fetch = require("node-fetch");

var cors = require('cors');

var hbs = require("hbs");

require('dotenv').config(); // Create a new express application


var app = express();
app.use(cors());
app.use(express.json());
app.set("view engine", "hbs");
app.set("views", "".concat(process.cwd(), "/views"));

var listingsRouter = require('./routes/listings');

app.use('/listings/', listingsRouter); // Send a JSON response to a default get request

app.get('/ping', function _callee(req, res) {
  var requestOptions, response, data, errorData;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          requestOptions = {
            'method': 'GET',
            'headers': {
              'x-api-key': '3o11obtplbty1mhwh5hqy3gz',
              'Authorization': "Bearer 377763137.EV_5F_wggA5qD6UtHz9-5EI9rfG2ZWrDwcQNwNPPXtfMuHtAn2b8iC7rvJ5ayfgO-kU9eFRzH66NHlyxQHCr2_cQTR"
            }
          };
          _context.next = 3;
          return regeneratorRuntime.awrap(fetch('https://openapi.etsy.com/v3/application/shops/25644150/listings/981126603/images', requestOptions));

        case 3:
          response = _context.sent;

          if (!response.ok) {
            _context.next = 11;
            break;
          }

          _context.next = 7;
          return regeneratorRuntime.awrap(response.json());

        case 7:
          data = _context.sent;
          res.send(data);
          _context.next = 17;
          break;

        case 11:
          // Log http status to the console
          console.log(response.status, response.statusText); // For non-500 errors, the endpoints return a JSON object as an error response

          _context.next = 14;
          return regeneratorRuntime.awrap(response.json());

        case 14:
          errorData = _context.sent;
          console.log(errorData);
          res.send("oops");

        case 17:
        case "end":
          return _context.stop();
      }
    }
  });
}); // This renders our `index.hbs` file.

app.get('/', function _callee2(req, res) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          res.render("index");

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
});
/**
These variables contain your API Key, the state sent
in the initial authorization request, and the client verifier compliment
to the code_challenge sent with the initial authorization request
*/

var clientID = '3o11obtplbty1mhwh5hqy3gz';
var clientVerifier = 'xbA_ZEQlsXvv9JIMyGQeE3QmxbLSBINJyoR7S9MzW8E';
var redirectUri = 'http://localhost:3003/oauth/redirect';
app.get("/oauth/redirect", function _callee3(req, res) {
  var authCode;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          // The req.query object has the query params that Etsy authentication sends
          // to this route. The authorization code is in the `code` param
          authCode = req.query.code;
          console.log(authCode);

        case 2:
        case "end":
          return _context3.stop();
      }
    }
  });
});
app.get("/welcome", function _callee4(req, res) {
  var access_token, user_id, requestOptions, response, userData, errorData;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          // We passed the access token in via the querystring
          access_token = req.query.access_token; // An Etsy access token includes your shop/user ID
          // as a token prefix, so we can extract that too

          user_id = access_token.split('.')[0];
          requestOptions = {
            headers: {
              'x-api-key': clientID,
              // Scoped endpoints require a bearer token
              Authorization: "Bearer ".concat(access_token)
            }
          };
          _context4.next = 5;
          return regeneratorRuntime.awrap(fetch("https://openapi.etsy.com/v3/application/users/".concat(user_id), requestOptions));

        case 5:
          response = _context4.sent;

          if (!response.ok) {
            _context4.next = 13;
            break;
          }

          _context4.next = 9;
          return regeneratorRuntime.awrap(response.json());

        case 9:
          userData = _context4.sent;
          // Load the template with the first name as a template variable.
          res.render("welcome", {
            first_name: userData.first_name
          });
          _context4.next = 19;
          break;

        case 13:
          // Log http status to the console
          console.log(response.status, response.statusText); // For non-500 errors, the endpoints return a JSON object as an error response

          _context4.next = 16;
          return regeneratorRuntime.awrap(response.json());

        case 16:
          errorData = _context4.sent;
          console.log(errorData);
          res.send("oops");

        case 19:
        case "end":
          return _context4.stop();
      }
    }
  });
}); // Start the server on port 3003

var port = 3003;
app.listen(port, function () {
  console.log("Example app listening at http://localhost:".concat(port));
});