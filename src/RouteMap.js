import React from 'react';

import { Map, Polyline, TileLayer } from 'react-leaflet';
import polyline from '@mapbox/polyline';

import 'leaflet/dist/leaflet.css';

class RouteMap extends React.Component {
  constructor() {
    super()
    this.state = {
      lat: 47.638,
      lng: -122.291,
      zoom: 11
    }
  }

  getPositions(route) {
      if (!!route.polyline) {
          return polyline.decode(route.polyline);
      }
      return [];
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <Map center={position} zoom={this.state.zoom}>
        <TileLayer
          url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        {this.props.allRoutes.map(route => (
            <Polyline
                key={route.id}
                weight="2"
                color="#79669d91"
                positions={this.getPositions(route)}
            />
        ))}
        {this.props.routes.map(route => (
            <Polyline
                key={route.id}
                weight="2"
                color="purple"
                positions={this.getPositions(route)}
            />
        ))}
      </Map>
    );
  }
}

export default RouteMap;
