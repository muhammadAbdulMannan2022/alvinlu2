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
import AppleIcon from "../../assets/authIcon/apple.svg";
import FacebookIcon from "../../assets/authIcon/facebook.svg";
import GoogleIcon from "../../assets/authIcon/google.svg";

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 max-w-lg mx-auto w-full px-5">
          <View className="px-5 pt-5 lg:pt-10 items-center justify-center">
            <Text className="text-2xl lg:text-4xl font-semibold text-black">
              Login Account
            </Text>
            <Text className="text-gray-800 mt-3">Empowering hotels and</Text>
          </View>
          <View className="p-5 mt-10 lg:mt-16">
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

            <Text className="text-base lg:text-lg mb-2 text-gray-800">
              Password
            </Text>
            <View
              className="flex-row items-center border border-gray-300 rounded-md mb-4 px-3 bg-white shadow-sm"
              style={shadowStyle}
            >
              <MaterialIcons
                name="lock"
                size={20}
                color="#8F95A4"
                className="p-2.5"
              />
              <TextInput
                className="flex-1 h-14 text-base placeholder:text-[#8F95A4]"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                placeholder="Password"
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <MaterialIcons
                  name={showPassword ? "visibility" : "visibility-off"}
                  size={20}
                  color="#8F95A4"
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => router.push("/(auth)/forgot")}>
              <Text className="text-[#F6329A] text-right mb-4">
                Forget password?
              </Text>
            </TouchableOpacity>
            <LinearGradient
              colors={["#F6339A", "#9810FA"]}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 0 }}
              className="rounded-md py-3 mb-4"
              style={{ borderRadius: 8 }}
            >
              <TouchableOpacity>
                <Text className="text-center text-xl font-bold text-white">
                  Log in
                </Text>
              </TouchableOpacity>
            </LinearGradient>
            <View className="flex-row justify-center items-center gap-4 mb-5 mt-4 lg:mb-10">
              <Text className="text-[#636363] font-semibold text-sm lg:text-lg">
                Don't have an account?
              </Text>
              <TouchableOpacity
                onPress={() => router.push("/(auth)/signup")}
                className="border border-[#F6329A] py-2 px-3"
                style={{ borderRadius: 6, borderWidth: 2 }}
              >
                <Text className="text-[#F6329A] font-semibold">Signup</Text>
              </TouchableOpacity>
            </View>
            <View className="flex-row items-center mb-4">
              <View className="flex-1 h-0.5 bg-[#636363]" />
              <Text className="px-2 text-lg font-bold text-[#636363]">
                OR Sign in with
              </Text>
              <View className="flex-1 h-0.5 bg-[#636363]" />
            </View>
            <TouchableOpacity className="bg-white p-3 mb-2 rounded-md flex-row items-center justify-center gap-3 border border-gray-300">
              <GoogleIcon width={30} height={30} />
              <Text className="text-gray-800 font-bold text-xl">Google</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-white p-3 mb-2 rounded-md flex-row items-center justify-center gap-3 border border-gray-300">
              <FacebookIcon white={30} height={30} />
              <Text className="text-gray-800 font-bold text-xl">Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-white p-3 mb-2 rounded-md flex-row items-center justify-center gap-3 border border-gray-300">
              <AppleIcon white={30} height={30} />
              <Text className="text-gray-800 font-bold text-xl">Apple</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
