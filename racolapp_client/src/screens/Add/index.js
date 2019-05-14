import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Picker,
  Alert
} from "react-native";
import {
  setStorage,
  readStorage,
  removeStorage
} from "../../utils/asyncStorage";
import { globalStyles, styleMainColor } from "../../utils/styles";
import DatePicker from "react-native-datepicker";

export default class App extends Component {
  static navigationOptions = {
    title: "NOUVEL EVENEMENT"
  };

  constructor(props) {
    super(props);
    this.state = {
      userID: "",
      searchedLocation: "",
      location: "",
      name: "",
      long: "",
      lat: "",
      capacity: "",
      date: "",
      description: "",
      duration: "",
      typeEvent: "",
      typeEventsID: "",
      fetchedData: false
    };
    this.resultToSearchLocation = [];
    this._listTypesEvents = [];
  }

  componentDidMount = async () => {
    await this._fetchAllTypesEvents();
  };

  // TODO: POST NEW EVENT
  _addEvent = async () => {
    let user = await readStorage("user")

    console.log("============== user ID ========")
    console.log(user.data.user.ID)
    
    this.setState({userID: user.data.user.ID})
    console.log(this.state.userID)
    
    const response = await fetch("https://racolapp.herokuapp.com/events/", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer "+user.meta.token
      },
      method: "POST",
      body: JSON.stringify(this.state)
    });
    const json = await response.json();

    console.log("############# JSON ###############");
    console.log(json);

    // TODO: personnaliser l'alerte?
    if (json.error) {
      Alert.alert(
        "Impossible d'ajouter m'évènement",
        "Vérifiez les informations saisies",
        [
          {
            text: "OK",
            onPress: () => console.log("Add event error - OK pressed")
          }
        ]
      );
    } 
  };

  _fetchAllTypesEvents = async () => {
    const response = await fetch("https://racolapp.herokuapp.com/typeevents", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "GET"
    });
    const json = await response.json();

    if (json.error) {
      console.log("Fetch events types failed");
      console.log(json.error);
    } else {
      this._listTypesEvents = json.data;
      this._listTypesEvents.unshift({name: "Choisir"});
      this.setState({ fetchedData: true });
    }
  };

  _mapListTypesEvents = () => {
    // TODO: Add a default item
    try {
      return this._listTypesEvents.map(item => {
        return (
          <Picker.Item
            label={item.name}
            key={item}
            value={item.name}
            color={styleMainColor}
          />
        );
      });
    } catch (err) {
      console.log("Fetch api Type Event failed");
      console.log(err.message);
    }
  };

  _fetchListLocations = async adress => {
    const response = await fetch(
      `https://api-adresse.data.gouv.fr/search/?q=${adress}`,
      {
        headers: {
          "Content-Type": "application/json"
        },
        method: "GET"
      }
    );
    const json = await response.json();

    // HANDLE NO API RESPONSE
    if (json.title == "Missing query" || json.features.length == 0) {
      console.log("No API response");
    } else {
      this.resultToSearchLocation = json.features;
    }
  };

  _mapListResultLocation = () => {
    try {
      return this.resultToSearchLocation.map(item => {
        return (
          <Picker.Item
            label={item.properties.label}
            key={item.properties.id}
            value={item.properties.label}
            color={styleMainColor}
          />
        );
      });
    } catch (err) {
      console.log("Fetch api adress failed");
      console.log(err.message);
    }
  };

  _renderScrollView = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ backgroundColor: styleMainColor }}>
        <TextInput
          style={{
            fontWeight: "bold",
            color: "white",
            fontSize: 20,
            fontStyle: "italic",
            textAlign: "center"
          }}
          placeholder="Renseigne ICI ton titre!"
          placeholderTextColor="white"
          onChangeText={name => this.setState({ name })}
          value={this.state.name}
        />
      </View>

      <View style={{ marginTop: 10, marginLeft: 20, marginRight: 20 }}>
        {/* EVENT DESCRIPTION */}
        <TextInput
          style={globalStyles.h2}
          placeholder="Décris-nous ICI ton évènement en quelques lignes"
          placeholderTextColor={styleMainColor}
          multiline={true}
          onChangeText={description => this.setState({ description })}
          value={this.state.description}
        />

        {/* EVENT DATE */}
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <Text style={[globalStyles.h3, globalStyles.h3Flex1]}>
            Date de l'évènement
          </Text>
          <DatePicker
            style={globalStyles.datePicker}
            date={this.state.date}
            mode="datetime"
            placeholder="Sélectionne le jour et l'heure"
            format=""
            // minDate={Date.now()} // not compatible?
            confirmBtnText="OK"
            cancelBtnText="Annuler"
            is24Hour={true}
            showIcon={false}
            customStyles={{
              dateInput: {
                borderWidth: 0
              },
              dateText: {
                color: styleMainColor
              },
              placeholderText: {
                color: styleMainColor
              }
            }}
            onDateChange={date => {
              this.setState({ date: date });
            }}
          />
        </View>

        <View style={{ borderWidth: 1, borderColor: styleMainColor }} />

        {/* EVENT PLACE */}
        <View>
          <Text style={[globalStyles.h2]}>Lieu de l'évènement</Text>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Text style={[globalStyles.h3, globalStyles.h3Flex1]}>
              Renseignes ici les 1ères lettres
            </Text>
            <TextInput
              style={[
                globalStyles.textInputLightRectangular,
                globalStyles.textInputLightRectangularFlex1
              ]}
              placeholder="A toi de nous dire"
              placeholderTextColor={styleMainColor}
              onChangeText={searchedLocation => {
                this.setState({ searchedLocation });
                this._fetchListLocations(this.state.searchedLocation);
              }}
              value={this.state.searchedLocation}
            />
          </View>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Text style={[globalStyles.h3, globalStyles.h3Flex1]}>
              Puis choisis le bon lieu
            </Text>
            <View style={{ flex: 1 }}>
              <Picker
                selectedValue={this.state.location}
                onValueChange={(value, key) => {
                  this.setState({
                    location: value,
                    long: this.resultToSearchLocation[key].geometry
                      .coordinates[0],
                    lat: this.resultToSearchLocation[key].geometry
                      .coordinates[1]
                  });
                }}
              >
                {this._mapListResultLocation()}
              </Picker>
            </View>
          </View>
        </View>

        <View style={{ borderWidth: 1, borderColor: styleMainColor }} />

        {/* CAPACITY FOR THE EVENT */}
        <View style={{ flex: 1, flexDirection: "row" }}>
          <Text style={[globalStyles.h3, globalStyles.h3Flex1]}>
            Nombre de personnes
          </Text>
          <TextInput
            style={[
              globalStyles.textInputLightRectangular,
              globalStyles.textInputLightRectangularFlex1
            ]}
            placeholder="A toi de nous dire"
            placeholderTextColor={styleMainColor}
            keyboardType="numeric"
            onChangeText={capacity =>
              this.setState({ capacity: Number(capacity) })
            }
            value={this.state.capacity}
          />
        </View>

        {/* EVENT TYPE */}
        <View style={{ flex: 1, flexDirection: "row" }}>
          <Text style={[globalStyles.h3, globalStyles.h3Flex1]}>
            Choisis le type de l'évènement
          </Text>
          <View style={{ flex: 1 }}>
            <Picker
              selectedValue={this.state.typeEvent}
              onValueChange={(value, key) => {
                this.setState({
                  typeEvent: value,
                  typeEventsID: this._listTypesEvents[key].ID
                });
              }}
            >
              {this._mapListTypesEvents()}
            </Picker>
          </View>
        </View>

        {/* BUTTON TO SUBMIT NEW EVENT */}
        <TouchableOpacity
          style={localStyles.button}
          onPress={() => {
            this._addEvent();
          }}
        >
          <Text style={globalStyles.buttonText}> VALIDE </Text>
        </TouchableOpacity>
      </View>
      {console.log(this.state)}
    </ScrollView>
  );

  render() {
    return <>{this.state.fetchedData == true && this._renderScrollView()}</>;
  }
}

const localStyles = StyleSheet.create({
  button: {
    backgroundColor: styleMainColor,
    borderRadius: 20,
    padding: 10,
    marginTop: 30,
    marginBottom: 10
  }
});
