import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function HomeReminderPreview() {
  const notis = [
    {
      NotificationID: 1,
      NotificationName: "Paracetamol",
      NotificationTime: "morning",
      taken: false,
    },
    {
      NotificationID: 2,
      NotificationName: "Vitamin D",
      NotificationTime: "night",
      taken: true,
    },
  ];

  const timemap = {
    morning: "09:00",
    afternoon: "13:00",
    night: "20:00",
    evening: "20:00",
  };

  const currentTime = "10:00";

  return (
    <View
      style={{
        margin: 15,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons name="alarm-outline" size={30} color="black" />
          <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 10 }}>
            Medication Reminders
          </Text>
        </View>
        <TouchableOpacity onPress={() => {}}>
          <Ionicons name="refresh-outline" size={30} color="black" />
        </TouchableOpacity>
      </View>

      <View>
        {notis.map((noti) => (
          <View key={noti.NotificationID}>
            {timemap[noti.NotificationTime] >= currentTime && (
              <View
                style={{
                  backgroundColor: "#F0F0F0",
                  width: "100%",
                  height: 70,
                  marginTop: 10,
                  borderRadius: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 10,
                  justifyContent: "space-between",
                }}
              >
                <View style={{ width: "55%", justifyContent: "center" }}>
                  <Text style={{ fontWeight: "bold" }}>
                    {noti.NotificationName}
                  </Text>
                  <Text>{timemap[noti.NotificationTime]}</Text>
                </View>
                <View
                  style={{
                    width: "30%",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: noti.taken ? "#C0F0C0" : "#FFB6C1",
                    borderRadius: 10,
                    padding: 5,
                  }}
                >
                  <Text
                    style={{
                      color: noti.taken ? "green" : "darkred",
                      fontWeight: "bold",
                    }}
                  >
                    {noti.taken ? "Taken" : "Upcoming"}
                  </Text>
                </View>
              </View>
            )}
          </View>
        ))}

        <TouchableOpacity onPress={() => {}}>
          <View
            style={{
              backgroundColor: "#007AFF",
              width: "50%",
              height: 50,
              marginTop: 10,
              borderRadius: 10,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              padding: 10,
              alignSelf: "center",
            }}
          >
            <Ionicons
              name="notifications-outline"
              size={20}
              color="white"
              style={{ marginRight: 5 }}
            />
            <Text style={{ color: "white", fontWeight: "bold" }}>
              View All Reminders
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
