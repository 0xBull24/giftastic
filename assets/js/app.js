'use strict';

// API object
const giphyAPI = {
    apiVersion: '/v1',
    randomSearch: '/gifs/search',
    limit: '5',
    topics: ['Yeezy', 'Jordan', 'Nike', 'Iverson', 'KD', 'Lebron', 'Kyrie', 'Dunks', 'Trainers'],
    apikey: 'Ffq6mPxFygiecgRCtKpKs8v6svdNOHII',

    loadTopics: () => {
        console.log(`Loading new topics`)
        $('.topics').empty();
        giphyAPI.topics.forEach(element => {
            $('.topics').append(`<button type="button" class="btn btn-light mr-3 shadow-sm"> ${element}`)
        })
    },

    searchGifs: () => {
        $(document).on('click', '.btn', (event) => {
            console.log(`Button clicked`)
            var searchQuery = $(event.target).text().trim()
            var badTerm = 0
            $.ajax({
                url: `${queryURL}${searchQuery}`,
                method: 'GET',
            }).then(response => {
                $('.gifs').empty()
                response.data.forEach(element => {
                    if (element.rating === 'g' || element.rating === 'pg') {
                        var stillImage = element.images.fixed_height_still.url;
                        var embeded = element.images.fixed_height_still.url;
                        var active = element.images.fixed_height.url;
                        $('.gifs').append(
                            `<div>
                            <p class='rating'> Rating ${element.rating}
                            <br>
                            <img class='gif-images' data-still='${stillImage}' data-active='${active}' src="${embeded}" style="">`
                        )
                    } else {
                        badTerm++
                    }

                })
                if (badTerm >= giphyAPI.limit) {
                    $('.gifs').append(`<h1> We dont think you should look for words like that on this app!`)
                }
            })
        })
    },

    activeGifs: () => {
        $(document).on('click', '.gif-images', function () {
            if ($(this).attr('data-still') === $(this).attr('src')) {
                $(this).attr('src', $(this).attr('data-active'))
            } else {
                $(this).attr('src', $(this).attr('data-still'))
            }
        })
    }
}

let queryURL = `https://api.giphy.com${giphyAPI.apiVersion}${giphyAPI.randomSearch}?api_key=${giphyAPI.apikey}&limit=${giphyAPI.limit}&q=`


$(document).ready(event => {

    // Initial load of topics
    giphyAPI.loadTopics()

    // Search button will add topic
    $('#search').click((event) => {
        console.log(`Grabbing search info`)
        event.preventDefault();
        giphyAPI.topics.push($('#searchbar').val().trim())
        giphyAPI.loadTopics()
    })

    // Searh for any topic clicked on
    giphyAPI.searchGifs()

    // Activate Gifs
    giphyAPI.activeGifs()
})