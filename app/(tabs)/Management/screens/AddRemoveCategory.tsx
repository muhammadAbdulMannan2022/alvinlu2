import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Image,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Define TypeScript interfaces
interface Service {
  id: number;
  name: string;
  price: number;
  duration: number;
  imageUrl: string;
}

const ThisMonthServices: React.FC = () => {
  const [mode, setMode] = useState<"add" | "edit">("add"); // for modal header and buttons
  const [categoryName, setCategoryName] = useState(""); // for TextInput value
  const [visibility, setVisibility] = useState(true); // for Switch value
  const [services, setServices] = useState<Service[]>([
    {
      id: 1,
      name: "Classic French Manicure",
      price: 2500,
      duration: 90,
      imageUrl:
        "https://i.ibb.co.com/q3Rf3MST/kelly-sikkema-Yie2-C8-Un-Oc-unsplash.jpg",
    },
    {
      id: 2,
      name: "Classic French Manicure",
      price: 2500,
      duration: 90,
      imageUrl:
        "https://i.ibb.co.com/q3Rf3MST/kelly-sikkema-Yie2-C8-Un-Oc-unsplash.jpg",
    },
    {
      id: 3,
      name: "Classic French Manicure",
      price: 2500,
      duration: 90,
      imageUrl:
        "https://i.ibb.co.com/q3Rf3MST/kelly-sikkema-Yie2-C8-Un-Oc-unsplash.jpg",
    },
    {
      id: 4,
      name: "Classic French Manicure",
      price: 2500,
      duration: 90,
      imageUrl:
        "https://i.ibb.co.com/q3Rf3MST/kelly-sikkema-Yie2-C8-Un-Oc-unsplash.jpg",
    },
    {
      id: 5,
      name: "Classic French Manicure",
      price: 2500,
      duration: 90,
      imageUrl:
        "https://i.ibb.co.com/q3Rf3MST/kelly-sikkema-Yie2-C8-Un-Oc-unsplash.jpg",
    },
    {
      id: 6,
      name: "Classic French Manicure",
      price: 2500,
      duration: 90,
      imageUrl:
        "https://i.ibb.co.com/q3Rf3MST/kelly-sikkema-Yie2-C8-Un-Oc-unsplash.jpg",
    },
  ]);

  const handleRemoveService = (id: number) => {
    setServices(services.filter((service) => service.id !== id));
  };

  const handleAddMore = () => {
    // Logic to add more services (e.g., open a modal or navigate to add screen)
    console.log("Add More pressed");
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="bg-white rounded-2xl w-full max-w-md p-6">
        {/* Modal Header */}
        <View className="flex-row items-center justify-between mb-6">
          <Text className="text-xl font-semibold text-gray-900">
            {mode === "add" ? "Add Category" : "Edit Category"}
          </Text>
        </View>

        {/* Category Name Input */}
        <View className="mb-6">
          <Text className="text-sm font-medium text-gray-900 mb-2">
            Category Name <Text className="text-red-500">*</Text>
          </Text>
          <TextInput
            value={categoryName}
            onChangeText={setCategoryName}
            placeholder="Enter category name"
            placeholderTextColor="#9CA3AF"
            className="bg-gray-100 rounded-lg px-4 py-3 text-base text-gray-900"
          />
        </View>

        {/* Visibility Toggle */}
        <View className="mb-6">
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-sm font-medium text-gray-900">
              Visibility
            </Text>
            <Switch
              value={visibility}
              onValueChange={setVisibility}
              trackColor={{ false: "#D1D5DB", true: "#000000" }}
              thumbColor="#FFFFFF"
            />
          </View>
          <Text className="text-xs text-gray-600">
            Control whether this category is visible to customers
          </Text>
        </View>

        {/* Action Buttons */}
        <View className="flex-row gap-3">
          <TouchableOpacity
            onPress={() => {}}
            className="flex-1 bg-white border border-gray-300 rounded-lg py-3"
          >
            <Text className="text-center font-medium text-gray-900">
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            className="flex-1 bg-black rounded-lg py-3"
          >
            <Text className="text-center font-medium text-white">
              {mode === "add" ? "Add" : "Save"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="bg-white p-4">
        {/* Header */}
        <View className="flex-row items-center justify-between mb-4">
          <View>
            <Text className="text-lg font-semibold text-gray-900">
              This Month Services
            </Text>
          </View>
          <TouchableOpacity onPress={() => {}} className="mr-4">
            <Ionicons name="close" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Category Section */}
        <View className="flex-row items-center justify-between mb-4">
          <View>
            <Text className="text-base font-medium text-gray-700">Summer</Text>
            <Text className="text-sm text-gray-600 mt-0.5">
              Total services {services.length}
            </Text>
          </View>
          <TouchableOpacity
            onPress={handleAddMore}
            className="bg-black rounded-lg px-4 py-2 flex-row items-center"
          >
            <Ionicons name="add" size={18} color="#FFF" />
            <Text className="text-white font-medium ml-1">Add More</Text>
          </TouchableOpacity>
        </View>

        {/* Services List */}
        <View>
          {services.map((service) => (
            <View
              key={service.id}
              className="bg-white rounded-lg p-4 mb-3 border border-gray-200 flex-row items-center"
            >
              <Image
                source={{ uri: service.imageUrl }}
                className="w-12 h-12 rounded-full mr-3"
                resizeMode="cover"
              />
              <View className="flex-1">
                <Text className="text-base font-semibold text-gray-900 mb-1">
                  {service.name}
                </Text>
                <View className="flex-row items-center">
                  <Text className="text-sm text-gray-700 mr-2">
                    $ NT${service.price}
                  </Text>
                  <Ionicons name="time-outline" size={16} color="#6B7280" />
                  <Text className="text-sm text-gray-700 ml-1">
                    {service.duration} min
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => handleRemoveService(service.id)}
                className="p-1"
              >
                <Text className="text-base text-red-500 font-medium">
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ThisMonthServices;
