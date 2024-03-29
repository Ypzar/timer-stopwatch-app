import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useState } from "react";
import { colors } from "../utilities/styles";

const Lap = ({ results }) => {
  const padToTwo = (number) => (number <= 9 ? `0${number}` : number);

  const displayTime = (centiseconds) => {
    let hours = 0;
    let minutes = 0;
    let seconds = 0;

    if (centiseconds < 0) {
      centiseconds = 0;
    }

    let remainCentiseconds = centiseconds % 100;
    seconds = (centiseconds - remainCentiseconds) / 100;

    let remainSeconds = seconds % 60;
    minutes = (seconds - remainSeconds) / 60;

    let remainMinutes = minutes % 60;
    hours = (minutes - remainMinutes) / 60;

    return `${padToTwo(hours)}:${padToTwo(remainMinutes)}:${padToTwo(
      remainSeconds
    )}`;
  };
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Lap Time</Text>
        <Text style={styles.titleText}>Lap No.</Text>
      </View>

      <FlatList
        data={results}
        renderItem={(item) => {
          //   console.log(item);

          return (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                width: "100%",
                marginVertical: 10,
                marginHorizontal: -10,
              }}
            >
              <Text style={{ color: "#fff" }}>{displayTime(item.item)}</Text>
              <Text style={{ color: "#fff" }}>
                {results.length - item.index}
              </Text>
            </View>
          );
        }}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  list: {
    flexGrow: 1,
    width: "100%",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    backgroundColor: colors.color4,
    paddingVertical: 10,
  },
  titleText: {
    color: colors.color5,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});

export default Lap;
