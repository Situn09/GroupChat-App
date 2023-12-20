import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
// import firestore from '@react-native-firebase/firestore'
import { FAB } from "react-native-paper";
export default function HomeScreen({ navigation, route }) {
  const [chats, setChats] = useState(null);
  const getChats = async () => {
    const allchatsStr = await AsyncStorage.getItem(
      "chats_" + route.params.user.mobileNo
    );
    let allchats;
    if (allchatsStr != null) {
      allchats = await JSON.parse(allchatsStr);
      allchats.push({ user: { name: "Group 1", mobile: "100" } });
      setChats(allchats);
    } else {
      const allUserStr = await AsyncStorage.getItem("alluser");
      const allUser = allUserStr != null ? await JSON.parse(allUserStr) : [];
      const allOtherUsers = allUser.filter(
        (user) => user.mobileNo != route.params.user.mobileNo
      );
      const chats = allOtherUsers.map((otheruser) => {
        return {
          user: { mobile: otheruser.mobileNo, name: otheruser.name },
          lastMessage: { text: "Start Converstion", createdAt: new Date() },
        };
      });
      console.log("chats :", chats);
      chats.push({ user: { name: "Group 1", mobile: "100" } });
      setChats(chats);
      await AsyncStorage.setItem(
        "chats_" + route.params.loggedUser.mobileNo,
        JSON.stringify(chats)
      );
    }
  };

  useEffect(() => {
    getChats();
  }, []);

  const RenderCard = ({ item }) => {
    console.log("fdfsdf", item);
    return (
      <TouchableOpacity
        onPress={() => {
          console.log("clicked chat item: ", item);
          return navigation.navigate("Chat", {
            chatUser: item.user,
            loggedUser: route.params.user,
          });
        }}
      >
        <View style={styles.mycard}>
          <Image source={require("../assets/wa.png")} style={styles.img} />
          <View>
            <Text style={styles.text}>
              {item?.user?.name || item.group.name}
            </Text>
            <Text style={styles.text}>{item.user.lastMessage}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={chats}
        renderItem={({ item }) => {
          console.log("item: ", item);
          return <RenderCard item={item} />;
        }}
        keyExtractor={(item) => item.uid}
      />
      <TouchableOpacity
        onPress={async () => {
          await AsyncStorage.setItem("loggedUser", "");
          navigation.navigate("Login");
        }}
      >
        <Text style={styles.fab} color="black">
          Sign Out
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  img: { width: 60, height: 60, borderRadius: 30, backgroundColor: "green" },
  text: {
    fontSize: 18,
    marginLeft: 15,
  },
  mycard: {
    flexDirection: "row",
    margin: 3,
    padding: 4,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "grey",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "grey",
    height: 50,
    width: 80,
    borderRadius: 10,
    color: "white",
    textAlign: "center",
    paddingTop: 15,
  },
});
