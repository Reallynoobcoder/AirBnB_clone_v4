$(document).ready(init);

function init () {
  const amenities = {};
  $('.amenities input[type="checkbox"]').change(function () {
    const dataName = $(this).data('name');
    const dataId = $(this).attr('data-id');
    if (this.checked) {
      amenities[dataName] = dataId;
    } else {
      delete amenities[dataName];
    }
    const amenityNames = Object.keys(amenities);
    $('.amenities h4').text(amenityNames.sort().join(', '));
  });
  checkApiStatus();
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
