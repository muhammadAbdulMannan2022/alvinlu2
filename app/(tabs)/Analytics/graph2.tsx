import { Feather } from "@expo/vector-icons";
import { Text, View } from "react-native";
import ChartComponent from "./ChartComponent"; // Adjust the import path as needed

const NewChartComponent = () => {
  const data = {
    labels: ["Q1", "Q2", "Q3", "Q4"],
    datasets: [
      {
        data: [75, 78, 82, 86], // Approximate data from the image
      },
    ],
  };

  return (
    <View
      className="border bg-white mt-5"
      style={{ borderColor: "#00000020", borderRadius: 10 }}
    >
      <ChartComponent
        data={data}
        title="Customer Retention Trend - This Year"
        icon={<Feather name="users" size={24} color="black" />} // Add your icon component here if needed
      />
      <View className="flex-row justify-between px-8 md:px-12 py-5">
        <View className="items-center justify-center">
          <Text className="text-2xl font-semibold text-[#00A63E]">74%</Text>
          <Text className="text-[#717182]">This Year Rate</Text>
        </View>
        <View className="items-center justify-center">
          <Text className="text-2xl font-semibold text-[#00A63E]">+18%</Text>
          <Text className="text-[#717182]">vs Previous Period</Text>
        </View>
      </View>
    </View>
  );
};

export default NewChartComponent;
