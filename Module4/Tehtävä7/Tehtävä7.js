const form = document.querySelector('#route-form');
const statusMessage = document.querySelector('#status');
const tripTimes = document.querySelector('#trip-times');

const map = L.map('map').setView([60.205, 24.75], 11);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; OpenStreetMap contributors',
}).addTo(map);

let routeLayer;
let markerLayer = L.layerGroup().addTo(map);

async function geocode(address, apiKey) {
  const url = new URL('https://api.digitransit.fi/geocoding/v1/search');
  url.searchParams.set('text', address);
  url.searchParams.set('size', '1');
  url.searchParams.set('focus.point.lat', '60.205');
  url.searchParams.set('focus.point.lon', '24.75');

  const response = await fetch(url, {
    headers: { 'digitransit-subscription-key': apiKey },
  });
  if (!response.ok) throw new Error(`Address search failed (${response.status}).`);

  const data = await response.json();
  const feature = data.features?.[0];
  if (!feature) throw new Error(`No location found for “${address}”.`);

  const [longitude, latitude] = feature.geometry.coordinates;
  return { latitude, longitude, label: feature.properties.label || address };
}

function decodePolyline(encoded) {
  const coordinates = [];
  let index = 0;
  let latitude = 0;
  let longitude = 0;

  while (index < encoded.length) {
    let result = 0;
    let shift = 0;
    let byte;
    do {
      byte = encoded.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);
    latitude += result & 1 ? ~(result >> 1) : result >> 1;

    result = 0;
    shift = 0;
    do {
      byte = encoded.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);
    longitude += result & 1 ? ~(result >> 1) : result >> 1;

    coordinates.push([latitude / 1e5, longitude / 1e5]);
  }

  return coordinates;
}

function formatTime(dateTime) {
  return new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Helsinki',
  }).format(new Date(dateTime));
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  statusMessage.textContent = 'Finding your route…';
  tripTimes.textContent = '';

  if (routeLayer) map.removeLayer(routeLayer);
  markerLayer.clearLayers();

  const address = document.querySelector('#address').value.trim();
  const apiKey = document.querySelector('#api-key').value.trim();

  try {
    const [origin, destination] = await Promise.all([
      geocode(address, apiKey),
      geocode('Karaportti 2, Espoo, Finland', apiKey),
    ]);

    const query = `{
      planConnection(
        origin: {location: {coordinate: {latitude: ${origin.latitude}, longitude: ${origin.longitude}}}}
        destination: {location: {coordinate: {latitude: ${destination.latitude}, longitude: ${destination.longitude}}}}
        first: 1
      ) {
        edges {
          node {
            start
            end
            legs {
              legGeometry { points }
            }
          }
        }
      }
    }`;

    const response = await fetch('https://api.digitransit.fi/routing/v2/hsl/gtfs/v1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'digitransit-subscription-key': apiKey,
      },
      body: JSON.stringify({ query }),
    });
    if (!response.ok) throw new Error(`Route request failed (${response.status}).`);

    const result = await response.json();
    if (result.errors?.length) throw new Error(result.errors[0].message);

    const itinerary = result.data?.planConnection?.edges?.[0]?.node;
    if (!itinerary) throw new Error('No route was found for that address.');

    const lines = itinerary.legs
      .filter((leg) => leg.legGeometry?.points)
      .map((leg) => L.polyline(decodePolyline(leg.legGeometry.points), { color: '#1769aa', weight: 5 }));
    if (!lines.length) throw new Error('The route did not include map geometry.');

    routeLayer = L.featureGroup(lines).addTo(map);
    markerLayer.addLayer(L.marker([origin.latitude, origin.longitude]).bindPopup(`Start: ${origin.label}`));
    markerLayer.addLayer(L.marker([destination.latitude, destination.longitude]).bindPopup(`School: ${destination.label}`));
    map.fitBounds(routeLayer.getBounds().pad(0.12));
    tripTimes.textContent = `Trip starts at ${formatTime(itinerary.start)} and ends at ${formatTime(itinerary.end)}.`;
    statusMessage.textContent = '';
  } catch (error) {
    statusMessage.textContent = `${error.message} Check your API key and address, then try again.`;
  }
});
