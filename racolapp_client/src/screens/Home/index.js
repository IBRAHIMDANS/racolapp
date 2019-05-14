import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  Platform,
  Alert,
} from "react-native";
import EventAbstract from "../../components/EventAbstract";
import { globalStyles, styleMainColor } from "../../utils/styles";
import { requestLocationPermission } from "../../utils/PermissionsAndroid";
import { connect } from "react-redux";

class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "A PROXIMITE",
      headerRight: (
        <TouchableOpacity onPress={() => navigation.navigate("Map")}>
          <Image
            style={{
              width: 25,
              height: 25,
              marginRight: 10
            }}
            source={require("../../../assets/img/map.png")}
          />
        </TouchableOpacity>
      )
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      _events: [],
     }
  }

  async componentWillMount() {
    if (Platform.OS == "android") {
      await requestLocationPermission();
      this._setLocation();
      this._loadEvents();
    }
  }

  _setLocation = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const action = {
          type: "SET_LOCATION",
          value: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }
        };
        this.props.dispatch(action);
      },
      error => {
        console.log(`ERROR IN GETTING LOCATION: ${error.message}`);
        Alert.alert(
          "Impossible de récupérer votre localisation",
          "Vérifiez vos paramètres",
          [
            {
              text: "OK",
              onPress: () => console.log("Location error - OK pressed")
            }
          ]
        );
      
      },
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
    );
  };

  // TODO? ajouter token si route doit être secure
  _loadEvents = async () => {
    const response = await fetch("https://racolapp.herokuapp.com/events/", {
      headers: {
        "Content-Type": "application/json"
        // "Authorization": `Bearer ${token}`
      },
      method: "GET",
    });

    if (response.error) {
      console.log(response.error);
    }
    else {
      const json = await response.json();
      const action = {
        type: "GET_ALL_EVENTS",
        value: json.data
      };
      this.props.dispatch(action);

      if (this.props.events == []){
        Alert.alert(
          "Aucun évènement dans vos environs",
          "Regardez dans une autre zone",
          [
            {
              text: "OK",
              onPress: () => console.log("Any event returned - OK pressed")
            }
          ]
        );
      }
    }

      };

  _renderListEvents = () => {
    return (
      <FlatList
        numColumns={2}
        columnWrapperStyle={styles.row}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        data={this.props.events}
        keyExtractor={singleEvent => singleEvent.ID.toString()}
        renderItem={({ item }) => {
          const { ID, long, lat, name, description, date } = item;
          return (
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("SingleEventDetails", {
                  id:ID,
                  longitude:Number(long),
                  latitude:Number(lat),
                  description,
                  date, 
                  marker: [{
                    "longitude": Number(long), 
                    "latitude": Number(lat), 
                    "title": name, 
                    "description": description
                  }]
                })
              }
            >
              <View style={styles.itemRendered}>
                <EventAbstract
                  id={ID}
                  longitude={Number(long)}
                  latitude={Number(lat)}
                  title={name}
                  description={description}
                />
              </View>
            </TouchableOpacity>
          );
        }}
      />
    );
  };

  render() {
    return this._renderListEvents();
  }
}

const mapStateToProps = state => {
  return { 
    location: state.location,
    events: state.events
  };
};
export default connect(mapStateToProps)(HomeScreen);

const styles = StyleSheet.create({
  itemRendered: {
    margin: 15,
    padding: 5,
    backgroundColor: styleMainColor,
    borderRadius: 15,
    width: 200,
    height: 200
  },
  row: {
    flex: 1,
    justifyContent: "space-around"
  }
});
