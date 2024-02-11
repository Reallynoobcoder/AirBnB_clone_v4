$(document).ready(init);

function init() {
    const amenities = {};
    $('.amenities input[type="checkbox"]').change(function() {
        const dataName = $(this).data('name');
        const dataId = $(this).attr('data-id');
        if (this.checked) {
            amenities[dataName] = dataId;
        } else {
            delete amenities[dataName];
        }
    });

    /* Button click event to filter places by Amenities */
    $('button').click(function() {
        const amenityIds = Object.values(amenities);
        filterPlacesByAmenities(amenityIds);
    });

    checkApiStatus();
    fetchPlaces();
}

function checkApiStatus() {
    $.get('http://localhost:5001/api/v1/status/', function(data) {
        if (data.status === 'OK') {
            $('#api_status').addClass('available');
        } else {
            $('#api_status').removeClass('available');
        }
    });
}

/* Function to update the places section */
function displayPlaces(places) {
    for (const place of places) {
        const article = ['<article>',
            '<div class="title_box">',
            `<h2>${place.name}</h2>`,
            `<div class="price_by_night">$${place.price_by_night}</div>`,
            '</div>',
            '<div class="information">',
            `<div class="max_guest">${place.max_guest} Guest(s)</div>`,
            `<div class="number_rooms">${place.number_rooms} Bedroom(s)</div>`,
            `<div class="number_bathrooms">${place.number_bathrooms} Bathroom(s)</div>`,
            '</div>',
            '<div class="description">',
            `${place.description}`,
            '</div>',
            '</article>'
        ];
        $('SECTION.places').append(article.join(''));
    }
}

/* Send a POST request to the API endpoint using jQuery */
function fetchPlaces() {
    $.ajax({
        url: 'http://localhost:5001/api/v1/places_search/',
        type: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify({}),
        success: function(response) {
            displayPlaces(response);
        },
        error: function(error) {
            console.error('Error fetching places:', error);
        }
    });
}

/* Function to filter places by Amenities */
function filterPlacesByAmenities(amenityIds) {
    $.ajax({
        url: 'http://localhost:5001/api/v1/places_search/',
        type: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify({ amenities: amenityIds }),
        success: function(response) {
            $('SECTION.places').empty(); // Clear existing places
            displayPlaces(response);
        },
        error: function(error) {
            console.error('Error filtering places:', error);
        }
    });
}
