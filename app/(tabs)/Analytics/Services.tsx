import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

const ServicePerformanceAnalysis = () => {
  const [activeTab, setActiveTab] = useState("Categories");

  const categories = [
    { id: 1, name: "Popular", bookings: 485, percentage: 28, color: "#3B82F6" },
    {
      id: 2,
      name: "This Month",
      bookings: 368,
      percentage: 21,
      color: "#10B981",
    },
    { id: 3, name: "Summer", bookings: 295, percentage: 17, color: "#F59E0B" },
    { id: 4, name: "Wave", bookings: 150, percentage: 9, color: "#8B5CF6" },
    {
      id: 5,
      name: "Category 5",
      bookings: 123,
      percentage: 7,
      color: "#EC4899",
    },
    {
      id: 6,
      name: "Category 6",
      bookings: 98,
      percentage: 6,
      color: "#06B6D4",
    },
    {
      id: 7,
      name: "Category 7",
      bookings: 75,
      percentage: 4,
      color: "#F97316",
    },
    {
      id: 8,
      name: "Category 8",
      bookings: 58,
      percentage: 3,
      color: "#8B5CF6",
    },
    {
      id: 9,
      name: "Category 9",
      bookings: 42,
      percentage: 2,
      color: "#6B7280",
    },
    {
      id: 10,
      name: "Category 10",
      bookings: 35,
      percentage: 2,
      color: "#EF4444",
    },
  ];

  const tabs = ["Categories", "Services", "Add-ons"];

  return (
    <ScrollView
      className="flex-1 bg-white mt-5 border"
      style={{ borderRadius: 10, borderColor: "#00000020" }}
    >
      {/* Header */}
      <View className="p-6 pb-4">
        <View className="flex-row items-center mb-2">
          <View className="w-8 h-8 items-center justify-center mr-3">
            <AntDesign name="barchart" size={24} color="black" />
          </View>
          <View className="flex-1">
            <Text className="text-lg font-semibold text-gray-900">
              Service Performance Analysis - This Year (TOP10)
            </Text>
          </View>
        </View>

        {/* Tabs */}
        <View className="flex-row bg-gray-100 rounded-lg p-1 mt-4">
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              className={`flex-1 py-2 px-4 rounded-md ${
                activeTab === tab ? "bg-white" : ""
              }`}
            >
              <Text
                className={`text-center text-sm font-medium ${
                  activeTab === tab ? "text-gray-900" : "text-gray-600"
                }`}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Categories List */}
      <View className="px-6 pb-6">
        {categories.map((category) => (
          <View key={category.id} className="mb-4">
            <View className="flex-row items-center mb-2">
              <View className="w-6 h-6 bg-gray-900 rounded-full items-center justify-center mr-3">
                <Text className="text-white text-xs font-bold">
                  {category.id}
                </Text>
              </View>
              <View className="flex-1">
                <Text className="text-base font-semibold text-gray-900">
                  {category.name}
                </Text>
                <Text className="text-sm text-gray-500">
                  {category.bookings} bookings • {category.percentage}%
                </Text>
              </View>
            </View>

            {/* Progress Bar */}
            <View className="h-2 bg-gray-200 rounded-full overflow-hidden ml-9">
              <View
                style={{
                  width: `${category.percentage * 3.57}%`, // Scale to fit visual design
                  backgroundColor: category.color,
                }}
                className="h-full rounded-full"
              />
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default ServicePerformanceAnalysis;
