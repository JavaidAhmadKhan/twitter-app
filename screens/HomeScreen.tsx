import * as React from "react";
import { StyleSheet } from "react-native";
import { View } from "../components/Themed";
import Feed from "../components/Feed";
import NewTweetButton from "../components/NewTweetButton";
import UserFleet from "../components/UserFleetPreview";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <UserFleet
        user={{
          id: "1",
          name: "Javaid",
          username: "Javaid",
          image:
            "https://scontent-del1-1.xx.fbcdn.net/v/t1.0-9/p960x960/94437040_1653586971474246_5637917098882629632_o.jpg?_nc_cat=101&ccb=2&_nc_sid=e3f864&_nc_ohc=8z6VFJkuVt0AX-U8fCc&_nc_oc=AQlzGwALu-HDSq5iTU5H3y26s0oHlvvjErzI4woG5yE8_P0aK9yI1U2XQBUN_Ui1DXk&_nc_ht=scontent-del1-1.xx&tp=6&oh=2bbb59e8f939e035bf7b7ea7cf5078b7&oe=603D95D5",
        }}
      />
      <Feed />
      <NewTweetButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 55,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
