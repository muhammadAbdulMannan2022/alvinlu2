import AddOns from "@/components/ServiceMenuPricing/AddOns";
import MenuCategories from "@/components/ServiceMenuPricing/Categories";
import ServicesScreen from "@/components/ServiceMenuPricing/Services";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Define TypeScript interfaces
interface Service {
  id: number;
  name: string;
  price: number;
  duration: number;
  enabled: boolean;
}

interface MenuPosition {
  top: number;
  left: number;
}

const ServiceMenuPricing: React.FC = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>("Add-ons");
  const [filterDropdownVisible, setFilterDropdownVisible] =
    useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState<string>("All Add ons");
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [menuPosition, setMenuPosition] = useState<MenuPosition>({
    top: 0,
    left: 0,
  });

  // Dummy service data
  const services: Service[] = [
    {
      id: 1,
      name: "Classic French Manicure",
      price: 2500,
      duration: 90,
      enabled: true,
    },
    {
      id: 2,
      name: "Classic French Manicure",
      price: 2500,
      duration: 90,
      enabled: true,
    },
    {
      id: 3,
      name: "Classic French Manicure",
      price: 2500,
      duration: 90,
      enabled: false,
    },
  ];

  const filterOptions: string[] = ["All Add ons", "Enabled", "Disabled"];

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-4 py-4 border-b border-gray-200">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()} className="mr-4">
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text className="text-xl font-semibold text-gray-900">
            Service Menu & Pricing
          </Text>
        </View>
      </View>

      {/* Tabs */}
      <View className="bg-white px-4 py-3">
        <View className="bg-gray-100 rounded-lg p-1 flex-row">
          {["Categories", "Services", "Add-ons"].map((tab: string) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              className={`flex-1 py-2 rounded-md ${activeTab === tab ? "bg-white" : ""}`}
            >
              <Text
                className={`text-center font-medium ${
                  activeTab === tab ? "text-gray-900" : "text-gray-600"
                }`}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Content */}
      <ScrollView className="flex-1">
        {activeTab === "Add-ons" && (
          <AddOns
            services={services}
            filterOptions={filterOptions}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
            filterDropdownVisible={filterDropdownVisible}
            setFilterDropdownVisible={setFilterDropdownVisible}
            menuVisible={menuVisible}
            setMenuVisible={setMenuVisible}
            selectedService={selectedService}
            setSelectedService={setSelectedService}
            menuPosition={menuPosition}
            setMenuPosition={setMenuPosition}
          />
        )}
        {activeTab === "Categories" && <MenuCategories />}
        {activeTab === "Services" && <ServicesScreen />}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ServiceMenuPricing;
