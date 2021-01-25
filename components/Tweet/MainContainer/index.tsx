import React from "react";
import { Text, View, Image } from "react-native";
import { TweetType } from "../../../types";
import styles from "./styles";
import { Entypo } from "@expo/vector-icons";
import Footer from "./Footer";
import moment from "moment";
export type MainContainerProps = {
  tweet: TweetType;
};

const MainContainer = ({ tweet }: MainContainerProps) => (
  <View style={styles.container}>
    <View style={styles.tweetHeaderContainer}>
      <View style={styles.tweetHeaderNames}>
        <Text style={styles.name}>{tweet.user.name}</Text>
        <Text style={styles.username}>@{tweet.user.username}</Text>
        <Text style={styles.createdAt}>
          {moment(tweet.createdAt).fromNow()}
        </Text>
      </View>
      <Entypo name="chevron-down" size={16} color={"gray"} />
    </View>
    <View>
      <Text style={styles.content}>{tweet.content}</Text>
      {!!tweet.image && (
        <Image style={styles.images} source={{ uri: tweet.image }} />
      )}
    </View>
    <Footer tweet={tweet} />
  </View>
);

export default MainContainer;
