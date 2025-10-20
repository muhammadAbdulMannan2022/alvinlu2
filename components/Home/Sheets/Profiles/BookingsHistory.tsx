import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

const BookingCard = ({ service, date, price, status, addon }: any) => {
  const getStatusColor = () => {
    if (status === "Completed") return "bg-green-500";
    return "bg-[#6A7282]";
  };

  return (
    <View className="mb-4 pb-4 border-b border-gray-100">
      <View className="flex-row justify-between items-start mb-2">
        <Text className="text-base font-medium flex-1 sm:text-lg md:text-xl ">
          {service}
        </Text>
        <View
          className={`px-2 py-1  ml-2 ${getStatusColor()}`}
          style={{ borderRadius: 6 }}
        >
          <Text className="text-white text-xs sm:text-sm md:text-base ">
            {status}
          </Text>
        </View>
        <Text className="text-base font-semibold ml-3 sm:text-lg md:text-xl ">
          {price}
        </Text>
      </View>
      <Text className="text-sm text-gray-500 mb-1 sm:text-base md:text-lg ">
        {date}
      </Text>
      {addon && (
        <Text className="text-xs text-gray-400 mt-1 sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
          + {addon}
        </Text>
      )}
    </View>
  );
};

export default function BookingHistory() {
  const [activeTab, setActiveTab] = useState("current");

  const currentBookings = [
    {
      id: 1,
      service: "Classic French Manicure",
      date: "2024-11-15",
      price: "¥2,500",
      status: "No Show",
      addon: "Hand Massage",
    },
    {
      id: 2,
      service: "Gel Manicure",
      date: "2024-12-15",
      price: "¥1,800",
      status: "No Show",
      addon: null,
    },
    {
      id: 3,
      service: "Nail Art Design",
      date: "2024-11-22",
      price: "¥3,200",
      status: "No Show",
      addon: "Cuticle Treatment",
    },
  ];

  const previousBookings = [
    {
      id: 1,
      service: "Basic Manicure",
      date: "2024-10-10",
      price: "¥1,500",
      status: "Completed",
      addon: null,
    },
    {
      id: 2,
      service: "Spa Pedicure",
      date: "2024-09-20",
      price: "¥2,800",
      status: "Completed",
      addon: "Foot Massage",
    },
  ];

  const bookings = activeTab === "current" ? currentBookings : previousBookings;

  return (
    <View className="flex-1 py-8 px-2">
      {/* Header */}
      <View className="flex-row items-center mb-4">
        <MaterialCommunityIcons name="calendar-clock" size={20} color="#000" />
        <Text className="text-lg font-semibold ml-2 sm:text-xl md:text-2xl ">
          Booking History (3)
        </Text>
      </View>

      {/* Tabs */}
      <View className="flex-row mb-4">
        <TouchableOpacity
          onPress={() => setActiveTab("current")}
          className="mr-6"
        >
          <Text
            className={`text-base font-medium pb-2 ${
              activeTab === "current" ? "text-purple-600" : "text-gray-600"
            } sm:text-lg md:text-xl `}
          >
            Current
          </Text>
          {activeTab === "current" && (
            <View className="h-0.5 bg-purple-600 absolute bottom-0 left-0 right-0" />
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setActiveTab("previous")}>
          <Text
            className={`text-base font-medium pb-2 ${
              activeTab === "previous" ? "text-purple-600" : "text-gray-600"
            } sm:text-lg md:text-xl `}
          >
            Previous
          </Text>
          {activeTab === "previous" && (
            <View className="h-0.5 bg-purple-600 absolute bottom-0 left-0 right-0" />
          )}
        </TouchableOpacity>
      </View>

      {/* Divider */}
      <View className="h-px bg-gray-200 mb-4" />

      {/* Booking List */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {bookings.map((booking) => (
          <BookingCard
            key={booking.id}
            service={booking.service}
            date={booking.date}
            price={booking.price}
            status={booking.status}
            addon={booking.addon}
          />
        ))}
      </ScrollView>
    </View>
  );
}
