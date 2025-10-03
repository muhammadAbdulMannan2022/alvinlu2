import { shadowStyle } from "@/constants/shadow";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function forgot() {
  const [email, setEmail] = useState("");

  const router = useRouter();

  const handleSubmit = () => {
    router.push({
      pathname: "/(auth)/otp",
      params: { purpose: "password_reset", email },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 max-w-lg mx-auto w-full px-5 items-center justify-center">
          <View className="px-5 pt-5 lg:pt-10 items-center justify-center">
            <Text className="text-2xl lg:text-4xl font-semibold text-black">
              Login Account
            </Text>
            <Text className="text-gray-800 mt-3">Empowering hotels and</Text>
          </View>
          <View className="p-5 mt-10 lg:mt-16 w-full">
            <Text className="text-base lg:text-lg mb-2 text-gray-800">
              Email
            </Text>
            <View
              className="flex-row items-center border border-gray-300 rounded-md mb-4 px-3 bg-white shadow-sm"
              style={shadowStyle}
            >
              <MaterialIcons
                name="email"
                size={20}
                color="#8F95A4"
                className="p-2.5"
              />
              <TextInput
                className="flex-1 h-14 text-base placeholder:text-[#8F95A4]"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="user@email.com"
              />
            </View>

            <View className="flex-row justify-start items-center gap-4 mb-5 mt-4 lg:mb-10">
              <Text className="text-[#636363] text-base ">
                We will send a verification code to this email
              </Text>
            </View>
            <LinearGradient
              colors={["#F6339A", "#9810FA"]}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 0 }}
              className="rounded-md py-3 mb-4"
              style={{ borderRadius: 8 }}
            >
              <TouchableOpacity onPress={() => handleSubmit()}>
                <Text className="text-center text-xl font-bold text-white">
                  Confirm
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
