/* disable-eslint */

function autocomplete(input, latinput, lnginput) {
  if (!input) return; // skip this function from running if there is no input on the page

  const dropdown = new google.maps.places.Autocomplete(input);

  dropdown.addListener('place_changed', () => {
    const place = dropdown.getPlace();
    latinput.value = place.geometry.location.lat();
    lnginput.value = place.geometry.location.lng();
  });

  // if someone hit enter on the address field, dont submit the form
  input.on('keydown', (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  });
}

export default autocomplete;