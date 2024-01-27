import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Image,
  ImageBackground,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import axios from "axios";
import { BottomModal, ModalTitle, SlideAnimation } from "react-native-modals";
import { ModalContent } from "react-native-modals";
import {
  Ionicons,
  Octicons,
  Feather,
  EvilIcons,
  AntDesign,
} from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

const index = () => {
  const [option, setOption] = useState("Today");
  const router = useRouter();
  const [habits, setHabits] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState();

  //inisialize current day for update habit where selected
  const currentDay = new Date() //this will give you a date & time of EPOCH format

    //so we convert that EPOCH format to normal format like this:
    .toDateString("en-US", { weekday: "short" })
    .slice(0, 3); //---> this will formated day to be : "Sun", "Mon", "Tue" (3 first word)
  console.log(currentDay);

  useEffect(() => {
    fetchHabits();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchHabits();
    }, []),
  );

  const fetchHabits = async () => {
    try {
      const response = await axios.get(
        "https://backendhabitapp.vercel.app/habitslist",
      );
      setHabits(response.data);
    } catch (error) {
      console.log("error fetching habits", error);
    }
  };

  const handleLongPress = (habitId) => {
    const selectedHabit = habits?.find((habit) => habit._id == habitId);
    setSelectedHabit(selectedHabit);
    setIsModalVisible(true);
  };

  const handleCompletion = async () => {
    try {
      const habitId = selectedHabit?._id;
      const updatedCompletion = {
        ...selectedHabit?.completed,
        [currentDay]: true,
      };

      await axios.put(
        `https://backendhabitapp.vercel.app/habits/${habitId}/completed`,
        {
          completed: updatedCompletion,
        },
      );

      await fetchHabits();

      setIsModalVisible(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  const filteredHabits = habits?.filter((habit) => {
    //filter habits for habit not completed "and or" habits not completed on current day
    return !habit.completed || !habit.completed[currentDay];
  });

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const deleteHabit = async () => {
    try {
      const habitId = selectedHabit._id;

      const response = await axios.delete(
        `https://backendhabitapp.vercel.app/habits/${habitId}`,
      );

      if (response.status == 200) {
        setHabits(response.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const getCompletedDays = (completedObj) => {
    if (completedObj && typeof completedObj === "object") {
      return Object.keys(completedObj).filter((day) => completedObj[day]);
    }

    return [];
  };

  return (
    <>
      <ImageBackground
        source={require("../../assets/Bg2.jpg")}
        resizeMode="cover"
        style={styles.image}
      >
        <ScrollView style={styles.ScrollView}>
          <View style={styles.uperNav}>
            <Image
              style={{ width: 60, height: 60, resizeMode: "cover" }}
              source={require("../../assets/iconApp.png")}
            />
            <FontAwesome
              onPress={() => router.push("/home/create")}
              name="plus-circle"
              size={30}
              color="white"
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
                backgroundColor: option == "Today" ? "#3092c7" : "transparent",
                paddingHorizontal: 10,
                paddingVertical: 8,
                borderRadius: 25,
              }}
            >
              <Text
                style={{ textAlign: "center", color: "white", fontSize: 15 }}
              >
                Today
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setOption("Weekly")}
              style={{
                backgroundColor: option == "Weekly" ? "#3092c7" : "transparent",
                paddingHorizontal: 10,
                paddingVertical: 8,
                borderRadius: 25,
              }}
            >
              <Text
                style={{ textAlign: "center", color: "white", fontSize: 15 }}
              >
                Weekly
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setOption("Overall")}
              style={{
                backgroundColor:
                  option == "Overall" ? "#3092c7" : "transparent",
                paddingHorizontal: 10,
                paddingVertical: 8,
                borderRadius: 25,
              }}
            >
              <Text
                style={{ textAlign: "center", color: "white", fontSize: 15 }}
              >
                Overall
              </Text>
            </Pressable>
          </View>

          {/* maping habit that we fetch from db */}

          {option == "Today" &&
            (filteredHabits?.length > 0 ? (
              <View>
                {filteredHabits?.map((item, index) => (
                  <Pressable
                    onLongPress={() => handleLongPress(item._id)}
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
                        color: "black",
                        fontSize: 18,
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
                  style={{ width: 100, height: 100, resizeMode: "cover" }}
                  source={require("../../assets/empty.png")}
                />
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    fontWeight: "600",
                    marginTop: 10,
                    color: "white",
                  }}
                >
                  No Habits for today
                </Text>

                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    fontWeight: "600",
                    marginTop: 20,
                    color: "white",
                  }}
                >
                  Create one?
                </Text>

                <Pressable
                  onPress={() => router.push("/home/create")}
                  style={{
                    backgroundColor: "#0071c5",
                    marginTop: 20,
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      marginTop: 20,
                      color: "white",
                    }}
                  >
                    Create
                  </Text>
                </Pressable>
              </View>
            ))}

          {option == "Weekly" && (
            <View>
              {habits?.map((habit, index) => (
                <Pressable
                  key={habit.title}
                  style={{
                    marginVertical: 10,
                    backgroundColor: habit.color,
                    padding: 18,
                    borderRadius: 24,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{ fontSize: 18, fontWeight: "500" }}>
                      {habit.title}
                    </Text>
                    <Text style={{ fontSize: 15 }}>{habit.repeatMode}</Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-evenly",
                      marginVertical: 10,
                    }}
                  >
                    {days?.map((day, item) => {
                      const isCompleted =
                        habit.completed && habit.completed[day];

                      return (
                        <Pressable>
                          <Text
                            key={item}
                            style={{
                              color: day == currentDay ? "blue" : "white",
                              fontSize: 16,
                            }}
                          >
                            {day}
                          </Text>
                          {isCompleted ? (
                            <FontAwesome
                              name="circle"
                              size={24}
                              color="white"
                              style={{ marginTop: 12 }}
                            />
                          ) : (
                            <Feather
                              name="circle"
                              size={24}
                              color="white"
                              style={{ marginTop: 12 }}
                            />
                          )}
                        </Pressable>
                      );
                    })}
                  </View>
                </Pressable>
              ))}
            </View>
          )}

          {option == "Overall" && (
            <View>
              {habits?.map((habit, index) => (
                <>
                  <Pressable
                    key={index}
                    style={{
                      marginVertical: 10,
                      backgroundColor: habit.color,
                      padding: 18,
                      borderRadius: 24,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text style={{ fontSize: 18, fontWeight: "500" }}>
                        {habit.title}
                      </Text>
                      <Text style={{ fontSize: 15 }}>{habit.repeatMode}</Text>
                    </View>
                  </Pressable>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginHorizontal: 10,
                    }}
                  >
                    <Text style={{ color: "white" }}>Completed On :</Text>
                    <Text style={{ color: "white" }}>
                      {getCompletedDays(habit.completed).join(", ")}
                    </Text>
                  </View>
                </>
              ))}
            </View>
          )}
        </ScrollView>

        <BottomModal
          onBackdropPress={() => setIsModalVisible(!isModalVisible)}
          onHardwareBackPress={() => setIsModalVisible(!isModalVisible)}
          swipeDirection={["up", "down"]}
          swipeThreshold={200}
          modalTitle={<ModalTitle title="Choose Option" />}
          modalAnimation={
            new SlideAnimation({
              slideFrom: "bottom",
            })
          }
          visible={isModalVisible}
          onTouchOutside={() => setIsModalVisible(!isModalVisible)}
        >
          <ModalContent
            style={{
              width: "100%",
              height: 280,
            }}
          >
            <View style={{ marginVertical: 10 }}>
              <Text>Option</Text>
              <Pressable
                onPress={handleCompletion}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                  marginTop: 10,
                }}
              >
                <Ionicons name="checkmark-circle" size={30} color="#00bf03" />
                <Text style={{ fontSize: 15, fontWeight: "500" }}>
                  Completed
                </Text>
              </Pressable>
              <Pressable
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                  marginTop: 10,
                }}
              >
                <Octicons name="skip" size={30} color="#eded07" />
                <Text style={{ fontSize: 15, fontWeight: "500" }}>Skip</Text>
              </Pressable>
              <Pressable
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                  marginTop: 12,
                }}
              >
                <Feather name="edit-2" size={24} color="black" />
                <Text style={{ fontSize: 15, fontWeight: "500" }}>Edit</Text>
              </Pressable>
              <Pressable
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                  marginTop: 12,
                }}
              >
                <EvilIcons name="archive" size={27} color="black" />
                <Text style={{ fontSize: 15, fontWeight: "500" }}>Archive</Text>
              </Pressable>

              <Pressable
                onPress={deleteHabit}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                  marginTop: 12,
                }}
              >
                <AntDesign name="delete" size={24} color="#e30505" />
                <Text style={{ fontSize: 15, fontWeight: "500" }}>Delete</Text>
              </Pressable>
            </View>
          </ModalContent>
        </BottomModal>
      </ImageBackground>
    </>
  );
};

export default index;

const styles = StyleSheet.create({
  ScrollView: { flex: 1, padding: 10 },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  uperNav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 15,
    paddingHorizontal: 10,
  },
  habitText: { marginTop: 7, fontSize: 25, fontWeight: "500", color: "white" },
});
