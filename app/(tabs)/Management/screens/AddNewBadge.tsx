// NewBadgeSetup.js
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Modal,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const NewBadgeSetup = () => {
  const router = useRouter();
  const [levelName, setLevelName] = useState("Platinum VIP");
  const [advanceBookingDays, setAdvanceBookingDays] = useState("3");
  const [selectedColor, setSelectedColor] = useState("#A855F7");
  const [cumulativeBookings, setCumulativeBookings] = useState(true);
  const [cumulativeBookingsCount, setCumulativeBookingsCount] = useState("20");
  const [recentActivity, setRecentActivity] = useState(true);
  const [recentActivityMonths, setRecentActivityMonths] = useState("3");
  const [inactivePeriod, setInactivePeriod] = useState(true);
  const [inactivePeriodMonths, setInactivePeriodMonths] = useState("12");

  // Modal states
  const [showAdvanceModal, setShowAdvanceModal] = useState(false);
  const [showBookingsModal, setShowBookingsModal] = useState(false);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [showInactiveModal, setShowInactiveModal] = useState(false);

  // Temp values for modals
  const [tempValue, setTempValue] = useState("");

  const colors = [
    "#A855F7", // Purple
    "#F59E0B", // Orange
    "#EF4444", // Red
    "#06B6D4", // Cyan
    "#10B981", // Green
    "#6366F1", // Indigo
  ];

  const handleSave = () => {
    console.log("Saving badge:", {
      levelName,
      advanceBookingDays,
      selectedColor,
      cumulativeBookings,
      cumulativeBookingsCount,
      recentActivity,
      recentActivityMonths,
      inactivePeriod,
      inactivePeriodMonths,
    });
    router.back();
  };

  const openModal = (type: any) => {
    switch (type) {
      case "advance":
        setTempValue(advanceBookingDays);
        setShowAdvanceModal(true);
        break;
      case "bookings":
        setTempValue(cumulativeBookingsCount);
        setShowBookingsModal(true);
        break;
      case "activity":
        setTempValue(recentActivityMonths);
        setShowActivityModal(true);
        break;
      case "inactive":
        setTempValue(inactivePeriodMonths);
        setShowInactiveModal(true);
        break;
    }
  };

  const saveModalValue = (type: any) => {
    switch (type) {
      case "advance":
        setAdvanceBookingDays(tempValue);
        setShowAdvanceModal(false);
        break;
      case "bookings":
        setCumulativeBookingsCount(tempValue);
        setShowBookingsModal(false);
        break;
      case "activity":
        setRecentActivityMonths(tempValue);
        setShowActivityModal(false);
        break;
      case "inactive":
        setInactivePeriodMonths(tempValue);
        setShowInactiveModal(false);
        break;
    }
    setTempValue("");
  };

  const EditModal = ({ visible, onClose, onSave, title, label, unit }: any) => (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-center items-center px-4">
        <View className="bg-white rounded-2xl w-full max-w-md p-6">
          <Text className="text-xl font-semibold text-gray-900 mb-6">
            {title}
          </Text>

          <View className="mb-6">
            <Text className="text-sm font-medium text-gray-900 mb-2">
              {label}
            </Text>
            <View className="flex-row items-center">
              <TextInput
                value={tempValue}
                onChangeText={setTempValue}
                placeholder="0"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
                className="flex-1 bg-gray-100 rounded-lg px-4 py-3 text-base text-gray-900"
              />
              <Text className="ml-3 text-base font-medium text-gray-700">
                {unit}
              </Text>
            </View>
          </View>

          <View className="flex-row gap-3">
            <TouchableOpacity
              onPress={onClose}
              className="flex-1 bg-white border border-gray-300 rounded-lg py-3"
            >
              <Text className="text-center font-medium text-gray-900">
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onSave}
              className="flex-1 bg-black rounded-lg py-3"
            >
              <Text className="text-center font-medium text-white">Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView className="flex-1 bg-white" style={{ paddingBottom: 65 }}>
      <ScrollView className="flex-1 " showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-4 py-4 border-b border-gray-200">
          <View className="flex-row items-center">
            <TouchableOpacity
              onPress={() =>
                router.push("/(tabs)/Management/screens/VipSettings")
              }
              className="mr-4"
            >
              <Ionicons name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
            <Text className="text-xl font-semibold text-gray-900">
              New badge set up
            </Text>
          </View>
        </View>
        <View
          className="px-4 py-6 border mx-5 mt-5"
          style={{ borderRadius: 10, borderColor: "#00000020" }}
        >
          {/* Level Name */}
          <View className="mb-6">
            <Text className="text-sm font-medium text-gray-900 mb-2">
              Level Name
            </Text>
            <TextInput
              value={levelName}
              onChangeText={setLevelName}
              placeholder="Enter level name"
              placeholderTextColor="#9CA3AF"
              className="bg-gray-100 rounded-lg px-4 py-3 text-base text-gray-900"
            />
          </View>

          {/* Advance Booking Days */}
          <View className="mb-6">
            <Text className="text-sm font-medium text-gray-900 mb-2">
              Advance Booking Days
            </Text>
            <TouchableOpacity
              onPress={() => openModal("advance")}
              className="bg-gray-100 rounded-lg px-4 py-3"
            >
              <Text className="text-base font-semibold text-gray-900 mb-1">
                {advanceBookingDays} days
              </Text>
              <Text className="text-sm text-gray-600">
                Book {advanceBookingDays} days in advance
              </Text>
            </TouchableOpacity>
          </View>

          {/* Color Theme */}
          <View className="mb-6">
            <Text className="text-sm font-medium text-gray-900 mb-3">
              Color Theme
            </Text>
            <View className="flex-row gap-3">
              {colors.map((color, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedColor(color)}
                  className={`w-12 h-12 rounded-xl ${
                    selectedColor === color
                      ? "border-2 border-gray-900"
                      : "border-2 border-transparent"
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </View>
          </View>

          {/* Auto Assign Rules */}
          <View className="mb-6">
            <View className="flex-row items-center mb-4">
              <MaterialCommunityIcons
                name="lightning-bolt"
                size={20}
                color="#10B981"
              />
              <Text className="text-base font-semibold text-gray-900 ml-2">
                Auto Assign Rules
              </Text>
            </View>

            {/* Cumulative Bookings */}
            <View className="mb-4">
              <View className="flex-row items-center justify-between mb-3">
                <View className="flex-row items-center flex-1">
                  <MaterialCommunityIcons
                    name="account-multiple"
                    size={20}
                    color="#6B7280"
                  />
                  <Text className="text-base text-gray-900 ml-2">
                    Cumulative Bookings
                  </Text>
                </View>
                <Switch
                  value={cumulativeBookings}
                  onValueChange={setCumulativeBookings}
                  trackColor={{ false: "#D1D5DB", true: "#000000" }}
                  thumbColor="#FFFFFF"
                />
              </View>
              {cumulativeBookings && (
                <TouchableOpacity
                  onPress={() => openModal("bookings")}
                  className="ml-7 bg-gray-50 rounded-lg p-4"
                >
                  <Text className="text-lg font-bold text-gray-900 mb-1">
                    {cumulativeBookingsCount} bookings
                  </Text>
                  <Text className="text-sm text-gray-600">
                    Auto-assign after {cumulativeBookingsCount} total bookings
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Recent Activity */}
            <View className="mb-4">
              <View className="flex-row items-center justify-between mb-3">
                <View className="flex-row items-center flex-1">
                  <MaterialCommunityIcons
                    name="calendar-clock"
                    size={20}
                    color="#6B7280"
                  />
                  <Text className="text-base text-gray-900 ml-2">
                    Recent Activity
                  </Text>
                </View>
                <Switch
                  value={recentActivity}
                  onValueChange={setRecentActivity}
                  trackColor={{ false: "#D1D5DB", true: "#000000" }}
                  thumbColor="#FFFFFF"
                />
              </View>
              {recentActivity && (
                <TouchableOpacity
                  onPress={() => openModal("activity")}
                  className="ml-7 bg-gray-50 rounded-lg p-4"
                >
                  <Text className="text-lg font-bold text-gray-900 mb-1">
                    {recentActivityMonths} months
                  </Text>
                  <Text className="text-sm text-gray-600">
                    Auto-assign if booked within last {recentActivityMonths}{" "}
                    months
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Auto Remove Rules */}
          <View className="mb-8">
            <View className="flex-row items-center mb-4">
              <Feather name="user-x" size={24} color="#EF4444" />
              <Text className="text-base font-semibold text-gray-900 ml-2">
                Auto Remove Rules
              </Text>
            </View>

            {/* Inactive Period */}
            <View>
              <View className="flex-row items-center justify-between mb-3">
                <Text className="text-base text-gray-900">Inactive Period</Text>
                <Switch
                  value={inactivePeriod}
                  onValueChange={setInactivePeriod}
                  trackColor={{ false: "#D1D5DB", true: "#000000" }}
                  thumbColor="#FFFFFF"
                />
              </View>
              {inactivePeriod && (
                <TouchableOpacity
                  onPress={() => openModal("inactive")}
                  className="bg-gray-50 rounded-lg p-4"
                >
                  <Text className="text-lg font-bold text-gray-900 mb-1">
                    {inactivePeriodMonths} months
                  </Text>
                  <Text className="text-sm text-gray-600">
                    Auto-remove after {inactivePeriodMonths} months without
                    bookings
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
        {/* Bottom Actions */}
        <View className="px-4 py-4 ">
          <View className="flex-row gap-3">
            <TouchableOpacity
              onPress={() => router.back()}
              className="flex-1 bg-white border border-gray-300 rounded-lg py-3"
            >
              <Text className="text-center font-medium text-gray-900">
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSave}
              className="flex-1 bg-black rounded-lg py-3"
            >
              <Text className="text-center font-medium text-white">
                Save Changes
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Modals */}
      <EditModal
        visible={showAdvanceModal}
        onClose={() => setShowAdvanceModal(false)}
        onSave={() => saveModalValue("advance")}
        title="Edit Advance Booking Days"
        label="Number of days"
        unit="days"
      />

      <EditModal
        visible={showBookingsModal}
        onClose={() => setShowBookingsModal(false)}
        onSave={() => saveModalValue("bookings")}
        title="Edit Cumulative Bookings"
        label="Number of bookings"
        unit="bookings"
      />

      <EditModal
        visible={showActivityModal}
        onClose={() => setShowActivityModal(false)}
        onSave={() => saveModalValue("activity")}
        title="Edit Recent Activity"
        label="Number of months"
        unit="months"
      />

      <EditModal
        visible={showInactiveModal}
        onClose={() => setShowInactiveModal(false)}
        onSave={() => saveModalValue("inactive")}
        title="Edit Inactive Period"
        label="Number of months"
        unit="months"
      />
    </SafeAreaView>
  );
};

export default NewBadgeSetup;
