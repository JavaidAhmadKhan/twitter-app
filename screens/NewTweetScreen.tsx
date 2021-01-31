import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Platform,
  Image,
} from "react-native";

import { API, graphqlOperation, Auth, Storage } from "aws-amplify";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { v4 as uuidv4 } from "uuid";

import Colors from "../constants/Colors";
import ProfilePicture from "../components/ProfilePicture";
import { createTweet } from "../graphql/mutations";
import navigation from "../navigation";

export default function NewTweetScreen() {
  const [tweet, setTweet] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImageUrl(result.uri);
    }
  };

  const uploadImage = async () => {
    // await uploadImage();
    // return;
    try {
      const response = await fetch(imageUrl);

      const blob = await response.blob();

      const urlParts = imageUrl.split(".");
      const extension = urlParts[urlParts.length - 1];

      const key = `${uuidv4()}.${extension}`;

      await Storage.put(key, blob);
      return key;
    } catch (error) {
      console.log(error);
    }
  };

  const onPostTweet = async () => {
    let image;
    if (!!imageUrl) {
      image = await uploadImage();
    }

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
          <TouchableOpacity onPress={pickImage}>
            <Text style={styles.pickImage}>Pick an image</Text>
          </TouchableOpacity>
          <Image source={{ uri: imageUrl }} style={styles.imageUpload} />
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

  pickImage: {
    fontSize: 18,
    color: Colors.light.tint,
    marginVertical: 10,
  },

  imageUpload: {
    width: 150,
    height: 150,
  },
});

// npm i -save-dev @types/uuid
