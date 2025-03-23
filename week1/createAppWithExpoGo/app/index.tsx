import { Text, View, StyleSheet } from "react-native";

// Return app
export default function Index(): React.JSX.Element {
  // Ekranın ortasına 'Hello World !'.
  // Write 'Hello World !' in the center of the screen.
  return (
    <View style={myStyle.view}>
      <Text style={myStyle.text}>Hello World</Text>
    </View>
  );
}

// Style
const myStyle = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "bisque",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    fontStyle: "italic",
    color: "rebeccapurple",
  },
});
