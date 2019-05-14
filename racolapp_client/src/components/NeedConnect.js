import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { globalStyles } from "../utils/styles";

class NeedConnect extends Component {
  render() {
    return (
      <View>
        <Text style={globalStyles.h2}>
          You need to be connected
        </Text>
        <TouchableOpacity
          style={globalStyles.button}
          onPress={() => {
            this.props.navigation.navigate('Profil');
          }}
        >
          <Text style={globalStyles.buttonText} > clic here to sign in or sign up </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default NeedConnect;