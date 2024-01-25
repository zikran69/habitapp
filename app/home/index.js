import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import React, { useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const index = () => {
  const [option, setOption] = useState("Today");
  const router = useRouter();
  return (
    <ScrollView style={styles.ScrollView}>
      <View style={styles.uperNav}>
        <FontAwesome5 name="clipboard-list" size={30} color="black" />
        <FontAwesome
          onPress={() => router.push("/home/create")}
          name="plus-circle"
          size={30}
          color="black"
        />
      </View>

      <Text style={styles.habitText}>Habits</Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          marginVertical: 8,
        }}
      >
        <Pressable
          onPress={() => setOption("Today")}
          style={{
            backgroundColor: option == "Today" ? "#E0FFFF" : "transparent",
            paddingHorizontal: 10,
            paddingVertical: 8,
            borderRadius: 25,
          }}
        >
          <Text style={{ textAlign: "center", color: "black", fontSize: 15 }}>
            Today
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setOption("Weekly")}
          style={{
            backgroundColor: option == "Weekly" ? "#E0FFFF" : "transparent",
            paddingHorizontal: 10,
            paddingVertical: 8,
            borderRadius: 25,
          }}
        >
          <Text style={{ textAlign: "center", color: "black", fontSize: 15 }}>
            Weekly
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setOption("Overall")}
          style={{
            backgroundColor: option == "Overall" ? "#E0FFFF" : "transparent",
            paddingHorizontal: 10,
            paddingVertical: 8,
            borderRadius: 25,
          }}
        >
          <Text style={{ textAlign: "center", color: "black", fontSize: 15 }}>
            Overall
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default index;

const styles = StyleSheet.create({
  ScrollView: { flex: 1, backgroundColor: "white", padding: 10 },
  uperNav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  habitText: { marginTop: 15, fontSize: 25, fontWeight: "500" },
});
