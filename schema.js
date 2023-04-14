const alreadyDraw = {
  "data_layer_id": {
    type: "polygon",
    pages: {
      "1": "",
      "2": "",
    }
  }
}

const mainObjects = {
  "data_layer_id": {
    type: "Polygon | LineString",
    pages: {
      1: "json string",
    }
  },
  "data_layer_id": {
    type: "Point",
    pages: {
      1: ["marker"], // get from database,
    }
  }
}

const selectedLayerIds = ['id_1', 'id_2', 'id_3']

{
  "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": {
          "stroke": "#555555",
          "stroke-width": 0,
          "stroke-opacity": 1,
          "fill": "#ff0000",
          "fill-opacity": 1,
          "userData": { "dataLayerId": "1", "page": 3, "id": "7", "isMainObject": true }
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [[[108.2219663985461, 16.07034015478719], [108.2219663985461, 16.0696434765714], [108.22272362959893, 16.0696434765714], [108.22272362959893, 16.07034015478719], [108.2219663985461, 16.07034015478719]]]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "stroke": "#555555",
          "stroke-width": 0,
          "stroke-opacity": 1,
          "fill": "#ff0000",
          "fill-opacity": 1,
          "userData": { "dataLayerId": "1", "page": 3, "id": "8", "isMainObject": true }
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [[[[108.22495119086602, 16.071946909404772], [108.22495119086602, 16.072038246152488], [108.22481054498166, 16.072038246152488], [108.22481054498166, 16.071946909404772], [108.22495119086602, 16.071946909404772]]], [[[108.22465676184379, 16.07201299860023], [108.22465676184379, 16.071924632142597], [108.22479277105077, 16.071924632142597], [108.22479277105077, 16.07201299860023], [108.22465676184379, 16.07201299860023]]]]
        }
      }]
}