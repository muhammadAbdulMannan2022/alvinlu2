import {
  Entypo,
  Feather,
  FontAwesome,
  FontAwesome5,
  Ionicons,
} from "@expo/vector-icons";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function Sheet1({
  openLate,
  setIsOpen,
  setIsPaymentOpen,
  setIsEditBookingOpen,
  setIsProfileOpen,
}: any) {
  const [showOption, setShowOption] = useState(true);
  const [data] = useState({
    client: {
      name: "Emma Chen",
      type: "Returning Client",
      status: "Not arrived",
      img: "https://ui-avatars.com/api/?name=Emma+Chen&size=64&rounded=true&background=51A2FF&color=fff",
    },
    schedule: {
      time: "09:00-10:30",
      date: "Today",
      duration: "90 minutes",
    },
    service: {
      type: "Classic French",
      price: "¥4,800",
    },
    addOns: [
      {
        type: "In-house Gel Removal",
        price: "¥200",
      },
    ],
    specialRequirements: {
      handSensitivity: "No cuticle cutting",
    },
    customerNotes: "偏好粉色，指甲较短",
  });

  const bottomBarHeight = useBottomTabBarHeight();

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1, // Allow content to grow dynamically
        paddingBottom: 100, // Extra padding for bottom tab bar
      }}
      showsVerticalScrollIndicator={true}
      nestedScrollEnabled={true}
      style={{ flex: 1 }} // Ensure ScrollView takes full available space
    >
      <View className="flex-1">
        {/* Top Section */}
        <View
          className="flex-row items-center justify-between border-b pb-3 px-4"
          style={{ borderColor: "#00000030" }}
        >
          <Text className="text-lg font-semibold">Current Status</Text>
          <View
            className="flex-row items-center gap-2 bg-[#6A7282] px-2 py-0.5"
            style={{ alignItems: "center", borderRadius: 6 }}
          >
            <EvilIcons name="clock" size={20} color="#fff" />
            <Text
              className="text-white text-sm font-semibold mt-1"
              style={{ lineHeight: 20 }}
            >
              {data.client.status}
            </Text>
          </View>
        </View>

        {/* Booking Information */}
        <View className="mt-5 ">
          <View className="flex-row justify-between items-center">
            <Text className="text-lg font-bold">Booking Information</Text>
            <TouchableOpacity
              onPress={() => setIsEditBookingOpen(true)}
              className="flex-row items-center gap-2"
            >
              <FontAwesome6 name="edit" size={20} color="black" />
              <Text className="text-lg font-semibold">Edit</Text>
            </TouchableOpacity>
          </View>
          <View className="mt-5">
            <LinearGradient
              colors={["#EFF6FF", "#FAF5FF"]}
              className="border-2 flex-row justify-between items-center px-6 py-4"
              style={{ borderColor: "#BEDBFF", borderRadius: 10 }}
            >
              <View className="flex-row items-center gap-4">
                <Image
                  source={{ uri: data.client.img }}
                  className="h-12 w-12"
                />
                <View>
                  <Text className="text-lg md:text-xl font-bold">
                    {data.client.name}
                  </Text>
                  <Text
                    className="text-base font-bold bg-slate-200 px-2 py-1"
                    style={{ borderRadius: 5 }}
                  >
                    {data.client.type}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => setIsProfileOpen(true)}
                className="border p-2 bg-white"
                style={{ borderColor: "#00000030", borderRadius: 10 }}
              >
                <Text className="font-bold">View Profile</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>

          {/* Schedule and Service */}
          <View className="py-4">
            <View className="flex-row gap-3">
              <View
                className="border p-3 bg-white mb-2 min-w-[45%] flex-1"
                style={{ borderColor: "#00000030", borderRadius: 10 }}
              >
                <View className="flex-row items-center">
                  <FontAwesome5
                    name="clock"
                    size={20}
                    color="#007AFF"
                    className="mr-2"
                  />
                  <Text className="font-bold text-lg">Schedule</Text>
                </View>
                <Text className="text-[#155DFC] font-bold text-lg my-2">
                  {data.schedule.time}
                </Text>
                <View
                  className="pb-5 mb-5 border-b"
                  style={{ borderColor: "#00000030" }}
                >
                  <Text className="text-gray-500">{data.schedule.date}</Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-gray-500">Duration </Text>
                  <Text className="text-gray-500">
                    {data.schedule.duration}
                  </Text>
                </View>
              </View>

              <View
                className="border p-3 bg-white mb-2 min-w-[45%] flex-1"
                style={{ borderColor: "#00000030", borderRadius: 10 }}
              >
                <View className="flex-row gap-3 items-center">
                  <Feather name="dollar-sign" size={28} color="#00A63E" />
                  <Text className="text-[#717182] text-xl">Service</Text>
                </View>
                <Text className="text-black my-4 text-lg md:text-xl font-bold">
                  {data.service.type}
                </Text>
                <Text className="text-[#00A63E] font-bold text-xl">
                  {data.service.price}
                </Text>
              </View>
            </View>

            {/* Add-ons */}
            <View
              className="border p-4 bg-white mb-2"
              style={{ borderColor: "#00000030", borderRadius: 10 }}
            >
              <View className="flex-row items-center gap-3">
                <Entypo name="plus" size={24} color="#9810FA" />
                <Text className="font-bold text-lg text-[#717182]">
                  Add-ons
                </Text>
              </View>
              {data.addOns.map((addon, index) => (
                <View className="flex-row mt-3 justify-between" key={index}>
                  <Text className="text-black text-xl font-bold">
                    {addon.type}
                  </Text>
                  <Text className="text-[#717182] font-bold text-lg">
                    {addon.price}
                  </Text>
                </View>
              ))}
            </View>

            {/* Special Requirements */}
            <View
              className="border p-3 bg-white mb-2"
              style={{ borderColor: "#00000030", borderRadius: 10 }}
            >
              <View className="gap-3">
                <View className="flex-row gap-2 items-center">
                  <Ionicons name="warning" size={24} color="#F54900" />
                  <Text className="text-[#717182] font-bold">
                    Special Requirements
                  </Text>
                </View>
                <View className="flex-row">
                  <Text
                    className="bg-[#FFE2E2] border text-red-800 py-1 px-2 mr-2"
                    style={{ borderColor: "#FFC9C9", borderRadius: 10 }}
                  >
                    Hand sensitivity
                  </Text>
                  <Text
                    className="bg-[#FFEDD4] text-yellow-800 py-1 px-2"
                    style={{ borderColor: "#FFD6A7", borderRadius: 10 }}
                  >
                    {data.specialRequirements.handSensitivity}
                  </Text>
                </View>
              </View>
            </View>

            {/* Customer Notes */}
            <View
              className="border p-3 bg-white mb-2"
              style={{ borderColor: "#00000030", borderRadius: 10 }}
            >
              <View className="gap-3">
                <View className="flex-row items-center gap-2">
                  <Entypo
                    name="dots-three-horizontal"
                    size={24}
                    color="#155DFC"
                  />
                  <Text className="text-[#717182] font-bold text-2xl">
                    Customer Notes
                  </Text>
                </View>
                <Text className="text-black text-2xl">
                  {data.customerNotes}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      {/* Action Buttons */}
      {showOption ? (
        <View
          className="px-4 pb-4 fixed bg-red-200 w-full py-5"
          style={{ bottom: bottomBarHeight / 2 }}
        >
          {/* First row */}
          <View className="flex-row justify-between mb-2 gap-2">
            <TouchableOpacity
              onPress={() => setShowOption(!showOption)}
              className="bg-black p-2 rounded-lg flex-row items-center justify-center  w-[50%]"
            >
              <Entypo name="plus" size={16} color="white" className="mr-1" />
              <Text className="text-white font-bold text-base">Check in</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                // setIsOpen(false);
                openLate(true);
                setShowOption(!showOption);
              }}
              className="bg-white border p-2 rounded-lg flex-row items-center justify-center  w-[50%]"
            >
              <Text className="text-black font-bold text-base">
                Mark as late
              </Text>
            </TouchableOpacity>
          </View>

          {/* Second row */}
          <View className="flex-row justify-between gap-2">
            <TouchableOpacity
              onPress={() => setShowOption(!showOption)}
              className="bg-red-600 p-2 rounded-lg flex-row items-center justify-center w-[50%]"
            >
              <Entypo name="plus" size={16} color="white" className="mr-1" />
              <Text className="text-white font-bold text-base">
                Mark No Show
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setShowOption(!showOption)}
              className="bg-white border p-2 rounded-lg flex-row items-center justify-center w-[50%]"
            >
              <Text className="text-black font-bold text-base">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <TouchableOpacity
          onPress={() => setIsPaymentOpen(true)}
          className="bg-[#000000] flex-row justify-center items-center gap-4 py-2.5"
          style={{ borderRadius: 5 }}
        >
          <FontAwesome name="credit-card-alt" size={20} color="#fff" />
          <Text className="text-white">Complet & Checkout</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}
