import { StatusBar } from "expo-status-bar";
import {
  Alert,
  DevSettings,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import DialogInput from "react-native-dialog-input";
import { DeleteTweet, UpdateTweet, PushHeart } from "../../service/TweetApi";

export default function EachTweet({ eachTweet, name, setToTweet }) {
  const [visible, setVisible] = useState(false);

  const deleteTweet = () => {
    Alert.alert("Delete Tweet", "Are you sure?", [
      { text: "Cancel" },
      {
        text: "I'm Sure",
        style: "destructive",
        onPress: () => {
          DeleteTweet(eachTweet.id).then(() => DevSettings.reload());
        },
      },
    ]);
  };
  return (
    <View style={styles.toTweet}>
      <View style={styles.topLine}>
        <Text>{eachTweet.name}</Text>
        <Text>{eachTweet.createdAt}</Text>
      </View>
      <TouchableOpacity onPress={deleteTweet}>
        {eachTweet.name === name ? <Text>삭제하기</Text> : null}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setVisible(true);
        }}
      >
        {eachTweet.name === name ? <Text>수정하기</Text> : null}
      </TouchableOpacity>
      <DialogInput
        isDialogVisible={visible}
        title={"Modify Tweet"}
        message={"Do you want to modify tweet?"}
        hintInput={"Enter Text"}
        submitInput={(inputText) => {
          console.log(eachTweet.id, inputText);
          UpdateTweet(eachTweet.id, inputText).then(() => DevSettings.reload());
          setVisible(false);
        }}
        closeDialog={() => {
          setVisible(false);
        }}
      ></DialogInput>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.toTweetText}>{eachTweet.text}</Text>
        <TouchableOpacity
          onPress={() =>
            PushHeart(eachTweet.id, name).then(() => DevSettings.reload())
          }
        >
          <Text>
            {eachTweet.heart && eachTweet.heart.includes(name)
              ? `❤️ ${eachTweet.heart.length}`
              : `🤍 ${eachTweet.heart.length}`}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
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
  topLine: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
