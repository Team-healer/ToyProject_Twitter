import { StatusBar } from "expo-status-bar";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import DialogInput from "react-native-dialog-input";
import { DeleteTweet } from "../../service/TweetApi";

export default function EachTweet({ eachTweet, name, setToTweet }) {
  // console.log(eachTweet);
  const deleteTweet = () => {
    Alert.alert("Delete Tweet", "Are you sure?", [
      { text: "Cancel" },
      {
        text: "I'm Sure",
        style: "destructive",
        onPress: async () => await DeleteTweet(eachTweet.id),
      },
    ]);
  };
  return (
    <View style={styles.toTweet}>
      <View style={styles.topLine}>
        <Text>{eachTweet.name}</Text>
        <Text>{eachTweet.createdAt}</Text>
      </View>
      <TouchableOpacity onPress={() => deleteTweet()}>
        {eachTweet.name === name ? <Text>삭제하기</Text> : null}
      </TouchableOpacity>
      {/* <DialogInput
        isDialogVisible={visible}
        title={"Modify Tweet"}
        message={"Do you want to modify tweet?"}
        hintInput={"Enter Text"}
        submitInput={(inputText) => {
          const newToTweet = { ...toTweet };
          neweachTweet.text = inputText;
          setToTweet(newToTweet);
          setVisible(false);
        }}
        closeDialog={() => {
          setVisible(false);
        }}
      ></DialogInput>
      <TouchableOpacity
        onPress={() => {
          setVisible(true);
        }}
      >
        {eachTweet.nickname === nickname ? <Text>수정하기</Text> : null}
      </TouchableOpacity> */}

      <Text style={styles.toTweetText}>{eachTweet.text}</Text>
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
