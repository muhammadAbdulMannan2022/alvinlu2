import EditTemplateModal from "@/components/Modals/EditTemplateModal";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, Switch, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MessageCenterScreen = () => {
  const router = useRouter();
  const bottomBarHeight = useBottomTabBarHeight();
  const [notificationSettings, setNotificationSettings] = useState({
    bookingSuccess: true,
    bookingCancellation: true,
    dayBeforeReminder: true,
    proactiveReminders: true,
  });
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentEditTemplate, setCurrentEditTemplate] = useState(null);
  const [templates, setTemplates] = useState({
    bookingSuccess: {
      title: "Booking Success",
      info: 'To include deposit payment information in booking confirmations, enable "Deposit Collection" in Meetings & Bookings',
      preview:
        "Hi 佐藤さん, your appointment for ジェルネイル on 明日 14:00 is confirmed. See you soon at Nail Studio!",
    },
    bookingCancellation: {
      title: "Booking Cancellation",
      preview:
        "Hi 佐藤さん, your ジェルネイル appointment on 明日 14:00 has been cancelled. Please contact us to reschedule.",
    },
    dayBeforeReminder: {
      title: "Day Before Reminder",
      preview:
        "Hi 佐藤さん, this is a reminder about your ジェルネイル appointment tomorrow at 明日 14:00. See you at Nail Studio!",
    },
    proactiveReminder: {
      title: "Proactive Booking Reminders",
      preview:
        "Hi 佐藤さん, it's a reminder about your ジェルネイル appointment tomorrow at 明日 14:00. Looking forward to seeing you at Nail Studio!",
    },
  });

  const vipLevels = [
    { name: "Platinum VIP", color: "#9333EA", days: "3 days warning" },
    { name: "Gold VIP", color: "#F59E0B", days: "2 days warning" },
    { name: "Silver VIP", color: "#6B7280", days: "1 day warning" },
  ];

  const templateVariables = {
    bookingSuccess: [
      "{customer_name}",
      "{service_name}",
      "{date}",
      "{time}",
      "{shop_name}",
    ],
    bookingCancellation: [
      "{customer_name}",
      "{service_name}",
      "{date}",
      "{time}",
      "{shop_name}",
    ],
    dayBeforeReminder: [
      "{customer_name}",
      "{service_name}",
      "{date}",
      "{time}",
      "{shop_name}",
    ],
    proactiveReminder: [
      "{customer_name}",
      "{service_name}",
      "{date}",
      "{time}",
      "{shop_name}",
      "{vip_level}",
    ],
  };

  const handleEdit = (templateKey: any) => {
    setCurrentEditTemplate(templateKey);
    setEditModalVisible(true);
  };
  // @ts-ignore
  const handleSaveTemplate = (templateKey, newMessage) => {
    setTemplates((prev) => ({
      ...prev,
      // @ts-ignore
      [templateKey]: { ...prev[templateKey], preview: newMessage },
    }));
    setEditModalVisible(false);
  };

  const toggleNotification = (key: any) => {
    setNotificationSettings((prev) => ({
      ...prev,
      //   @ts-ignore
      [key]: !prev[key],
    }));
  };

  const sectionBorderStyle = {
    borderColor: "#00000020",
    borderWidth: 1,
    borderRadius: 10,
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
            <TouchableOpacity onPress={() => router.back()} className="mr-4">
              <Ionicons name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
            <Text className="text-xl font-semibold text-gray-900">
              Message Center
            </Text>
          </View>
        </View>

        {/* Booking Success */}
        <View
          className="bg-white mt-4 mx-4 rounded-lg p-4 shadow-sm"
          style={sectionBorderStyle}
        >
          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-row items-center flex-1">
              <Ionicons
                name="notifications-outline"
                size={20}
                color="#6B7280"
              />
              <Text className="text-base font-semibold text-gray-900 ml-2">
                Booking Success
              </Text>
            </View>
            <Switch
              value={notificationSettings.bookingSuccess}
              onValueChange={() => toggleNotification("bookingSuccess")}
              trackColor={{ false: "#D1D5DB", true: "#000000" }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
            <View className="flex-row">
              <Ionicons
                name="information-circle-outline"
                size={18}
                color="#3B82F6"
              />
              <Text className="flex-1 text-xs text-blue-700 ml-2 leading-5">
                {templates.bookingSuccess.info}
              </Text>
            </View>
          </View>

          {notificationSettings.bookingSuccess && (
            <View className="bg-gray-50 rounded-lg p-3">
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-xs font-medium text-gray-600">
                  Template preview
                </Text>
                <TouchableOpacity
                  onPress={() => handleEdit("bookingSuccess")}
                  className="flex-row items-center"
                >
                  <Ionicons name="create-outline" size={16} color="#6B7280" />
                  <Text className="text-sm text-gray-700 ml-1">Edit</Text>
                </TouchableOpacity>
              </View>
              <Text className="text-sm text-gray-900 leading-5">
                {templates.bookingSuccess.preview}
              </Text>
            </View>
          )}
        </View>

        {/* Booking Cancellation */}
        <View
          className="bg-white mt-4 mx-4 rounded-lg p-4 shadow-sm"
          style={sectionBorderStyle}
        >
          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-row items-center flex-1">
              <Ionicons
                name="notifications-outline"
                size={20}
                color="#6B7280"
              />
              <Text className="text-base font-semibold text-gray-900 ml-2">
                Booking Cancellation
              </Text>
            </View>
            <Switch
              value={notificationSettings.bookingCancellation}
              onValueChange={() => toggleNotification("bookingCancellation")}
              trackColor={{ false: "#D1D5DB", true: "#000000" }}
              thumbColor="#FFFFFF"
            />
          </View>

          {notificationSettings.bookingCancellation && (
            <View className="bg-gray-50 rounded-lg p-3">
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-xs font-medium text-gray-600">
                  Template preview
                </Text>
                <TouchableOpacity
                  onPress={() => handleEdit("bookingCancellation")}
                  className="flex-row items-center"
                >
                  <Ionicons name="create-outline" size={16} color="#6B7280" />
                  <Text className="text-sm text-gray-700 ml-1">Edit</Text>
                </TouchableOpacity>
              </View>
              <Text className="text-sm text-gray-900 leading-5">
                {templates.bookingCancellation.preview}
              </Text>
            </View>
          )}
        </View>

        {/* Day Before Reminder */}
        <View
          className="bg-white mt-4 mx-4 rounded-lg p-4 shadow-sm"
          style={sectionBorderStyle}
        >
          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-row items-center flex-1">
              <Ionicons
                name="notifications-outline"
                size={20}
                color="#6B7280"
              />
              <Text className="text-base font-semibold text-gray-900 ml-2">
                Day Before Reminder
              </Text>
            </View>
            <Switch
              value={notificationSettings.dayBeforeReminder}
              onValueChange={() => toggleNotification("dayBeforeReminder")}
              trackColor={{ false: "#D1D5DB", true: "#000000" }}
              thumbColor="#FFFFFF"
            />
          </View>

          {notificationSettings.dayBeforeReminder && (
            <View className="bg-gray-50 rounded-lg p-3">
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-xs font-medium text-gray-600">
                  Template preview
                </Text>
                <TouchableOpacity
                  onPress={() => handleEdit("dayBeforeReminder")}
                  className="flex-row items-center"
                >
                  <Ionicons name="create-outline" size={16} color="#6B7280" />
                  <Text className="text-sm text-gray-700 ml-1">Edit</Text>
                </TouchableOpacity>
              </View>
              <Text className="text-sm text-gray-900 leading-5">
                {templates.dayBeforeReminder.preview}
              </Text>
            </View>
          )}
        </View>

        {/* Proactive Booking Reminders */}
        <View
          className="bg-white mt-4 mx-4 rounded-lg p-4 shadow-sm"
          style={sectionBorderStyle}
        >
          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-row items-center flex-1">
              <MaterialCommunityIcons
                name="crown-outline"
                size={20}
                color="#9333EA"
              />
              <Text className="text-base font-semibold text-gray-900 ml-2">
                Proactive Booking Reminders
              </Text>
            </View>
            <Switch
              value={notificationSettings.proactiveReminders}
              onValueChange={() => toggleNotification("proactiveReminders")}
              trackColor={{ false: "#D1D5DB", true: "#000000" }}
              thumbColor="#FFFFFF"
            />
          </View>

          <Text className="text-sm font-medium text-gray-900 mb-3">
            Current VIP Levels
          </Text>

          {vipLevels.map((level, index) => (
            <View
              key={index}
              className="flex-row items-center justify-between mb-2"
            >
              <View className="flex-row items-center flex-1">
                <View
                  className="w-2 h-2 rounded-full mr-2"
                  style={{ backgroundColor: level.color }}
                />
                <Text className="text-sm text-gray-900">{level.name}</Text>
              </View>
              <Text className="text-sm text-gray-600">{level.days}</Text>
            </View>
          ))}

          {notificationSettings.proactiveReminders && (
            <View className="mt-4">
              <Text className="text-xs font-medium text-gray-600 mb-2">
                Message Template
              </Text>
              <View className="bg-gray-50 rounded-lg p-3">
                <View className="flex-row items-center justify-between mb-2">
                  <Text className="text-xs font-medium text-gray-600">
                    Template preview
                  </Text>
                  <TouchableOpacity
                    onPress={() => handleEdit("proactiveReminder")}
                    className="flex-row items-center"
                  >
                    <Ionicons name="create-outline" size={16} color="#6B7280" />
                    <Text className="text-sm text-gray-700 ml-1">Edit</Text>
                  </TouchableOpacity>
                </View>
                <Text className="text-sm text-gray-900 leading-5">
                  {templates.proactiveReminder.preview}
                </Text>
              </View>
              <Text className="text-xs text-gray-500 text-center mt-2">
                Est. recipients: All VIP members
              </Text>
            </View>
          )}
        </View>

        {/* Security Notice */}
        <View
          className="mx-4 my-4 bg-yellow-50 rounded-lg p-4"
          style={sectionBorderStyle}
        >
          <View className="flex-row">
            <Ionicons
              name="shield-checkmark-outline"
              size={20}
              color="#F59E0B"
            />
            <View className="flex-1 ml-3">
              <Text className="text-sm font-semibold text-yellow-800 mb-1">
                Security Notice
              </Text>
              <Text className="text-xs text-yellow-700 leading-5">
                Uses LINE's official OAuth. Your credentials are never saved.
                Revoke access anytime in LINE settings.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Edit Template Modal */}
      <EditTemplateModal
        visible={editModalVisible}
        onClose={() => setEditModalVisible(false)}
        templateKey={currentEditTemplate}
        initialMessage={
          // @ts-ignore
          currentEditTemplate ? templates[currentEditTemplate].preview : ""
        }
        variables={
          currentEditTemplate ? templateVariables[currentEditTemplate] : []
        }
        onSave={handleSaveTemplate}
      />
    </SafeAreaView>
  );
};

export default MessageCenterScreen;
