import {
  Alert,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { router } from "expo-router";

const create = () => {
  const [selectedColor, setSelectedColor] = useState("");

  const [title, setTitle] = useState("");

  const color = [
    "#ff6b61", //red
    "#e8e83a", //yellow
    "#9bff61", //green
    "#61abff", //blue
    "#00ffc3", //cyan
    "#00f7ff", //aqua
  ];

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  //tarik data buat backend dari sini
  async function addHabit() {
    try {
      const habitDetails = {
        title: title,
        color: selectedColor,
        repeatMode: "Daily",
        reminder: true,
      };

      const response = await axios.post(
        "https://backendhabitapp.vercel.app/habits",
        habitDetails,
      );
      if (response.status === 200) {
        setTitle("");
        Alert.alert("Habit added successfully", "Enjoy your journey");
      }
      console.log("habit added", response);
    } catch (error) {
      console.log("error adding a habit", error);
    }
  }

  return (
    <>
      <ImageBackground
        source={require("../../assets/Bg1.jpg")}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.container}>
          <Ionicons
            onPress={() => router.back()}
            name="arrow-back-circle-outline"
            size={30}
            color="#fffb26"
          />

          <Text style={styles.createText}>
            Create <Text style={styles.habitText}>Habit Title</Text>
          </Text>
          <TextInput
            value={title}
            onChangeText={(text) => setTitle(text)}
            style={styles.titleInput}
            placeholder="Title"
          />

          <View style={styles.bodyCreate}>
            <Text style={styles.colorText}>Color</Text>
            <View style={styles.colorContainer}>
              {color?.map((item, index) => (
                <TouchableOpacity
                  onPress={() => setSelectedColor(item)}
                  key={index}
                  activeOpacity={0.5}
                >
                  {/* mengubah bentuk tampilan warna saat di click */}
                  {selectedColor === item ? (
                    <AntDesign name="plussquare" size={30} color={item} />
                  ) : (
                    <FontAwesome name="circle" size={30} color={item} />
                  )}
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
              <Pressable
                style={styles.dayButton}
                key={index}
                activeOpacity={0.5}
              >
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
            <Text style={{ fontSize: 18, fontWeight: "800", color: "#fffb26" }}>
              Reminder
            </Text>
            <Text style={{ fontSize: 18, fontWeight: "800", color: "#fffb26" }}>
              Yes
            </Text>
          </View>

          <Pressable onPress={addHabit} style={styles.pressSave}>
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontWeight: "bold",
              }}
            >
              SAVE
            </Text>
          </Pressable>
        </View>
      </ImageBackground>
    </>
  );
};

export default create;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "rgba(0, 0, 0, .2)",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  createText: {
    fontSize: 25,
    marginTop: 10,
    fontWeight: "800",
    color: "#fffb26",
  },
  habitText: {
    fontSize: 25,
    fontWeight: "800",
    color: "#fffb26",
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
    fontWeight: "800",
    color: "#fffb26",
  },
  colorContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginTop: 10,
  },
  repeatText: {
    fontSize: 18,
    fontWeight: "800",
    color: "#fffb26",
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
