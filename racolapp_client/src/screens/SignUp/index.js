import React, { Component } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import {
  setStorage,
  readStorage,
  removeStorage
} from "../../utils/asyncStorage";
import { globalStyles, styleMainColor } from "../../utils/styles";


export default class App extends Component {
  static navigationOptions = {
    title: "INSCRIPTION"
  };

  constructor(props) {
    super(props);
    this.state = {
      pseudo: "Bob",
      mail: "bob@gmail.com",
      password: "bob",
      password_confirm: "bob",
      // birthday: "",
      // country: "",
      // state: "",
      // city: ""
      // errorOnLog: false
    };
  }


  _signUp = async () => {
    const response = await fetch("https://racolapp.herokuapp.com/auth/register", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(this.state)
    });

    console.log("############# RESPONSE ###############");
    console.log(response);

    const json = await response.json();

    console.log("############# RESPONSE JSON ###############");
    console.log(json);
    // I'M CONNECTED
    if (json.err) {
      Alert.alert(
        "Erreur d'authentification",
        "Mot de passe ou identifiant incorrect",
        [
          {
            text: "OK",
            onPress: () => console.log("Authentification error - OK pressed")
          }
        ]
      );
    }
    else {

      await setStorage("user", json);

      let userConnected = await readStorage("user");

      console.log("------------------ userConnected ------------------")
      console.log(userConnected)

      console.log("------------------ token ------------------")
      console.log(userConnected.meta.token)

      if (userConnected.meta.token != undefined) {
        console.log("ok")
        this.props.navigation.navigate('Profil');
      } else {
        console.log("No token")
      }

      // //////
      // localStorage.setItem("token", json.meta.token);
      // localStorage.setItem("uuid",json.data.user.uuid);
      // localStorage.setItem("userNickname", json.data.user.nickname);
      // localStorage.setItem("userEmail",json.data.user.email);
      // this.props.connect(json.data.user);
    }

  };

  // _read = async () => {
  //   console.log("HELLO SIGN UP!");
  //   await readStorage("user");
  // };

  render() {
    return (
      <ScrollView
        style={{ marginTop: 10, marginLeft: 20, marginRight: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={globalStyles.h3}>Nom complet</Text>
        <TextInput
          style={globalStyles.textInputLightRectangular}
          placeholder="Nom complet"
          placeholderTextColor={styleMainColor}
          onChangeText={pseudo => this.setState({ pseudo })}
          value={this.state.pseudo}
        />
        <Text style={globalStyles.h3}>Email</Text>
        <TextInput
          style={globalStyles.textInputLightRectangular}
          placeholder="Email"
          placeholderTextColor={styleMainColor}
          onChangeText={mail => this.setState({ mail })}
          value={this.state.mail}
        />
        <Text style={globalStyles.h3}>Mot de passe</Text>
        <TextInput
          style={globalStyles.textInputLightRectangular}
          placeholder="Mot de passe"
          placeholderTextColor={styleMainColor}
          secureTextEntry={true}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Text style={globalStyles.h3}>Confirmation du mot de passe</Text>
        <TextInput
          style={globalStyles.textInputLightRectangular}
          placeholder="Confirmation du mot de passe"
          placeholderTextColor={styleMainColor}
          secureTextEntry={true}
          onChangeText={password_confirm => this.setState({ password_confirm })}
          value={this.state.password_confirm}
        />

        {/* DETAILS SECTION
        <Text style={globalStyles.h2}>Informations personnelles</Text>
        <Text style={globalStyles.h3}>Date de naissance</Text>
        <TextInput
          style={globalStyles.textInputLightRectangular}
          placeholder="Mot de passe"
          placeholderTextColor={styleMainColor}
          onChangeText={birthday => this.setState({ birthday })}
          value={this.state.birthday}
        />
        <Text style={globalStyles.h3}>Nationalité</Text>
        <TextInput
          style={globalStyles.textInputLightRectangular}
          placeholder="Mot de passe"
          placeholderTextColor={styleMainColor}
          onChangeText={country => this.setState({ country })}
          value={this.state.country}
        />
        <Text style={globalStyles.h3}>Département</Text>
        <TextInput
          style={globalStyles.textInputLightRectangular}
          placeholder="Mot de passe"
          placeholderTextColor={styleMainColor}
          onChangeText={state => this.setState({ state })}
          value={this.state.state}
        />
        <Text style={globalStyles.h3}>Ville</Text>
        <TextInput
          style={globalStyles.textInputLightRectangular}
          placeholder="Mot de passe"
          placeholderTextColor={styleMainColor}
          onChangeText={city => this.setState({ city })}
          value={this.state.city}
        />*/}
        <TouchableOpacity
          style={globalStyles.button}
          onPress={() => {
            this._signUp();
          }}
        >
          <Text style={globalStyles.buttonText} > VALIDER </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}