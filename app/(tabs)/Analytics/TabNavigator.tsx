import { ScrollView, Text, TouchableOpacity } from "react-native";

const TabNavigator = ({ tabs, activeTab, setActiveTab }: any) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    className="mb-6"
  >
    {tabs.map((tab: any) => (
      <TouchableOpacity
        key={tab}
        onPress={() => setActiveTab(tab)}
        className={`px-4 py-2 rounded-full mr-2 ${activeTab === tab ? "bg-gray-900" : "bg-white"}`}
      >
        <Text
          className={`text-sm font-medium ${activeTab === tab ? "text-white" : "text-gray-600"}`}
        >
          {tab}
        </Text>
      </TouchableOpacity>
    ))}
  </ScrollView>
);

export default TabNavigator;
