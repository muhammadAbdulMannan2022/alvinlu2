import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Service {
  id: number;
  name: string;
  price: number;
  duration: number;
  imageUrl: string;
}

interface Category {
  id: number;
  name: string;
  visible: boolean;
}

const ThisMonthServices: React.FC = () => {
  const router = useRouter();
  const { mode, category } = useLocalSearchParams();

  const [currentMode, setCurrentMode] = useState<"add" | "edit">("add");
  const [categoryName, setCategoryName] = useState("");
  const [visibility, setVisibility] = useState(true);

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
  ]);

  useEffect(() => {
    if (mode === "edit" && category) {
      try {
        const parsedCategory = JSON.parse(category as string);
        setCurrentMode("edit");
        setCategoryName(parsedCategory.name || "");
        setVisibility(parsedCategory.visible ?? true);
      } catch (err) {
        console.error("Failed to parse category:", err);
      }
    } else {
      setCurrentMode("add");
      setCategoryName("");
      setVisibility(true);
    }
  }, [mode, category]);

  const handleRemoveService = (id: number) => {
    setServices(services.filter((s) => s.id !== id));
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-5">
      {/* Modal Header */}
      <View className="flex-row items-center gap-4 py-3 mb-6">
        <TouchableOpacity
          onPress={() =>
            router.push("/(tabs)/Management/screens/ServiceMenuPriceing")
          }
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-xl font-bold">
          {currentMode === "add" ? "Add Category" : "Edit Category"}
        </Text>
      </View>

      {/* Category Name */}
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

      {/* Visibility */}
      <View className="mb-6">
        <View className="flex-row items-center justify-between mb-2">
          <Text className="text-sm font-medium text-gray-900">Visibility</Text>
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

      {/* Buttons */}
      <View className="flex-row gap-3 mb-6">
        <TouchableOpacity
          onPress={() => router.back()}
          className="flex-1 bg-white border border-gray-300 rounded-lg py-3"
        >
          <Text className="text-center font-medium text-gray-900">Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {}}
          className="flex-1 bg-black rounded-lg py-3"
        >
          <Text className="text-center font-medium text-white">
            {currentMode === "add" ? "Add" : "Save"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Services List */}
      <View>
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-lg font-semibold text-gray-900">Summer 06</Text>
          <TouchableOpacity
            onPress={() => {
              router.push("/(tabs)/Management/screens/AddServices");
            }}
          >
            <Text className="text-base font-medium text-gray-900">
              + Add More
            </Text>
          </TouchableOpacity>
        </View>
        <Text className="text-sm text-gray-600 mb-4">Total services: 4</Text>

        {services.map((service) => (
          <View
            key={service.id}
            className="bg-gray-50 rounded-lg p-4 mb-3 border border-gray-200 flex-row items-center"
          >
            <Image
              source={{ uri: service.imageUrl }}
              className="w-12 h-12 mr-3"
              style={{ borderRadius: 4 }}
              resizeMode="cover"
            />
            <View className="flex-1">
              <Text className="text-base font-semibold text-gray-900 mb-1">
                {service.name}
              </Text>
              <View className="flex-row items-center">
                <Text className="text-sm text-gray-700 mr-2">
                  NT${service.price}
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
              <Text className="text-base text-red-500 font-medium">Remove</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default ThisMonthServices;
