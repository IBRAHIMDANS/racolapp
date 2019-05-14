import React, { Component } from "react";
import {
  StyleSheet,
  View,
} from "react-native";
import PropTypes from "prop-types";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { withNavigation } from 'react-navigation';


class GoogleMaps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      markers: this.props.markers,
    };
  }

  render() {
    return (
      <MapView
        style={styles.mapView}
        provider={PROVIDER_GOOGLE}
        region={this.props.region}
        showsMyLocationButton={false}
        showsUserLocation={true}
      >
        {this.state.markers.map((marker, index) => {
          const coords = {
            latitude: marker.latitude,
            longitude: marker.longitude,
          };

          // console.log("ok");

          const metadata = `${marker.description}`;

          return (
            <MapView.Marker
              key={index}
              coordinate={coords}
              title={marker.title}
              description={metadata}
              onCalloutPress={() =>
                this.props.navigation.navigate("SingleEventDetails", {
                  longitude: coords.longitude,
                  latitude: coords.latitude,
                  description: metadata,
                  date: marker.date,
                  marker : [marker]
                })
              }

            />
          );
        })}

      </MapView>
    );
  }
}

export default withNavigation(GoogleMaps);

const styles = StyleSheet.create({
  mapView: {
    position: "absolute",
    height: "100%",
    width: "100%"
  },
});

GoogleMaps.propTypes = {
  region: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    latitudeDelta: PropTypes.number.isRequired,
    longitudeDelta: PropTypes.number.isRequired,
  })
}
