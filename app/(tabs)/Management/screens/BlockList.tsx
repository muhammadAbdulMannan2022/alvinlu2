import ProfileSheetMain from "@/components/Home/Sheets/Profiles/ProfileSheetMain";
import CustomBottomSheet from "@/components/ReuseableBottomSheets/CustomBottomSheet";
import { Ionicons } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  StyleProp,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  bookings: number;
  spent: string;
  lastVisit: string;
  badge?: string;
  badgeColor?: string;
}

interface MenuPosition {
  top: number;
  left: number;
}

const BlockList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const bottomBarHeight = useBottomTabBarHeight();
  const router = useRouter();
  const [isViewProfile, setIsViewProfile] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: "1",
      name: "Amy Z.",
      email: "@amy_zhang",
      phone: "Amy Zhang",
      bookings: 9,
      spent: "NT$10,000",
      lastVisit: "9/1/2025",
    },
    {
      id: "2",
      name: "Emma W.",
      email: "@emma_wang",
      phone: "Emma Wang",
      bookings: 5,
      spent: "NT$8,000",
      lastVisit: "12/1/2024",
    },
    {
      id: "3",
      name: "Jane Wu",
      email: "@JaneWu_tw",
      phone: "Jane Wu",
      bookings: 48,
      spent: "NT$90,000",
      lastVisit: "1/8/2025",
      badge: "Prime VIP",
      badgeColor: "#6B7280",
    },
    {
      id: "4",
      name: "Lisa L.",
      email: "@lisa_lu",
      phone: "Lisa Lu",
      bookings: 5,
      spent: "NT$8,000",
      lastVisit: "1/9/2025",
      badge: "New VIP",
      badgeColor: "#F59E0B",
    },
    {
      id: "5",
      name: "Mike",
      email: "@michael_c",
      phone: "Michael Chen",
      bookings: 5,
      spent: "NT$8,000",
      lastVisit: "12/22/2024",
    },
    {
      id: "6",
      name: "Rachel L.",
      email: "@rachel_lee",
      phone: "Rachel Lee",
      bookings: 0,
      spent: "NT$0",
      lastVisit: "",
      badge: "New Member",
      badgeColor: "#EF4444",
    },
    {
      id: "7",
      name: "Sarah C.",
      email: "@sarah_chen",
      phone: "Sarah Chen",
      bookings: 25,
      spent: "NT$18,000",
      lastVisit: "11/3/2025",
      badge: "Premium VIP",
      badgeColor: "#8B5CF6",
    },
    {
      id: "8",
      name: "Tony W.",
      email: "@tony_wang",
      phone: "Tony Wang",
      bookings: 1,
      spent: "NT$1,200",
      lastVisit: "",
    },
  ]);

  const [filterMenuVisible, setFilterMenuVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All Customers");

  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [menuPosition, setMenuPosition] = useState<MenuPosition>({
    top: 0,
    left: 0,
  });

  const [applyBatchVisible, setApplyBatchVisible] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState("");
  const [badgeDropdownVisible, setBadgeDropdownVisible] = useState(false);

  const availableBadges = ["Platinum VIP", "Gold VIP", "Silver VIP"];
  // @ts-ignore
  const menuButtonRef = useRef<TouchableOpacity>(null);

  // Stats
  const totalCustomers = customers.length;
  const thisMonth = 8;
  const lastThirtyDays = 3;
  const newThisMonth = 0;

  // Filter customers
  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.toLowerCase().includes(searchQuery.toLowerCase());

    if (selectedFilter === "All Customers") return matchesSearch;
    if (selectedFilter === "Current Booking")
      return matchesSearch && customer.bookings > 0;

    return matchesSearch;
  });

  // Handle menu press
  const handleMenuPress = (customer: Customer, event: any): void => {
    setSelectedCustomer(customer);
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

  // Handle menu actions
  const handleMenuAction = (action: string): void => {
    if (!selectedCustomer) return;

    switch (action) {
      case "Cancel":
        console.log("Cancel:", selectedCustomer);
        break;
      case "Block":
        console.log("Block:", selectedCustomer);
        break;
      case "View profile":
        console.log("View profile:", selectedCustomer);
        setIsViewProfile(true);
        break;
      case "Add badge":
        setApplyBatchVisible(true);
        break;
    }

    setMenuVisible(false);
  };

  // Apply badge
  const handleApplyBadge = () => {
    if (selectedCustomer && selectedBadge) {
      const badgeColors: { [key: string]: string } = {
        "Platinum VIP": "#9CA3AF",
        "Gold VIP": "#F59E0B",
        "Silver VIP": "#6B7280",
      };

      setCustomers(
        customers.map((c) =>
          c.id === selectedCustomer.id
            ? {
                ...c,
                badge: selectedBadge,
                badgeColor: badgeColors[selectedBadge] || "#3B82F6",
              }
            : c
        )
      );
    }
    setApplyBatchVisible(false);
    setBadgeDropdownVisible(false);
    setSelectedBadge("");
  };

  // Get avatar color
  const getAvatarColor = (index: number) => {
    const colors = [
      "#EF4444",
      "#F59E0B",
      "#10B981",
      "#3B82F6",
      "#8B5CF6",
      "#EC4899",
    ];
    return colors[index % colors.length];
  };

  // Get initials
  const getInitials = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <GestureHandlerRootView className="flex-1">
      <SafeAreaView
        className="flex-1 bg-white"
        edges={["top"]}
        style={{ paddingBottom: bottomBarHeight + 60, marginBottom: 10 }}
      >
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View className="bg-white px-5 py-4 border-b border-gray-100">
            <View className="flex-row items-center">
              <TouchableOpacity
                onPress={() => router.push("/(tabs)/Management")}
                className="mr-3"
              >
                <Ionicons name="arrow-back" size={24} color="#000" />
              </TouchableOpacity>
              <Text className="text-lg font-semibold text-gray-900">
                Block List
              </Text>
            </View>
          </View>

          {/* Customer List Section */}
          <View className="px-5 py-4">
            {/* Search */}
            <View className="flex-row items-center bg-gray-50 rounded-lg px-4 py-3 mb-4">
              <Ionicons name="search" size={20} color="#9CA3AF" />
              <TextInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Search customers..."
                className="flex-1 ml-2 text-sm text-gray-900"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            {/* Filter Bar */}
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-sm text-gray-600">
                Showing {filteredCustomers.length} of {totalCustomers} customers
              </Text>
            </View>

            {/* Customer List */}
            {filteredCustomers.map((customer, index) => (
              <View
                key={customer.id}
                className="bg-white border border-gray-200 rounded-xl p-4 mb-3"
              >
                <View className="flex-row items-start justify-between">
                  {/* Avatar */}
                  <View className="w-10 h-10 rounded-full items-center justify-center mr-3 overflow-hidden">
                    <Image
                      source={{
                        uri: `https://avatar.iran.liara.run/username?username=${customer.name}`,
                      }}
                      style={{ width: 40, height: 40 }}
                      resizeMode="cover"
                    />
                  </View>

                  {/* Customer Info */}
                  <View className="flex-1">
                    <View className="flex-row items-center mb-1">
                      <Text className="text-base font-semibold text-gray-900 mr-2">
                        {customer.name}
                      </Text>
                    </View>
                    <Text className="text-sm text-gray-600 mb-1">
                      {customer.email}
                    </Text>
                    <Text className="text-sm text-gray-600 mb-2">
                      {customer.phone}
                    </Text>
                    <View className="flex-row items-center">
                      <Text className="text-xs text-gray-500 mr-3">
                        {customer.bookings} bookings
                      </Text>
                      <Text className="text-xs text-gray-500 mr-3">
                        {customer.spent}
                      </Text>
                      {customer.lastVisit && (
                        <Text className="text-xs text-gray-500">
                          Last: {customer.lastVisit}
                        </Text>
                      )}
                    </View>
                  </View>

                  {/* Menu Button */}
                  <TouchableOpacity
                    ref={menuButtonRef}
                    onPress={(e) => handleMenuPress(customer, e)}
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
                className="bg-white rounded-xl shadow-2xl min-w-[160px] border border-gray-100"
                style={
                  {
                    position: "absolute",
                    top: menuPosition.top - 50,
                    right: 20,
                  } as StyleProp<ViewStyle>
                }
              >
                <TouchableOpacity
                  onPress={() => handleMenuAction("View profile")}
                  className="flex-row items-center px-4 py-3.5 border-b border-gray-100"
                >
                  <Ionicons name="person-outline" size={18} color="#374151" />
                  <Text className="text-base text-gray-900 ml-3 font-medium">
                    View profile
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleMenuAction("Block")}
                  className="flex-row items-center px-4 py-3.5 border-b border-gray-100"
                >
                  <Ionicons name="ban-outline" size={18} color="#374151" />
                  <Text className="text-base text-gray-900 ml-3 font-medium">
                    Unblock
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </Modal>
        )}

        {/* Apply Batch Modal */}
        <Modal
          transparent
          visible={applyBatchVisible}
          onRequestClose={() => setApplyBatchVisible(false)}
          animationType="fade"
        >
          <View className="flex-1 bg-black/50 items-center justify-center px-5">
            <View className="bg-white rounded-2xl p-6 w-full max-w-sm">
              <View className="flex-row items-center justify-between mb-4">
                <Text className="text-lg font-semibold text-gray-900">
                  Apply batch
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setApplyBatchVisible(false);
                    setBadgeDropdownVisible(false);
                    setSelectedBadge("");
                  }}
                >
                  <Ionicons name="close" size={24} color="#9CA3AF" />
                </TouchableOpacity>
              </View>

              <Text className="text-sm font-medium text-gray-900 mb-2">
                Badge
              </Text>
              <TouchableOpacity
                onPress={() => setBadgeDropdownVisible(!badgeDropdownVisible)}
                className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 flex-row items-center justify-between mb-2"
              >
                <Text
                  className={`text-sm ${selectedBadge ? "text-gray-900" : "text-gray-400"}`}
                >
                  {selectedBadge || "Select a badge"}
                </Text>
                <Ionicons
                  name={badgeDropdownVisible ? "chevron-up" : "chevron-down"}
                  size={20}
                  color="#6B7280"
                />
              </TouchableOpacity>

              {/* Badge Dropdown */}
              {badgeDropdownVisible && (
                <View className="bg-white border border-gray-200 rounded-lg shadow-lg mb-4 overflow-hidden">
                  {availableBadges.map((badge, index) => (
                    <TouchableOpacity
                      key={badge}
                      onPress={() => {
                        setSelectedBadge(badge);
                        setBadgeDropdownVisible(false);
                      }}
                      className={`px-4 py-3 ${
                        index !== availableBadges.length - 1
                          ? "border-b border-gray-100"
                          : ""
                      }`}
                    >
                      <Text className="text-sm text-gray-900">{badge}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              <View className="flex-row items-center justify-end mt-2">
                <TouchableOpacity
                  onPress={() => {
                    setApplyBatchVisible(false);
                    setBadgeDropdownVisible(false);
                    setSelectedBadge("");
                  }}
                  className="px-5 py-2.5 mr-2"
                >
                  <Text className="text-sm font-medium text-gray-600">
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleApplyBadge}
                  disabled={!selectedBadge}
                  className={`rounded-lg px-5 py-2.5 ${
                    selectedBadge ? "bg-gray-700" : "bg-gray-300"
                  }`}
                >
                  <Text className="text-sm font-medium text-white">Apply</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
      <CustomBottomSheet
        isOpen={isViewProfile}
        onChange={setIsViewProfile}
        snapPoints={["90%"]}
        bottomInset={bottomBarHeight}
      >
        <ProfileSheetMain />
      </CustomBottomSheet>
    </GestureHandlerRootView>
  );
};

export default BlockList;
