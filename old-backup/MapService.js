function getPosition() {
    if (!navigator.geolocation) {
        alert("HTML5 Geolocation is not supported in your browser.");
        return;
    }
    // One shot position getting or continus watch
    // navigator.geolocation.getCurrentPosition(showLocation, handleLocationError);
    navigator.geolocation.getCurrentPosition(initMap, handleLocationError);
}

// function showLocation(position) {
//     initMap(position.coords.latitude, position.coords.longitude);
//     // console.log('pos:', position);
//     axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude;},${position.coords.longitude}&key=${GOOGLE_API_KEY}`).then(getAddress);
// }


function handleLocationError(error) {
    var locationError = document.getElementById("locationError");

    switch (error.code) {
        case 0:
            locationError.innerHTML = "There was an error while retrieving your location: " + error.message;
            break;
        case 1:
            locationError.innerHTML = "The user didn't allow this page to retrieve a location.";
            break;
        case 2:
            locationError.innerHTML = "The browser was unable to determine your location: " + error.message;
            break;
        case 3:
            locationError.innerHTML = "The browser timed out before retrieving the location.";
            break;
    }
}

function initMap(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;

    var map = new google.maps.Map(
        document.querySelector('#map'),
        {
            center: { lat, lng },
            zoom: 17
        }
    );

    var marker = new google.maps.Marker({
        position: { lat, lng },
        map: map,
        title: 'Your Current Location'
    });
}

export default {
    getPosition
} 