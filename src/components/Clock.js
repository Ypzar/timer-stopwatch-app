import { View, Text, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { colors } from "../utilities/styles";

const { height, width } = Dimensions.get("screen");

const Clock = ({ time }) => {
  const padToTwo = (number) => (number <= 9 ? `0${number}` : number);

  const displayTime = (centiseconds) => {
    let hours = 0;
    let minutes = 0;
    let seconds = 0;

    if (centiseconds < 0) {
      centiseconds = 0;
    }

    if (centiseconds < 100) {
      return {
        hours: "00",
        minutes: "00",
        seconds: "00",
      };
    }

    let remainCentiseconds = centiseconds % 100;
    seconds = (centiseconds - remainCentiseconds) / 100;

    if (seconds < 60) {
      return {
        hours: "00",
        minutes: "00",
        seconds: padToTwo(seconds),
      };
    }

    let remainSeconds = seconds % 60;
    minutes = (seconds - remainSeconds) / 60;

    if (minutes < 60) {
      return {
        hours: "00",
        minutes: padToTwo(minutes),
        seconds: padToTwo(remainSeconds),
      };
    }

    let remainMinutes = minutes % 60;
    hours = (minutes - remainMinutes) / 60;

    return {
      hours: padToTwo(hours),
      minutes: padToTwo(remainMinutes),
      seconds: padToTwo(remainSeconds),
    };
  };

  return (
    <View style={styles.container}>
      <View style={styles.roundContainer}>
        <Text style={{ color: colors.color5 }}>STOPWATCH</Text>
        <View style={styles.counterContainer}>
          <View style={styles.counterInnerContainer}>
            <Text style={styles.timeText}>{displayTime(time).hours}</Text>
            <Text style={{ color: colors.color5, opacity: 0.7 }}>hrs</Text>
          </View>
          <View style={styles.counterInnerContainer}>
            <Text style={styles.timeText}>{displayTime(time).minutes}</Text>
            <Text style={{ color: colors.color5, opacity: 0.7 }}>min</Text>
          </View>
          <View style={styles.counterInnerContainer}>
            <Text style={styles.timeText}>{displayTime(time).seconds}</Text>
            <Text style={{ color: colors.color5, opacity: 0.7 }}>sec</Text>
          </View>
        </View>
        <View></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  roundContainer: {
    backgroundColor: colors.color4,
    height: width - 100,
    width: width - 100,
    borderRadius: width - 100,
    // borderRadius: 300,
    justifyContent: "space-around",
    alignItems: "center",
    shadowColor: colors.color2,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  counterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
  },
  counterInnerContainer: {
    alignItems: "center",
  },
  timeText: {
    fontSize: 30,
    color: colors.color5,
  },
});
export default Clock;
