import React, { Component } from "react";
import EventList from "../../components/EventList";

import { readStorage } from "../../utils/asyncStorage";

export default class EventsSubscriptedScreen extends Component {
  static navigationOptions = {
    title: "MES PARTICIPATIONS"
  };

  constructor(props) {
    super(props);
    
    this.state = {
      events: [] // TODO: temporaire à remplacer par this._events = [] quand api OK (passer par state ??)
    }
  }

  fetchData = async () => {
    // // TODO: fetch ..................
    let user = await readStorage("user")
    
    console.log('========================= user ID')
    console.log(user.data.user.ID)
    console.log('========================= token')
    console.log(user.meta.token)

    const response = await fetch(`http://racolapp.herokuapp.com/registrations/userID/${user.data.user.ID}`, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer "+user.meta.token,
      },
      method: "GET"
    });

    const json = await response.json();

    if (json.error) {
      Alert.alert(
        "Erreur d'authentification",
        json.error,
        [
          {
            text: "OK",
            onPress: () => console.log("Authentification error - OK pressed")
          }
        ]
      );
    }
    // I'M CONNECTED
    else {
      console.log(json)
      this.setState({ events: json.data});
    }
  };

  componentWillMount = async () => {
    try {
      let userConnected = await readStorage("user");
      if (userConnected === undefined) {
        this.props.navigation.navigate('SignIn');
      } else {
        this.setState({user: userConnected.data.user})
        this.fetchData()
      }
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return <EventList events={this.state.events}/>
  }
}
