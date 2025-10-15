import { Ionicons } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Calendar, CalendarProps } from "react-native-calendars";
import { SafeAreaView } from "react-native-safe-area-context";

interface MarkedDates {
  [date: string]: {
    selected: boolean;
    selectedColor: string;
  };
}

const ScheduleEditor: React.FC = () => {
  const [selectedDates, setSelectedDates] = useState<MarkedDates>({});
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const bottomBarHeight = useBottomTabBarHeight();
  const router = useRouter();
  const [currentMonth, setCurrentMonth] = useState<string>("");

  // Single array of all time slots
  const allTimeSlots: string[] = [
    "08:00",
    "08:10",
    "08:20",
    "08:30",
    "08:40",
    "08:50",
    "09:00",
    "09:10",
    "09:20",
    "09:30",
    "09:40",
    "09:50",
    "10:00",
    "10:10",
    "10:20",
    "10:30",
    "10:40",
    "10:50",
    "11:00",
    "11:10",
    "11:20",
    "11:30",
    "11:40",
    "11:50",
    "12:00",
    "12:10",
    "12:20",
    "12:30",
    "12:40",
    "12:50",
    "13:00",
    "13:10",
    "13:20",
    "13:30",
    "13:40",
    "13:50",
    "14:00",
    "14:10",
    "14:20",
    "14:30",
    "14:40",
    "14:50",
    "15:00",
    "15:10",
    "15:20",
    "15:30",
    "15:40",
    "15:50",
    "16:00",
    "16:10",
    "16:20",
    "16:30",
    "16:40",
    "16:50",
    "17:00",
    "17:10",
    "17:20",
    "17:30",
    "17:40",
    "17:50",
    "18:00",
    "18:10",
    "18:20",
    "18:30",
    "18:40",
    "18:50",
    "19:00",
    "19:10",
    "19:20",
    "19:30",
    "19:40",
    "19:50",
    "20:00",
    "20:10",
    "20:20",
    "20:30",
  ];

  const onDayPress: CalendarProps["onDayPress"] = (day) => {
    const dateString: string = day.dateString;
    setSelectedDates((prev) => {
      const newDates = { ...prev };
      if (newDates[dateString]) {
        delete newDates[dateString];
      } else {
        newDates[dateString] = {
          selected: true,
          selectedColor: "#000000",
        };
      }
      return newDates;
    });
  };

  const addTimeSlot = (time: string): void => {
    if (!selectedSlots.includes(time)) {
      setSelectedSlots((prev) => [...prev, time]);
    }
  };

  const removeTimeSlot = (time: string): void => {
    setSelectedSlots((prev) => prev.filter((slot) => slot !== time));
  };

  const pasteToSelected = (): void => {
    const dates = Object.keys(selectedDates);
    console.log("Paste to selected dates:", dates);
    console.log("Selected time slots:", selectedSlots);
  };

  const pasteToEntireMonth = (): void => {
    console.log("Paste to entire month", currentMonth);
    console.log("Selected time slots:", selectedSlots);
  };

  // Group time slots into rows of 4 for display
  const rows = [];
  for (let i = 0; i < allTimeSlots.length; i += 4) {
    rows.push(allTimeSlots.slice(i, i + 4));
  }

  return (
    <SafeAreaView
      className="flex-1 bg-white px-4 md:px-5"
      style={{ paddingBottom: bottomBarHeight + 60 }}
    >
      <View className="flex-1">
        <ScrollView className="flex-1">
          {/* Header */}
          <View
            className="flex-row items-center py-3 pb-5"
            style={{ borderColor: "#00000020" }}
          >
            <TouchableOpacity
              onPress={() =>
                router.push("/(tabs)/Management/screens/BusinessHours")
              }
              className="mr-3"
            >
              <Ionicons name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity className="mr-3">
              <Ionicons name="settings-outline" size={24} color="#000" />
            </TouchableOpacity>
            <Text className="text-lg font-semibold">
              Editing Schedule period
            </Text>
          </View>
          {/* Month Calendar */}
          <View
            className="px-4 py-3 border mt-5"
            style={{ borderColor: "#00000020", borderRadius: 10 }}
          >
            <View className="flex-row items-center mb-3">
              <Ionicons name="calendar-outline" size={18} color="#000" />
              <Text className="ml-2 font-semibold">Month</Text>
            </View>

            <Calendar
              markedDates={selectedDates}
              onDayPress={onDayPress}
              onMonthChange={(month) => {
                // month is an object like { year: 2025, month: 10, timestamp, dateString }
                const monthStr = `${month.year}-${String(month.month).padStart(2, "0")}`;
                setCurrentMonth(monthStr);
                console.log("Current month:", monthStr);
              }}
              theme={{
                backgroundColor: "#ffffff",
                calendarBackground: "#ffffff",
                textSectionTitleColor: "#6b7280",
                selectedDayBackgroundColor: "#000000",
                selectedDayTextColor: "#ffffff",
                todayTextColor: "#000000",
                dayTextColor: "#1f2937",
                textDisabledColor: "#d1d5db",
                monthTextColor: "#1f2937",
                textMonthFontWeight: "600",
                textDayFontSize: 14,
                textMonthFontSize: 16,
                arrowColor: "#000000",
              }}
            />
          </View>

          {/* Selected Time Slots */}
          <View
            className="px-4 border my-6 py-4"
            style={{ borderColor: "#00000020", borderRadius: 10 }}
          >
            <Text className="font-semibold mb-2">Selected Slots</Text>
            <View className="flex-row flex-wrap gap-2 mt-3 bg-gray-100 px-3 py-4">
              {selectedSlots.map((slot, index) => (
                <View
                  key={`${slot}-${index}`} // Use index to handle duplicate times
                  className="bg-black px-4 py-2 rounded-md flex-row items-center"
                >
                  <Text className="text-white font-medium mr-2">{slot}</Text>
                  <TouchableOpacity onPress={() => removeTimeSlot(slot)}>
                    <Ionicons name="close-circle" size={20} color="#ffffff" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>

          {/* All Time Slots Grid */}
          <View className="px-4 py-3 pb-6">
            <Text className="font-semibold mb-2">Available Time Slots</Text>
            {rows.map((row, rowIndex) => (
              <View key={rowIndex} className="flex-row mb-2 gap-2">
                {row.map((time, colIndex) => {
                  const isSelected = selectedSlots.includes(time);
                  return (
                    <TouchableOpacity
                      key={`${time}-${rowIndex}-${colIndex}`}
                      onPress={() => addTimeSlot(time)}
                      className={`flex-1 py-3 rounded-md border ${
                        isSelected
                          ? "bg-black border-black"
                          : "bg-white border-gray-300"
                      }`}
                    >
                      <Text
                        className={`text-center font-medium ${
                          isSelected ? "text-white" : "text-gray-800"
                        }`}
                      >
                        {time}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Bottom Actions */}
        <View className="flex-row px-4 py-4 border-t border-gray-200 gap-3">
          <TouchableOpacity
            onPress={pasteToSelected}
            className="flex-1 py-3 bg-white border border-gray-300 rounded-md"
          >
            <Text className="text-center font-medium text-gray-800">
              Paste to Selected dates
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={pasteToEntireMonth}
            className="flex-1 py-3 bg-black rounded-md"
          >
            <Text className="text-center font-medium text-white">
              Paste to Entire month
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ScheduleEditor;
