import { Feather, Ionicons } from "@expo/vector-icons";
import React, { useRef } from "react";
import {
  Modal,
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

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

interface AddOnsProps {
  services: Service[];
  filterOptions: string[];
  selectedFilter: string;
  setSelectedFilter: React.Dispatch<React.SetStateAction<string>>;
  filterDropdownVisible: boolean;
  setFilterDropdownVisible: React.Dispatch<React.SetStateAction<boolean>>;
  menuVisible: boolean;
  setMenuVisible: React.Dispatch<React.SetStateAction<boolean>>;
  selectedService: Service | null;
  setSelectedService: React.Dispatch<React.SetStateAction<Service | null>>;
  menuPosition: MenuPosition;
  setMenuPosition: React.Dispatch<React.SetStateAction<MenuPosition>>;
}

const AddOns: React.FC<AddOnsProps> = ({
  services,
  filterOptions,
  selectedFilter,
  setSelectedFilter,
  filterDropdownVisible,
  setFilterDropdownVisible,
  menuVisible,
  setMenuVisible,
  selectedService,
  setSelectedService,
  menuPosition,
  setMenuPosition,
}) => {
  // @ts-ignore
  const menuButtonRef = useRef<TouchableOpacity>(null);

  const filteredServices: Service[] = services.filter((service) => {
    if (selectedFilter === "Enabled") return service.enabled;
    if (selectedFilter === "Disabled") return !service.enabled;
    return true;
  });

  const handleMenuPress = (service: Service, event: any): void => {
    setSelectedService(service);
    // Get the position of the touch
    menuButtonRef.current?.measure(
      (
        fx: number,
        fy: number,
        width: number,
        height: number,
        px: number,
        py: number
      ) => {
        setMenuPosition({
          top: py + height - 50,
          left: px - 100,
        });
        setMenuVisible(true);
      }
    );
  };

  const handleMenuAction = (action: string): void => {
    console.log(`${action} service:`, selectedService);
    setMenuVisible(false);
  };

  return (
    <>
      {/* Header Section */}
      <View className="bg-white px-4 py-4 mb-2">
        <View className="flex-row items-center justify-between mb-4">
          <View>
            <Text className="text-lg font-semibold text-gray-900">Add-ons</Text>
            <Text className="text-sm text-gray-600 mt-1">3/100 services</Text>
          </View>
          <TouchableOpacity className="bg-black rounded-lg px-4 py-2 flex-row items-center">
            <Ionicons name="add" size={20} color="#FFF" />
            <Text className="text-white font-medium ml-1">Add Now</Text>
          </TouchableOpacity>
        </View>

        {/* Filter Section */}
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center flex-1">
            <Ionicons name="filter-outline" size={20} color="#6B7280" />
            <TouchableOpacity
              onPress={() => setFilterDropdownVisible(!filterDropdownVisible)}
              className="ml-2 flex-row items-center bg-white border border-gray-300 rounded-lg px-3 py-2 flex-1"
            >
              <Text className="text-gray-900 flex-1">{selectedFilter}</Text>
              <Ionicons
                name={filterDropdownVisible ? "chevron-up" : "chevron-down"}
                size={20}
                color="#6B7280"
              />
            </TouchableOpacity>
          </View>
          <View className="ml-3 bg-black rounded-lg px-3 py-2">
            <Text className="text-white font-medium">
              {filteredServices.length} add-ons
            </Text>
          </View>
        </View>

        {/* Filter Dropdown */}
        {filterDropdownVisible && (
          <View className="mt-2 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
            {filterOptions.map((option: string) => (
              <TouchableOpacity
                key={option}
                onPress={() => {
                  setSelectedFilter(option);
                  setFilterDropdownVisible(false);
                }}
                className={`px-4 py-3 border-b border-gray-100 ${
                  selectedFilter === option ? "bg-gray-50" : ""
                }`}
              >
                <Text
                  className={`text-base ${
                    selectedFilter === option
                      ? "font-semibold text-gray-900"
                      : "text-gray-700"
                  }`}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* Services List */}
      <View className="px-4 pb-4">
        {filteredServices.map((service: Service) => (
          <View
            key={service.id}
            className="bg-white rounded-lg p-4 mb-3 border border-gray-200"
          >
            <View className="flex-row items-start justify-between">
              <View className="flex-1">
                <Text className="text-base font-semibold text-gray-900 mb-2">
                  {service.name}
                </Text>
                <View className="flex-row items-center">
                  <Ionicons name="cash-outline" size={16} color="#6B7280" />
                  <Text className="text-sm text-gray-700 ml-1">
                    NT${service.price}
                  </Text>
                </View>
                <View className="flex-row items-center mt-1">
                  <Ionicons name="time-outline" size={16} color="#6B7280" />
                  <Text className="text-sm text-gray-700 ml-1">
                    {service.duration} min
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                ref={menuButtonRef}
                onPress={(e) => handleMenuPress(service, e)}
                className="p-1"
              >
                <Feather name="more-vertical" size={20} color="#6B7280" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      {/* Context Menu Modal */}
      {menuVisible && (
        <Modal
          transparent
          visible={menuVisible}
          onRequestClose={() => setMenuVisible(false)}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setMenuVisible(false)}
            className="flex-1"
          >
            <View
              className="bg-white rounded-lg shadow-2xl min-w-[160px] border border-gray-200"
              style={
                {
                  position: "absolute",
                  top: menuPosition.top,
                  right: 16,
                } as StyleProp<ViewStyle>
              }
            >
              <TouchableOpacity
                onPress={() => handleMenuAction("Disable")}
                className="flex-row items-center px-4 py-3 border-b border-gray-100"
              >
                <Ionicons
                  name="close-circle-outline"
                  size={18}
                  color="#374151"
                />
                <Text className="text-base text-gray-900 ml-3">Disable</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleMenuAction("Enable")}
                className="flex-row items-center px-4 py-3 border-b border-gray-100"
              >
                <Ionicons
                  name="checkmark-circle-outline"
                  size={18}
                  color="#374151"
                />
                <Text className="text-base text-gray-900 ml-3">Enable</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleMenuAction("Edit")}
                className="flex-row items-center px-4 py-3 border-b border-gray-100"
              >
                <Ionicons name="create-outline" size={18} color="#374151" />
                <Text className="text-base text-gray-900 ml-3">Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleMenuAction("Delete")}
                className="flex-row items-center px-4 py-3"
              >
                <Ionicons name="trash-outline" size={18} color="#EF4444" />
                <Text className="text-base text-red-500 ml-3">Delete</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      )}
    </>
  );
};

export default AddOns;
