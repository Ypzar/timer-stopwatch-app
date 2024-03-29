import { View, Text, StyleSheet, StatusBar } from "react-native";
import React, { useState, useRef, useCallback } from "react";
import Clock from "./Clock";
import Lap from "./Lap";
import Controllers from "./Controllers";
import { colors } from "../utilities/styles";

const Home = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState([]);

  const timer = useRef(null);

  const handleStart = useCallback(() => {
    if (!isRunning) {
      const interval = setInterval(() => {
        setTime((previousTime) => previousTime + 100);
      }, 1000);
      timer.current = interval;
    } else {
      clearInterval(timer.current);
    }

    setIsRunning((previousState) => !previousState);
  }, [isRunning]);

  const handleLap = useCallback(() => {
    if (isRunning) {
      setResults((previousState) => [...previousState, time]);
    }
  }, [isRunning, time]);

  const handleStop = useCallback(() => {
    setResults([]);
    setTime(0);
    clearInterval(timer.current);
    setIsRunning(false);
  }, [isRunning]);

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <View style={{ flex: 50 }}>
        <Clock time={time} />
      </View>
      <View style={{ flex: 35 }}>
        <Lap results={results} />
      </View>
      <View style={{ flex: 15 }}>
        <Controllers
          isRunning={isRunning}
          handleStart={handleStart}
          handleLap={handleLap}
          handleStop={handleStop}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.color1,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Home;
