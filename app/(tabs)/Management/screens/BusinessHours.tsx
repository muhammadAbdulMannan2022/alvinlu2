// app/business-hours.jsx
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BusinessHours() {
  const router = useRouter();
  const bottomBarHeight = useBottomTabBarHeight();

  const [autoOpenDay, setAutoOpenDay] = useState("5");
  const [advanceBooking, setAdvanceBooking] = useState("5");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [datePickerValue, setDatePickerValue] = useState(new Date());

  const markedDates = {
    "2025-09-03": { marked: true, dotColor: "#000" },
    "2025-09-10": { marked: true, dotColor: "#000" },
    "2025-09-17": { marked: true, dotColor: "#000" },
    "2025-09-24": { marked: true, dotColor: "#000" },
  };

  const handleMonthChange = (direction: any) => {
    setCurrentMonth(
      new Date(
        currentMonth.getFullYear(),
        direction === "prev"
          ? currentMonth.getMonth() - 1
          : currentMonth.getMonth() + 1,
        1
      )
    );
  };

  // This converts the Date object to "YYYY-MM-01" format for the Calendar
  const getCalendarCurrentMonth = () => {
    const y = currentMonth.getFullYear();
    const m = String(currentMonth.getMonth() + 1).padStart(2, "0");
    return `${y}-${m}-01`;
  };

  const getMonthName = () => {
    return currentMonth.toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
  };

  // Handle date picker change
  const onDateChange = (selectedDate: any) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDatePickerValue(selectedDate);
      setAutoOpenDay(selectedDate.getDate().toString());
    }
  };

  return (
    <SafeAreaView
      className="flex-1 bg-white"
      style={{ paddingBottom: bottomBarHeight + 60 }}
    >
      <ScrollView className="flex-1">
        {/* Header */}
        <View
          className="px-4 pt-4 pb-4 flex-row items-center bg-white border-b"
          style={{ borderColor: "#00000020" }}
        >
          <TouchableOpacity
            className="mr-3"
            onPress={() => router.push("/(tabs)/Management/inxex")}
          >
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text className="text-xl font-semibold text-gray-900">
            Business Hours
          </Text>
        </View>

        <View className="px-4 py-6">
          {/* General Booking Settings */}
          <View
            className="bg-white border p-5 mb-4 shadow-sm"
            style={{ borderColor: "#00000020", borderRadius: 10 }}
          >
            <View className="flex-row items-center mb-4">
              <Ionicons name="settings-outline" size={20} color="#000" />
              <Text className="text-base font-semibold text-gray-900 ml-2">
                General Booking Settings
              </Text>
            </View>

            {/* Auto-open day of month */}
            <View className="mb-4">
              <Text className="text-sm font-medium text-gray-900 mb-2">
                Auto-open day of month
              </Text>
              <TouchableOpacity
                className="flex-row items-center bg-gray-50 rounded-xl px-4 py-3 border"
                onPress={() => setShowDatePicker(true)}
                style={{ borderColor: "#00000020", borderRadius: 10 }}
              >
                <Text className="flex-1 text-base text-gray-900">
                  {autoOpenDay}
                </Text>
                <Text className="text-gray-500 ml-2">th</Text>
                <Ionicons
                  name="calendar-outline"
                  size={20}
                  color="#9ca3af"
                  className="ml-2"
                />
              </TouchableOpacity>
            </View>

            {/* Advance booking enable */}
            <View>
              <Text className="text-sm font-medium text-gray-900 mb-2">
                Advance booking enable
              </Text>
              <View
                className="flex-row items-center bg-gray-50 rounded-xl px-4 py-3 border"
                style={{ borderColor: "#00000020", borderRadius: 10 }}
              >
                <TextInput
                  value={advanceBooking}
                  onChangeText={setAdvanceBooking}
                  keyboardType="numeric"
                  className="flex-1 text-base text-gray-900"
                  placeholder="5"
                />
                <Text className="text-gray-500 ml-2">Days Ago</Text>
              </View>
            </View>
          </View>

          {/* Stats Cards */}
          <View
            className="flex-row justify-between mb-4 border px-2 py-3"
            style={{ borderColor: "#00000020", borderRadius: 10 }}
          >
            <View className="flex-1 bg-white rounded-2xl p-4 mr-2 items-center shadow-sm">
              <Text className="text-3xl font-bold text-gray-900 mb-1">0</Text>
              <Text className="text-xs text-gray-500 text-center">
                Total Open Slots
              </Text>
            </View>
            <View className="flex-1 bg-white rounded-2xl p-4 mx-1 items-center shadow-sm">
              <Text className="text-3xl font-bold text-gray-900 mb-1">0</Text>
              <Text className="text-xs text-gray-500 text-center">
                Open Days
              </Text>
            </View>
            <View className="flex-1 bg-white rounded-2xl p-4 ml-2 items-center shadow-sm">
              <Text className="text-3xl font-bold text-gray-900 mb-1">0</Text>
              <Text className="text-xs text-gray-500 text-center">
                Avg Slots/Day
              </Text>
            </View>
          </View>

          {/* Calendar */}
          <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
            {/* Custom Calendar Header */}
            <View className="flex-row items-center justify-between mb-4">
              <View className="flex-row items-center">
                <Ionicons name="calendar" size={20} color="#000" />
                <Text className="text-base font-semibold text-gray-900 ml-2">
                  Hours set up ({getMonthName()})
                </Text>
              </View>
              <View className="flex-row items-center">
                <TouchableOpacity
                  onPress={() => handleMonthChange("prev")}
                  className="p-2"
                >
                  <Ionicons name="chevron-back" size={20} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleMonthChange("next")}
                  className="p-2"
                >
                  <Ionicons name="chevron-forward" size={20} color="#000" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Calendar Component */}
            <Calendar
              key={getCalendarCurrentMonth()} // CRITICAL: Force re-render when month changes
              current={getCalendarCurrentMonth()}
              markedDates={markedDates}
              onDayPress={(d) => {
                console.log(d);
              }}
              hideArrows={true}
              hideExtraDays={true}
              firstDay={1}
              renderHeader={() => <View />} // Hide default header
              theme={{
                backgroundColor: "#ffffff",
                calendarBackground: "#ffffff",
                textSectionTitleColor: "#9ca3af",
                selectedDayBackgroundColor: "#000000",
                selectedDayTextColor: "#ffffff",
                todayTextColor: "#3b82f6",
                dayTextColor: "#1f2937",
                textDisabledColor: "#d1d5db",
                dotColor: "#000000",
                selectedDotColor: "#ffffff",
                arrowColor: "#000000",
                monthTextColor: "#1f2937",
                indicatorColor: "#000000",
                textDayFontFamily: "System",
                textMonthFontFamily: "System",
                textDayHeaderFontFamily: "System",
                textDayFontSize: 14,
                textMonthFontSize: 16,
                textDayHeaderFontSize: 12,
              }}
            />

            {/* Legend */}
            <View className="flex-row items-center mt-4">
              <View className="w-2 h-2 rounded-full bg-black mr-2" />
              <Text className="text-xs text-gray-600">
                Dates with available slots
              </Text>
            </View>
          </View>

          {/* Editing Schedule Period */}
          <View className="bg-white rounded-2xl p-5 shadow-sm">
            <View className="flex-row items-center mb-3">
              <Ionicons name="settings-outline" size={20} color="#000" />
              <Text className="text-base font-semibold text-gray-900 ml-2">
                Editing Schedule period (Monthly basis)
              </Text>
            </View>

            <TouchableOpacity
              className="flex-row items-center justify-between bg-gray-50 rounded-xl p-4"
              onPress={() => {
                // Navigate to edit schedule screen
                // router.push('/edit-schedule')
              }}
            >
              <Text className="text-base text-gray-500">Edit Schedule</Text>
              <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Date Picker for Auto-open day */}
      {showDatePicker && (
        <DateTimePicker
          value={datePickerValue}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}
    </SafeAreaView>
  );
}
