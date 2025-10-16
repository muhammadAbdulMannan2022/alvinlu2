import ProfileSheetMain from "@/components/Home/Sheets/Profiles/ProfileSheetMain";
import CustomBottomSheet from "@/components/ReuseableBottomSheets/CustomBottomSheet";
import { Ionicons } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
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

interface BlockedNumber {
  id: string;
  number: string;
  blockingTime: string;
  blockingDate: string;
}

interface MenuPosition {
  top: number;
  left: number;
}

const BlockListScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isViewProfile, setIsViewProfile] = useState(false);
  const [blockedNumbers, setBlockedNumbers] = useState<BlockedNumber[]>([
    {
      id: "1",
      number: "8801775551325",
      blockingTime: "90:30AM",
      blockingDate: "2, July, 2025",
    },
    {
      id: "2",
      number: "8801775551325",
      blockingTime: "90:30AM",
      blockingDate: "2, July, 2025",
    },
    {
      id: "3",
      number: "8801775551325",
      blockingTime: "90:30AM",
      blockingDate: "2, July, 2025",
    },
    {
      id: "4",
      number: "8801775551325",
      blockingTime: "90:30AM",
      blockingDate: "2, July, 2025",
    },
    {
      id: "5",
      number: "8801775551325",
      blockingTime: "90:30AM",
      blockingDate: "2, July, 2025",
    },
    {
      id: "6",
      number: "8801775551325",
      blockingTime: "90:30AM",
      blockingDate: "2, July, 2025",
    },
    {
      id: "7",
      number: "8801775551325",
      blockingTime: "90:30AM",
      blockingDate: "2, July, 2025",
    },
    {
      id: "8",
      number: "8801775551325",
      blockingTime: "90:30AM",
      blockingDate: "2, July, 2025",
    },
    {
      id: "9",
      number: "8801775551325",
      blockingTime: "90:30AM",
      blockingDate: "2, July, 2025",
    },
    {
      id: "10",
      number: "8801775551325",
      blockingTime: "90:30AM",
      blockingDate: "2, July, 2025",
    },
    {
      id: "11",
      number: "8801775551325",
      blockingTime: "90:30AM",
      blockingDate: "2, July, 2025",
    },
    {
      id: "12",
      number: "8801775551325",
      blockingTime: "90:30AM",
      blockingDate: "2, July, 2025",
    },
  ]);

  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState<BlockedNumber | null>(
    null
  );
  const [menuPosition, setMenuPosition] = useState<MenuPosition>({
    top: 0,
    left: 0,
  });
  // @ts-ignore
  const menuButtonRef = useRef<TouchableOpacity>(null);
  const router = useRouter();
  const bottomBarHeight = useBottomTabBarHeight();

  // Filter blocked numbers based on search
  const filteredNumbers = blockedNumbers.filter((item) =>
    item.number.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle menu press
  const handleMenuPress = (blockedNumber: BlockedNumber, event: any): void => {
    setSelectedNumber(blockedNumber);
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

  // Handle menu actions
  const handleMenuAction = (action: string): void => {
    if (!selectedNumber) return;

    switch (action) {
      case "View profile":
        console.log("View profile:", selectedNumber);
        setIsViewProfile(true);
        break;
      case "Unblock":
        setBlockedNumbers(
          blockedNumbers.filter((num) => num.id !== selectedNumber.id)
        );
        break;
      case "Delete":
        setBlockedNumbers(
          blockedNumbers.filter((num) => num.id !== selectedNumber.id)
        );
        break;
    }

    setMenuVisible(false);
  };

  return (
    <GestureHandlerRootView className="flex-1">
      <SafeAreaView
        className="flex-1 bg-white"
        style={{ paddingBottom: bottomBarHeight + 70 }}
      >
        {/* Header */}
        <View className="bg-white px-5 py-4 border-b border-gray-100">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <TouchableOpacity
                onPress={() => router.push("/(tabs)/Management/inxex")}
                className="mr-3"
              >
                <Ionicons name="arrow-back" size={24} color="#000" />
              </TouchableOpacity>
              <Text className="text-lg font-semibold text-gray-900">
                Block List
              </Text>
            </View>
          </View>
        </View>

        {/* Add Button and Search */}
        <View className="px-5 py-4 bg-white border-b border-gray-100">
          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-1  flex-row items-center bg-gray-100 rounded-lg px-4 py-2">
              <TextInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Search number"
                className="flex-1 text-sm text-gray-900"
                placeholderTextColor="#9CA3AF"
              />
              <Ionicons name="search" size={20} color="#6B7280" />
            </View>
          </View>
        </View>

        {/* Table Header */}
        <View className="flex-row items-center mx-3 px-5 py-3 bg-gray-50 border-b border-gray-200">
          <Text className="flex-1 text-xs font-semibold text-gray-700">
            Number or{"\n"}mail
          </Text>
          <Text className="flex-1 text-xs font-semibold text-gray-700 text-center">
            Blocking{"\n"}Time
          </Text>
          <Text className="flex-1 text-xs font-semibold text-gray-700 text-right">
            Action
          </Text>
        </View>

        {/* Blocked Numbers List */}
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {filteredNumbers.map((item) => (
            <View
              key={item.id}
              className="flex-row items-center px-5 py-4 border-b border-gray-100"
            >
              {/* Number */}
              <View className="flex-1">
                <Text className="text-sm text-gray-900">{item.number}</Text>
              </View>

              {/* Blocking Time */}
              <View className="flex-1 items-center">
                <Text className="text-sm text-gray-900">
                  {item.blockingDate}
                </Text>
                <Text className="text-xs text-gray-600 mt-0.5">
                  {item.blockingTime}
                </Text>
              </View>

              {/* Action Menu */}
              <View className="flex-1 items-end">
                <TouchableOpacity
                  ref={menuButtonRef}
                  onPress={(e) => handleMenuPress(item, e)}
                  className="p-1"
                >
                  <Ionicons
                    name="ellipsis-horizontal"
                    size={20}
                    color="#6B7280"
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Context Menu Modal */}
        {menuVisible && selectedNumber && (
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
                    right: 20,
                  } as StyleProp<ViewStyle>
                }
              >
                <TouchableOpacity
                  onPress={() => handleMenuAction("View profile")}
                  className="flex-row items-center px-4 py-3.5 border-b border-gray-100"
                >
                  <Ionicons name="eye-outline" size={18} color="#374151" />
                  <Text className="text-base text-gray-900 ml-3 font-medium">
                    View profile
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleMenuAction("Unblock")}
                  className="flex-row items-center px-4 py-3.5 border-b border-gray-100"
                >
                  <Ionicons
                    name="lock-open-outline"
                    size={18}
                    color="#374151"
                  />
                  <Text className="text-base text-gray-900 ml-3 font-medium">
                    Unblock
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

export default BlockListScreen;
