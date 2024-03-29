import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import FontAwesome5Icons from "react-native-vector-icons/FontAwesome5";
import { colors } from "../utilities/styles";

const { height, width } = Dimensions.get("screen");

const Controllers = ({ isRunning, handleStart, handleLap, handleStop }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.buttonContainer, { backgroundColor: colors.color4 }]}
        onPress={() => {
          handleStop();
        }}
      >
        <FontAwesome5Icons name="stop" color={colors.color6} size={18} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.buttonContainer, { backgroundColor: colors.color2 }]}
        onPress={() => {
          handleStart();
        }}
      >
        <FontAwesome5Icons
          name={isRunning ? "pause" : "play"}
          color={colors.color6}
          size={18}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.buttonContainer, { backgroundColor: colors.color4 }]}
        onPress={() => {
          handleLap();
        }}
      >
        <FontAwesome5Icons
          name="step-forward"
          color={colors.color6}
          size={18}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: width,
  },
  buttonContainer: {
    height: 50,
    width: 50,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Controllers;
