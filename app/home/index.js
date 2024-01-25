import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import axios from "axios";

const index = () => {
  const [option, setOption] = useState("Today");
  const router = useRouter();
  const [habits, setHabits] = useState([]);
  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    try {
      const response = await axios.get("http://192.168.100.14:3000/habitslist");
      setHabits(response.data);
    } catch (error) {
      console.log("error fetching habits", error);
    }
  };
  console.log("habits", habits);

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

      {option == "Today" && habits?.length > 0 ? (
        <View>
          {habits?.map((item, index) => (
            <Pressable
              key={index}
              style={{
                marginVertical: 10,
                backgroundColor: item?.color,
                padding: 12,
                borderRadius: 24,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "500",
                  color: "white",
                }}
              >
                {item?.title}
              </Text>
            </Pressable>
          ))}
        </View>
      ) : (
        <View
          style={{
            marginTop: 150,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "auto",
          }}
        >
          <Image
            style={{ width: 60, height: 60, resizeMode: "cover" }}
            source={{
              uri: "https://www.svgrepo.com/show/489659/empty-box.svg",
            }}
          />
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              fontWeight: "600",
              marginTop: 10,
            }}
          >
            No Habits for today
          </Text>

          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              fontWeight: "600",
              marginTop: 10,
            }}
          >
            No Habits for today.Create one?
          </Text>

          <Pressable
            onPress={() => router.push("/home/create")}
            styles={{
              backgroundColor: "#0071c5",
              marginTop: 20,
              paddingHorizontal: 20,
              paddingVertical: 10,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Text>Create</Text>
          </Pressable>
        </View>
      )}
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
