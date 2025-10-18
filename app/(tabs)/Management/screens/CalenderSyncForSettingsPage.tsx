// CalendarSyncScreen.js
import { Ionicons } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, Switch, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CalendarSyncScreen = () => {
  const router = useRouter();
  const [calendarSyncEnabled, setCalendarSyncEnabled] = useState(true);
  const [googleConnected, setGoogleConnected] = useState(false);
  const [outlookConnected, setOutlookConnected] = useState(false);
  const bottomBarHeight = useBottomTabBarHeight();

  const handleGoogleConnect = () => {
    // Handle Google Calendar connection
    console.log("Connecting to Google Calendar...");
    setGoogleConnected(!googleConnected);
  };

  const handleOutlookConnect = () => {
    // Handle Microsoft Outlook connection
    console.log("Connecting to Microsoft Outlook...");
    setOutlookConnected(!outlookConnected);
  };

  return (
    <SafeAreaView
      className="flex-1 bg-white"
      style={{ paddingBottom: bottomBarHeight + 60 }}
    >
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="bg-white px-4 py-4 border-b border-gray-200">
          <View className="flex-row items-center">
            <TouchableOpacity
              onPress={() => router.push("/(tabs)/Management")}
              className="mr-4"
            >
              <Ionicons name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
            <Text className="text-xl font-semibold text-gray-900">
              Calendar Sync
            </Text>
          </View>
        </View>
        {/* Calendar Synchronization Card */}
        <View
          className="bg-white mt-6 mx-4 p-4 border"
          style={{ borderColor: "#00000020", borderRadius: 10 }}
        >
          {/* Icon and Title */}
          <View className="flex-row items-start mb-3">
            <View className="w-10 h-10 bg-gray-100 rounded-lg items-center justify-center mr-3">
              <Ionicons name="calendar-outline" size={22} color="#000" />
            </View>
            <View className="flex-1">
              <Text className="text-lg font-semibold text-gray-900 mb-1">
                Calendar Synchronization
              </Text>
              <Text className="text-sm text-gray-600 leading-5">
                Sync your business hours and bookings to external calendar
                applications
              </Text>
            </View>
          </View>

          {/* Divider */}
          <View className="h-px bg-gray-200 my-4" />

          {/* Enable Calendar Sync Toggle */}
          <View className="flex-row items-start justify-between">
            <View className="flex-1 mr-3">
              <Text className="text-base font-semibold text-gray-900 mb-1">
                Enable Calendar Sync
              </Text>
              <Text className="text-sm text-gray-600 leading-5">
                Allow external calendar apps to access your schedule
              </Text>
            </View>
            <Switch
              value={calendarSyncEnabled}
              onValueChange={setCalendarSyncEnabled}
              trackColor={{ false: "#D1D5DB", true: "#000000" }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        {calendarSyncEnabled && (
          <>
            {/* Google Calendar Card */}
            <View
              className="bg-white mt-4 mx-4  p-5 border"
              style={{ borderColor: "#00000020", borderRadius: 10 }}
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className="text-base font-semibold text-gray-900 mb-1">
                    Google Calendar
                  </Text>
                  <Text className="text-sm text-gray-600">
                    Choose whose schedule to include
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={handleGoogleConnect}
                  className="bg-black rounded-lg px-5 py-2.5"
                >
                  <Text className="text-white font-medium">
                    {googleConnected ? "Disconnect" : "Connect"}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Show connected status if connected */}
              {googleConnected && (
                <View className="mt-4 pt-4 border-t border-gray-200">
                  <View className="flex-row items-center">
                    <Ionicons
                      name="checkmark-circle"
                      size={20}
                      color="#10B981"
                    />
                    <Text className="text-sm text-green-600 ml-2 font-medium">
                      Connected successfully
                    </Text>
                  </View>
                </View>
              )}
            </View>

            {/* Microsoft Outlook Card */}
            <View
              className="bg-white mt-4 mx-4 mb-6  p-5 border"
              style={{ borderColor: "#00000020", borderRadius: 10 }}
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className="text-base font-semibold text-gray-900 mb-1">
                    Microsoft Outlook
                  </Text>
                  <Text className="text-sm text-gray-600">
                    Choose whose schedule to include
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={handleOutlookConnect}
                  className="bg-black rounded-lg px-5 py-2.5"
                >
                  <Text className="text-white font-medium">
                    {outlookConnected ? "Disconnect" : "Connect"}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Show connected status if connected */}
              {outlookConnected && (
                <View className="mt-4 pt-4 border-t border-gray-200">
                  <View className="flex-row items-center">
                    <Ionicons
                      name="checkmark-circle"
                      size={20}
                      color="#10B981"
                    />
                    <Text className="text-sm text-green-600 ml-2 font-medium">
                      Connected successfully
                    </Text>
                  </View>
                </View>
              )}
            </View>
          </>
        )}

        {/* Info Box */}
        <View
          className="mx-4 mb-6 bg-blue-50 border p-4 mt-4"
          style={{ borderColor: "#bfdbfe", borderRadius: 10 }}
        >
          <View className="flex-row">
            <Ionicons
              name="information-circle-outline"
              size={20}
              color="#3B82F6"
            />
            <View className="flex-1 ml-3">
              <Text className="text-sm text-blue-900 leading-5">
                When calendar sync is enabled, your bookings and business hours
                will automatically appear in your connected calendar apps.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CalendarSyncScreen;
