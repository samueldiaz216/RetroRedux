"use strict";

var crypto = require("crypto"); // The next two functions help us generate the code challenge
// required by Etsy’s OAuth implementation.


var base64URLEncode = function base64URLEncode(str) {
  return str.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
};

var sha256 = function sha256(buffer) {
  return crypto.createHash("sha256").update(buffer).digest();
}; // We’ll use the verifier to generate the challenge.
// The verifier needs to be saved for a future step in the OAuth flow.


var codeVerifier = base64URLEncode(crypto.randomBytes(32)); // With these functions, we can generate
// the values needed for our OAuth authorization grant.

var codeChallenge = base64URLEncode(sha256(codeVerifier));
var state = Math.random().toString(36).substring(7);
console.log("State: ".concat(state));
console.log("Code challenge: ".concat(codeChallenge));
console.log("Code verifier: ".concat(codeVerifier));
console.log("Full URL: https://www.etsy.com/oauth/connect?response_type=code&redirect_uri=http://localhost:3003/oauth/redirect&scope=email_r&client_id=3o11obtplbty1mhwh5hqy3gz&state=".concat(state, "&code_challenge=").concat(codeChallenge, "&code_challenge_method=S256"));