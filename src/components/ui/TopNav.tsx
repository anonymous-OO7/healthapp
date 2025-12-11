import React from "react";
import {
  Share,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  TextInput,
  Dimensions,
  Modal,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  SafeAreaView,
  ActivityIndicator,
  StyleSheet,
  Image,
} from "react-native";
import { BackButtonSVG } from "../../assets/icons/Images";
import { useNavigation } from "@react-navigation/native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const fontScale = Dimensions.get("window").fontScale;

interface Props {
  title: string;
}
const TopNav = ({ title = "" }: Props) => {
  const navigation = useNavigation();

  return (
    <View
      style={
        Platform.OS === "ios"
          ? styles.topBtnCtn
          : [styles.screenMarAndroid, styles.topBtnCtn]
      }
    >
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}
      >
        <Image
          source={require("../../assets/backIcon.png")}
          style={styles.GobackImage}
        />
      </TouchableOpacity>

      {/* Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.fundNameText}>{title}</Text>
      </View>
    </View>
  );
};

export default TopNav;

const styles = StyleSheet.create({
  topBtnCtn: {
    flexDirection: "row",
    width: (89.7 / 100) * windowWidth,
    height: (4.8 / 100) * windowHeight,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-between", // Ensure space distribution
  },
  screenMarAndroid: {
    marginTop: (3.1 / 100) * windowHeight,
    marginBottom: (2 / 100) * windowHeight,
  },
  backBtn: {
    width: (10.1 / 100) * windowWidth,
    height: (10.1 / 100) * windowWidth,
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    flex: 1, // Take up available space
    alignItems: "center", // Center the text horizontally
  },
  fundNameText: {
    fontSize: (windowWidth * 18) / 390 / fontScale,
    lineHeight: (windowWidth * 18) / 390 / fontScale,
    fontFamily: "Rubik-Regular",
    color: "Black",
    textAlign: "center", // Ensure the text is centered within its container
  },
  GobackImage: {},
});
