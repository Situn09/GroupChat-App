import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import { launchImageLibrary } from "react-native-image-picker";

import AsyncStorage from "@react-native-async-storage/async-storage";
// import storage from '@react-native-firebase/storage'
// import auth from '@react-native-firebase/auth'
// import firestore from '@react-native-firebase/firestore'

export default function SignupScreen({ navigation }) {
  const [mobileNo, setmobileNo] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [showNext, setShowNext] = useState(false);
  const [loading, setLoading] = useState(false);
  if (loading) {
    return <ActivityIndicator size="large" color="#00ff00" />;
  }
  const userSignup = async () => {
    setLoading(true);

    if (!mobileNo || !password || !name) {
      alert("please add all the field");
      return;
    }
    const getData = async () => {
      try {
        const allUserStr = await AsyncStorage.getItem("alluser");
        const allUser = allUserStr != null ? JSON.parse(allUserStr) : [];
        if (allUserStr == null) {
          allUser.push({
            mobileNo: mobileNo,
            password: password,
            name: name,
          });
          await AsyncStorage.setItem(
            "alluser",
            JSON.stringify(allUser),
            (obj) => {
              console.log("after save: ", obj);
            }
          );
        } else {
          const existUser = allUser.filter((user) => user.mobileNo == mobileNo);
          if (existUser?.length > 0) {
            console.log("existUser:", existUser);
            alert("User already exist, please login");
            navigation.goBack();
          } else {
            allUser.push({
              mobileNo: mobileNo,
              password: password,
              name: name,
            });
            await AsyncStorage.setItem(
              "alluser",
              JSON.stringify(allUser),
              (obj) => {
                console.log("after save: ", obj);
              }
            );
            alert("User created, please login");
            navigation.goBack();
          }
        }
      } catch (e) {
        console.error("Something went wrong!");
        // error reading value
      }
    };
    getData();
    // AsyncStorage.getItem("alluser", (error, allUser = []) => {
    //   if (error) {
    //     console.error("Something went wrong!");
    //     allUser.push({
    //       mobileNo: mobileNo,
    //       password: password,
    //       name: name,
    //     });
    //     AsyncStorage.setItem("alluser", JSON.stringify(allUser), (obj) => {
    //       console.log("after save: ", obj);
    //     });
    //   } else {
    //     console.log(alluser);
    //     allUser = JSON.parse(allUser);
    //     const existUser = allUser.filter((user) => user.mobileNo == mobileNo);
    //     if (existUser?.length > 0) {
    //       alert("User already exist, please login");
    //     } else {
    //       allUser.push({
    //         mobileNo: mobileNo,
    //         password: password,
    //         name: name,
    //       });
    //       AsyncStorage.setItem("alluser", JSON.stringify(allUser), (obj) => {
    //         console.log("after save: ", obj);
    //       });
    //     }
    //   }
    // });

    // try{
    //   const result =  await auth().createUserWithmobileNoAndPassword(mobileNo,password)
    //     firestore().collection('users').doc(result.user.uid).set({
    //         name:name,
    //         mobileNo:result.user.mobileNo,
    //         uid:result.user.uid,
    //         pic:image,
    //         status:"online"
    //     })
    //     setLoading(false)
    // }catch(err){
    //     alert("something went wrong")
    // }
  };

  return (
    <KeyboardAvoidingView behavior="position">
      <View style={styles.box1}>
        <Text style={styles.text}>Welcome to Whatsapp 5.0</Text>
        <Image style={styles.img} source={require("../assets/wa.png")} />
      </View>
      <View style={styles.box2}>
        {!showNext && (
          <>
            <TextInput
              label="mobileNo"
              value={mobileNo}
              onChangeText={(text) => setmobileNo(text)}
              mode="outlined"
            />
            <TextInput
              label="password"
              mode="outlined"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
            />
          </>
        )}

        {showNext ? (
          <>
            <TextInput
              label="Name"
              value={name}
              onChangeText={(text) => setName(text)}
              mode="outlined"
            />
            <Button
              mode="contained"
              disabled={name ? false : true}
              onPress={() => userSignup()}
            >
              Signup
            </Button>
          </>
        ) : (
          <Button mode="contained" onPress={() => setShowNext(true)}>
            Next
          </Button>
        )}

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ textAlign: "center" }}>Already have an account ?</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 22,
    color: "green",
    margin: 10,
  },
  img: {
    width: 200,
    height: 200,
  },
  box1: {
    alignItems: "center",
  },
  box2: {
    paddingHorizontal: 40,
    justifyContent: "space-evenly",
    height: "50%",
  },
});
