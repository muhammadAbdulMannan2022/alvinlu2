import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";

const StatCard = ({ title, value, change, trend, icon, iconBg }: any) => (
  <View
    className="bg-white rounded-2xl p-4 mb-3 border"
    style={{ borderRadius: 10, borderColor: "#00000010" }}
  >
    <View className="flex-row justify-between items-start mb-2">
      <Text className="text-gray-500 text-sm">{title}</Text>
      <View
        className={`${iconBg} w-10 h-10 rounded-full items-center justify-center`}
      >
        {icon}
      </View>
    </View>
    <Text className="text-2xl font-bold text-gray-900 mb-1">{value}</Text>
    <View className="flex-row items-center">
      <MaterialCommunityIcons
        name={
          trend === "up"
            ? "arrow-up"
            : trend === "down"
              ? "arrow-down"
              : "check"
        }
        size={14}
        color={
          trend === "up" ? "#10b981" : trend === "down" ? "#ef4444" : "#10b981"
        }
      />
      <Text
        className={`text-xs ml-1 ${trend === "up" ? "text-green-600" : trend === "down" ? "text-red-600" : "text-green-600"}`}
      >
        {change}
      </Text>
    </View>
  </View>
);

export default StatCard;
