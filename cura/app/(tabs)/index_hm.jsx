import { View, Text, ScrollView } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import HomeReminderPreview from "../../components/homepageremind";
import LottieView from "lottie-react-native";
const index_hm = () => {
  return (
    <SafeAreaView
      edges={["top"]}
      style={{
        backgroundColor: "#DFF6FB",
        flex: 1,
      }}
    >
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1, backgroundColor: "#DFF6FB" }}>
          <View
            style={{
              alignItems: "left",
              flexDirection: "row",
              padding: 20,
              justifyContent: "space-between",
            }}
          >
            <Image
              source={require("../../assets/images/CuraLogo.png")}
              style={{ resizeMode: "contain", width: 50, height: 50 }}
            />
            <Text
              style={{
                fontSize: 40,
                fontWeight: "bold",
              }}
            >
              Cura
            </Text>
            <View
              style={{
                alignItems: "right",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  router.push("/settings");
                }}
              >
                <Ionicons name="settings" size={30} color="black" />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              margin: 10,
              padding: 5,
              alignItems: "center",
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                fontSize: 24,
                fontWeight: "600",
                color: "#333",
                textAlign: "center",
              }}
            >
              good morning
            </Text>
            <Text stle={{ fontSize: 16, lineHeight: 30 }}>
                Let's keep track of your Health today
              </Text>
          </View>
          <HomeReminderPreview/>

          <View style={styles.recommendationCard}>
            <View style={styles.goalHeader}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <LottieView
                  source={require("../../assets/animations/AIHeart.json")}
                  autoPlay
                  loop
                  style={{ width: 50, height: 50 }}
                />
                <Text style={styles.goalTitle}> AI Recommendation</Text>
              </View>
              <TouchableOpacity onPress={() => {}}>
                <Ionicons name="refresh-outline" size={22} color="grey" />
              </TouchableOpacity>
            </View>
            <Text style={styles.recommendationText}>
              Your recent report seems to be healthy, keep it up
            </Text>
          </View>

          <View style={{ padding: 50 }} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default index_hm;

const styles = StyleSheet.create({
  goalHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    justifyContent: "space-between",
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  recommendationCard: {
    backgroundColor: "#fff",
    marginHorizontal: 15,
    borderRadius: 10,
    padding: 15,
    borderColor: "#FFC0CB",
    borderWidth: 0,
  },
  recommendationText: {
    marginTop: 4,
    fontSize: 16,
    color: "#333",
  },
  fabOption: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
    flexDirection: "row",
    gap: 10,
  },
  fabText: {
    color: "white",
    fontWeight: "bold",
  },
});