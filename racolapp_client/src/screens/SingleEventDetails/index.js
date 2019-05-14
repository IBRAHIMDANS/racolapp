import React, { Component } from "react";
import { Text, View, Alert } from "react-native";
import GoogleMaps from "../../components/GoogleMaps";
import { TouchableOpacity } from "react-native-gesture-handler";
import { globalStyles } from "../../utils/styles";
import { readStorage } from "../../utils/asyncStorage";
import moment from "moment";

export default class SingleEventDetailsScreen extends Component {
  static navigationOptions = {
    title: "EVENEMENT"
  };

  constructor(props) {
    super(props);

    this.state = {
      userID: "",
      eventID: ""
    }
  }

  _registerToEvent = async() =>{
    console.log(("==================== register start ==========="))
    const { id } = this.props.navigation.state.params
    console.log(id);

    let user = await readStorage("user")

    console.log('========================= user ID')
    console.log(user.data.user.ID)
    console.log('========================= token')
    console.log(user.meta.token)

    this.setState({
      userID: user.data.user.ID,
      eventID: id
    });

    console.log(this.state)

    const response = await fetch("https://racolapp.herokuapp.com/registrations", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer "+user.meta.token
      },
      method: "POST",
      body: JSON.stringify(this.state)
    });

    const json = await response.json();
    console.log("========= JSON =======")
    console.log(json)

    if(json.error){
      Alert.alert("Impossible de s'inscrire à cet événements", json.error, [
        {
          text: "OK",
          onPress: ()=> console.log("Inscription error - OK pressed")
        }
      ])
    } else {
      return 
    }

  }

  _setRegion = () => {
    const { longitude, latitude } = this.props.navigation.state.params;
    return {
      latitude,
      longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01
    };
  };

  render() {
    const { marker, description, date } = this.props.navigation.state.params
    return (
      <View
        style={{
          flex: 1,
          height: "100%",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <View style={{ flex: 3, width: "100%" }}>
          <GoogleMaps
            region={this._setRegion()}
            markers={marker}
          />
        </View>
        <View style={{ flex: 2 }}>
          <Text style={globalStyles.h2}>DESCRIPTIF</Text>
          <Text style={globalStyles.h3Center}>{description}</Text>
          {date !== null && <Text style={globalStyles.h3Center}>Le {moment(date).format("LL")} à {moment(date).format("LT")}</Text>}
        </View>

        {/* TODO: FETCH POUR S'INSCRIRE */}
        <View style={{ flex: 1, width: "90%" }}>
          <TouchableOpacity style={globalStyles.button} onPress={ () => this._registerToEvent() }>
            <Text style={globalStyles.buttonText}>S'INSCRIRE</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
