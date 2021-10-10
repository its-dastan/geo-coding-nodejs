mapboxgl.accessToken =
  "pk.eyJ1IjoiYmhhZ2FiYXRpcHJhc2FkIiwiYSI6ImNraHFmanI4ZzA4b3MyeHBiOWplN3VuN2UifQ.2u5dEIp1jRgvpZnamjqx4g";
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  zoom: 12,
  center: [85.787253, 20.243709],
});

// fetch stores from api
async function getStores() {
  const res = await fetch("/api/stores");
  const response = await res.json();

  const stores = response.data.map((store) => {
    return {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [
          store.location.coordinates[0],
          store.location.coordinates[1],
        ],
      },
      properties: {
        storeId: store.storeId,
        icon: "shop",
      },
    };
  });

  loadMap(stores);
}

// load map with stores
function loadMap(stores) {
  map.on("load", function () {
    map.addLayer({
      id: "points",
      type: "symbol",
      source: {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: stores,
        },
      },
      layout: {
        "icon-image": "{icon}-15",
        "icon-size": 1.5,
        "text-field": "{storeId}",
        "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
        "text-offset": [0, 0.9],
        "text-anchor": "top",
      },
    });
  });
}

getStores();
