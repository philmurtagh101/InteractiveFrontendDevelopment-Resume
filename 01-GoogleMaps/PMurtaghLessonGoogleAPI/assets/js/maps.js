function initMap() {
    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 3,
        center: {
            lat: 46.619261,
            lng: -33.134766
        }
    });

    var labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    var locations = [
        { lat: 40.785091, lng: -73.968285 },
        { lat: 41.084045, lng: -73.874245 },
        { lat: 40.754932, lng: -73.984016 }
    ];
        //Note that the map() function below is not a google map method but an inherent JS method for iterating thro' arrays of key value pairs
    var markers = locations.map(function(location, i) {
        return new google.maps.Marker({
            position: location,
            // the % is a modulo operator. labels.length is 26. So when i is 27 it loops back to A and so on...sneaky!!
            label: labels[i % labels.length]
        });
    });

    var markerCluster = new MarkerClusterer(map, markers, { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });
}