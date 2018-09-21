'use strict'

// Import secrets
import { apikey } from "./secret.js";

// API object
const giphyAPI = {
    scheme: 'https://', 
    baseHost: 'api.giphy.com',
    apiVersion: '/v1',
    randomSearch: '/gifs/search',
    limit: '5',
}

let queryURL = `${giphyAPI.scheme}${giphyAPI.baseHost}${giphyAPI.apiVersion}${giphyAPI.randomSearch}?limit=${giphyAPI.limit}`


$(document).ready(event => {

    // Search button will perform ajax call
    $('#search').click(() => {

        // grab value from input field trim and sanitize
        // add value to query url
        console.log('I have been clicked')
    })
})