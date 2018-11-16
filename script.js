'use strict';

function getStateParks() {
  let baseUrl = 'https://api.nps.gov/api/v1/parks?parkCode=&stateCode=';
  let userStateParkRequests = $('#stateSelection').val();
  let numResultsRequest = (typeof $('#numOfResultsSelection').val() !== 'undefined' && $('#numOfResultsSelection').val()) || 10;
  let stateParkApi = `${baseUrl}${userStateParkRequests}&limit=${numResultsRequest}`;
  fetch(stateParkApi)
    .then(response => {
      return response.json()
      })
    .then(responseJson => {
      displayStateParkResults(responseJson)
      })
    .catch(error => alert('Something went wrong. Try again later.'));
}


function watchForm() {
  $('.js-stateSelectForm').on('submit', event => {
    event.preventDefault();
    getStateParks();
    $('.js-parkResults').empty();
    // $('stateSelection').val("");
  });
}

$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm();
});

function displayStateParkResults(responseJson) {
  console.log(responseJson);
  $('.js-parkResultsContainer').removeClass('hidden');
  responseJson.data.forEach(function(element) {
    Object.keys(element).forEach(function (key) {
     $('.js-parkResults').append(`${key}, ${element[key]} <br><br>`);
    });
  });
}

