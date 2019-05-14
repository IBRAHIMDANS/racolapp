import React, { Component } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import { globalStyles, styleMainColor } from "../utils/styles";
import PropTypes from "prop-types";

class EventAbstract extends Component {
  render() {
    let { id, longitude, latitude, title, description } = this.props;
    return (
      <ScrollView
        style={{
          backgroundColor: styleMainColor,
          marginBottom: 10,
          padding: 20
        }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title} >
          {title}
        </Text>
        <Text style={styles.text}>{description}</Text>
      </ScrollView>
    );
  }
}

export default EventAbstract;

const styles = StyleSheet.create({
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10
  },
  text: {
    color: "white",
    fontSize: 15,
    textAlign: "center"
  }
});

EventAbstract.propTypes = {
  id: PropTypes.number,
  longitude: PropTypes.number,
  latitude: PropTypes.number,
  title: PropTypes.string,
  description: PropTypes.string
};
