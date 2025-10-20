import {
  Ionicons,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Image, Text, View } from "react-native";

export default function Profile() {
  const [profileInfo, setProfileInfo] = useState({
    profile: {
      name: "Amy Zhang",
      membership: "General Member",
      phone: "Not provided",
      gender: "Female",
      birthday: "1996-05-18",
      lastVisit: "2024-11-15",
      memberSince: "2024-08-05",
      notes: "Loves nail art designs, prefers afternoon appointments",
      profileImage: "https://avatar.iran.liara.run/public/13",
    },
    balance: {
      availableBalance: 20,
      transactions: 0,
    },
    statistics: {
      totalBookings: 5,
      totalSpent: "¥10,000",
      avgSpending: "¥2,000",
      visitFrequencyDays: 73,
      lateCount: 0,
      avgLateTime: "0 min",
      cancelled: 0,
      noShows: 0,
    },
  });
  return (
    <View className="mt-10">
      <View className="flex-row items-center gap-3">
        <Image
          source={{ uri: profileInfo.profile.profileImage }}
          className="w-20 h-20"
          style={{ borderRadius: 20 }}
        />
        <View className="gap-2">
          <Text className="text-lg lg:text-2xl font-bold">
            {profileInfo.profile.name}
          </Text>
          <View className="flex-row items-start gap-2">
            <MaterialCommunityIcons
              name="crown-outline"
              size={30}
              color="#6B7280"
            />
            <View
              className="bg-[#6B7280]/10 px-3 py-1.5 border-2"
              style={{ borderColor: "#6B728040", borderRadius: 8 }}
            >
              <Text className="text-[#6B7280] font-bold">
                {profileInfo.profile.membership}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View className="mt-4 border-b pb-5" style={{ borderColor: "#00000030" }}>
        <View className="flex-row justify-between ">
          {/* Left Column */}
          <View className="w-1/2">
            <View className="flex-row items-start gap-2 mb-4">
              <MaterialCommunityIcons name="phone" size={20} color="#6B7280" />
              <View>
                <Text className="text-xs text-gray-500 sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
                  Phone
                </Text>
                <Text className="text-gray-600 font-medium italic sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">
                  {profileInfo.profile.phone}
                </Text>
              </View>
            </View>

            <View className="flex-row items-start gap-2 mb-4">
              <MaterialCommunityIcons
                name="calendar"
                size={20}
                color="#6B7280"
              />
              <View>
                <Text className="text-xs text-gray-500 sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
                  Birthday
                </Text>
                <Text className="text-gray-900 font-semibold sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">
                  {profileInfo.profile.birthday}
                </Text>
              </View>
            </View>

            <View className="flex-row items-start gap-2">
              <MaterialCommunityIcons
                name="clock-outline"
                size={20}
                color="#6B7280"
              />
              <View>
                <Text className="text-xs text-gray-500 sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
                  Member since
                </Text>
                <Text className="text-gray-900 font-semibold sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">
                  {profileInfo.profile.memberSince}
                </Text>
              </View>
            </View>
          </View>

          {/* Right Column */}
          <View className="w-1/2">
            <View className="flex-row items-start gap-2 mb-4">
              <MaterialCommunityIcons
                name="gender-female"
                size={20}
                color="#E63946"
              />
              <View>
                <Text className="text-xs text-gray-500 sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
                  Gender
                </Text>
                <Text className="text-gray-900 font-semibold sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">
                  {profileInfo.profile.gender}
                </Text>
              </View>
            </View>

            <View className="flex-row items-start gap-2">
              <MaterialCommunityIcons
                name="calendar-check"
                size={20}
                color="#6B7280"
              />
              <View>
                <Text className="text-xs text-gray-500 sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
                  Last visit
                </Text>
                <Text className="text-gray-900 font-semibold sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">
                  {profileInfo.profile.lastVisit}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Notes Section */}
        {profileInfo.profile.notes && (
          <View
            className="mt-6 sm:mt-8 md:mt-10 lg:mt-12 xl:mt-14 2xl:mt-16 border-t pt-7"
            style={{ borderColor: "#00000040" }}
          >
            <View className=" items-start gap-2">
              <View className="flex-row gap-1">
                <MaterialCommunityIcons
                  name="note-text-outline"
                  size={20}
                  color="#6B7280"
                />
                <Text className="text-lg text-gray-500 mb-1 ">Notes</Text>
              </View>

              <Text className="text-gray-900 sm:text-base lg:text-xl ">
                {profileInfo.profile.notes}
              </Text>
            </View>
          </View>
        )}
      </View>
      <LinearGradient
        className="border p-3 md:p-5 flex-row items-center justify-between"
        style={{
          borderColor: "#E9D4FF",
          borderRadius: 10,
          marginVertical: 20,
        }}
        colors={["#FAF5FF", "#EFF6FF"]}
        start={{ x: 0, y: 0 }}
      >
        <View className="flex-row gap-4 items-center">
          <View className="bg-[#F3E8FF] w-fit p-3" style={{ borderRadius: 8 }}>
            <Ionicons name="wallet-outline" size={20} color="#9810FA" />
          </View>
          <View>
            <Text className="text-lg font-bold text-gray-500">
              Available Balance
            </Text>
            <Text className="text-[#8200DB] text-lg md:text-xl font-bold">
              ¥{profileInfo.balance.availableBalance}
            </Text>
          </View>
        </View>
        <Text className="text-gray-500">
          {profileInfo.balance.transactions} transactions
        </Text>
      </LinearGradient>
      {/* statictics */}
      <View>
        <View className="flex-row gap-2 items-center">
          <SimpleLineIcons name="graph" size={30} color="black" />
          <Text className="text-xl font-bold">Statistics</Text>
        </View>
        <View>
          <View className="flex-row flex-wrap justify-between p-4">
            {/* Total Bookings */}
            <View
              className="w-[48%] bg-white p-4 md:p-5 mb-4 border items-center"
              style={{ borderColor: "#00000040", borderRadius: 10 }}
            >
              <Text className="text-2xl font-bold text-black">
                {profileInfo.statistics.totalBookings}
              </Text>
              <Text className="text-gray-600">Total Bookings</Text>
            </View>

            {/* Total Spent */}
            <View
              className="w-[48%] bg-white p-4 md:p-5 mb-4 border items-center"
              style={{ borderColor: "#00000040", borderRadius: 10 }}
            >
              <Text className="text-2xl font-bold text-green-600">
                {profileInfo.statistics.totalSpent}
              </Text>
              <Text className="text-gray-600">Total Spent</Text>
            </View>

            {/* Avg. Spending */}
            <View
              className="w-[48%] bg-white p-4 md:p-5 mb-4 border items-center"
              style={{ borderColor: "#00000040", borderRadius: 10 }}
            >
              <Text className="text-2xl font-bold text-purple-600">
                {profileInfo.statistics.avgSpending}
              </Text>
              <Text className="text-gray-600">Avg. Spending</Text>
            </View>

            {/* Visit Frequency (Days) */}
            <View
              className="w-[48%] bg-white p-4 md:p-5 mb-4 border items-center"
              style={{ borderColor: "#00000040", borderRadius: 10 }}
            >
              <Text className="text-2xl font-bold text-blue-600">
                {profileInfo.statistics.visitFrequencyDays}
              </Text>
              <Text className="text-gray-600">Visit Frequency (Days)</Text>
            </View>

            {/* Late Count */}
            <View
              className="w-[48%] bg-white p-4 md:p-5 mb-4 border items-center"
              style={{ borderColor: "#00000040", borderRadius: 10 }}
            >
              <Text className="text-2xl font-bold text-orange-600">
                {profileInfo.statistics.lateCount}
              </Text>
              <Text className="text-gray-600">Late Count</Text>
            </View>

            {/* Avg. Late Time */}
            <View
              className="w-[48%] bg-white p-4 md:p-5 mb-4 border items-center"
              style={{ borderColor: "#00000040", borderRadius: 10 }}
            >
              <Text className="text-2xl font-bold text-orange-600">
                {profileInfo.statistics.avgLateTime}
              </Text>
              <Text className="text-gray-600">Avg. Late Time</Text>
            </View>

            {/* Cancelled */}
            <View
              className="w-[48%] bg-white p-4 md:p-5 mb-4 border items-center"
              style={{ borderColor: "#00000040", borderRadius: 10 }}
            >
              <Text className="text-2xl font-bold text-black">
                {profileInfo.statistics.cancelled}
              </Text>
              <Text className="text-gray-600">Cancelled</Text>
            </View>

            {/* No Shows */}
            <View
              className="w-[48%] bg-white p-4 md:p-5 mb-4 border items-center"
              style={{ borderColor: "#00000040", borderRadius: 10 }}
            >
              <Text className="text-2xl font-bold text-red-600">
                {profileInfo.statistics.noShows}
              </Text>
              <Text className="text-gray-600">No Shows</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
