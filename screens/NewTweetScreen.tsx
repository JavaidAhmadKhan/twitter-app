import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Text, View, TouchableOpacity, TextInput } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import ProfilePicture from "../components/ProfilePicture";

export default function NewTweetScreen() {
  const [tweet, setTweet] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const onPostTweet = () => {
    console.log(`Posting the tweet: ${tweet}
    Image: ${imageUrl}
    `);
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <AntDesign name="close" size={30} color={Colors.light.tint} />
        <TouchableOpacity style={styles.button} onPress={onPostTweet}>
          <Text style={styles.buttonText}>Tweet</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.newTweetContainer}>
        <ProfilePicture
          image={
            "https://avatars.githubusercontent.com/u/45966257?s=400&u=9c2ae4a2df7f3ac2de62574de1d986d09e5692ef&v=4"
          }
        />
        <View style={styles.inputsContainer}>
          <TextInput
            value={tweet}
            onChangeText={(text) => setTweet(text)}
            defaultValue={tweet}
            multiline={true}
            numberOfLines={3}
            style={styles.tweetInput}
            placeholder={"What's happening?"}
          />
          <TextInput
            value={imageUrl}
            onChangeText={(text) => setImageUrl(text)}
            style={styles.imageInput}
            placeholder={"Image url (optional)"}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    paddingTop: 20,
    backgroundColor: "white",
  },

  headerContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
  },

  button: {
    backgroundColor: Colors.light.tint,
    borderRadius: 30,
  },
  buttonText: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  newTweetContainer: {
    flexDirection: "row",
    padding: 15,
  },
  inputsContainer: {
    marginLeft: 10,
  },
  tweetInput: {
    height: 100,
    maxHeight: 300,
    fontSize: 20,
  },
  imageInput: {},
});
