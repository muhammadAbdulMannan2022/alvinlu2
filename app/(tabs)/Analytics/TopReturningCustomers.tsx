import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image, Text, View } from "react-native";

interface Customer {
  id: number;
  name: string;
  visits: number;
  amount: number;
  change: number; // positive = green, negative = red
}

const customers = [
  {
    id: 1,
    name: "王小明",
    visits: 12,
    amount: 54000,
    change: 5400,
    avatar:
      "https://ui-avatars.com/api/?name=王小明&size=64&rounded=true&background=51A2FF&color=fff",
  },
  {
    id: 2,
    name: "张小强",
    visits: 8,
    amount: 33600,
    change: 3360,
    avatar:
      "https://ui-avatars.com/api/?name=张小强&size=64&rounded=true&background=51A2FF&color=fff",
  },
  {
    id: 3,
    name: "李晓晓",
    visits: 6,
    amount: 22800,
    change: 2280,
    avatar:
      "https://ui-avatars.com/api/?name=李晓晓&size=64&rounded=true&background=51A2FF&color=fff",
  },
  {
    id: 4,
    name: "陈晓红",
    visits: 4,
    amount: 15400,
    change: 1540,
    avatar:
      "https://ui-avatars.com/api/?name=陈晓红&size=64&rounded=true&background=51A2FF&color=fff",
  },
  {
    id: 5,
    name: "刘小军",
    visits: 3,
    amount: 16000,
    change: -1600,
    avatar:
      "https://ui-avatars.com/api/?name=刘小军&size=64&rounded=true&background=51A2FF&color=fff",
  },
];

const TopReturningCustomers = () => (
  <View
    className="mt-6 bg-white px-4 py-5 border"
    style={{ borderRadius: 10, borderColor: "#00000020" }}
  >
    <View className="flex-row items-center gap-4 pb-5">
      <MaterialCommunityIcons name="crown-outline" size={30} color="black" />
      <Text className="text-lg font-semibold text-gray-900 mb-2">
        Top Returning Customers - This Year
      </Text>
    </View>

    <View className="gap-2 ">
      {customers.map((customer) => (
        <View
          key={customer.id}
          className="flex-row items-center bg-[#ECECF0] rounded-2xl p-3 shadow-sm"
        >
          {/* Rank */}
          <View className="bg-purple-100 w-10 h-10 rounded-full flex items-center justify-center">
            {/* <Text className="text-purple-600 font-bold">{customer.id}</Text> */}
            <Image source={{ uri: customer.avatar }} className="h-10 w-10" />
          </View>

          {/* Info */}
          <View className="ml-3 flex-1">
            <Text className="text-gray-900">{customer.name}</Text>
            <Text className="text-sm text-gray-500">
              {customer.visits} visits - ¥{customer.amount.toLocaleString()}
            </Text>
          </View>

          {/* Change */}
          <Text
            className={`text-sm ${
              customer.change >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {customer.change >= 0 ? "+" : "-"}¥
            {Math.abs(customer.change).toLocaleString()}
          </Text>
        </View>
      ))}
    </View>
  </View>
);

export default TopReturningCustomers;
