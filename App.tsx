import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

import Amplify, { Auth, API, graphqlOperation } from "aws-amplify";
import config from "./aws-exports";
Amplify.configure(config);
import { withAuthenticator } from "aws-amplify-react-native";
import { getUser } from "./graphql/queries";
import { createUser } from "./graphql/mutations";

function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const getRandomImage = () => {
    return "https://avatars.githubusercontent.com/u/45966257?s=400&u=9c2ae4a2df7f3ac2de62574de1d986d09e5692ef&v=4";
  };
  const saveUserToDB = async (user) => {
    await API.graphql(graphqlOperation(createUser, { input: user }));
  };

  useEffect(() => {
    const updateUser = async () => {
      // Get current Authenticated User
      const userInfo = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });
      if (userInfo) {
        // Check if user is already existedin database
        const userData = await API.graphql(
          graphqlOperation(getUser, { id: userInfo.attributes.sub })
        );
        console.log(userData);
        if (!userData.data.getUser) {
          const user = {
            id: userInfo.attributes.sub,
            username: userInfo.username,
            name: userInfo.username,
            email: userInfo.attributes.email,
            image: getRandomImage(),
          };
          await saveUserToDB(user);
        } else {
          console.log("User already exists");
        }
      }

      // If it Does not exist, create the user in database
    };

    updateUser();
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}

export default withAuthenticator(App);
