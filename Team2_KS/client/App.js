import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { theme } from "./styles";
import React, { useEffect, useState } from "react";
import EachTweet from "./src/component/tweet";
import { GetTweet, PostTweet } from "./service/TweetApi";

export default function App() {
  const [mytweeting, setmytweeting] = useState(false);
  const [text, setText] = useState("");
  const [toTweet, setToTweet] = useState([
    { id: 1, text: "hi", mytweeting: true, nickname: "hamin", heart: 1 },
  ]);
  const alltweet = () => {
    GetTweet().then((res) => setToTweet(res));
  };
  const mytweet = () => {
    GetTweet(nickname).then((res) => setToTweet(res));
  };
  const onChangeText = (payload) => setText(payload);
  const onChangeNick = (account) => setNickname(account);
  const [nickname, setNickname] = useState("user");
  const [init, setInit] = useState(false);

  const addNickname = () => {
    if (nickname === "") {
      return;
    }
  };
  useEffect(() => {
    console.log("init!!");
    GetTweet()
      .then((res) => setToTweet(res))
      .then(() => setInit(true));
  }, []);
  const addTweet = () => {
    if (text === "") {
      return;
    }
    PostTweet(text, nickname).then((res) => setToTweet(res));
    setText("");
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <Text style={{ fontSize: 30, color: "white" }}>Dwitter</Text>
        <TouchableOpacity onPress={alltweet}>
          <Text
            style={{
              ...styles.btnText,
              color: mytweeting ? theme.grey : "white",
            }}
          >
            All Tweets
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={mytweet}>
          <Text
            style={{
              ...styles.btnText,
              color: mytweeting ? "white" : theme.grey,
            }}
          >
            My Tweets
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={{ ...styles.btnText, color: theme.grey }}>Logout</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputpadding}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TextInput
            onSubmitEditing={addTweet}
            onChangeText={onChangeText}
            placeholder={"Edit your tweet"}
            value={text}
            style={styles.input}
          />
          <TouchableOpacity onPress={addTweet}>
            <Text style={styles.post}>Post</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", paddingRight: 20 }}>
          <Text style={{ color: theme.blue }}>@</Text>
          <TextInput
            onSubmitEditing={addNickname}
            onChangeText={onChangeNick}
            placeholder={"nickname"}
            value={nickname}
            style={styles.inputnickname}
          />
        </View>
      </View>
      <ScrollView>
        {init &&
          toTweet.map((eachTweet, i) => (
            <EachTweet
              eachTweet={eachTweet}
              key={i}
              name={nickname}
              setToTweet={setToTweet}
            />
          ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#74b9ff",
  },
  toTweet: {
    backgroundColor: "white",
    margin: 5,
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 10,
          height: 10,
        },
        shadowOpacity: 0.5,
        shadowRadius: 10,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  toTweetText: {
    color: "black",
    fontSize: 16,
  },
  post: {
    color: "white",
    backgroundColor: theme.blue,
    marginVertical: 10,
    marginRight: 20,
    fontSize: 20,
    paddingHorizontal: 5,
  },
  inputpadding: {
    backgroundColor: theme.grey,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    marginLeft: 20,
    marginVertical: 20,
    fontSize: 20,
  },
  inputnickname: {
    color: theme.blue,
  },
  header: {
    backgroundColor: "#000",
    justifyContent: "space-between", //나중에 정렬 필요
    marginTop: 40, //이것도 어떻게?
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: "center",
  },
  btnText: {
    fontSize: 15,
    fontWeight: "400",
  },
});
