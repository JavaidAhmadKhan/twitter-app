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

// export default function NewTweetScreen() {
//   const [tweet, setTweet] = useState("");
//   const [imageUrl, setImageUrl] = useState("");

//   const navigation = useNavigation();

//   useEffect(() => {
//     (async () => {
//       if (Platform.OS !== "web") {
//         const {
//           status,
//         } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//         if (status !== "granted") {
//           alert("Sorry, we need camera roll permissions to make this work!");
//         }
//       }
//     })();
//   }, []);

//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.All,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     console.log(result);

//     if (!result.cancelled) {
//       setImageUrl(result.uri);
//     }
//   };

//   const uploadImage = async () => {
//     // await uploadImage();
//     // return;
//     try {
//       const response = await fetch(imageUrl);

//       const blob = await response.blob();

//       const urlParts = imageUrl.split(".");
//       const extension = urlParts[urlParts.length - 1];

//       const key = `${uuidv4()}.${extension}`;

//       await Storage.put(key, blob);
//       return key;
//     } catch (error) {
//       console.log(error);
//       return "";
//     }
//   };

//   const onPostTweet = async () => {
//     let image;
//     if (!!imageUrl) {
//       image = await uploadImage();
//     }

//     try {
//       const currentUser = await Auth.currentAuthenticatedUser({
//         bypassCache: true,
//       });

//       const newTweet = {
//         content: tweet,
//         image,
//         userID: currentUser.attributes.sub,
//       };
//       await API.graphql(graphqlOperation(createTweet, { input: newTweet }));
//       navigation.goBack();
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return (
//     <View style={styles.container}>
//       <View style={styles.headerContainer}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <AntDesign name="close" size={30} color={Colors.light.tint} />
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.button} onPress={onPostTweet}>
//           <Text style={styles.buttonText}>Tweet</Text>
//         </TouchableOpacity>
//       </View>
//       <View style={styles.newTweetContainer}>
//         <View style={styles.image}>
//           <ProfilePicture
//             image={
//               "https://avatars.githubusercontent.com/u/45966257?s=400&u=9c2ae4a2df7f3ac2de62574de1d986d09e5692ef&v=4"
//             }
//           />
//         </View>
//         <View style={styles.inputsContainer}>
//           <TextInput
//             value={tweet}
//             onChangeText={(text) => setTweet(text)}
//             defaultValue={tweet}
//             multiline={true}
//             numberOfLines={3}
//             style={styles.tweetInput}
//             placeholder={"What's happening?"}
//           />
//           <TouchableOpacity onPress={pickImage}>
//             <Text style={styles.pickImage}>Pick an image</Text>
//           </TouchableOpacity>
//           <Image source={{ uri: imageUrl }} style={styles.imageUpload} />
//         </View>
//       </View>
//     </View>
//   );
// }
