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
import { theme } from "../../styles";

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

  const alongBefore = () => {
    let intervalSec = Math.floor(
      (new Date().getTime() - Number(eachTweet.createdAt)) / 1000
    );
    let intervalMin = Math.floor(intervalSec / 60);
    let intervalHour = Math.floor(intervalMin / 60);
    let intervalDay = Math.floor(intervalHour / 24);
    let unit = "초";
    if (intervalSec < 60) {
      if (intervalSec == 0) return `방금`;
      return `${intervalSec}${unit} 전`;
    } else if (intervalSec < 60 * 60) {
      unit = "분";
      return `${intervalMin}${unit} 전`;
    } else if (intervalSec < 60 * 60 * 24) {
      unit = "시간";
      return `${intervalHour}${unit} 전`;
    } else {
      unit = "일";
      return `${intervalDay}${unit} 전`;
    }
  };
  return (
    <View style={styles.toTweet}>
      <View style={styles.topLine}>
        <Text style={{ color: theme.blue }}>@{eachTweet.name}</Text>
        <Text>{alongBefore()}</Text>
      </View>
      <DialogInput
        isDialogVisible={visible}
        title={"Modify Tweet"}
        message={"Do you want to modify tweet?"}
        hintInput={"Enter Text"}
        submitInput={(inputText) => {
          UpdateTweet(eachTweet.id, inputText).then(() => DevSettings.reload());
          setVisible(false);
        }}
        closeDialog={() => {
          setVisible(false);
        }}
      ></DialogInput>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: 10,
        }}
      >
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
      <View style={{ flexDirection: "row" }}>
        {eachTweet.name === name ? (
          <TouchableOpacity
            onPress={() => {
              setVisible(true);
            }}
            style={{
              borderColor: "black",
              borderRadius: 5,
              borderStyle: "solid",
              borderWidth: 1,
              padding: 5,
            }}
          >
            <Text>✍️수정</Text>
          </TouchableOpacity>
        ) : null}
        {eachTweet.name === name ? (
          <TouchableOpacity
            onPress={deleteTweet}
            style={{
              marginLeft: 15,
              borderColor: "black",
              borderRadius: 5,
              borderStyle: "solid",
              borderWidth: 1,
              padding: 5,
            }}
          >
            <Text>🗑삭제</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  toTweet: {
    backgroundColor: "white",
    borderRadius: 15,
    margin: 5,
    marginVertical: 10,
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
