// VIPPrioritySettings.js
import { Ionicons } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  StyleProp,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Badge {
  id: number;
  name: string;
  level: number;
  color: string;
  dotColor: string;
  bookingDays: number;
  enabled: boolean;
}

interface Customer {
  id: number;
  name: string;
  username: string;
  badge: string;
  badgeColor: string;
  bookings: number;
  phone: string;
  lastVisit: string;
}

const VIPPrioritySettings = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("Badges");
  const [filterDropdownVisible, setFilterDropdownVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [badgeMenuVisible, setBadgeMenuVisible] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const menuButtonRef = useRef(null);
  const bottomBarHeight = useBottomTabBarHeight();

  const [badges, setBadges] = useState<Badge[]>([
    {
      id: 1,
      name: "Platinum VIP",
      level: 3,
      color: "bg-purple-100",
      dotColor: "#9333EA",
      bookingDays: 3,
      enabled: true,
    },
    {
      id: 2,
      name: "Gold VIP",
      level: 2,
      color: "bg-yellow-100",
      dotColor: "#F59E0B",
      bookingDays: 2,
      enabled: true,
    },
    {
      id: 3,
      name: "Silver VIP",
      level: 1,
      color: "bg-gray-200",
      dotColor: "#6B7280",
      bookingDays: 1,
      enabled: true,
    },
  ]);

  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: 1,
      name: "Jess Wu",
      username: "@jessica_wu",
      badge: "Silver VIP",
      badgeColor: "bg-gray-500",
      bookings: 43,
      phone: "NT$50,000",
      lastVisit: "1/8/2025",
    },
    {
      id: 2,
      name: "Lisa L.",
      username: "@lisa_liu",
      badge: "Gold VIP",
      badgeColor: "bg-yellow-500",
      bookings: 35,
      phone: "NT$44,600",
      lastVisit: "1/25/2025",
    },
    {
      id: 3,
      name: "Lisa L.",
      username: "@lisa_liu",
      badge: "Gold VIP",
      badgeColor: "bg-yellow-500",
      bookings: 32,
      phone: "NT$44,600",
      lastVisit: "1/01/2025",
    },
    {
      id: 4,
      name: "Sarah C.",
      username: "@sarah_chen",
      badge: "Platinum VIP",
      badgeColor: "bg-purple-500",
      bookings: 24,
      phone: "NT$28,800",
      lastVisit: "1/8/2025",
    },
  ]);

  const filterOptions = ["Badges", "Silver", "Gold", "Platinum"];

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.username.toLowerCase().includes(searchQuery.toLowerCase());

    if (selectedFilter === "Badges") return matchesSearch;
    return (
      matchesSearch &&
      customer.badge.toLowerCase().includes(selectedFilter.toLowerCase())
    );
  });

  const handleCustomerMenuPress = (customer: Customer) => {
    setSelectedCustomer(customer);
    //@ts-ignore
    menuButtonRef.current?.measure(
      (
        fx: number,
        fy: number,
        width: number,
        height: number,
        px: number,
        py: number
      ) => {
        setMenuPosition({ top: py + height, left: px - 100 });
        setMenuVisible(true);
      }
    );
  };

  const handleBadgeMenuPress = (badge: Badge) => {
    setSelectedBadge(badge);
    //@ts-ignore
    menuButtonRef.current?.measure(
      (
        fx: number,
        fy: number,
        width: number,
        height: number,
        px: number,
        py: number
      ) => {
        setMenuPosition({ top: py + height, left: px - 100 });
        setBadgeMenuVisible(true);
      }
    );
  };

  const handleCustomerMenuAction = (action: string) => {
    console.log(`${action} customer:`, selectedCustomer);
    setMenuVisible(false);
  };

  const handleBadgeMenuAction = (action: string) => {
    console.log(`${action} badge:`, selectedBadge);
    setBadgeMenuVisible(false);
  };

  const toggleBadge = (id: number) => {
    setBadges(
      badges.map((badge) =>
        badge.id === id ? { ...badge, enabled: !badge.enabled } : badge
      )
    );
  };

  return (
    <SafeAreaView
      className="flex-1 bg-white"
      style={{ paddingBottom: bottomBarHeight + 60 }}
    >
      {/* Header */}
      <View className="bg-white px-4 py-4 border-b border-gray-200">
        <View className="flex-row items-center">
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/Management/inxex")}
            className="mr-4"
          >
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text className="text-xl font-semibold text-gray-900">
            VIP Priority Settings
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1">
        {/* All Available Badges Section */}
        <View className="bg-white mt-2 px-4 py-4">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-base font-semibold text-gray-900">
              All available Badges
            </Text>
            <TouchableOpacity
              onPress={() =>
                router.push("/(tabs)/Management/screens/AddNewBadge")
              }
              className="bg-black rounded-lg px-4 py-2 flex-row items-center"
            >
              <Text className="text-white font-medium mr-1">Add Badge</Text>
              <Ionicons name="add" size={18} color="#FFF" />
            </TouchableOpacity>
          </View>

          {/* Badges List */}
          {badges.map((badge) => (
            <View
              key={badge.id}
              className="bg-gray-50 rounded-lg p-4 mb-3 flex-row items-center"
            >
              <View className="flex-1 flex-row items-center">
                <View className="items-center mr-4">
                  <Text className="text-2xl font-bold text-gray-900">
                    {badge.level}
                  </Text>
                  <Text className="text-xs text-gray-600 mt-0.5">days</Text>
                </View>

                <View className="flex-1">
                  <View className="flex-row items-center mb-1">
                    <View
                      className="w-2 h-2 rounded-full mr-2"
                      style={{ backgroundColor: badge.dotColor }}
                    />
                    <Text className="text-base font-semibold text-gray-900">
                      {badge.name}
                    </Text>
                  </View>
                  <Text className="text-sm text-gray-600">
                    Book {badge.bookingDays} days in advance
                  </Text>
                </View>
              </View>

              <Switch
                value={badge.enabled}
                onValueChange={() => toggleBadge(badge.id)}
                trackColor={{ false: "#D1D5DB", true: "#000000" }}
                thumbColor="#FFFFFF"
              />

              <TouchableOpacity
                ref={menuButtonRef}
                onPress={() => handleBadgeMenuPress(badge)}
                className="ml-2 p-1"
              >
                <Ionicons name="ellipsis-vertical" size={20} color="#6B7280" />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* All VIP Customer Section */}
        <View className="bg-white mt-2 px-4 py-4">
          <Text className="text-base font-semibold text-gray-900 mb-4">
            All vip Customer
          </Text>

          {/* Search Bar */}
          <View className="bg-gray-100 rounded-lg px-4 py-3 flex-row items-center mb-3">
            <Ionicons name="search" size={20} color="#9CA3AF" />
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search customers..."
              placeholderTextColor="#9CA3AF"
              className="flex-1 ml-2 text-base text-gray-900"
            />
          </View>

          {/* Filter and Count */}
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-sm text-gray-600">
              Showing 8 of 8 customers
            </Text>
            <TouchableOpacity
              onPress={() => setFilterDropdownVisible(!filterDropdownVisible)}
              className="flex-row items-center bg-white border border-gray-300 rounded-lg px-3 py-2"
            >
              <Text className="text-sm text-gray-900 mr-2">
                {selectedFilter}
              </Text>
              <Ionicons
                name={filterDropdownVisible ? "chevron-up" : "chevron-down"}
                size={16}
                color="#6B7280"
              />
            </TouchableOpacity>
          </View>

          {/* Filter Dropdown */}
          {filterDropdownVisible && (
            <View className="mb-3 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
              {filterOptions.map((option) => (
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

          {/* Customers List */}
          {filteredCustomers.map((customer) => (
            <View
              key={customer.id}
              className="flex-row items-center py-4 border-b border-gray-100"
            >
              {/* Avatar */}
              <Image
                source={{
                  uri: `https://avatar.iran.liara.run/username?username=${customer.name}`,
                }}
                className="w-12 h-12 rounded-full mr-3"
              />

              {/* Customer Info */}
              <View className="flex-1">
                <View className="flex-row items-center mb-1">
                  <Text className="text-base font-semibold text-gray-900 mr-2">
                    {customer.name}
                  </Text>
                  <View
                    className={`${customer.badgeColor} px-2 py-0.5 rounded`}
                  >
                    <Text className="text-xs text-white font-medium">
                      {customer.badge}
                    </Text>
                  </View>
                </View>
                <Text className="text-sm text-gray-600 mb-1">
                  {customer.username}
                </Text>
                <Text className="text-xs text-gray-500">{customer.name}</Text>
                <View className="flex-row items-center mt-1">
                  <Text className="text-xs text-gray-500 mr-3">
                    {customer.bookings} bookings
                  </Text>
                  <Text className="text-xs text-gray-500 mr-3">
                    {customer.phone}
                  </Text>
                  <Text className="text-xs text-gray-500">
                    Last: {customer.lastVisit}
                  </Text>
                </View>
              </View>

              {/* Menu Button */}
              <TouchableOpacity
                ref={menuButtonRef}
                onPress={() => handleCustomerMenuPress(customer)}
                className="p-1"
              >
                <Ionicons
                  name="ellipsis-horizontal"
                  size={20}
                  color="#6B7280"
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Customer Context Menu */}
      {menuVisible && selectedCustomer && (
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
              className="bg-white rounded-xl shadow-2xl min-w-[180px] border border-gray-100"
              style={
                {
                  position: "absolute",
                  top: menuPosition.top - 50,
                  right: 16,
                } as StyleProp<ViewStyle>
              }
            >
              <TouchableOpacity
                onPress={() => handleCustomerMenuAction("View profile")}
                className="flex-row items-center px-4 py-3.5 border-b border-gray-100"
              >
                <Ionicons name="eye-outline" size={18} color="#374151" />
                <Text className="text-base text-gray-900 ml-3 font-medium">
                  View profile
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleCustomerMenuAction("Change badge")}
                className="flex-row items-center px-4 py-3.5 border-b border-gray-100"
              >
                <Ionicons name="pricetag-outline" size={18} color="#374151" />
                <Text className="text-base text-gray-900 ml-3 font-medium">
                  Change badge
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleCustomerMenuAction("Remove badge")}
                className="flex-row items-center px-4 py-3.5"
              >
                <Ionicons name="trash-outline" size={18} color="#EF4444" />
                <Text className="text-base text-red-500 ml-3 font-medium">
                  Remove badge
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      )}

      {/* Badge Context Menu */}
      {badgeMenuVisible && selectedBadge && (
        <Modal
          transparent
          visible={badgeMenuVisible}
          onRequestClose={() => setBadgeMenuVisible(false)}
          animationType="fade"
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setBadgeMenuVisible(false)}
            className="flex-1"
          >
            <View
              className="bg-white rounded-xl shadow-2xl min-w-[160px] border border-gray-100"
              style={
                {
                  position: "absolute",
                  top: menuPosition.top - 50,
                  right: 16,
                } as StyleProp<ViewStyle>
              }
            >
              <TouchableOpacity
                onPress={() => handleBadgeMenuAction("Edit")}
                className="flex-row items-center px-4 py-3.5 border-b border-gray-100"
              >
                <Ionicons name="create-outline" size={18} color="#374151" />
                <Text className="text-base text-gray-900 ml-3 font-medium">
                  Edit
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleBadgeMenuAction("Delete")}
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
    </SafeAreaView>
  );
};

export default VIPPrioritySettings;
