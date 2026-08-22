const mapEl = document.getElementById('map');
const locations = JSON.parse(mapEl.dataset.locations);
const accessToken = mapEl.dataset.token;

const map = new mapboxgl.Map({
  accessToken,
  container: 'map',
  style: 'mapbox://styles/brilalex/cmt4j6vqg003701shctj65zcx',
  scrollZoom: false,
  // center: [-71.06776, 42.35816], // starting position [lng, lat]. Note that lat must be set between -90 and 90
  // zoom: 9, // starting zoom
  // interactive: false,
});

const bounds = new mapboxgl.LngLatBounds();

locations.forEach(location => {
  // Create marker
  const markerEl = document.createElement('div');
  markerEl.className = 'marker';

  // Create popup
  const popup = new mapboxgl.Popup({
    offset: 30,
  })
    .setHTML(`<p>Day: ${location.day}: ${location.description}</p>`);

  // Add marker
  new mapboxgl.Marker({
    element: markerEl,
    anchor: 'bottom',
  })
    .setLngLat(location.coordinates)
    .setPopup(popup)
    .addTo(map);

  // Extend map bounds to include current location
  bounds.extend(location.coordinates);
});

map.fitBounds(bounds, {
  padding: {
    top: 200,
    bottom: 150,
    left: 100,
    right: 100,
  }
});
