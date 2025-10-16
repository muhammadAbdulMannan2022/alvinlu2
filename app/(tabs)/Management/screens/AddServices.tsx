import { Ionicons } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Service {
  id: number;
  name: string;
  price: number;
  duration: number;
  imageUrl: string;
  selected?: boolean;
}

export default function AddToCategoryScreen() {
  const [services, setServices] = useState<Service[]>([
    {
      id: 1,
      name: "Classic French Manicure",
      price: 2500,
      duration: 90,
      imageUrl:
        "https://i.ibb.co.com/q3Rf3MST/kelly-sikkema-Yie2-C8-Un-Oc-unsplash.jpg",
      selected: true,
    },
    {
      id: 2,
      name: "Classic French Manicure",
      price: 2500,
      duration: 90,
      imageUrl:
        "https://i.ibb.co.com/q3Rf3MST/kelly-sikkema-Yie2-C8-Un-Oc-unsplash.jpg",
      selected: false,
    },
    {
      id: 3,
      name: "Classic French Manicure",
      price: 2500,
      duration: 90,
      imageUrl:
        "https://i.ibb.co.com/q3Rf3MST/kelly-sikkema-Yie2-C8-Un-Oc-unsplash.jpg",
      selected: false,
    },
    {
      id: 4,
      name: "Classic French Manicure",
      price: 2500,
      duration: 90,
      imageUrl:
        "https://i.ibb.co.com/q3Rf3MST/kelly-sikkema-Yie2-C8-Un-Oc-unsplash.jpg",
      selected: false,
    },
    {
      id: 5,
      name: "Classic French Manicure",
      price: 2500,
      duration: 90,
      imageUrl:
        "https://i.ibb.co.com/q3Rf3MST/kelly-sikkema-Yie2-C8-Un-Oc-unsplash.jpg",
      selected: false,
    },
    {
      id: 6,
      name: "Classic French Manicure",
      price: 2500,
      duration: 90,
      imageUrl:
        "https://i.ibb.co.com/q3Rf3MST/kelly-sikkema-Yie2-C8-Un-Oc-unsplash.jpg",
      selected: false,
    },
    {
      id: 7,
      name: "Classic French Manicure",
      price: 2500,
      duration: 90,
      imageUrl:
        "https://i.ibb.co.com/q3Rf3MST/kelly-sikkema-Yie2-C8-Un-Oc-unsplash.jpg",
      selected: false,
    },
  ]);
  const bottomBarHeight = useBottomTabBarHeight();

  const toggleService = (id: number) => {
    setServices(
      services.map((service) =>
        service.id === id
          ? { ...service, selected: !service.selected }
          : service
      )
    );
  };

  const handleConfirm = () => {
    const selectedServices = services.filter((s) => s.selected);
    console.log("Selected services:", selectedServices);
    // Handle confirmation logic here
  };
  const router = useRouter();

  const selectedCount = services.filter((s) => s.selected).length;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View
        className="flex-1 bg-white"
        style={{ paddingBottom: bottomBarHeight + 60 }}
      >
        {/* Header */}
        <View className="flex-row items-center px-4 py-4 border-b border-gray-100">
          <TouchableOpacity
            onPress={() =>
              router.push("/(tabs)/Management/screens/AddRemoveCategory")
            }
            className="mr-3"
          >
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text className="text-lg font-semibold text-gray-900">Back</Text>
        </View>

        {/* Category Title */}
        <View className="px-5 py-4 bg-white">
          <Text className="text-base font-medium text-gray-900">
            Add to "this Month" Category
          </Text>
        </View>

        {/* Services List */}
        <ScrollView
          className="flex-1 px-5"
          showsVerticalScrollIndicator={false}
        >
          {services.map((service, index) => (
            <View
              key={service.id}
              className={`flex-row items-center bg-white border border-gray-100 rounded-xl p-4 ${
                index !== services.length - 1 ? "mb-3" : "mb-24"
              }`}
            >
              {/* Service Image */}
              <Image
                source={{ uri: service.imageUrl }}
                className="w-12 h-12 rounded-lg"
                resizeMode="cover"
              />

              {/* Service Info */}
              <View className="flex-1 ml-3">
                <Text className="text-base font-medium text-gray-900 mb-1">
                  {service.name}
                </Text>
                <Text className="text-sm text-gray-600 mb-1">
                  $ NT${service.price.toLocaleString()}
                </Text>
                <View className="flex-row items-center">
                  <Ionicons name="time-outline" size={14} color="#9CA3AF" />
                  <Text className="text-sm text-gray-500 ml-1">
                    {service.duration} min
                  </Text>
                </View>
              </View>

              {/* Select Button */}
              {service.selected ? (
                <TouchableOpacity
                  onPress={() => toggleService(service.id)}
                  className="bg-emerald-500 px-4 py-2 rounded-full flex-row items-center"
                >
                  <Ionicons name="checkmark" size={16} color="#FFF" />
                  <Text className="text-white text-sm font-medium ml-1">
                    Selected
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => toggleService(service.id)}
                  className="border border-gray-300 px-5 py-2 rounded-full"
                >
                  <Text className="text-gray-700 text-sm font-medium">
                    Select
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
          {/* Confirm Button */}

          <TouchableOpacity
            onPress={handleConfirm}
            className="bg-gray-900 py-4 items-center mb-5"
            style={{ borderRadius: 6 }}
            disabled={selectedCount === 0}
          >
            <Text className="text-white text-base font-semibold">
              Confirm {selectedCount > 0 ? `(${selectedCount})` : ""}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
