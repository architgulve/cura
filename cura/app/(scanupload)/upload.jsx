import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import * as ImageManipulator from "expo-image-manipulator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LottieView from "lottie-react-native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const Upload = () => {
  return (
    <SafeAreaView
      style={{
        backgroundColor: "#DFF6FB",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <>
        <TouchableOpacity
          style={{
            backgroundColor: "#008CDB",
            paddingVertical: 15,
            paddingHorizontal: 30,
            borderRadius: 30,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Ionicons
            name="images-outline"
            size={24}
            color="white"
            style={{ marginRight: 10 }}
          />
          <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
            Select Report
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/scan")}
          style={{
            backgroundColor: "#008CDB",
            paddingVertical: 15,
            paddingHorizontal: 30,
            borderRadius: 30,
            flexDirection: "row",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Ionicons
            name="camera-outline"
            size={24}
            color="white"
            style={{ marginRight: 10 }}
          />
          <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
            Scan Report
          </Text>
        </TouchableOpacity>
      </>
    </SafeAreaView>
  );
};

export default Upload;
