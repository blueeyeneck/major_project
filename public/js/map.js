mapboxgl.accessToken = mapToken; 
console.log("listing",listing);


const map = new mapboxgl.Map({
    container: 'map', // container ID
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/satellite-streets-v12', // style URL
    center: listing.geometry.coordinates,// starting position [lng, lat]
    zoom: 9 // starting zoom
});


const marker = new mapboxgl.Marker({color : "red"})
    .setLngLat(listing.geometry.coordinates)  // listing.geometry.coordinates
    .setPopup(new mapboxgl.Popup({offset: 25}).setHTML(`<h4>${listing.location}</h4><p>exact location after booking!</p>`))
    .addTo(map);

    
// const marker2 = new mapboxgl.Marker({color : "pink"})
// .setLngLat(listing.geometry.coordinates)  // listing.geometry.coordinates
// .setPopup(new mapboxgl.Popup({offset: 25}).setHTML(`<h4>${listing.location}</h4><p>exact location after booking!</p>`))
// .addTo(map);
