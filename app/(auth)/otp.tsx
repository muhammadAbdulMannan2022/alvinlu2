import { shadowStyle } from "@/constants/shadow";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OTPVerification() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [activeInput, setActiveInput] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const router = useRouter();
  const { email, purpose } = useLocalSearchParams<{
    email: string;
    purpose: string;
  }>();

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text.replace(/[^0-9]/g, "");
    setOtp(newOtp);
    setError(null);
    if (text && index < 3) {
      inputRefs.current[index + 1]?.focus();
      setActiveInput(index + 1);
    } else if (!text && index > 0) {
      inputRefs.current[index - 1]?.focus();
      setActiveInput(index - 1);
    }
  };

  const handlePaste = (text: string) => {
    const pastedOtp = text
      .replace(/[^0-9]/g, "")
      .slice(0, 4)
      .split("");
    const newOtp = ["", "", "", ""];
    for (let i = 0; i < 4 && i < pastedOtp.length; i++) {
      newOtp[i] = pastedOtp[i];
    }
    setOtp(newOtp);
    setError(null);
    if (pastedOtp.length >= 4) {
      inputRefs.current[3]?.focus();
      setActiveInput(3);
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
      setActiveInput(index - 1);
    } else if (e.nativeEvent.key === "Backspace" && index === 0) {
      setOtp(["", "", "", ""]);
      setError(null);
    }
  };

  const handleVerify = () => {
    const otpCode = otp.join("");
    if (otpCode.length === 4) {
      // Replace with your API call to verify OTP
      try {
        if (purpose === "password_reset") {
          console.log("resetOtp", otpCode);
          router.push({
            pathname: "/(auth)/changePass",
            params: { email, otp: otpCode },
          });
        } else {
          console.log("signup otp", otpCode);
          router.push("/(auth)/accountType");
        }
      } catch (error: any) {
        setError("Invalid OTP. Please try again.");
      }
    } else {
      setError("Please enter the full 4-digit OTP.");
    }
  };

  const handleResend = () => {
    setOtp(["", "", "", ""]);
    setError(null);
    inputRefs.current[0]?.focus();
    setActiveInput(0);
    // Replace with your API call to resend OTP
    alert("OTP resent to your email");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 max-w-lg mx-auto w-full px-5 items-center justify-center">
          <View className="px-5 pt-5 sm:pt-8 md:pt-10 lg:pt-10 xl:pt-12 2xl:pt-14 items-center justify-center">
            <Ionicons
              name="shield-checkmark"
              size={40}
              color="#F6339A"
              className="mx-auto"
            />
            <Text className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl 2xl:text-5xl font-semibold text-black mt-2">
              Verify OTP
            </Text>
            <Text className="text-gray-800 mt-3 text-sm sm:text-sm md:text-base lg:text-lg xl:text-lg 2xl:text-xl">
              Enter the 4-digit code sent to your email
            </Text>
          </View>
          <View className="p-5 mt-8 sm:mt-10 md:mt-12 lg:mt-16 xl:mt-18 2xl:mt-20 w-full">
            {error && (
              <Text className="text-red-500 text-center text-sm sm:text-sm md:text-base lg:text-base xl:text-lg 2xl:text-lg mb-4">
                {error}
              </Text>
            )}
            <View className="flex-row justify-between mb-4">
              {otp.map((digit, index) => (
                <View
                  key={index}
                  className={`flex-1 mx-1 border rounded-md bg-white shadow-sm justify-center items-center ${
                    error || activeInput === index
                      ? "border-2"
                      : "border-gray-300"
                  } ${error ? "border-red-500" : activeInput === index ? "border-[#F6339A]" : ""}`}
                  style={shadowStyle}
                >
                  <TextInput
                    ref={(ref) => (inputRefs.current[index] = ref)}
                    className="h-12 sm:h-12 md:h-14 lg:h-14 xl:h-16 2xl:h-16 text-center text-base sm:text-base md:text-lg lg:text-lg xl:text-xl 2xl:text-xl text-gray-800 font-bold placeholder:text-[#8F95A4]"
                    style={{ textAlign: "center", textAlignVertical: "center" }}
                    value={digit}
                    onChangeText={(text) => {
                      if (text.length > 1) handlePaste(text);
                      else handleChange(text, index);
                    }}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                    keyboardType="numeric"
                    maxLength={index === 0 ? 4 : 1}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="0"
                    returnKeyType={index < 3 ? "next" : "done"}
                    onSubmitEditing={() => {
                      if (index < 3) {
                        inputRefs.current[index + 1]?.focus();
                        setActiveInput(index + 1);
                      } else {
                        handleVerify();
                      }
                    }}
                    onFocus={() => setActiveInput(index)}
                  />
                </View>
              ))}
            </View>
            <View className="flex-row items-center gap-4 mb-5 mt-4 sm:mt-4 md:mt-5 lg:mt-6 xl:mt-8 2xl:mt-10">
              <Text>If you didn’t receive a code!</Text>
              <TouchableOpacity onPress={handleResend}>
                <Text className="text-[#F6339A] text-sm sm:text-sm md:text-base lg:text-base xl:text-lg 2xl:text-lg font-semibold">
                  Click here...
                </Text>
              </TouchableOpacity>
            </View>
            <LinearGradient
              colors={["#F6339A", "#9810FA"]}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 0 }}
              className="rounded-md py-3 mb-4"
              style={{ borderRadius: 8 }}
            >
              <TouchableOpacity onPress={handleVerify}>
                <Text className="text-center text-lg sm:text-lg md:text-xl lg:text-xl xl:text-2xl 2xl:text-2xl font-bold text-white">
                  Verify
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
