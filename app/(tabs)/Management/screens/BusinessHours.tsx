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

// Define interfaces for type safety
interface Booking {
  time: string;
  id: number;
  note?: string;
}
interface BookingData {
  [date: string]: Booking[];
}
interface DayComponentProps {
  date: {
    dateString: string;
    day: number;
    month: number;
    year: number;
    timestamp: number;
  };
  state: "disabled" | "today" | "selected" | "";
}

export default function BusinessHours() {
  const router = useRouter();
  const bottomBarHeight = useBottomTabBarHeight();

  const [autoOpenDay, setAutoOpenDay] = useState("5");
  const [advanceBooking, setAdvanceBooking] = useState("5");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [datePickerValue, setDatePickerValue] = useState(new Date());

  // Sample booking data
  const bookingData: BookingData = {
    "2025-09-03": [
      { time: "09:00", id: 1 },
      { time: "11:00", id: 2 },
      { time: "14:00", id: 3 },
      { time: "14:00", id: 4 },
      { time: "14:00", id: 5 },
      { time: "14:00", id: 6 },
      { time: "14:00", id: 7 },
      { time: "14:00", id: 8 },
      { time: "14:00", id: 9 },
      { time: "14:00", id: 10 },
    ],
    "2025-09-10": [
      { time: "10:00", id: 4 },
      { time: "13:00", id: 5 },
      { time: "15:30", id: 6 },
    ],
    "2025-09-17": [
      { time: "12:00", id: 7 },
      { time: "16:00", id: 8 },
    ],
    "2025-09-24": [
      { time: "09:30", id: 9 },
      { time: "14:30", id: 10 },
    ],
  };

  // Create marked dates object
  //   @ts-ignore
  const markedDates: CalendarProps["markedDates"] = {};
  Object.keys(bookingData).forEach((date) => {
    markedDates[date] = {
      marked: true,
      dotColor: "#000",
    };
  });

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

  // Custom day component
  const DayComponent: React.FC<DayComponentProps> = ({ date, state }) => {
    const dateString = date.dateString;
    const bookings = bookingData[dateString];
    const isDisabled = state === "disabled";

    return (
      <TouchableOpacity
        onPress={(day) => {
          router.push("/(tabs)/Management/screens/ScheduleTime");
        }}
        disabled={isDisabled}
        className="flex-1 items-center py-1"
      >
        <View className="w-8 h-8 items-center justify-center rounded-full">
          <Text
            className={`text-base font-medium ${
              isDisabled ? "text-gray-300" : "text-gray-900"
            }`}
          >
            {date.day}
          </Text>
        </View>

        {bookings && bookings.length > 0 && (
          <View className="mt-1 w-full px-1">
            {bookings.length > 5
              ? bookings.slice(0, 5).map((booking) => (
                  <View
                    key={booking.id}
                    className="mb-0.5 flex-row items-center gap-1"
                  >
                    <Text className="text-xs text-gray-700 text-center">
                      {booking.time}
                    </Text>
                    {booking.note && (
                      <View className="w-1.5 h-1.5 bg-yellow-300" />
                    )}
                  </View>
                ))
              : bookings.map((booking) => (
                  <View
                    key={booking.id}
                    className="mb-0.5 flex-row items-center gap-1"
                  >
                    <Text className="text-xs text-gray-700 text-center">
                      {booking.time}
                    </Text>
                    {booking.note && (
                      <View className="w-1.5 h-1.5 bg-yellow-300" />
                    )}
                  </View>
                ))}

            {/* Add "..." if more than 5 */}
            {bookings.length > 5 && (
              <Text className="text-sm text-gray-800 text-center">...</Text>
            )}
          </View>
        )}

        {bookings && bookings.length > 0 && (
          <View className="absolute top-1 right-1 w-1 h-1 rounded-full bg-black" />
        )}
      </TouchableOpacity>
    );
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
            onPress={() => router.push("/(tabs)/Management")}
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
              hideArrows={true}
              hideExtraDays={true}
              firstDay={1}
              renderHeader={() => <View />} // Hide default header
              //   @ts-ignore
              dayComponent={DayComponent}
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
                router.push("/(tabs)/Management/screens/ScheduleTime");
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
