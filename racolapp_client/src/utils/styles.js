import { Text, View, StyleSheet } from "react-native";

// GRAPHICAL CHART
const styleMainColor = "#2699FB";
const styleOnMainColor = "#1D6098";

// STYLE HEADER NAVIGATION
const styleNavigationHeaderStyle = {
  headerStyle: {
    backgroundColor: "#F8F8F8"
  },
  headerTintColor: "#000000",
  headerTitleStyle: {
    fontWeight: "bold",
    flex: 1,
    textAlign: "center"
  }
};

// STYLE BOTTOM NAVIGATION
const sizeHomeButtonTabBar = 40;
const sizeNotHomeButtonTabBar = 25;

// STYLES FOR MULTIPLE SCREENS
const globalStyles = StyleSheet.create({
  h2: {
    color: styleMainColor,
    fontWeight: "bold",
    fontSize: 20,
    padding: 10,
    textAlign: "center"
  },
  h3: {
    color: styleMainColor,
    textAlign: "left",
    fontSize: 15,
    padding: 5,
    marginTop: 10
  },
  h3Center: {
    color: styleMainColor,
    textAlign: "center",
    fontSize: 15,
    padding: 5,
    marginTop: 10
  },
  h3Flex1: {
    flex: 1
  },
  button: {
    backgroundColor: styleMainColor,
    borderRadius: 20,
    padding: 10,
    marginTop: 10,
    marginBottom: 10
  },
  buttonText: {
    color: "white",
    textAlign: "center"
  },
  buttonLight: {
    borderRadius: 20,
    padding: 10,
    borderColor: styleMainColor,
    borderWidth: 2
  },
  buttonLightText: {
    color: styleMainColor,
    textAlign: "center"
  },
  textInputLightRound: {
    borderRadius: 25,
    marginTop: 5,
    borderColor: styleMainColor,
    borderWidth: 2,
    color: styleMainColor
  },
  textInputLightRectangular: {
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    borderColor: styleMainColor,
    borderWidth: 2,
    color: styleMainColor,
    textAlign: "left"
  },
  textInputLightRectangularFlex1: {
    flex: 1
  },
  datePicker: {
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    borderColor: styleMainColor,
    borderWidth: 2,
    flex: 1
  },

});

export {
  styleNavigationHeaderStyle,
  styleMainColor,
  styleOnMainColor,
  sizeHomeButtonTabBar,
  sizeNotHomeButtonTabBar,
  globalStyles
};
