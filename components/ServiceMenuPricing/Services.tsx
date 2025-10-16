import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
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
  imageUrl: string;
  categories: string[];
  hidden?: boolean;
}

interface MenuPosition {
  top: number;
  left: number;
}

const ServicesScreen = () => {
  const [services, setServices] = useState<Service[]>([
    {
      id: 1,
      name: "Classic French Manicure",
      price: 2500,
      duration: 90,
      imageUrl:
        "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=200",
      categories: ["This Month", "Popular"],
      hidden: false,
    },
    {
      id: 2,
      name: "Summer Coral Design",
      price: 3200,
      duration: 120,
      imageUrl:
        "https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=200",
      categories: ["Summer"],
      hidden: false,
    },
    {
      id: 3,
      name: "Wave Pattern Art",
      price: 2800,
      duration: 100,
      imageUrl: "",
      categories: ["Wave"],
      hidden: true,
    },
  ]);

  const [filterOptions] = useState<string[]>([
    "All Service",
    "Enable",
    "Disable",
  ]);
  const [selectedFilter, setSelectedFilter] = useState<string>("All Service");
  const [filterDropdownVisible, setFilterDropdownVisible] =
    useState<boolean>(false);
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [menuPosition, setMenuPosition] = useState<MenuPosition>({
    top: 0,
    left: 0,
  });
  const router = useRouter();
  //@ts-ignore
  const menuButtonRef = useRef<TouchableOpacity>(null);

  const filteredServices: Service[] = services.filter((service) => {
    if (selectedFilter === "Enable") return !service.hidden;
    if (selectedFilter === "Disable") return service.hidden;
    return true;
  });

  const handleMenuPress = (service: Service, event: any): void => {
    setSelectedService(service);
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
          top: py + height,
          left: px - 100,
        });
        setMenuVisible(true);
      }
    );
  };

  const handleMenuAction = (action: string): void => {
    if (!selectedService) return;

    if (action === "Enable") {
      setServices(
        services.map((s) =>
          s.id === selectedService.id ? { ...s, hidden: false } : s
        )
      );
    } else if (action === "Disable") {
      setServices(
        services.map((s) =>
          s.id === selectedService.id ? { ...s, hidden: true } : s
        )
      );
    } else if (action === "Edit") {
      console.log("Edit service:", selectedService);
    } else if (action === "Delete") {
      setServices(services.filter((s) => s.id !== selectedService.id));
    }

    setMenuVisible(false);
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header Section */}
      <View className="bg-white px-5 py-5 border-b border-gray-100">
        <View className="flex-row items-center justify-between mb-4">
          <View>
            <Text className="text-xl font-bold text-gray-900">Services</Text>
            <Text className="text-sm text-gray-500 mt-1">
              {services.length}/100 services
            </Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              router.push("/(tabs)/Management/screens/AddServicesForm")
            }
            className="bg-black rounded-lg px-4 py-2.5 flex-row items-center"
          >
            <Ionicons name="add" size={20} color="#FFF" />
            <Text className="text-white font-semibold ml-1.5">Add Service</Text>
          </TouchableOpacity>
        </View>

        {/* Filter Section */}
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center flex-1">
            <Ionicons
              name="funnel-outline"
              size={20}
              color="#6B7280"
              style={{ marginRight: 8 }}
            />
            <TouchableOpacity
              onPress={() => setFilterDropdownVisible(!filterDropdownVisible)}
              className="flex-row items-center bg-white border border-gray-300 rounded-lg px-3 py-2.5 flex-1"
            >
              <Text className="text-gray-900 flex-1 text-sm font-medium">
                {selectedFilter}
              </Text>
              <Ionicons
                name={filterDropdownVisible ? "chevron-up" : "chevron-down"}
                size={18}
                color="#6B7280"
              />
            </TouchableOpacity>
          </View>
          <View className="ml-3 bg-black rounded-lg px-3 py-2.5">
            <Text className="text-white font-semibold text-sm">
              {filteredServices.length} services
            </Text>
          </View>
        </View>

        {/* Filter Dropdown */}
        {filterDropdownVisible && (
          <View className="mt-2 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
            {filterOptions.map((option: string) => (
              <TouchableOpacity
                key={option}
                onPress={() => {
                  setSelectedFilter(option);
                  setFilterDropdownVisible(false);
                }}
                className={`px-4 py-3 ${
                  option !== filterOptions[filterOptions.length - 1]
                    ? "border-b border-gray-100"
                    : ""
                } ${selectedFilter === option ? "bg-gray-50" : ""}`}
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
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-5 py-4">
          {filteredServices.map((service: Service) => (
            <View
              key={service.id}
              className="bg-white rounded-2xl p-4 mb-3 border border-gray-100 shadow-sm"
            >
              <View className="flex-row items-start">
                {/* Service Image */}
                {service.imageUrl ? (
                  <Image
                    source={{ uri: service.imageUrl }}
                    className="w-16 h-16 rounded-xl"
                    resizeMode="cover"
                  />
                ) : (
                  <View className="w-16 h-16 rounded-xl bg-gray-100 items-center justify-center">
                    <Ionicons name="image-outline" size={24} color="#9CA3AF" />
                  </View>
                )}

                {/* Service Info */}
                <View className="flex-1 ml-3">
                  <Text className="text-base font-semibold text-gray-900 mb-1">
                    {service.name}
                  </Text>
                  <Text className="text-sm text-gray-600 mb-2">
                    $ NT${service.price.toLocaleString()}
                  </Text>
                  <View className="flex-row items-center">
                    <Ionicons name="time-outline" size={14} color="#9CA3AF" />
                    <Text className="text-sm text-gray-500 ml-1">
                      {service.duration} min
                    </Text>
                  </View>

                  {/* Category Tags */}
                  <View className="flex-row flex-wrap mt-2">
                    {service.categories.map((category, index) => (
                      <View
                        key={index}
                        className="bg-gray-100 rounded-md px-2 py-1 mr-2 mb-1"
                      >
                        <Text className="text-xs font-medium text-gray-700">
                          {category}
                        </Text>
                      </View>
                    ))}
                    {service.hidden && (
                      <View className="bg-gray-100 rounded-md px-2 py-1">
                        <Text className="text-xs font-medium text-gray-700">
                          Hidden
                        </Text>
                      </View>
                    )}
                  </View>
                </View>

                {/* Menu Button */}
                <TouchableOpacity
                  ref={menuButtonRef}
                  onPress={(e) => handleMenuPress(service, e)}
                  className="p-1 ml-2"
                >
                  <Ionicons
                    name="ellipsis-vertical"
                    size={20}
                    color="#6B7280"
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Context Menu Modal */}
      {menuVisible && selectedService && (
        <Modal
          transparent
          visible={menuVisible}
          onRequestClose={() => setMenuVisible(false)}
          animationType="fade"
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setMenuVisible(false)}
            className="flex-1"
          >
            <View
              className="bg-white rounded-xl shadow-2xl min-w-[160px] border border-gray-100"
              style={
                {
                  position: "absolute",
                  top: menuPosition.top - 50,
                  right: 20,
                } as StyleProp<ViewStyle>
              }
            >
              {selectedService.hidden ? (
                <TouchableOpacity
                  onPress={() => handleMenuAction("Enable")}
                  className="flex-row items-center px-4 py-3.5 border-b border-gray-100"
                >
                  <Ionicons
                    name="checkmark-circle-outline"
                    size={18}
                    color="#374151"
                  />
                  <Text className="text-base text-gray-900 ml-3 font-medium">
                    Enable
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => handleMenuAction("Disable")}
                  className="flex-row items-center px-4 py-3.5 border-b border-gray-100"
                >
                  <Ionicons
                    name="close-circle-outline"
                    size={18}
                    color="#374151"
                  />
                  <Text className="text-base text-gray-900 ml-3 font-medium">
                    Disable
                  </Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                onPress={() => handleMenuAction("Edit")}
                className="flex-row items-center px-4 py-3.5 border-b border-gray-100"
              >
                <Ionicons name="create-outline" size={18} color="#374151" />
                <Text className="text-base text-gray-900 ml-3 font-medium">
                  Edit
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleMenuAction("Delete")}
                className="flex-row items-center px-4 py-3.5"
              >
                <Ionicons name="trash-outline" size={18} color="#EF4444" />
                <Text className="text-base text-red-500 ml-3 font-medium">
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      )}
    </View>
  );
};

export default ServicesScreen;
