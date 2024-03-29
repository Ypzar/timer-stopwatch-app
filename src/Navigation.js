import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Home from "./components/Home";
import Timer from "./components/Timer";
import { colors } from "../src/utilities/styles";
import { Entypo, Ionicons } from "@expo/vector-icons";

const Tab = createMaterialTopTabNavigator();

const Navigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconComponent;

          if (route.name === "Stopwatch") {
            iconComponent = <Entypo name="stopwatch" size={24} color={color} />;
          } else if (route.name === "Timer") {
            iconComponent = (
              <Ionicons name="timer-outline" size={24} color={color} />
            );
          }
          return iconComponent;
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.color2,
        tabBarInactiveTintColor: colors.color6,
        tabBarStyle: { backgroundColor: colors.color4 },
      })}
    >
      <Tab.Screen name="Stopwatch" component={Home} />
      <Tab.Screen name="Timer" component={Timer} />
    </Tab.Navigator>
  );
};

export default Navigation;
