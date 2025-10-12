import { shadowStyle } from "@/constants/shadow";
import { Ionicons } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, View } from "react-native";

const notificationsData = [
  {
    id: 1,
    name: "Emma",
    avatar:
      "https://ui-avatars.com/api/?name=Emma&size=64&rounded=true&background=F4C430&color=fff",
    status: "confirmed",
    message: "Confirmed tomorrow 2:00 PM",
    service: "Gel Manicure",
    time: "2h",
  },
  {
    id: 2,
    name: "Sophia",
    avatar:
      "https://ui-avatars.com/api/?name=Sophia&size=64&rounded=true&background=4FC3F7&color=fff",
    status: "cancelled",
    message: "Cancelled Jan 9 appointment",
    service: "Nail Art",
    time: "3h",
  },
  {
    id: 3,
    name: "Olivia",
    avatar:
      "https://ui-avatars.com/api/?name=Olivia&size=64&rounded=true&background=5C9CFF&color=fff",
    status: "reminder",
    message: "Reminder sent",
    service: "French Manicure",
    time: "5h",
  },
  {
    id: 4,
    name: "Ava",
    avatar:
      "https://ui-avatars.com/api/?name=Ava&size=64&rounded=true&background=FF8A65&color=fff",
    status: "confirmed",
    message: "Confirmed for Monday 11:30 AM",
    service: "Pedicure",
    time: "1h",
  },
  {
    id: 5,
    name: "Isabella",
    avatar:
      "https://ui-avatars.com/api/?name=Isabella&size=64&rounded=true&background=9575CD&color=fff",
    status: "pending",
    message: "Awaiting confirmation for Jan 14",
    service: "Nail Extension",
    time: "4h",
  },
  {
    id: 6,
    name: "Mia",
    avatar:
      "https://ui-avatars.com/api/?name=Mia&size=64&rounded=true&background=4DB6AC&color=fff",
    status: "cancelled",
    message: "Cancelled by client",
    service: "Classic Manicure",
    time: "6h",
  },
  {
    id: 7,
    name: "Charlotte",
    avatar:
      "https://ui-avatars.com/api/?name=Charlotte&size=64&rounded=true&background=FFB74D&color=fff",
    status: "confirmed",
    message: "Confirmed for Friday 9:00 AM",
    service: "Gel Removal",
    time: "1d",
  },
  {
    id: 8,
    name: "Amelia",
    avatar:
      "https://ui-avatars.com/api/?name=Amelia&size=64&rounded=true&background=E57373&color=fff",
    status: "reminder",
    message: "Reminder: appointment today 3 PM",
    service: "Nail Design",
    time: "2d",
  },
  {
    id: 9,
    name: "Harper",
    avatar:
      "https://ui-avatars.com/api/?name=Harper&size=64&rounded=true&background=64B5F6&color=fff",
    status: "confirmed",
    message: "Confirmed for next Tuesday 10 AM",
    service: "Luxury Spa Pedicure",
    time: "3d",
  },
  {
    id: 10,
    name: "Evelyn",
    avatar:
      "https://ui-avatars.com/api/?name=Evelyn&size=64&rounded=true&background=81C784&color=fff",
    status: "pending",
    message: "Pending confirmation for Jan 20",
    service: "Gel Polish",
    time: "4d",
  },
];

export default function Notifications({
  setItemSheetOpen,
  setIsNotificationOpen,
}: any) {
  const getStatusIcon = (
    status: "confirmed" | "cancelled" | "reminder" | string
  ) => {
    switch (status) {
      case "confirmed":
        return <Ionicons name="checkmark" size={18} color="#4CAF50" />;
      case "cancelled":
        return <Ionicons name="close" size={18} color="#F44336" />;
      case "reminder":
        return <Ionicons name="time-outline" size={18} color="#FF9800" />;
      default:
        return null;
    }
  };

  return (
    <View className="flex-1 p-4">
      <View className="mb-5 md:mb-8">
        <View className="flex-row items-center gap-3">
          <Text className="text-xl md:text-2xl font-bold">Notifications</Text>
          <View
            className="h-8 w-8 items-center justify-center bg-[#D4183D]"
            style={{ borderRadius: 5 }}
          >
            <Text className="text-white">3</Text>
          </View>
        </View>
      </View>
      {notificationsData.map((notification) => (
        <TouchableOpacity
          key={notification.id}
          onPress={() => {
            setItemSheetOpen(true);
            setIsNotificationOpen(false);
          }}
        >
          <View
            className="flex-row bg-white rounded-xl p-4 mb-3 shadow-sm"
            style={shadowStyle}
          >
            <Image
              source={{ uri: notification.avatar }}
              className="w-12 h-12 rounded-full mr-3"
            />

            <View className="flex-1">
              <View className="flex-row justify-between items-center mb-1.5">
                <Text className="text-base font-semibold text-gray-900">
                  {notification.name}
                </Text>
                <View className="flex-row items-center">
                  <View className="w-1.5 h-1.5 rounded-full bg-pink-500 mr-1.5" />
                  <Text className="text-xs text-gray-600">
                    {notification.time}
                  </Text>
                </View>
              </View>

              <View className="flex-row items-center mb-1">
                {getStatusIcon(notification.status)}
                <Text className="text-sm md:text-base text-gray-700 ml-1.5 line-clamp-1">
                  {notification.message}
                </Text>
              </View>

              <Text className="text-xs md:text-base text-gray-600 mt-0.5">
                {notification.service}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}
