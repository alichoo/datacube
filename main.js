// Initalize map
const map = L.map(
  'map',
  L.extend(
    {
      minZoom: 5,
      zoom: 13,
      maxZoom: 22,
      center: [36.84, 10.18],
    },
    L.Hash.parseHash(location.hash)
  )
);
map.zoomControl.setPosition('bottomright');
L.hash(map);

map.on('click', (e) => {
  L.popup()
    .setLatLng(e.latlng)
    .setContent(
      `
            <p class="p-small">
              lat: ${e.latlng.lat}
            </p>
            <p class="p-small">
            lng: ${e.latlng.lng}
            </p>
          `
    )
    .openOn(map);
});

// draw
const fg_draw = L.featureGroup().addTo(map);
const draw_options = {
  draw: {
    polyline: false,
    polygon: false,
    circle: false,
    marker: false,
    circlemarker: false,
  },
  edit: {
    featureGroup: fg_draw,
    edit: false,
  },
};
const drawControl = new L.Control.Draw(draw_options).addTo(map);
map.on('draw:created', (e) => {
  // reset featureGroup
  fg_draw.clearLayers();

  // get & set bbox
  const bbox = e.layer.getBounds().toBBoxString().split(',');
  document.getElementById('lng_min').value = bbox[0];
  document.getElementById('lat_min').value = bbox[1];
  document.getElementById('lng_max').value = bbox[2];
  document.getElementById('lat_max').value = bbox[3];

  const geojson = e.layer.toGeoJSON();
  console.log(geojson); // for Test
  new L.GeoJSON(geojson, {
    style: {
      fillOpacity: 0.0,
      color: 'black',
      weight: 1.5,
      dashArray: '10, 10',
    },
  }).addTo(fg_draw);
});

// basemap layers
const osm = L.tileLayer('http://tile.openstreetmap.jp/{z}/{x}/{y}.png', {
  attribution:
    "<a href='http://osm.org/copyright' target='_blank'>OpenStreetMap</a> contributors",
  // minZoom: 10,
  maxNativeZoom: 18,
  maxZoom: 22,
});

// Stamen Terrain
const stamen_terrain = L.tileLayer(
  'http://{s}.tile.stamen.com/terrain/{z}/{x}/{y}.png',
  {
    attribution:
      '<a id="home-link" target="_top" href="http://maps.stamen.com/">Map tiles</a> by <a target="_top" href="http://stamen.com">Stamen Design</a>, under <a target="_top" href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data © <a target="_top" href="http://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>.',
    maxNativeZoom: 14,
    maxZoom: 22,
  }
);
const stamen_toner = L.tileLayer(
  'http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png',
  {
    attribution:
      '<a id="home-link" target="_top" href="../">Map tiles</a> by <a target="_top" href="http://stamen.com">Stamen Design</a>, under <a target="_top" href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a target="_top" href="http://openstreetmap.org">OpenStreetMap</a>, under <a target="_top" href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.',
    maxNativeZoom: 18,
    maxZoom: 22,
  }
);
const stamen_watercolor = L.tileLayer(
  'http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.png',
  {
    attribution:
      'Map tiles by <a href="https://stamen.com/" target="_blank">Stamen Design</a>, under <a href="https://creativecommons.org/licenses/by/3.0/" target="_blank">CC BY 3.0</a>. © <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors.',
    maxNativeZoom: 16,
    maxZoom: 22,
  }
);

// ArcGIS World Imaginary
const arcgis_world_imaginary = L.tileLayer(
  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  {
    attribution:
      'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    maxNativeZoom: 17,
    maxZoom: 22,
  }
);



const googleTerrain = L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

const googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

const googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});


const googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});
L.control
  .scale({
    imperial: false,
    metric: true,
  })
  .addTo(map);

const baseLayers = {
  'googleStreets': googleStreets,
  'googleHybrid': googleHybrid,
  'googleSat': googleSat,
  'googleTerrain': googleTerrain,
  'Stamen Terrain': stamen_terrain,
  'Stamen Toner': stamen_toner,
  'Stamen WaterColor': stamen_watercolor,
  'World Imaginary': arcgis_world_imaginary,
  osm: osm.addTo(map),
};

const overlays = {};

const map_control = L.control
  .layers(baseLayers, overlays, { position: 'topright', collapsed: true })
  .addTo(map);
const hash = L.hash(map);

document.addEventListener('DOMContentLoaded', (event) => {
  // Test
  console.log('DOMContentLoaded');
});