import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import Navigation from "./src/Navigation";

export default function App() {
  return (
    <NavigationContainer>
      <View className="flex-1 ">
        <Navigation />
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
