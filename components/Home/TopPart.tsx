import { Feather } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

export default function TopPart({ setIsNotificationOpen }: any) {
  return (
    <View>
      <View className="flex-row items-center justify-between py-1">
        <View>
          <Text className="text-xl md:text-2xl font-semibold text-[#0A0A0A]">
            Today's Overview
          </Text>
          <Text className="text-sm md:text-lg text-[#717182]">
            Saturday, September 6, 2025
          </Text>
        </View>
        <TouchableOpacity onPress={() => setIsNotificationOpen(true)}>
          <View className="relative  p-3 rounded-md">
            <Feather name="bell" size={24} color="#030213" />
            <View className="w-3 md:w-3.h-3.5 h-3 md:h-3.5 bg-[#D4183D] rounded-full absolute right-1.5 top-1.5" />
          </View>
        </TouchableOpacity>
      </View>
      <View className="flex-row items-center  justify-center gap-4 mt-5">
        <View className="bg-[#ECECF0]/30 px-3 md:px-4 py-4 md:py-5 items-center justify-center rounded-md w-[30%]">
          <Text className="text-xl md:text-2xl font-bold">5</Text>
          <Text className="text-[#717182] mt-1">Appointments</Text>
        </View>
        <View className="bg-[#ECECF0]/30 px-3 md:px-4 py-4 md:py-5 items-center justify-center rounded-md w-[30%]">
          <Text className="text-xl md:text-2xl font-bold">2</Text>
          <Text className="text-[#717182] mt-1">New Clients</Text>
        </View>
        <View className="bg-[#ECECF0]/30 px-3 md:px-4 py-4 md:py-5 items-center justify-center rounded-md w-[30%]">
          <Text className="text-xl md:text-2xl font-bold">¥24,700</Text>
          <Text className="text-[#717182] mt-1">Revenue</Text>
        </View>
      </View>
    </View>
  );
}
