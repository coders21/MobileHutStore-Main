import React, { Component } from 'react';
import { Map, GoogleApiWrapper,InfoWindow, Marker } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '492px'
//   margin: '0px 0px 50px'
};

const containerStyle = {
  position: 'relative',
  width: '100%'
}

class MapContainer extends Component {
    state = {
        showingInfoWindow: false,  // Hides or shows the InfoWindow
        activeMarker: {},          // Shows the active marker upon click
        selectedPlace: {}          // Shows the InfoWindow to the selected place upon a marker
      };
      onMarkerClick = (props, marker, e) =>
      this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
      });
  
    onClose = props => {
      if (this.state.showingInfoWindow) {
        this.setState({
          showingInfoWindow: false,
          activeMarker: null
        });
      }
    };

  render() {
    return (
        <div>
      <Map
        google={this.props.google}
        zoom={14}
        streetViewControl={false}
        mapTypeControl={false}
        style={mapStyles}
        containerStyle={containerStyle}
        initialCenter={
          {
            lat: 31.562525,
            lng: 74.319157
          }
        }
      >
      <Marker
        onClick={this.onMarkerClick}
        name={'Second Floor Zaman Plaza Hall Road Lahore'}
      />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <p>{this.state.selectedPlace.name}</p>
          </div>
        </InfoWindow>
        </Map>
      </div>
       
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBdXh0td8S_0qpcHEOOdgt0hr4_BoNlaW4'
})(MapContainer);