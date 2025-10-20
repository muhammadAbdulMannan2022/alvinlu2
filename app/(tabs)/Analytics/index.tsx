import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useEffect, useState } from "react"; // Added useEffect
import { Dimensions, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ChartComponent from "./ChartComponent";
import DateRangeModal from "./DateRangeModal";
import TabSelector from "./Services";
import StatCard from "./StatCard";
import TabNavigator from "./TabNavigator";
import TopReturningCustomers from "./TopReturningCustomers";
import NewChartComponent from "./graph2";

const screenWidth = Dimensions.get("window").width;

export default function AnalyticsDashboard() {
  const [activeTab, setActiveTab] = useState("This Year");
  const bottomBarHeight = useBottomTabBarHeight();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRange, setSelectedRange] = useState({
    start: new Date(),
    end: new Date(),
  });

  // Effect to open/close modal based on activeTab
  useEffect(() => {
    if (activeTab === "Custom Date") {
      setModalVisible(true);
    } else {
      setModalVisible(false);
    }
  }, [activeTab]); // Re-run when activeTab changes

  const handleApply = (start: Date, end: Date) => {
    setSelectedRange({ start, end });
    console.log(
      "Selected range:",
      start.toDateString(),
      "to",
      end.toDateString()
    );
    // Do something with the dates, e.g., filter data
  };

  const tabs = [
    "This Month",
    "Last Month",
    "Last 3 Months",
    "This Year",
    "Custom Date",
  ];

  const statsData = [
    {
      title: "Customer Count",
      value: "425",
      change: "+18% vs previous month",
      trend: "up",
      iconBg: "bg-blue-100",
      icon: <Ionicons name="people" size={20} color="#3b82f6" />,
    },
    {
      title: "Cancellations",
      value: "65",
      change: "-4% vs previous month",
      trend: "down",
      iconBg: "bg-red-100",
      icon: (
        <MaterialCommunityIcons name="close-circle" size={20} color="#ef4444" />
      ),
    },
    {
      title: "Late Arrivals",
      value: "85",
      change: "+4% vs previous month",
      trend: "up",
      iconBg: "bg-orange-100",
      icon: <MaterialCommunityIcons name="alert" size={20} color="#f97316" />,
    },
    {
      title: "Return Rate",
      value: "74%",
      change: "+15% vs previous month",
      trend: "up",
      iconBg: "bg-green-100",
      icon: <MaterialCommunityIcons name="refresh" size={20} color="#10b981" />,
    },
    // {
    //   title: "Gross Revenue",
    //   value: "¥1,485,000",
    //   change: "+20% vs previous month",
    //   trend: "up",
    //   iconBg: "bg-purple-100",
    //   icon: (
    //     <MaterialCommunityIcons name="currency-jpy" size={20} color="#a855f7" />
    //   ),
    // },
    // {
    //   title: "Net Revenue",
    //   value: "¥1,254,800",
    //   change: "+18% vs previous month",
    //   trend: "up",
    //   iconBg: "bg-green-100",
    //   icon: (
    //     <MaterialCommunityIcons name="trending-up" size={20} color="#10b981" />
    //   ),
    // },
    {
      title: "Gross Commission",
      value: "¥1,485,000",
      change: "+18% vs previous month",
      trend: "up",
      iconBg: "bg-purple-100",
      icon: (
        <MaterialCommunityIcons
          name="cash-multiple"
          size={20}
          color="#a855f7"
        />
      ),
    },
    {
      title: "Net Commission",
      value: "¥1,254,800",
      change: "+18% vs previous month",
      trend: "up",
      iconBg: "bg-green-100",
      icon: (
        <MaterialCommunityIcons name="cash-check" size={20} color="#10b981" />
      ),
    },
  ];

  const chartData = {
    labels: ["Q1", "Q2", "Q3", "Q4"],
    datasets: [
      {
        data: [15000, 18000, 19500, 13000],
        color: (opacity = 1) => `rgba(99, 102, 241, ${opacity})`,
        strokeWidth: 3,
      },
    ],
  };

  return (
    <SafeAreaView
      className="flex-1 bg-white"
      style={{ paddingBottom: bottomBarHeight + 60 }}
    >
      <ScrollView className="flex-1">
        <View className="px-4 pt-4 pb-6">
          <Text className="text-2xl font-bold text-gray-900 mb-6">
            Analytics
          </Text>

          {/* Tabs */}
          <TabNavigator
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          <Text className="text-lg font-semibold text-gray-900 mb-1">
            This Year Business Overview
          </Text>
          <Text className="text-sm text-gray-500 mb-4">
            2024 annual performance
          </Text>

          {/* Stats Grid */}
          <View className="flex-row flex-wrap justify-between">
            {statsData.map((stat, index) => (
              <View key={index} className="w-[48%] mb-3">
                <StatCard {...stat} />
              </View>
            ))}
          </View>

          {/* Revenue Chart */}
          <ChartComponent
            data={chartData}
            title="Revenue Trend - This Year"
            icon={
              <MaterialCommunityIcons
                name="chart-line"
                size={20}
                color="#000"
              />
            }
            styles="border"
          />
          {/* Tabs with Conditional Rendering */}
          <TabSelector />
          {/* Top Returning Customers */}
          <TopReturningCustomers />
          {/* new chart */}
          <NewChartComponent />

          {/* Custom Date Modal */}
          <DateRangeModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            onApply={handleApply}
            initialStartDate={selectedRange.start}
            initialEndDate={selectedRange.end}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
