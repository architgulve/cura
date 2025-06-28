import React from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { Ionicons } from "@expo/vector-icons";

const timeSlots = Array.from({ length: 24 * 12 }, (_, i) => {
  const hour = Math.floor(i / 12)
    .toString()
    .padStart(2, "0");
  const minute = ((i % 12) * 5).toString().padStart(2, "0");
  return { label: `${hour}:${minute}`, value: `${hour}:${minute}` };
});

export default function ProfileSettings() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>Manage your health information</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Personal Information</Text>

          <Text style={styles.label}>Full Name *</Text>
          <TextInput style={styles.input} value="" editable={true} />

          <Text style={styles.label}>Age</Text>
          <TextInput
            style={styles.input}
            value=""
            editable={true}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Meal Times</Text>

          <Text style={styles.label}>Breakfast Time</Text>
          <RNPickerSelect
            value="09:00"
            items={timeSlots}
            onValueChange={() => {}}
            style={pickerSelectStyles}
            useNativeAndroidPickerStyle={false}
            Icon={() => (
              <Ionicons name="chevron-down" size={24} color="black" />
            )}
          />

          <Text style={styles.label}>Lunch Time</Text>
          <RNPickerSelect
            value="13:00"
            items={timeSlots}
            onValueChange={() => {}}
            style={pickerSelectStyles}
            useNativeAndroidPickerStyle={false}
            Icon={() => (
              <Ionicons name="chevron-down" size={24} color="black" />
            )}
          />

          <Text style={styles.label}>Dinner Time</Text>
          <RNPickerSelect
            value="20:00"
            items={timeSlots}
            onValueChange={() => {}}
            style={pickerSelectStyles}
            useNativeAndroidPickerStyle={false}
            Icon={() => (
              <Ionicons name="chevron-down" size={24} color="black" />
            )}
          />
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.reloadButton}>
            <Text style={styles.reloadButtonText}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save Settings</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DFF6FB",
  },
  scrollView: {
    padding: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 16,
    color: "#555",
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: "#444",
    marginBottom: 4,
    marginTop: 8,
  },
  input: {
    backgroundColor: "#F4F4F4",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    fontSize: 16,
    color: "#333",
  },
  buttonRow: {
    flexDirection: "row",
    marginBottom: 16,
    gap: 8,
  },
  saveButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  reloadButton: {
    backgroundColor: "#ffffff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
  },
  reloadButtonText: {
    color: "#007AFF",
    fontWeight: "600",
    fontSize: 16,
  },
});

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    color: "black",
    paddingRight: 30,
    backgroundColor: "#F4F4F4",
    borderRadius: 8,
    marginBottom: 12,
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    color: "black",
    paddingRight: 30,
    backgroundColor: "#F4F4F4",
    borderRadius: 8,
    marginBottom: 12,
  },
  iconContainer: {
    top: 10,
    right: 10,
  },
};
