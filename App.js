import { StatusBar, StyleSheet, Text, View } from "react-native";
import Screens from "./src/screens/Screens";

export default function App() {
  return <Screens />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
