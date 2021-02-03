import React from "react";
import { FlatList, View } from "react-native";

import UserFleetPreview from "../UserFleetPreview";
import userWithFleets from "../../data/usersWithFleets";

const UserFleetsList = () => {
  return (
    <View>
      <FlatList
        data={userWithFleets}
        renderItem={({ item }) => <UserFleetPreview user={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default UserFleetsList;
