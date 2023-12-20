import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";

export default function ChatScreen({ route }) {
  const [messages, setMessages] = useState([]);
  const loggedUser = route.params.loggedUser;
  console.log("route.params", route.params);
  // compare function
  function compare(a, b) {
    const aTime = new Date(a.createdAt).getTime();
    const bTime = new Date(b.createdAt).getTime();
    if (aTime < bTime) {
      return 1;
    }
    if (aTime > bTime) {
      return -1;
    }
    return 0;
  }

  const getAllMessages = async () => {
    const userChatStr = await AsyncStorage.getItem(
      "allchat_" + loggedUser.mobileNo
    );
    if (userChatStr != null) {
      const allMsg = await JSON.parse(userChatStr);
      // const chatUserMsg = allMsg.filter(
      //   (msg) =>
      //     msg.user.chatUser == route.params.chatUser.mobile ||
      //     msg.user.chatUser == route.params.loggedUser.mobileNo
      // );

      let chatUserMsg = [];
      if (route.params.chatUser.mobile == "100") {
        console.log(
          "//////////////////////////////////////////////////////////////////////////////"
        );
        chatUserMsg = allMsg.filter((msg) => msg.user.group == "true");
      } else {
        chatUserMsg = allMsg.filter(
          (msg) =>
            (msg.user.chatUser == route.params.chatUser.mobile &&
              msg.user._id == route.params.loggedUser.mobileNo) ||
            (msg.user._id == route.params.chatUser.mobile &&
              msg.user.chatUser == route.params.loggedUser.mobileNo)
        );
      }
      console.log(",,,,,,,,,,,,,,,,,,,,,,", chatUserMsg);
      setMessages(chatUserMsg.sort(compare));
    }
  };
  useEffect(() => {
    getAllMessages();
  }, []);

  const onSend = async (messageArray) => {
    console.log("messageArray", messageArray);
    let allmsg = [];
    const userChatStr = await AsyncStorage.getItem(
      "allchat_" + loggedUser.mobileNo
    );
    if (userChatStr != null) {
      allmsg = await JSON.parse(userChatStr);
    }
    allmsg.push(messageArray[0]);
    await AsyncStorage.setItem(
      "allchat_" + loggedUser.mobileNo,
      JSON.stringify(allmsg)
    );
    //////////////////////////////////////////////////////
    let allChatUserMsg = [];
    const chatUserStr = await AsyncStorage.getItem(
      "allchat_" + route.params.chatUser.mobile
    );
    if (chatUserStr != null) {
      allChatUserMsg = await JSON.parse(chatUserStr);
    }
    allChatUserMsg.push(messageArray[0]);

    await AsyncStorage.setItem(
      "allchat_" + route.params.chatUser.mobile,
      JSON.stringify(allChatUserMsg)
    );
    let chatUserMsg = [];
    if (route.params.chatUser.mobile == "100") {
      chatUserMsg = allmsg.filter((msg) => msg.user.group == "true");
    } else {
      chatUserMsg = allmsg.filter(
        (msg) =>
          (msg.user.chatUser == route.params.chatUser.mobile &&
            msg.user._id == route.params.loggedUser.mobileNo) ||
          (msg.user._id == route.params.chatUser.mobile &&
            msg.user.chatUser == route.params.loggedUser.mobileNo)
      );
    }
    setMessages(chatUserMsg.sort(compare));
    // setMessages((previousMessages) =>
    // );
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <GiftedChat
        messages={messages}
        onSend={(text) => {
          console.log("text", text);
          onSend(text);
        }}
        user={{
          _id: parseInt(loggedUser.mobileNo),
          avatar:
            "https://ui-avatars.com/api/?background=0dbc3f&color=FFF&name=" +
            loggedUser.name[0],
          chatUser: route.params.chatUser.mobile,
          group: route.params.chatUser.mobile == "100" ? "true" : "false",
        }}
        renderBubble={(props) => {
          return (
            <Bubble
              {...props}
              wrapperStyle={{
                left: {
                  backgroundColor: "green",
                },
              }}
            />
          );
        }}
        renderInputToolbar={(props) => {
          return (
            <InputToolbar
              {...props}
              containerStyle={{ borderTopWidth: 1.5, borderTopColor: "green" }}
              textInputStyle={{ color: "black" }}
            />
          );
        }}
      />
    </View>
  );
}

//THUQdkImzFVOv2LqHvxdSn3RDLY2-jxgISB0nWgRmtfu2OIn1BIVlBMu1
