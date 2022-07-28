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
import DialogInput from "react-native-dialog-input";
import EachTweet from "./src/component/tweet";
import { GetTweet, PostTweet } from "./service/TweetApi";

export default function App() {
  const [mytweeting, setmytweeting] = useState(false);
  const [text, setText] = useState("");
  const [toTweet, setToTweet] = useState([
    { id: 1, text: "hi", mytweeting: true, nickname: "hamin" },
  ]);
  const alltweet = () => setmytweeting(false);
  const mytweet = () => setmytweeting(true);
  const onChangeText = (payload) => setText(payload);
  const onChangeNick = (account) => setNickname(account);
  const [visible, setVisible] = React.useState(false);
  const [nickname, setNickname] = useState("");
  const addNickname = () => {
    if (nickname === "") {
      return;
    }
  };
  useEffect(() => {
    console.log("init!!");
    GetTweet().then((res) => setToTweet(res));
  }, []);
  const addTweet = () => {
    console.log("click!");
    if (text === "") {
      return;
    }
    PostTweet(text, nickname).then((res) => setToTweet(res));
    setText("");
  };
  const deleteTweet = (key) => {
    Alert.alert("Delete Tweet", "Are you sure?", [
      { text: "Cancel" },
      {
        text: "I'm Sure",
        style: "destructive",
        onPress: () => {
          const newToTweet = { ...toTweet };
          delete newToTweet[key];
          setToTweet(newToTweet);
        },
      },
    ]);
  };
  // const modifyTweet = (key) => {
  //   if(input===""){
  //     return;
  //   }

  //   const newToTweet = {...toTweet};
  //   newToTweet[key].text = input;
  //   setToTweet(newToTweet);

  // };
  // console.log("refresh!");
  // console.log(toTweet);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <Text style={{ fontSize: 30, color: "white" }}>Dwitter</Text>
        <Text style={{ color: theme.blue }}>@</Text>
        <TextInput
          onSubmitEditing={addNickname}
          onChangeText={onChangeNick}
          placeholder={"nickname"}
          value={nickname}
          style={styles.inputnickname}
        />
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
      <ScrollView>
        {toTweet.map((eachTweet, i) => (
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
    backgroundColor: "white",
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
    fontSize: 18,
    marginVertical: 10,
    marginRight: 20,
  },
  inputpadding: {
    backgroundColor: theme.grey,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    marginLeft: 20,
    marginVertical: 20,
    fontSize: 15,
  },
  inputnickname: {
    backgroundColor: "black",
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
