import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

const create = () => {
  const color = [
    "#ff6b61", //red
    "#faff61", //yellow
    "#9bff61", //green
    "#61abff", //blue
    "#00ffc3", //cyan
    "#00f7ff", //aqua
  ];

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <View style={styles.container}>
      <Ionicons name="arrow-back-circle-outline" size={30} color="black" />

      <Text style={styles.createText}>
        Create <Text style={styles.habitText}>Habit</Text>
      </Text>
      <TextInput style={styles.titleInput} placeholder="Title" />

      <View style={styles.bodyCreate}>
        <Text style={styles.colorText}>Color</Text>
        <View style={styles.colorContainer}>
          {color?.map((item, index) => (
            <TouchableOpacity key={index} activeOpacity={0.5}>
              <FontAwesome name="circle" size={30} color={item} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <Text style={styles.repeatText}>Repeat</Text>
      <View style={styles.dwContainer}>
        <Pressable style={styles.dwButton}>
          <Text style={{ textAlign: "center" }}>Daily</Text>
        </Pressable>
        <Pressable style={styles.dwButton}>
          <Text style={{ textAlign: "center" }}>Weekly</Text>
        </Pressable>
      </View>

      <Text style={styles.repeatText}>On These Days</Text>

      <View style={styles.dayContainer}>
        {days?.map((item, index) => (
          <Pressable style={styles.dayButton} key={index} activeOpacity={0.5}>
            <Text>{item}</Text>
          </Pressable>
        ))}
      </View>

      <View
        style={{
          marginTop: 20,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "500" }}>Reminder</Text>
        <Text style={{ fontSize: 18, fontWeight: "500", color: "#2774ae" }}>
          Yes
        </Text>
      </View>

      <Pressable style={styles.pressSave}>
        <Text
          style={{ textAlign: "center", color: "white", fontWeight: "bold" }}
        >
          SAVE
        </Text>
      </Pressable>
    </View>
  );
};

export default create;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  createText: {
    fontSize: 20,
    marginTop: 10,
  },
  habitText: {
    fontSize: 20,
    fontWeight: "500",
  },
  titleInput: {
    width: "95%",
    marginTop: 15,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#E1EBEE",
  },
  bodyCreate: {
    marginVertical: 10,
  },
  colorText: {
    fontSize: 18,
    fontWeight: "500",
  },
  colorContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginTop: 10,
  },
  repeatText: {
    fontSize: 18,
    fontWeight: "500",
    marginTop: 10,
  },
  dwContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginVertical: 10,
  },
  dwButton: {
    backgroundColor: "#afdbf5",
    padding: 10,
    borderRadius: 7,
    flex: 1,
  },
  dayContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 10,
  },
  dayButton: {
    width: 38,
    height: 38,
    borderRadius: 5,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
  },
  pressSave: {
    width: "80%",
    marginTop: 20,
    backgroundColor: "#2774ae",
    padding: 10,
    borderRadius: 10,
    fontSize: 18,
    marginLeft: 30,
  },
});