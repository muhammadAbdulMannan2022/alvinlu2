import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CommissionSettings() {
  const [enableCalculation, setEnableCalculation] = useState(true);
  const [commissionType, setCommissionType] = useState("fixed"); // 'fixed' or 'tiered'
  const [calculationMethod, setCalculationMethod] = useState("head-count"); // 'head-count' or 'client-cost'
  const bottomBarHeight = useBottomTabBarHeight();

  const router = useRouter();

  // Fixed percentage state
  const [fixedRate, setFixedRate] = useState("60");

  // Tiered state
  const [tiers, setTiers] = useState([
    { minClients: "40", rate: "60" },
    { minClients: "60", rate: "70" },
  ]);

  const addNewTier = () => {
    setTiers([...tiers, { minClients: "", rate: "" }]);
  };
  //@ts-ignore
  const removeTier = (index) => {
    const newTiers = tiers.filter((_, i) => i !== index);
    setTiers(newTiers);
  };
  //@ts-ignore
  const updateTier = (index, field, value) => {
    const newTiers = [...tiers];
    //@ts-ignore
    newTiers[index][field] = value;
    setTiers(newTiers);
  };

  return (
    <SafeAreaView
      className="flex-1 bg-white"
      style={{ paddingBottom: bottomBarHeight + 70 }}
    >
      <ScrollView className="flex-1">
        {/* Header */}
        <View
          className="px-4 pt-4 flex-row items-center border-b pb-5"
          style={{ borderColor: "#00000030" }}
        >
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/Management/screens/ManageTeam")}
            className="mr-3"
          >
            <Ionicons name="arrow-back" size={24} color="#000000" />
          </TouchableOpacity>
          <Text className="text-xl font-semibold text-gray-900">
            Commission adjustment
          </Text>
        </View>

        <View className="px-4 pb-6">
          {/* Commission Settings Header */}

          {/* Enable Commission Calculation */}
          <View
            className="bg-white p-4 mb-4 shadow-sm border mt-5"
            style={{ borderColor: "#00000030", borderRadius: 10 }}
          >
            <View className="flex-row items-center mb-4">
              <Feather name="dollar-sign" size={24} color="black" />
              <Text className="text-base font-semibold text-gray-900 ml-2">
                Commission Settings
              </Text>
            </View>
            <View className="flex-row justify-between items-center">
              <View className="flex-1">
                <Text className="text-base font-semibold text-gray-900 mb-1">
                  Enable Commission Calculation
                </Text>
                <Text className="text-sm text-gray-500">
                  Enable to make the income after commission calculation
                </Text>
              </View>
              <Switch
                value={enableCalculation}
                onValueChange={setEnableCalculation}
                trackColor={{ false: "#d1d5db", true: "#4b5563" }}
                thumbColor="#ffffff"
              />
            </View>
          </View>

          {enableCalculation && (
            <View>
              {/* Commission Type */}
              <Text className="text-base font-semibold text-gray-900 mb-3 mt-2">
                Commission Type
              </Text>

              {/* Fixed Percentage */}
              <TouchableOpacity
                onPress={() => setCommissionType("fixed")}
                className={`bg-white rounded-2xl p-4 mb-3 shadow-sm border-2 ${
                  commissionType === "fixed"
                    ? "border-gray-900"
                    : "border-gray-100"
                }`}
              >
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center flex-1">
                    <View className="bg-gray-200 w-10 h-10 rounded-full items-center justify-center mr-3">
                      <MaterialCommunityIcons
                        name="percent"
                        size={20}
                        color="#1f2937"
                      />
                    </View>
                    <View className="flex-1">
                      <Text className="text-base font-semibold text-gray-900 mb-1">
                        Fixed Percentage
                      </Text>
                      <Text className="text-sm text-gray-500">
                        Apply a consistent commission rate for all services
                      </Text>
                    </View>
                  </View>
                  {commissionType === "fixed" && (
                    <Ionicons
                      name="checkmark-circle"
                      size={24}
                      color="#4b5563"
                    />
                  )}
                </View>
              </TouchableOpacity>

              {/* Tiered Percentage */}
              <TouchableOpacity
                onPress={() => setCommissionType("tiered")}
                className={`bg-white rounded-2xl p-4 mb-4 shadow-sm border-2 ${
                  commissionType === "tiered"
                    ? "border-gray-900"
                    : "border-gray-100"
                }`}
              >
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center flex-1">
                    <View className="bg-gray-200 w-10 h-10 rounded-full items-center justify-center mr-3">
                      <MaterialCommunityIcons
                        name="chart-line-variant"
                        size={20}
                        color="#1f2937"
                      />
                    </View>
                    <View className="flex-1">
                      <Text className="text-base font-semibold text-gray-900 mb-1">
                        Tiered Percentage
                      </Text>
                      <Text className="text-sm text-gray-500">
                        Apply a different commission rate based on calculations
                      </Text>
                    </View>
                  </View>
                  {commissionType === "tiered" && (
                    <Ionicons
                      name="checkmark-circle"
                      size={24}
                      color="#4b5563"
                    />
                  )}
                </View>
              </TouchableOpacity>

              {/* Fixed Percentage Configuration */}
              {commissionType === "fixed" && (
                <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
                  <Text className="text-base font-semibold text-gray-900 mb-3">
                    Commission Rate
                  </Text>
                  <View className="relative">
                    <TextInput
                      value={fixedRate}
                      onChangeText={setFixedRate}
                      keyboardType="numeric"
                      placeholder="60"
                      className="bg-gray-100 rounded-xl p-4 text-2xl font-bold text-gray-900 pr-12"
                    />
                    <Text className="absolute right-4 top-4 text-2xl font-bold text-gray-400">
                      %
                    </Text>
                  </View>
                  <Text className="text-sm text-gray-500 mt-2">
                    Commission percentage for this tier
                  </Text>
                </View>
              )}

              {/* Tiered Percentage Configuration */}
              {commissionType === "tiered" && (
                <>
                  {/* Calculation Method Dropdown */}
                  <View
                    className="bg-white p-4 mb-4 border"
                    style={{ borderColor: "#00000030", borderRadius: 10 }}
                  >
                    <Text className="text-base font-semibold text-gray-900 mb-2">
                      Calculation Method
                    </Text>
                    <View className="border border-gray-300 rounded-xl">
                      <Picker
                        selectedValue={calculationMethod}
                        onValueChange={(itemValue) =>
                          setCalculationMethod(itemValue)
                        }
                        style={{
                          color: "#1f2937",
                          backgroundColor: "#f3f4f6",
                        }}
                      >
                        <Picker.Item label="By Head Count" value="head-count" />
                        <Picker.Item
                          label="By Client Cost"
                          value="client-cost"
                        />
                      </Picker>
                    </View>
                  </View>

                  {/* Tiers */}
                  {tiers.map((tier, index) => (
                    <View
                      key={index}
                      className="bg-white rounded-2xl p-4 mb-3 shadow-sm"
                    >
                      <View className="flex-row items-center justify-between mb-3">
                        <Text className="text-base font-semibold text-gray-900">
                          Commission Tiers
                        </Text>
                        {tiers.length > 1 && (
                          <TouchableOpacity onPress={() => removeTier(index)}>
                            <Ionicons
                              name="trash-outline"
                              size={20}
                              color="#1f2937"
                            />
                          </TouchableOpacity>
                        )}
                      </View>

                      <Text className="text-sm text-gray-700 mb-2">
                        {calculationMethod === "head-count"
                          ? "Min Clients"
                          : "Min Cost"}
                      </Text>
                      <View className="bg-gray-100 rounded-xl p-4 mb-3">
                        <TextInput
                          value={tier.minClients}
                          onChangeText={(value) =>
                            updateTier(index, "minClients", value)
                          }
                          keyboardType="numeric"
                          placeholder="40"
                          className="text-2xl font-bold text-gray-900"
                        />
                        <Text className="text-sm text-gray-500 mt-1">
                          {calculationMethod === "head-count"
                            ? "Min/max client counts for this tier"
                            : "Min/max cost for this tier"}
                        </Text>
                      </View>

                      <Text className="text-sm text-gray-700 mb-2">
                        Commission Rate
                      </Text>
                      <View className="relative">
                        <View className="bg-gray-100 rounded-xl p-4">
                          <TextInput
                            value={tier.rate}
                            onChangeText={(value) =>
                              updateTier(index, "rate", value)
                            }
                            keyboardType="numeric"
                            placeholder="60"
                            className="text-2xl font-bold text-gray-900"
                          />
                        </View>
                        <Text className="absolute right-4 top-4 text-2xl font-bold text-gray-400">
                          %
                        </Text>
                      </View>
                      <Text className="text-sm text-gray-500 mt-1">
                        Commission percentage for this tier
                      </Text>
                    </View>
                  ))}

                  {/* Add New Tier Button */}
                  <TouchableOpacity
                    onPress={addNewTier}
                    className="bg-white rounded-2xl p-4 mb-4 shadow-sm flex-row items-center justify-center"
                  >
                    <Ionicons
                      name="add-circle-outline"
                      size={20}
                      color="#4b5563"
                    />
                    <Text className="text-gray-900 font-semibold ml-2">
                      Add New Tier
                    </Text>
                  </TouchableOpacity>

                  <Text className="text-sm text-gray-500 mb-4">
                    Higher tiers automatically override lower ones when client
                    counts or costs exceed their minimum threshold
                  </Text>
                </>
              )}
            </View>
          )}
        </View>
        <View
          className="bg-gray-200 mx-5 px-3 mb-5 py-2 flex-row gap-2"
          style={{ borderRadius: 10 }}
        >
          <Ionicons name="information-circle" size={20} color="#4b5563" />
          <View className="">
            <Text>Importent:</Text>
            <Text className="text-base text-gray-700">
              Commission setting changes only affect data calculated after the
              modification. Historical data will not be recalculated.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
