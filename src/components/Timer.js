import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import { colors } from "../utilities/styles";
import { TimerPickerModal } from "react-native-timer-picker";
import { LinearGradient } from "expo-linear-gradient";
import { Audio } from "expo-av";
import { Modal } from "react-native";

const screen = Dimensions.get("window");

const formatNumber = (number) => `0${number}`.slice(-2);

const getRemaining = (time) => {
  const hours = Math.floor(time / 3600);
  const mins = Math.floor((time % 3600) / 60);
  const secs = time % 60;
  return {
    hours: formatNumber(hours),
    mins: formatNumber(mins),
    secs: formatNumber(secs),
  };
};

const Timer = () => {
  const [remainingSecs, setRemainingSecs] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const { hours, mins, secs } = getRemaining(remainingSecs);

  const [showPicker, setShowPicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showDisableAlertModal, setShowDisableAlertModal] = useState(false);
  const [isAlertEnabled, setIsAlertEnabled] = useState(true);
  const [alertSound, setAlertSound] = useState(new Audio.Sound());

  // const alertSound = new Audio.Sound();

  const toggle = () => {
    setIsActive(!isActive);
  };

  const reset = async () => {
    setRemainingSecs(0);
    setIsActive(false);
    setShowPicker(false);
    setSelectedTime(null);
    await alertSound.unloadAsync();
  };

  const handlePickerSet = (selectedTime) => {
    setSelectedTime(selectedTime);

    const selectedSeconds =
      selectedTime.hours * 3600 +
      selectedTime.minutes * 60 +
      selectedTime.seconds;
    console.log(selectedSeconds);
    setRemainingSecs(selectedSeconds);
    setShowPicker(false);
    setIsActive(false);
  };

  const handleDisableAlert = async () => {
    setIsAlertEnabled(false);
    setShowDisableAlertModal(false);
    await alertSound.stopAsync();
    await alertSound.unloadAsync();
  };

  // const handlePickerCancel = () => {
  //   setShowPicker(false);
  //   setSelectedTime(null);
  // };

  useEffect(() => {
    let interval = null;

    const loadSound = async () => {
      try {
        await alertSound.loadAsync(
          require("../../assets/mixkit-signal-alert-771.wav")
        ); // Load the sound file
      } catch (error) {
        console.error("Failed to load the sound", error);
      }
    };

    const playAlertSound = async () => {
      if (remainingSecs === 1 && isAlertEnabled) {
        try {
          await alertSound.loadAsync(
            require("../../assets/mixkit-signal-alert-771.wav")
          ); // Load the sound file
          await alertSound.setIsLoopingAsync(true);
          await alertSound.playAsync();
        } catch (error) {
          console.error("Failed to play the sound", error);
        }
      }
    };

    if (isActive && remainingSecs > 0) {
      interval = setInterval(() => {
        setRemainingSecs((remainingSecs) => {
          playAlertSound();
          return remainingSecs - 1;
        });
      }, 1000);
    } else if (!isActive && remainingSecs !== 0) {
      clearInterval(interval);
    }

    if (remainingSecs === 0 && isActive) {
      setShowDisableAlertModal(true);
    }

    return () => {
      clearInterval(interval);
      alertSound.stopAsync();
      alertSound.unloadAsync();
    };
  }, [isActive, remainingSecs]);

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      {!showPicker && remainingSecs === 0 && (
        <TouchableOpacity
          onPress={() => setShowPicker(true)}
          style={[styles.button, styles.buttonSetTime]}
        >
          <Text style={[styles.buttonText, styles.buttonTextSetTime]}>
            Set Time
          </Text>
        </TouchableOpacity>
      )}

      {(showPicker || remainingSecs > 0) && !showPicker && (
        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>{`${hours}:${mins}:${secs}`}</Text>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity onPress={toggle} style={styles.button}>
              <Text style={styles.buttonText}>
                {isActive ? "Pause" : "Start"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={reset}
              style={[styles.button, styles.buttonReset]}
            >
              <Text style={[styles.buttonText, styles.buttonTextReset]}>
                Reset
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View style={styles.timePickerContainer}>
        <TimerPickerModal
          visible={showPicker}
          setIsVisible={setShowPicker}
          onConfirm={handlePickerSet}
          onCancel={() => setShowPicker(false)}
          modalTitle="Set Time"
          closeOnOverlayPress
          // use12HourPicker
          LinearGradient={LinearGradient}
          styles={{
            theme: "dark",
          }}
        />
      </View>

      <Modal visible={showDisableAlertModal} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.disableText}>
              Do you want to disable the alert sound?
            </Text>
            <TouchableOpacity
              style={styles.disableButton}
              onPress={handleDisableAlert}
            >
              <Text style={styles.disableButtonText}>Disable Alert Sound</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Timer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.color1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    borderWidth: 10,
    borderColor: colors.color2,
    width: screen.width / 2.2,
    height: screen.width / 2.2,
    borderRadius: screen.width / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 35,
    color: colors.color2,
  },
  timerText: {
    color: colors.color6,
    fontSize: 65,
    marginBottom: 20,
  },
  buttonReset: {
    borderColor: colors.color7,
  },
  buttonTextReset: {
    color: colors.color7,
  },
  buttonSetTime: {
    borderColor: colors.color8,
  },
  buttonTextSetTime: {
    color: colors.color8,
  },
  timerContainer: {
    alignItems: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    gap: 20,
  },
  timePickerContainer: {
    backgroundColor: "#202020",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  confirmButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
  confirmButton: {
    borderColor: colors.color8,
  },
  confirmButtonText: {
    color: colors.color8,
  },
  cancelButton: {
    borderColor: colors.color7,
  },
  cancelButtonText: {
    color: colors.color7,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  disableText: {
    fontSize: 18,
    textAlign: "center",
    color: colors.color1,
  },
  disableButton: {
    backgroundColor: colors.color8,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  disableButtonText: {
    fontSize: 16,
    color: colors.color4,
    fontWeight: "bold",
  },
});
