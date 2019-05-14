// TODO: Voir si le clic sur le résultat d'une recherche renvoie bien au bon endroit sur la carte

import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  Image
} from "react-native";
import PropTypes from "prop-types";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Config from "react-native-config";
import { connect } from "react-redux";

class GoogleAutocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayResultGooglePlacesSearch: "false"
    };
  }

  _renderGooglePlacesAutocomplete = () => (
    <GooglePlacesAutocomplete
      placeholder="Chercher"
      minLength={2}
      autoFocus={false}
      returnKeyType={"search"}
      keyboardAppearance={"light"}
      listViewDisplayed={this.state.displayResultGooglePlacesSearch}
      fetchDetails={true}
      enablePoweredByContainer={false}
      renderDescription={row =>
        row.description || row.formatted_address || row.name
      }
      onPress={(details = null) => {
        const action = {
          type: "SET_LOCATION",
          value: {
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }
        };
        return this.props.dispatch(action);
      }}
      getDefaultValue={() => ""}
      query={{
        key: Config.GOOGLE_MAPS_API_KEY,
        language: "fr",
        types: "(cities)"
      }}
      styles={{
        textInputContainer: {
          width: "100%",
          backgroundColor: "rgba(255, 255, 255, 0)",
          borderBottomWidth: 0
        },
        description: {
          fontWeight: "bold"
        },
        listView: {
          backgroundColor: "white",
          borderRadius: 10
        }
      }}
      currentLocation={false}
      debounce={200}
    />
  );

  _renderButtonHideGooglePlacesResult = () => (
    <TouchableOpacity
      onPress={() => {
        Keyboard.dismiss();
        this.setState({
          googlePlaces: {
            displayResultGooglePlacesSearch: "false"
          }
        });
      }}
    >
      <Image
        style={{ width: 25, height: 25 }}
        source={require("../../assets/img/googlePlaceSearch/leftArrow.png")}
      />
    </TouchableOpacity>
  );

  render() {
    return (
      <>
        {this._renderButtonHideGooglePlacesResult()}
        {this._renderGooglePlacesAutocomplete()}
      </>
    );
  }
}

const mapStateToProps = state => {
  return { location: state.location };
};
export default connect(mapStateToProps)(GoogleAutocomplete);

GoogleAutocomplete.propTypes = {
  location: PropTypes.shape({
      latitudeDelta: PropTypes.number.isRequired,
      longitudeDelta: PropTypes.number.isRequired,
    })
}