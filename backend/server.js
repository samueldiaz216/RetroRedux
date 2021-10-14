// Import the express and fetch libraries
const express = require('express');
const fetch = require("node-fetch");
const cors = require('cors');
const hbs = require("hbs");

require('dotenv').config();

// Create a new express application
const app = express();
app.use(cors());
app.use(express.json());
app.set("view engine", "hbs");
app.set("views", `${process.cwd()}/views`);

const listingsRouter = require('./routes/listings');

app.use('/listings/', listingsRouter);

// Send a JSON response to a default get request
app.get('/ping', async (req, res) => {
    const requestOptions = {
        'method': 'GET',
        'headers': {
            'x-api-key':'3o11obtplbty1mhwh5hqy3gz',
            'Authorization':`Bearer 377763137.EV_5F_wggA5qD6UtHz9-5EI9rfG2ZWrDwcQNwNPPXtfMuHtAn2b8iC7rvJ5ayfgO-kU9eFRzH66NHlyxQHCr2_cQTR`
        },
    };

    const response = await fetch(
        'https://openapi.etsy.com/v3/application/shops/25644150/listings/981126603/images',
        requestOptions
    );

    if (response.ok) {
        const data = await response.json();
        res.send(data);
    } else {
        // Log http status to the console
        console.log(response.status, response.statusText);

        // For non-500 errors, the endpoints return a JSON object as an error response
        const errorData = await response.json();
        console.log(errorData);

        res.send("oops");
    }
});

// This renders our `index.hbs` file.
app.get('/', async (req, res) => {
    res.render("index");
});

/**
These variables contain your API Key, the state sent
in the initial authorization request, and the client verifier compliment
to the code_challenge sent with the initial authorization request
*/
const clientID = '3o11obtplbty1mhwh5hqy3gz';
const clientVerifier = 'xbA_ZEQlsXvv9JIMyGQeE3QmxbLSBINJyoR7S9MzW8E';
const redirectUri = 'http://localhost:3003/oauth/redirect';

app.get("/oauth/redirect", async (req, res) => {
    // The req.query object has the query params that Etsy authentication sends
    // to this route. The authorization code is in the `code` param
    const authCode = req.query.code;
    console.log(authCode);
    
});

app.get("/welcome", async (req, res) => {
    // We passed the access token in via the querystring
    const { access_token } = req.query;

    // An Etsy access token includes your shop/user ID
    // as a token prefix, so we can extract that too
    const user_id = access_token.split('.')[0];

    const requestOptions = {
        headers: {
            'x-api-key': clientID,
            // Scoped endpoints require a bearer token
            Authorization: `Bearer ${access_token}`,
        }
    };

    const response = await fetch(
        `https://openapi.etsy.com/v3/application/users/${user_id}`,
        requestOptions
    );

    if (response.ok) {
        const userData = await response.json();
        // Load the template with the first name as a template variable.
        res.render("welcome", {
            first_name: userData.first_name
        });
    } else {
        // Log http status to the console
        console.log(response.status, response.statusText);

        // For non-500 errors, the endpoints return a JSON object as an error response
        const errorData = await response.json();
        console.log(errorData);
        res.send("oops");
    }
});

// Start the server on port 3003
const port = 3003;
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});