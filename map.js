
window.addEventListener( "load", function( event ) {    
    var map = L.map( 'map' /* the id of the tag used for map injection */ );
    map.setView( [36.84 /*latitude*/, 10.18 /*longitude*/], 9 /*zoom*/ );
    
    
    // --- We add a layer based on OpenStreetMap ---
   /* L.tileLayer( 'http://tile.openstreetmap.org/{z}/{x}/{y}.png' ).addTo(map);   // Base Map*/
    
    // --- We add a circle to the map ---
    var circle = L.circle( [ 36.84, 10.18 ] , {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 200
    }).addTo(map);
    
    // --- We add a polygon to the map ---
   /* var polygon = L.polygon([
        [ 43.7949098,6.7109003 ],
        [ 43.773007,6.7012349 ],
        [ 43.7779801,6.7306691 ]
    ]).addTo(map);*/
    
    
    // --- We add a marker, with events, to the map ---
    var marker = L.marker( [ 36.84, 10.18 ] )
                  .bindPopup( "Tunis" )
                  .addTo( map );
    marker.on( "mouseover", function( event ) {
        this.openPopup(); 
    });
    marker.on( "mouseout", function( event ) {
        this.closePopup(); 
    });
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
const googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});
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


const osm = L.tileLayer('http://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    "<a href='http://osm.org/copyright' target='_blank'>OpenStreetMap</a> contributors",
  // minZoom: 10,
  maxNativeZoom: 18,
  maxZoom: 22,
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
  'osm': osm,
  'googleSat': googleSat,
  'googleTerrain': googleTerrain,
  'World Imaginary': arcgis_world_imaginary,
  googleHybrid: googleHybrid.addTo(map),
};

const overlays = {};

const map_control = L.control
  .layers(baseLayers, overlays, { position: 'topright', collapsed: true })
  .addTo(map);
const hash = L.hash(map);

    /*
    // --- We add a new layer to the map that contains some markers ---
    var seranon = L.marker( [ 43.773007,6.7012349 ] )
                   .bindPopup( 'Village de Seranon' ),
    caille      = L.marker( [ 43.7779801,6.7306691 ] )
                   .bindPopup( 'Village de Caille' ),
    valderoure  = L.marker( [ 43.7949098,6.7109003 ] )
                   .bindPopup( 'Village de Valderoure' ),
    laFerriere  = L.marker( [ 43.7990248,6.7306592 ] )
                   .bindPopup( 'Village de La Ferriere' );
    
    L.layerGroup([seranon, caille, valderoure, laFerriere])
     .addTo( map );*/
     
});
