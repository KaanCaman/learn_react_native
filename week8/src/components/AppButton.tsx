import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

type Props = {
  title?: string;
  onPress?: () => void;
};

const AppButton: React.FC<Props> = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  button: {
    width: "95%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#9B69F5",
    padding: 12,
    margin: 8,
    borderRadius: 14,
  },
  text: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
  },
});
