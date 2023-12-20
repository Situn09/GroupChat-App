import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
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
// import auth from '@react-native-firebase/auth'
export default function LoginScreen({ navigation }) {
  const [user, setUser] = useState("");
  AsyncStorage.getItem("loggedUser").then((user) => {
    setUser(JSON.parse(user));
  });

  if (user && user != "") {
    navigation.navigate("Home", { user: user });
  }

  const [mobile, setmobile] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  // if (loading) {
  //   return <ActivityIndicator size="large" color="#00ff00" />;
  // }
  const userLogin = async () => {
    if (!mobile || !password) {
      alert("please add all the field");
      return;
    }
    const allUserStr = await AsyncStorage.getItem("alluser");
    const allUser = allUserStr != null ? await JSON.parse(allUserStr) : [];
    const existUser = allUser.filter((user) => user.mobileNo == mobile);
    if (existUser?.length > 0) {
      if (password == existUser[0].password) {
        await AsyncStorage.setItem("loggedUser", JSON.stringify(existUser[0]));
        navigation.navigate("Home", { user: existUser[0] });
      } else {
        alert("wrong password");
      }
    } else {
      alert("Account doesn't exist, please signup");
    }
    try {
      //   const result =  await auth().signInWithmobileAndPassword(mobile,password)
      setLoading(false);
    } catch (err) {
      alert("something went wrong");
    }
  };
  return (
    <KeyboardAvoidingView behavior="position">
      <View style={styles.box1}>
        <Text style={styles.text}>Welcome to Whatsapp 5.0</Text>
        <Image style={styles.img} source={require("../assets/wa.png")} />
      </View>
      <View style={styles.box2}>
        <TextInput
          label="mobile"
          value={mobile}
          onChangeText={(text) => setmobile(text)}
          mode="outlined"
        />
        <TextInput
          label="password"
          mode="outlined"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
        <Button mode="contained" onPress={() => userLogin()}>
          Login
        </Button>
        <TouchableOpacity onPress={() => navigation.navigate("signup")}>
          <Text style={{ textAlign: "center" }}>Dont have an account ?</Text>
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
