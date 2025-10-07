import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Profile from "./Profile";

export default function ProfileSheetMain() {
  // top parts
  const [isProfileActive, setProfileActive] = useState(false);
  const [isCalendarActive, setCalendarActive] = useState(false);
  const [isWalletActive, setWalletActive] = useState(false);

  const toggleIcon = (icon: string) => {
    setProfileActive(icon === "profile" ? !isProfileActive : false);
    setCalendarActive(icon === "calendar" ? !isCalendarActive : false);
    setWalletActive(icon === "wallet" ? !isWalletActive : false);
    // Add navigation logic here based on icon
  };
  return (
    <View>
      <Text className="text-lg lg:text-xl mb-5 font-bold">Member Profile</Text>
      <View
        className="flex-row justify-between items-center bg-gray-200 p-2 "
        style={{ borderRadius: 15 }}
      >
        <TouchableOpacity
          onPress={() => toggleIcon("profile")}
          className={`w-1/3 items-center ${isProfileActive && "bg-white   py-2"}`}
          style={{ borderRadius: 15 }}
        >
          <Ionicons
            name={"person-outline"}
            size={24}
            color={isProfileActive ? "#000" : "#666"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => toggleIcon("calendar")}
          className={`w-1/3 items-center ${isCalendarActive && "bg-white   py-2"}`}
          style={{ borderRadius: 15 }}
        >
          <Ionicons
            name={"calendar-outline"}
            size={24}
            color={isCalendarActive ? "#000" : "#666"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => toggleIcon("wallet")}
          className={`w-1/3 items-center ${isWalletActive && "bg-white   py-2"}`}
          style={{ borderRadius: 15 }}
        >
          <Ionicons
            name={"wallet-outline"}
            size={24}
            color={isWalletActive ? "#000" : "#666"}
          />
        </TouchableOpacity>
      </View>
      {/* profile */}
      {isProfileActive && <Profile />}
    </View>
  );
}
