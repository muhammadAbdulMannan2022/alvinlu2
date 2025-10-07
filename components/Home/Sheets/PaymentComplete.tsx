import {
  Entypo,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function PaymentComplete({ setIsPaymentOpen }: any) {
  const [activeItem, setActiveItem] = useState("cash");
  const [reference, setReference] = useState("");
  const totalAmount = 5500; // Subtotal from the payment summary
  const storeCredit = 500;
  const [storeCreditUsed, setStoreCreditUsed] = useState(0);
  const [mixRActive, setMixRActive] = useState("cash");

  const extraItem = [
    {
      name: "In-house gel Removal",
      cost: "200",
    },
    {
      name: "In-house Removal",
      cost: "500",
    },
  ];

  // Handle store credit adjustment
  const handleStoreCreditChange = (action: any) => {
    if (action === "+") {
      setStoreCreditUsed(Math.min(storeCredit, storeCreditUsed + 100));
    } else if (action === "-") {
      setStoreCreditUsed(Math.max(0, storeCreditUsed - 100));
    }
  };

  const remainingAmount = Math.max(0, totalAmount - storeCreditUsed);
  const maxStoreCredit = Math.min(storeCredit, totalAmount);

  return (
    <View>
      <View className="flex-row items-center gap-4">
        <FontAwesome name="credit-card-alt" size={20} color="black" />
        <Text className="text-lg md:text-xl font-bold">Complete Payment</Text>
      </View>
      <View className="mt-5">
        <LinearGradient
          colors={["#EFF6FF", "#FAF5FF"]}
          className="border-2 px-4 py-4"
          style={{ borderColor: "#BEDBFF", borderRadius: 10 }}
        >
          <View className="flex-row gap-2 items-center">
            <Ionicons name="calculator" size={20} color="#155DFC" />
            <Text className="text-lg md:text-xl font-bold">
              Payment Summary
            </Text>
          </View>
          <View className="flex-row justify-between mt-5">
            <Text className="text-lg md:text-xl">Classic French</Text>
            <Text className="text-lg md:text-xl">¥4,800</Text>
          </View>
          <View
            className="ps-4 border-b py-3"
            style={{ borderColor: "#BEDBFF" }}
          >
            {/* Extra items */}
            {extraItem.map((item, i) => (
              <View
                key={i}
                style={{ borderColor: "#BEDBFF" }}
                className="flex-row justify-between mt-5 border-l-2 border-[#BEDBFF] ps-2"
              >
                <Text className="text-lg md:text-xl">{item.name}</Text>
                <Text className="text-lg md:text-xl">¥{item.cost}</Text>
              </View>
            ))}
          </View>
          <View className="flex-row justify-between mt-5">
            <Text className="text-lg md:text-xl">Subtotal</Text>
            <Text className="text-lg md:text-xl">¥5,500</Text>
          </View>
        </LinearGradient>

        <View className="mt-8">
          <Text className="text-lg font-bold">Payment Method</Text>
          <View className="mt-3 gap-4">
            <View className="flex-row gap-4">
              <TouchableOpacity
                onPress={() => setActiveItem("cash")}
                className="flex-row items-center px-4 py-2 gap-3 border flex-1"
                style={{ borderColor: "#00000040", borderRadius: 10 }}
              >
                {activeItem === "cash" && (
                  <View
                    className="w-2 h-2 bg-black"
                    style={{ borderRadius: 3 }}
                  />
                )}
                <MaterialCommunityIcons
                  name="cash-100"
                  size={24}
                  color="black"
                />
                <Text className="text-base font-bold">Cash</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setActiveItem("transfer")}
                className="flex-row items-center px-4 py-2 gap-3 border flex-1"
                style={{ borderColor: "#00000040", borderRadius: 10 }}
              >
                {activeItem === "transfer" && (
                  <View
                    className="w-2 h-2 bg-black"
                    style={{ borderRadius: 3 }}
                  />
                )}
                <MaterialCommunityIcons
                  name="bank-transfer"
                  size={24}
                  color="black"
                />
                <Text className="text-base font-bold">Transfer</Text>
              </TouchableOpacity>
            </View>
            <View className="flex-row gap-4">
              <TouchableOpacity
                onPress={() => setActiveItem("cradit")}
                className="flex-row items-center px-4 py-2 gap-3 border flex-1"
                style={{ borderColor: "#00000040", borderRadius: 10 }}
              >
                {activeItem === "cradit" && (
                  <View
                    className="w-2 h-2 bg-black"
                    style={{ borderRadius: 3 }}
                  />
                )}
                <Entypo name="wallet" size={24} color="black" />
                <Text className="text-base font-bold">Cradit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setActiveItem("mixed")}
                className="flex-row items-center px-4 py-2 gap-3 border flex-1"
                style={{ borderColor: "#00000040", borderRadius: 10 }}
              >
                {activeItem === "mixed" && (
                  <View
                    className="w-2 h-2 bg-black"
                    style={{ borderRadius: 3 }}
                  />
                )}
                <Entypo name="plus" size={24} color="black" />
                <Text className="text-base font-bold">Mixed</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View
          className="flex-row justify-between my-5 px-5 py-2 border bg-[#FAF5FF]"
          style={{ borderColor: "#E9D4FF", borderRadius: 8 }}
        >
          <Text className="text-lg md:text-xl text-[#8200DB]">
            Available Store Credit
          </Text>
          <Text className="text-lg md:text-xl text-[#8200DB]">¥500</Text>
        </View>

        <View className="flex-row gap-4 mt-4 mb-20">
          <TouchableOpacity
            onPress={() => setIsPaymentOpen(false)}
            className="flex-row items-center justify-center px-4 py-2 gap-3 border flex-1"
            style={{ borderColor: "#00000040", borderRadius: 10 }}
          >
            <Text className="text-base font-bold">cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIsPaymentOpen(false)}
            className="flex-row items-center justify-center px-4 py-2 gap-3 border flex-1 bg-black"
            style={{ borderColor: "#00000040", borderRadius: 10 }}
          >
            <Text className="text-base font-bold text-white">
              Complete Payment
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
