import { shadowStyle } from "@/constants/shadow";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Picker } from "@react-native-picker/picker";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AccountType() {
  const [accountType, setAccountType] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email: string }>();

  const handleAccountTypeChange = (value: string) => {
    setAccountType(value);
    setError(null);
    setIsDropdownOpen(false);
  };

  const handleSubmit = () => {
    if (!accountType) {
      setError("Please select an account type.");
      return;
    }
    // Replace with your API call to save account type
    try {
      router.push("/(auth)");
      alert("Account type selected successfully!");
    } catch (error: any) {
      setError("Failed to save account type. Please try again.");
    }
  };

  const options = [
    { label: "Personal", value: "personal" },
    { label: "Business", value: "business" },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 max-w-lg mx-auto w-full px-5 items-center justify-center">
          <View className="px-5 pt-5 sm:pt-8 md:pt-10 lg:pt-10 xl:pt-12 2xl:pt-14 items-center justify-center">
            <MaterialIcons
              name="person"
              size={40}
              color="#F6339A"
              className="mx-auto"
            />
            <Text className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl 2xl:text-5xl font-semibold text-black mt-2">
              Select Account Type
            </Text>
            <Text className="text-gray-800 mt-3 text-sm sm:text-sm md:text-base lg:text-lg xl:text-lg 2xl:text-xl">
              Choose the type of account you want to create
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
                Account Type
              </Text>
              <View
                className="relative flex-row items-center border border-gray-300 rounded-md bg-white shadow-sm"
                style={shadowStyle}
              >
                <MaterialIcons
                  name="person"
                  size={20}
                  color="#8F95A4"
                  className="p-2.5"
                />
                {Platform.OS === "android" ? (
                  <Picker
                    selectedValue={accountType}
                    onValueChange={(value) => handleAccountTypeChange(value)}
                    mode="dropdown"
                    style={{
                      flex: 1,
                      height: 50,
                      color: accountType ? "#000000" : "#8F95A4",
                    }}
                    itemStyle={{
                      fontSize: Platform.select({
                        sm: 14,
                        md: 16,
                        lg: 16,
                        xl: 18,
                        "2xl": 20,
                      }),
                    }}
                  >
                    <Picker.Item label="Select account type" value="" />
                    {options.map((option) => (
                      <Picker.Item
                        key={option.value}
                        label={option.label}
                        value={option.value}
                      />
                    ))}
                  </Picker>
                ) : (
                  <>
                    <TouchableOpacity
                      className="flex-1 flex-row items-center justify-between h-12 sm:h-12 md:h-14 lg:h-14 xl:h-16 2xl:h-16 px-3"
                      onPress={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                      <Text
                        className={`text-base sm:text-base md:text-lg lg:text-lg xl:text-xl 2xl:text-xl ${
                          accountType ? "text-black" : "text-[#8F95A4]"
                        }`}
                      >
                        {accountType
                          ? options.find((o) => o.value === accountType)?.label
                          : "Select account type"}
                      </Text>
                      <MaterialIcons
                        name={
                          isDropdownOpen ? "arrow-drop-up" : "arrow-drop-down"
                        }
                        size={20}
                        color="#8F95A4"
                      />
                    </TouchableOpacity>
                    {isDropdownOpen && (
                      <View
                        className="absolute w-full bg-white border border-gray-300 rounded-md shadow-sm mt-12 sm:mt-12 md:mt-14 lg:mt-14 xl:mt-16 2xl:mt-16 z-10"
                        style={[shadowStyle, styles.dropdownContainer]}
                      >
                        {options.map((option) => (
                          <TouchableOpacity
                            key={option.value}
                            className="px-3 py-2 border-b border-gray-200 last:border-b-0"
                            onPress={() =>
                              handleAccountTypeChange(option.value)
                            }
                          >
                            <Text className="text-base sm:text-base md:text-lg lg:text-lg xl:text-xl 2xl:text-xl text-black">
                              {option.label}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    )}
                  </>
                )}
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
                  Continue
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  dropdownContainer: {
    left: 0,
    right: 0,
  },
});
