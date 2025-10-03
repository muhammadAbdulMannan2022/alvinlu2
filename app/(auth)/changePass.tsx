import { shadowStyle } from "@/constants/shadow";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ChangePassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { email, otp } = useLocalSearchParams<{
    email: string;
    otp: string;
  }>();

  const handleChangePassword = (text: string, field: "new" | "confirm") => {
    if (field === "new") {
      setNewPassword(text);
    } else {
      setConfirmPassword(text);
    }
    setError(null);
  };

  const handleToggleVisibility = (field: "new" | "confirm") => {
    if (field === "new") {
      setShowNewPassword(!showNewPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const handleSubmit = () => {
    if (!newPassword || newPassword.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    // Replace with your API call to change password
    // Example: await changePassword({ email, otp, newPassword });
    try {
      // Simulate successful password change
      router.push("/(auth)");
      alert("Password changed successfully!");
    } catch (error: any) {
      setError("Failed to change password. Please try again.");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 max-w-lg mx-auto w-full px-5 items-center justify-center">
          <View className="px-5 pt-5 sm:pt-8 md:pt-10 lg:pt-10 xl:pt-12 2xl:pt-14 items-center justify-center">
            <MaterialIcons
              name="lock"
              size={40}
              color="#F6339A"
              className="mx-auto"
            />
            <Text className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl 2xl:text-5xl font-semibold text-black mt-2">
              Change Password
            </Text>
            <Text className="text-gray-800 mt-3 text-sm sm:text-sm md:text-base lg:text-lg xl:text-lg 2xl:text-xl">
              Enter your new password
            </Text>
          </View>
          <View className="p-5 mt-8 sm:mt-10 md:mt-12 lg:mt-16 xl:mt-18 2xl:mt-20 w-full">
            {error && (
              <Text className="text-red-500 text-center text-sm sm:text-sm md:text-base lg:text-base xl:text-lg 2xl:text-lg mb-4">
                {error}
              </Text>
            )}
            <View className="mb-4">
              <Text className="text-base sm:text-base md:text-lg lg:text-lg xl:text-xl 2xl:text-xl mb-2 text-gray-800">
                New Password
              </Text>
              <View
                className="flex-row items-center border border-gray-300 rounded-md bg-white shadow-sm"
                style={shadowStyle}
              >
                <MaterialIcons
                  name="lock"
                  size={20}
                  color="#8F95A4"
                  className="p-2.5"
                />
                <TextInput
                  className="flex-1 h-12 sm:h-12 md:h-14 lg:h-14 xl:h-16 2xl:h-16 text-base sm:text-base md:text-lg lg:text-lg xl:text-xl 2xl:text-xl placeholder:text-[#8F95A4]"
                  value={newPassword}
                  onChangeText={(text) => handleChangePassword(text, "new")}
                  secureTextEntry={!showNewPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder="Enter new password"
                />
                <TouchableOpacity
                  onPress={() => handleToggleVisibility("new")}
                  className="p-2.5"
                >
                  <MaterialIcons
                    name={showNewPassword ? "visibility" : "visibility-off"}
                    size={20}
                    color="#8F95A4"
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View className="mb-4">
              <Text className="text-base sm:text-base md:text-lg lg:text-lg xl:text-xl 2xl:text-xl mb-2 text-gray-800">
                Confirm Password
              </Text>
              <View
                className="flex-row items-center border border-gray-300 rounded-md bg-white shadow-sm"
                style={shadowStyle}
              >
                <MaterialIcons
                  name="lock"
                  size={20}
                  color="#8F95A4"
                  className="p-2.5"
                />
                <TextInput
                  className="flex-1 h-12 sm:h-12 md:h-14 lg:h-14 xl:h-16 2xl:h-16 text-base sm:text-base md:text-lg lg:text-lg xl:text-xl 2xl:text-xl placeholder:text-[#8F95A4]"
                  value={confirmPassword}
                  onChangeText={(text) => handleChangePassword(text, "confirm")}
                  secureTextEntry={!showConfirmPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder="Confirm new password"
                />
                <TouchableOpacity
                  onPress={() => handleToggleVisibility("confirm")}
                  className="p-2.5"
                >
                  <MaterialIcons
                    name={showConfirmPassword ? "visibility" : "visibility-off"}
                    size={20}
                    color="#8F95A4"
                  />
                </TouchableOpacity>
              </View>
            </View>
            <LinearGradient
              colors={["#F6339A", "#9810FA"]}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 0 }}
              className="rounded-md py-3 mb-4"
              style={{ borderRadius: 8 }}
            >
              <TouchableOpacity onPress={handleSubmit}>
                <Text className="text-center text-lg sm:text-lg md:text-xl lg:text-xl xl:text-2xl 2xl:text-2xl font-bold text-white">
                  Change Password
                </Text>
              </TouchableOpacity>
            </LinearGradient>
            <TouchableOpacity
              className="mt-2"
              onPress={() => router.push("/(auth)")}
            >
              <Text className="text-center text-[#F6339A] text-sm sm:text-sm md:text-base lg:text-base xl:text-lg 2xl:text-lg font-semibold underline">
                Back to Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
