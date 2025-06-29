import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import {
  fetchAllMedicationsAndSchedule,
  deleteMedicationAndReschedule,
} from "../backend/medicationService";

export default function MedicationReminders() {
  const [loading, setLoading] = useState(true);
  const [notis, setNotis] = useState([]);
  const [times, setTimes] = useState({
    morning: "09:00",
    afternoon: "13:00",
    night: "20:00",
  });

  useFocusEffect(
    useCallback(() => {
      const load = async () => {
        const { notifications, times } =
          await fetchAllMedicationsAndSchedule();
        setNotis(notifications);
        setTimes(times);
        setLoading(false);
      };
      load();
    }, [])
  );

  const now = new Date();
  const currentTime = now.toTimeString().slice(0, 5);

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <Text>Loading medications...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ backgroundColor: "#DFF6FB", flex: 1 }}>
      <ScrollView style={styles.container}>
        <View style={styles.innerContainer}>
          <Text style={styles.mainTitle}>Medication Reminders</Text>
          <Text style={styles.subtitle}>
            Stay on track with your medication schedule
          </Text>

          <View style={styles.summaryContainer}>
            <View style={styles.summaryCard}>
              <Text style={[styles.summaryNumber, { color: "#007AFF" }]}>
                {notis.length}
              </Text>
              <Text>Total</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.addButton}
            onPress={() => router.push("/(medireminders)/addmedications")}
          >
            <Ionicons name="add-circle" size={20} color="white" />
            <Text style={styles.addButtonText}>Add New Medication</Text>
          </TouchableOpacity>

          <Text style={{ fontSize: 20, fontWeight: "bold", marginVertical: 20 }}>
            Medication Reminders
          </Text>

          {notis.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="medical" size={64} color="#ccc" />
              <Text style={styles.emptyStateText}>No medications added yet</Text>
              <Text style={styles.emptyStateSubtext}>
                Tap the button below to add your first medication
              </Text>
            </View>
          ) : (
            notis.map((noti) => {
              const displayTime =
                noti.NotificationTime === "morning"
                  ? times.morning
                  : noti.NotificationTime === "afternoon"
                  ? times.afternoon
                  : times.night;

              const isUpcoming =
                displayTime > currentTime;

              return (
                <View
                  key={noti.NotificationID}
                  style={{
                    padding: 20,
                    backgroundColor: "white",
                    marginBottom: 10,
                    borderRadius: 10,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ width: "90%" }}>
                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                      {noti.NotificationName}
                    </Text>
                    <Text style={{ marginTop: 10 }}>Time: {displayTime}</Text>
                    <View
                      style={{
                        padding: 10,
                        backgroundColor: isUpcoming ? "#FFB6C1" : "grey",
                        borderRadius: 10,
                        marginTop: 10,
                        justifyContent: "center",
                        alignItems: "center",
                        width: "50%",
                      }}
                    >
                      <Text
                        style={{
                          color: isUpcoming ? "darkred" : "white",
                          fontWeight: "bold",
                        }}
                      >
                        {isUpcoming ? "Upcoming" : "Done"}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={{ padding: 10, borderRadius: 99 }}
                    onPress={() =>
                      deleteMedicationAndReschedule(noti.NotificationID).then(
                        async ({ notifications, times }) => {
                          setNotis(notifications);
                          setTimes(times);
                        }
                      )
                    }
                  >
                    <Ionicons name="trash-outline" size={20} color="red" />
                  </TouchableOpacity>
                </View>
              );
            })
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  
});
