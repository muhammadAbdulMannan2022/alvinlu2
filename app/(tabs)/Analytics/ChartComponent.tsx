import { Dimensions, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const chartConfig = {
  backgroundGradientFrom: "#ffffff",
  backgroundGradientTo: "#ffffff",
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(99, 102, 241, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(156, 163, 175, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: "5",
    strokeWidth: "2",
    stroke: "#6366f1",
  },
  propsForBackgroundLines: {
    strokeDasharray: "",
    stroke: "#e5e7eb",
    strokeWidth: 1,
  },
};

const ChartComponent = ({ data, title, icon, styles }: any) => (
  <View
    className={`bg-white p-4 mt-3 ${styles}`}
    style={{ borderRadius: 10, borderColor: "#00000020" }}
  >
    <View className="flex-row items-center mb-4">
      {icon}
      <Text className="text-lg font-semibold text-gray-900 ml-2">{title}</Text>
    </View>
    <LineChart
      data={data}
      width={screenWidth - 64}
      height={220}
      chartConfig={chartConfig}
      bezier
      style={{ marginVertical: 8, borderRadius: 16 }}
      withInnerLines={true}
      withOuterLines={false}
      withVerticalLines={false}
      withHorizontalLines={true}
      withDots={true}
      withShadow={false}
      fromZero={true}
    />
  </View>
);

export default ChartComponent;
