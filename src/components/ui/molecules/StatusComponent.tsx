import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { InfoSVG, SuccessSVG } from "../../../assets/icons/Images.js";
import {
  responsiveFontSize,
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from "react-native-responsive-dimensions";

interface StatusProps {
  status: "done" | "pending";
  text: string;
}

const StatusComponent: React.FC<StatusProps> = ({ status, text }) => {
  const statusStyles =
    status === "done"
      ? { color: "green", icon: <SuccessSVG color="#01E17B" /> }
      : { color: "orange", icon: <InfoSVG /> };

  return (
    <View style={styles.container}>
      <View style={styles.icon}>{statusStyles.icon}</View>
      <Text style={[styles.text, { color: statusStyles.color }]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    marginBottom: responsiveScreenHeight(1.2),
    elevation: 1,
    padding: responsiveScreenWidth(0.8),
    borderRadius: responsiveScreenWidth(1),
  },
  icon: {
    marginRight: responsiveScreenWidth(1.5),
  },
  text: {
    fontFamily: "Rubik-Regular",
    color: "black",
    fontSize: responsiveScreenFontSize(1.5),
  },
});

export default StatusComponent;
