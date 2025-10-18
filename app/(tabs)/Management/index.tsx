import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface MenuItemProps {
  icon: string;
  iconType?: "Feather" | "MaterialCommunityIcons";
  title: string;
  onPress?: () => void;
}

interface SectionHeaderProps {
  title: string;
}

const Index: React.FC = () => {
  const bottomBarHeight = useBottomTabBarHeight();
  const router = useRouter();
  const MenuItem: React.FC<MenuItemProps> = ({
    icon,
    iconType = "Feather",
    title,
    onPress,
  }) => (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center justify-between py-4 px-4 bg-white "
    >
      <View className="flex-row items-center flex-1">
        {iconType === "Feather" ? (
          // @ts-ignore
          <Feather name={icon} size={20} color="#6B7280" />
        ) : (
          // @ts-ignore
          <MaterialCommunityIcons name={icon} size={20} color="#6B7280" />
        )}
        <Text className="ml-3 text-base text-gray-900">{title}</Text>
      </View>
      <Feather name="chevron-right" size={20} color="#D1D5DB" />
    </TouchableOpacity>
  );

  const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => (
    <View className="px-4 py-2 bg-gray-50">
      <Text className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
        {title}
      </Text>
    </View>
  );

  return (
    <ScrollView className="flex-1 bg-white">
      <SafeAreaView
        className="flex-1"
        style={{ paddingBottom: bottomBarHeight + 60 }}
      >
        <View className="bg-white px-4 py-4 border-b border-gray-200">
          <Text className="text-xl font-bold text-gray-900">
            Management & Settings
          </Text>
        </View>
        <View className="flex-1 px-5 py-4">
          {/* Header */}

          <ScrollView className="flex-1">
            {/* Account Section */}
            <View
              className="border mb-2 p-2 bg-white"
              style={{ borderColor: "#00000020", borderRadius: 10 }}
            >
              <SectionHeader title="ACCOUNT" />
              <MenuItem
                onPress={() =>
                  router.push("/(tabs)/Management/screens/Profile")
                }
                icon="user"
                title="Plan and account"
              />
              <MenuItem
                onPress={() =>
                  router.push("/(tabs)/Management/screens/ManageTeam")
                }
                icon="user-plus"
                title="Team Accounts"
              />
            </View>
            <View
              className="border mb-2 p-2 bg-white"
              style={{ borderColor: "#00000020", borderRadius: 10 }}
            >
              {/* Business Setup Section */}
              <SectionHeader title="BUSINESS SETUP" />
              <MenuItem
                onPress={() =>
                  router.push("/(tabs)/Management/screens/BusinessSetup")
                }
                icon="briefcase"
                title="Business Setup"
              />
              <MenuItem
                onPress={() =>
                  router.push("/(tabs)/Management/screens/ServiceMenuPriceing")
                }
                icon="file-text"
                title="Service Menu & Pricing"
              />
              <MenuItem
                onPress={() =>
                  router.push("/(tabs)/Management/screens/BusinessHours")
                }
                icon="clock"
                title="Business Hours"
              />
              <MenuItem
                onPress={() =>
                  router.push("/(tabs)/Management/screens/CustomerManagement")
                }
                icon="users"
                title="Customer Management"
              />
              <MenuItem
                onPress={() =>
                  router.push("/(tabs)/Management/screens/BlockList")
                }
                icon="slash"
                title="Block List"
              />
            </View>
            <View
              className="border mb-2 p-2 bg-white"
              style={{ borderColor: "#00000020", borderRadius: 10 }}
            >
              {/* Booking Configuration Section */}
              <SectionHeader title="BOOKING CONFIGURATION" />
              <MenuItem
                onPress={() =>
                  router.push("/(tabs)/Management/screens/VipSettings")
                }
                icon="star"
                title="VIP Priority Settings"
              />
              <MenuItem
                onPress={() =>
                  router.push("/(tabs)/Management/screens/BookingPageStyle")
                }
                icon="layout"
                title="Booking Page Style"
              />
              <MenuItem
                onPress={() =>
                  router.push("/(tabs)/Management/screens/BookingLink")
                }
                icon="link"
                title="Your Booking Link"
              />
            </View>
            <View
              className="border mb-2 p-2 bg-white"
              style={{ borderColor: "#00000020", borderRadius: 10 }}
            >
              {/* Advanced Features Section */}
              <SectionHeader title="ADVANCED FEATURES" />
              <MenuItem
                onPress={() =>
                  router.push("/(tabs)/Management/screens/MessageCenterScreen")
                }
                icon="message-square"
                title="Message center"
              />
              <MenuItem
                onPress={() =>
                  router.push(
                    "/(tabs)/Management/screens/CalenderSyncForSettingsPage"
                  )
                }
                icon="calendar"
                title="Calendar Sync"
              />
              <MenuItem icon="gift" title="Affiliate Center" />
            </View>
            {/* Sign Out Button */}
            <TouchableOpacity className=" my-4 py-4 border border-red-300 rounded-lg bg-white">
              <View className="flex-row items-center justify-center">
                <Feather name="log-out" size={18} color="#EF4444" />
                <Text className="ml-2 text-base font-medium text-red-500">
                  Sign Out
                </Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Index;
