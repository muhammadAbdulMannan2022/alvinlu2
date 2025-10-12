import { ModalContext } from "@/app/_layout";
import { Entypo, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function Wallet() {
  const { setIsCraditModalOpen, setIsAddingCredit } = useContext(ModalContext);
  return (
    <View className="py-10">
      <View className="flex-row items-center mb-4">
        <MaterialCommunityIcons name="wallet-outline" size={20} color="#000" />
        <Text className="text-lg font-semibold ml-2 sm:text-xl ">
          Store Credit Management
        </Text>
      </View>
      <View className="flex-row gap-4 mt-4 ">
        <TouchableOpacity
          onPress={() => {
            setIsCraditModalOpen();
            setIsAddingCredit(true);
          }}
          className="flex-row items-center justify-center px-4 py-2 gap-3 border flex-1 bg-black"
          style={{ borderColor: "#00000040", borderRadius: 10 }}
        >
          <Entypo name="plus" size={24} color="#ffffff" />
          <Text className="text-base font-bold text-white">Add Credit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setIsCraditModalOpen();
            setIsAddingCredit(false);
          }}
          className="flex-row items-center justify-center px-4 py-2 gap-3 border flex-1"
          style={{ borderColor: "#00000040", borderRadius: 10 }}
        >
          <Entypo name="minus" size={24} color="black" />
          <Text className="text-base font-bold">Deduct Credit</Text>
        </TouchableOpacity>
      </View>
      <LinearGradient
        className="border p-3 md:p-5 flex-row items-center justify-center"
        style={{
          borderColor: "#E9D4FF",
          borderRadius: 10,
          marginVertical: 20,
        }}
        colors={["#AD46FF1A", "#2B7FFF1A"]}
        start={{ x: 0, y: 0 }}
      >
        <View className=" gap-2 items-center justify-center">
          <Ionicons name="wallet-outline" size={35} color="#9810FA" />

          <Text className="text-[#8200DB] text-xl md:text-3xl font-bold">
            ¥0
          </Text>
          <Text className="text-gray-500">Available Store Credit</Text>
        </View>
      </LinearGradient>
    </View>
  );
}
