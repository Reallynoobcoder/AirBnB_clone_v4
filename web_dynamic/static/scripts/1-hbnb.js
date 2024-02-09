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
}
