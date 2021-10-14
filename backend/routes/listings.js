const express = require('express');
const fetch = require('node-fetch');
const cheerio = require('cheerio');


const router = express.Router();

router.get('/', async (req,res)=>{
    //make sure you await async functions that will
    //return something
    let access_token=await getAccessToken();
    
    const requestOptions = {
        'method': 'GET',
        'headers': {
            'x-api-key':'3o11obtplbty1mhwh5hqy3gz',
            'Authorization':`Bearer ${access_token}`
        },
    };

    const response = await fetch(
        'https://openapi.etsy.com/v3/application/shops/25644150/listings',
        requestOptions
    );

    if (response.ok) {
        const data = await response.json();
        console.log(data.results);
        res.json(data.results);
    } else {
        // Log http status to the console
        console.log(response.status, response.statusText);

        // For non-500 errors, the endpoints return a JSON object as an error response
        const errorData = await response.json();
        console.log(errorData);

        res.json("oops");
    }

})




router.get('/:id/images', async (req,res)=>{
    //make sure you await async functions that will
    //return something
    let access_token=await getAccessToken();
    
    const requestOptions = {
        'method': 'GET',
        'headers': {
            'x-api-key':'3o11obtplbty1mhwh5hqy3gz',
            'Authorization':`Bearer ${access_token}`
        },
    };

    const response = await fetch(
        `https://openapi.etsy.com/v3/application/shops/${process.env.SHOP_ID}/listings/${req.params.id}/images`,
        requestOptions
    );

    if (response.ok) {
        const data = await response.json();
        res.json(data.results);
    } else {
        // Log http status to the console
        console.log(response.status, response.statusText);

        // For non-500 errors, the endpoints return a JSON object as an error response
        const errorData = await response.json();
        console.log(errorData);

        res.json("oops");
    }

})


async function getAccessToken(){
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify({
            grant_type: "refresh_token",
            client_id: "3o11obtplbty1mhwh5hqy3gz",
            refresh_token: "377763137.0DFLAVVM088POxyh_1R3FAFcD5Gk4iJueVBpP1mlbuOvX8tEpjdZAslOe7oJaq1mRUPxDnhmoCMvy1IAk0yHRX-A-M",
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const response = await fetch(
        'https://api.etsy.com/v3/public/oauth/token',
        requestOptions
    );

    if (response.ok) {
        const data = await response.json();
        return data.access_token;
    } else {
        // Log http status to the console
        console.log(response.status, response.statusText);

        // For non-500 errors, the endpoints return a JSON object as an error response
        const errorData = await response.json();
        console.log(errorData);

    }

}



module.exports= router;