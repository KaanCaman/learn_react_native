import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

// Counter Text component
function CounterText(props: { number: number }): React.JSX.Element {
  return <Text style={styles.text}>{props.number}</Text>;
}

// Counter Area component
function CounterArea(): React.JSX.Element {
  // define state
  const [counter, setCounter] = useState<number>(0);

  useEffect(() => {
    // Her 1.5 saniye de counterı bir arttır.
    // Increase the counter every 1.5 seconds.
    const autoCounter = setInterval(() => {
      setCounter(counter + 1);
    }, 1500);

    // Component ekrandan silindiğinde intervali temizliyoruz.
    // Clear the interval when the component is deleted from the screen.
    return () => {
      clearInterval(autoCounter);
    };
  }, [counter]);

  // return Component
  return (
    <View style={styles.counterArea}>
      <CounterText number={counter} />
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
    fontSize: 96,
    fontStyle: "italic",
    fontWeight: "bold",
    color: "darkcyan",
  },
});
