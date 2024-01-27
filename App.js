import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Redirect } from "expo-router";

export default function App() {
  return (
    <View style={styles.container}>
      <Redirect href="/home" />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
