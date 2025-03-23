import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Button,
  ButtonProps,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";

// Counter Button component
function CounterButton(props: ButtonProps): React.JSX.Element {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{ ...styles.button, backgroundColor: props.color }}
    >
      <Text style={styles.buttonText}>{props.title}</Text>
    </TouchableOpacity>
  );
}

// Counter Text component
function CounterText(props: { number: number }): React.JSX.Element {
  return <Text style={styles.text}>{props.number}</Text>;
}

// Counter Area component
function CounterArea(): React.JSX.Element {
  // define state
  const [counter, setCounter] = useState<number>(0);

  // counter ++
  const increase = () => setCounter(counter + 1);

  // counter --
  const decrease = () => setCounter(counter - 1);

  // return Component
  return (
    <View style={styles.counterArea}>
      <CounterText number={counter} />
      <View style={styles.buttonRow}>
        <CounterButton
          title="+"
          color={"mediumseagreen"}
          onPress={() => increase()}
        />
        <CounterButton title="-" color={"maroon"} onPress={() => decrease()} />
      </View>
    </View>
  );
}

// App
export default function App(): React.JSX.Element {
  return (
    <View style={styles.view}>
      <CounterArea />
    </View>
  );
}

// App styl
const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: "bisque",
    alignItems: "center",
    justifyContent: "center",
  },
  counterArea: {
    display: "flex",
    gap: 48,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  text: {
    fontSize: 64,
    fontStyle: "italic",
    fontWeight: "bold",
    color: "slateblue",
  },
  buttonText: {
    fontSize: 64,
    fontStyle: "italic",
    fontWeight: "bold",
    color: "bisque",
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 96,
    height: 96,
    borderRadius: 24,
  },
  buttonRow: {
    display: "flex",
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});
