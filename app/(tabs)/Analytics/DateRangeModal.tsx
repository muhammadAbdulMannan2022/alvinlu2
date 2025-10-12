import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import {
  Alert,
  Modal,
  Platform,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

interface DateRangeModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (startDate: Date, endDate: Date) => void;
  initialStartDate?: Date;
  initialEndDate?: Date;
}

const DateRangeModal: React.FC<DateRangeModalProps> = ({
  visible,
  onClose,
  onApply,
  initialStartDate = new Date("2025-10-12"),
  initialEndDate = new Date("2025-10-12"),
}) => {
  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
  };

  const handleStartDateChange = (event: any, selectedDate?: Date) => {
    setShowStartPicker(Platform.OS === "ios");
    if (selectedDate) {
      setStartDate(selectedDate);
      if (selectedDate > endDate) {
        setEndDate(selectedDate);
      }
    }
  };

  const handleEndDateChange = (event: any, selectedDate?: Date) => {
    setShowEndPicker(Platform.OS === "ios");
    if (selectedDate && selectedDate < startDate) {
      Alert.alert("Invalid Date", "End date must be after start date.");
      return;
    }
    if (selectedDate) {
      setEndDate(selectedDate);
    }
  };

  const handleApply = () => {
    if (startDate > endDate) {
      Alert.alert(
        "Invalid Range",
        "Start date must be before or equal to end date."
      );
      return;
    }
    onApply(startDate, endDate);
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 justify-center items-center bg-black/50">
          <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
            <View className="bg-white rounded-2xl w-full max-w-md p-6">
              {/* Header */}
              <View className="flex-row items-center justify-between mb-6">
                <View className="flex-row items-center">
                  <Ionicons name="calendar-outline" size={24} color="#000" />
                  <Text className="text-xl font-semibold ml-2">
                    Select Date Range
                  </Text>
                </View>
                <TouchableOpacity onPress={onClose}>
                  <Ionicons name="close" size={24} color="#666" />
                </TouchableOpacity>
              </View>

              {/* Start Date */}
              <View className="mb-6">
                <Text className="text-base font-semibold mb-2">Start Date</Text>
                <TouchableOpacity
                  onPress={() => setShowStartPicker(true)}
                  className="bg-gray-50 rounded-lg px-4 py-3 flex-row items-center justify-between border border-gray-200"
                >
                  <Text className="text-base text-black">
                    {formatDate(startDate)}
                  </Text>
                  <Ionicons name="calendar-outline" size={20} color="#666" />
                </TouchableOpacity>
                {showStartPicker && (
                  <DateTimePicker
                    value={startDate}
                    mode="date"
                    display={Platform.OS === "ios" ? "spinner" : "default"}
                    minimumDate={new Date("2025-10-12")}
                    onChange={handleStartDateChange}
                  />
                )}
              </View>

              {/* End Date */}
              <View className="mb-6">
                <Text className="text-base font-semibold mb-2">End Date</Text>
                <TouchableOpacity
                  onPress={() => setShowEndPicker(true)}
                  className="bg-gray-50 rounded-lg px-4 py-3 flex-row items-center justify-between border border-gray-200"
                  disabled={showStartPicker}
                >
                  <Text className="text-base text-black">
                    {formatDate(endDate)}
                  </Text>
                  <Ionicons name="calendar-outline" size={20} color="#666" />
                </TouchableOpacity>
                {showEndPicker && (
                  <DateTimePicker
                    value={endDate}
                    mode="date"
                    display={Platform.OS === "ios" ? "spinner" : "default"}
                    minimumDate={startDate}
                    onChange={handleEndDateChange}
                  />
                )}
              </View>

              {/* Action Buttons */}
              <View className="flex-row gap-3">
                <TouchableOpacity
                  onPress={onClose}
                  className="flex-1 bg-white border border-gray-300 rounded-lg py-3 items-center"
                >
                  <Text className="text-base font-semibold text-gray-700">
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleApply}
                  className="flex-1 bg-gray-700 rounded-lg py-3 items-center"
                >
                  <Text className="text-base font-semibold text-white">
                    Apply
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default DateRangeModal;
