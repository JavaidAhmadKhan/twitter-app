import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";

import { API, graphqlOperation, Auth } from "aws-amplify";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import ProfilePicture from "../components/ProfilePicture";
import { createTweet } from "../graphql/mutations";
import { useNavigation } from "@react-navigation/native";
import navigation from "../navigation";

export default function NewTweetScreen() {
  const [tweet, setTweet] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const navigation = useNavigation();

  const onPostTweet = async () => {
    try {
      const currentUser = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });

      const newTweet = {
        content: tweet,
        image: imageUrl,
        userID: currentUser.attributes.sub,
      };
      await API.graphql(graphqlOperation(createTweet, { input: newTweet }));
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="close" size={30} color={Colors.light.tint} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={onPostTweet}>
          <Text style={styles.buttonText}>Tweet</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.newTweetContainer}>
        <View style={styles.image}>
          <ProfilePicture
            image={
              "https://avatars.githubusercontent.com/u/45966257?s=400&u=9c2ae4a2df7f3ac2de62574de1d986d09e5692ef&v=4"
            }
          />
        </View>
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

  image: {
    paddingTop: 35,
  },
});
