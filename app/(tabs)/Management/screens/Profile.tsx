import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Define TypeScript interfaces
interface UserData {
  name: string;
  email: string;
  salonName: string;
  memberSince: string;
  avatarUrl: string;
}

interface PlanData {
  name: string;
  status: string;
  price: string;
  nextBilling: string;
}

const PlanAndAccount: React.FC = () => {
  const router = useRouter();
  // Dummy user data
  const userData: UserData = {
    name: "Misaki Tanaka",
    email: "user@google.com",
    salonName: "Nail Studio Sakura",
    memberSince: "March 15, 2023",
    avatarUrl:
      "https://ui-avatars.com/api/?name=Misaki+Tanaka&size=128&rounded=true&background=E5E7EB&color=6B7280",
  };

  const planData: PlanData = {
    name: "Pro Plan",
    status: "Active",
    price: "TWD 380 / month",
    nextBilling: "2024-01-15",
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="bg-white px-4 py-4 border-b border-gray-200 flex-row items-center">
        <TouchableOpacity
          onPress={() => router.push("/(tabs)/Management/inxex")}
          className="mr-4"
        >
          <Feather name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-xl font-semibold text-gray-900">
          Plan and account
        </Text>
      </View>

      <ScrollView className="flex-1">
        {/* Account Information Card */}
        <View
          className="mx-4 mt-6 bg-white p-6 shadow-sm border"
          style={{ borderColor: "#00000020", borderRadius: 10 }}
        >
          <Text className="text-lg font-semibold text-gray-900 mb-6">
            Account Information
          </Text>

          <View className="flex-row items-start">
            {/* Avatar */}
            <Image
              source={{ uri: userData.avatarUrl }}
              className="w-16 h-16 rounded-full mr-4"
            />

            {/* User Info */}
            <View className="flex-1">
              <Text className="text-base font-semibold text-gray-900">
                {userData.name}
              </Text>
              <Text className="text-sm text-gray-500 mt-1">
                {userData.email}
              </Text>
              <Text className="text-sm font-medium text-gray-900 mt-3">
                Salon Name: {userData.salonName}
              </Text>
              <Text className="text-sm text-gray-500 mt-1">
                Member since: {userData.memberSince}
              </Text>
            </View>
          </View>
        </View>

        {/* Current Plan Card */}
        <View
          className="mx-4 mt-4 bg-white p-6 shadow-sm border"
          style={{ borderColor: "#00000020", borderRadius: 10 }}
        >
          <View className="flex-row items-center mb-4">
            <MaterialCommunityIcons name="crown" size={24} color="#A855F7" />
            <Text className="text-lg font-semibold text-gray-900 ml-2">
              Current Plan
            </Text>
          </View>

          {/* Plan Details */}
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-base font-semibold text-gray-900">
              {planData.name}
            </Text>
            <View className="bg-green-100 px-3 py-1 rounded-full">
              <Text className="text-xs font-semibold text-green-700">
                {planData.status}
              </Text>
            </View>
          </View>

          <Text className="text-sm text-gray-600 mb-1">{planData.price}</Text>
          <Text className="text-sm text-gray-500">
            Next billing date: {planData.nextBilling}
          </Text>

          {/* Manage Plan Button */}
          <TouchableOpacity className="mt-6 py-3 border border-gray-300 rounded-lg flex-row items-center justify-center">
            <MaterialCommunityIcons
              name="credit-card-outline"
              size={20}
              color="#374151"
            />
            <Text className="text-base font-medium text-gray-900 ml-2">
              Manage Plan
            </Text>
            <Feather
              name="external-link"
              size={16}
              color="#374151"
              className="ml-2"
            />
          </TouchableOpacity>
        </View>

        {/* Sign Out Button */}
        <View
          className="mx-4 mt-4 mb-8 bg-white overflow-hidden border"
          style={{ borderColor: "#00000020", borderRadius: 10 }}
        >
          <TouchableOpacity className="py-4 items-center">
            <Text className="text-base font-medium text-red-500">Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PlanAndAccount;
