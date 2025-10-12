import EditTimeOfBooking from "@/components/Home/Sheets/EditTiime";
import LateSheet from "@/components/Home/Sheets/LateSheet";
import PaymentComplete from "@/components/Home/Sheets/PaymentComplete";
import ProfileSheetMain from "@/components/Home/Sheets/Profiles/ProfileSheetMain";
import Sheet1 from "@/components/Home/Sheets/Sheet1";
import CustomBottomSheet from "@/components/ReuseableBottomSheets/CustomBottomSheet";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Calendar, CalendarProps } from "react-native-calendars";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Items from "./Items";

// Define interfaces for type safety
interface Booking {
  time: string;
  id: number;
  note?: string;
}
interface BookingData {
  [date: string]: Booking[];
}
interface Stat {
  value: number;
  label: string;
}
interface DayComponentProps {
  date: {
    dateString: string;
    day: number;
    month: number;
    year: number;
    timestamp: number;
  };
  state: "disabled" | "today" | "selected" | "";
}

export default function BookingCalendar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLateOpen, setIsLateOpen] = useState<boolean>(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState<boolean>(false);
  const [isEditBookingOpen, setIsEditBookingOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);

  const openSheet1 = (id: string | number) => {
    setIsOpen(true);
    console.log(id);
  };

  // sheets state
  const [currentDate, setCurrentDate] = useState<string>("2025-09-01");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const bottomBarHeight = useBottomTabBarHeight();
  const [data, setData] = useState([
    {
      id: 1,
      status: "Not Arrived",
      name: "Emma Chen",
      image_url:
        "https://ui-avatars.com/api/?name=Emma+Chen&size=64&rounded=true&background=51A2FF&color=fff",
      service_name: "Classic French",
      service_type: ["In-house Gel Removal"],
      budget: 4800,
      time_in_min: 90,
      service_img:
        "https://i.ibb.co.com/DHBNkpHp/pngtree-tropical-floral-nail-art-with-palm-leaves-summer-manicure-image-16122188.jpg",
      date: "2025-10-04",
      start_time: "10:00 AM",
      end_time: "11:30 AM",
      note: "Hello",
    },
    {
      id: 2,
      status: "Completed",
      name: "Liam Smith",
      image_url:
        "https://ui-avatars.com/api/?name=Liam+Smith&size=64&rounded=true&background=51A2FF&color=fff",
      service_name: "Gel Manicure",
      service_type: ["Nail Art"],
      budget: 3500,
      time_in_min: 60,
      service_img: "https://i.ibb.co.com/FkBGTddc/2t8d20a.jpg",
      date: "2025-10-04",
      start_time: "12:00 PM",
      end_time: "1:00 PM",
    },
    {
      id: 3,
      status: "In Progress",
      name: "Olivia Brown",
      image_url:
        "https://ui-avatars.com/api/?name=Olivia+Brown&size=64&rounded=true&background=51A2FF&color=fff",
      service_name: "Spa Pedicure",
      service_type: ["Foot Massage"],
      budget: 4000,
      time_in_min: 75,
      service_img:
        "https://i.ibb.co.com/PZDCNtr5/360-F-708668852-JNk0h-Ecikv-Vv-ZOU5-GLn47-Xx1-Uw-Zmhm-XG.jpg",
      date: "2025-10-05",
      start_time: "2:00 PM",
      end_time: "3:15 PM",
    },
    {
      id: 4,
      status: "Completed",
      name: "Noah Davis",
      image_url:
        "https://ui-avatars.com/api/?name=Noah+Davis&size=64&rounded=true&background=51A2FF&color=fff",
      service_name: "Acrylic Nails",
      service_type: ["Nail Extension"],
      budget: 5000,
      time_in_min: 120,
      service_img:
        "https://i.ibb.co.com/DHBNkpHp/pngtree-tropical-floral-nail-art-with-palm-leaves-summer-manicure-image-16122188.jpg",
      date: "2025-10-05",
      start_time: "4:00 PM",
      end_time: "6:00 PM",
    },
    {
      id: 5,
      status: "Cancelled",
      name: "Sophia Lee",
      image_url:
        "https://ui-avatars.com/api/?name=Sophia+Lee&size=64&rounded=true&background=51A2FF&color=fff",
      service_name: "French Tips",
      service_type: ["Gel Polish"],
      budget: 3200,
      time_in_min: 50,
      service_img: "https://i.ibb.co.com/FkBGTddc/2t8d20a.jpg",
      date: "2025-10-03",
      start_time: "9:00 AM",
      end_time: "9:50 AM",
    },
    {
      id: 6,
      status: "Not Arrived",
      name: "Mason Wilson",
      image_url:
        "https://ui-avatars.com/api/?name=Mason+Wilson&size=64&rounded=true&background=51A2FF&color=fff",
      service_name: "Nail Repair",
      service_type: ["Basic Maintenance"],
      budget: 2000,
      time_in_min: 30,
      service_img:
        "https://i.ibb.co.com/PZDCNtr5/360-F-708668852-JNk0h-Ecikv-Vv-ZOU5-GLn47-Xx1-Uw-Zmhm-XG.jpg",
      date: "2025-10-02",
      start_time: "11:00 AM",
      end_time: "11:30 AM",
    },
    {
      id: 7,
      status: "Completed",
      name: "Isabella Taylor",
      image_url:
        "https://ui-avatars.com/api/?name=Isabella+Taylor&size=64&rounded=true&background=51A2FF&color=fff",
      service_name: "Luxury Manicure",
      service_type: ["Hand Massage", "Gel Polish"],
      budget: 4500,
      time_in_min: 90,
      service_img: "https://i.ibb.co.com/FkBGTddc/2t8d20a.jpg",
      date: "2025-10-02",
      start_time: "1:00 PM",
      end_time: "2:30 PM",
    },
  ]);

  // Sample booking data
  const bookingData: BookingData = {
    "2025-09-25": [
      { time: "09:00", id: 1, note: "123" },
      { time: "11:00", id: 2 },
      { time: "14:00", id: 3 },
      { time: "16:30", id: 4, note: "456" },
      { time: "19:00", id: 5 },
    ],
    "2025-09-26": [
      { time: "10:00", id: 6 },
      { time: "13:00", id: 7 },
      { time: "15:30", id: 8 },
    ],
  };

  // Stats data
  const stats: Stat[] = [
    { value: 7, label: "Total Booked" },
    { value: 3, label: "New Clients" },
    { value: 4, label: "Returning" },
  ];

  // Get current month/year for display
  const getMonthYear = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  // Navigate months
  const handlePrevMonth = (): void => {
    const date = new Date(currentDate);
    date.setMonth(date.getMonth() - 1);
    date.setDate(1); // Set to first day of the month
    setCurrentDate(date.toISOString().split("T")[0]);
  };

  const handleNextMonth = (): void => {
    const date = new Date(currentDate);
    date.setMonth(date.getMonth() + 1);
    date.setDate(1); // Set to first day of the month
    setCurrentDate(date.toISOString().split("T")[0]);
  };

  // Handle day press
  const handleDayPress = (day: { dateString: string }): void => {
    const datesHasBookings = Object.keys(bookingData);
    if (datesHasBookings.includes(day.dateString)) {
      console.log(datesHasBookings.includes(day.dateString));

      setSelectedDate(day.dateString);
    }
    console.log(day.dateString);
  };

  // Create marked dates object
  const markedDates: CalendarProps["markedDates"] = {};
  Object.keys(bookingData).forEach((date) => {
    markedDates[date] = {
      marked: true,
      dotColor: "#4F46E5",
      selected: selectedDate === date,
      selectedColor: "#4F46E5",
      selectedTextColor: "#ffffff",
    };
  });
  if (selectedDate && !markedDates[selectedDate]) {
    markedDates[selectedDate] = {
      selected: true,
      selectedColor: "#4F46E5",
      selectedTextColor: "#ffffff",
    };
  }

  // Custom day component
  const DayComponent: React.FC<DayComponentProps> = ({ date, state }) => {
    const dateString = date.dateString;
    const bookings = bookingData[dateString];
    const isDisabled = state === "disabled";
    const isToday = state === "today";
    const isSelected = selectedDate === dateString;

    return (
      <TouchableOpacity
        onPress={() => handleDayPress({ dateString })}
        disabled={isDisabled}
        className="flex-1 items-center py-1"
      >
        <View
          className={`w-8 h-8 items-center justify-center rounded-full ${
            isSelected ? "bg-blue-500" : isToday ? "bg-blue-600" : ""
          }`}
        >
          <Text
            className={`text-base font-medium ${
              isDisabled
                ? "text-gray-300"
                : isSelected || isToday
                  ? "text-white"
                  : "text-black"
            }`}
          >
            {date.day}
          </Text>
        </View>

        {bookings && bookings.length > 0 && (
          <View className="mt-1 w-full px-1">
            {bookings.map((booking) => (
              <View
                key={booking.id}
                className="mb-0.5 flex-row items-center gap-1"
              >
                <Text className="text-xs text-gray-700 text-center">
                  {booking.time}
                </Text>
                {booking.note && <View className="w-1.5 h-1.5 bg-yellow-300" />}
              </View>
            ))}
          </View>
        )}

        {bookings && bookings.length > 0 && (
          <View className="absolute top-1 right-1 w-1 h-1 rounded-full bg-blue-600" />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView className="flex-1 bg-white">
        <SafeAreaView
          className="px-4"
          style={{ marginBottom: bottomBarHeight + 70 }}
        >
          <View className="flex-row items-center justify-between mb-5">
            <Text className="text-xl lg:text-2xl font-bold">Calendar</Text>
            <TouchableOpacity
              className="flex-row items-center gap-3 border px-2 py-1.5"
              style={{ borderColor: "#00000030", borderRadius: 8 }}
            >
              <Entypo name="plus" size={24} color="black" />
              <Text className="font-semibold">New Booking</Text>
            </TouchableOpacity>
          </View>
          {/* calender controles */}
          <View className="">
            {/* Custom header with navigation */}
            <View className="flex-row items-center justify-between mb-6">
              <TouchableOpacity
                onPress={handlePrevMonth}
                className="w-10 h-10 items-center justify-center"
              >
                <Ionicons name="chevron-back" size={24} color="#000" />
              </TouchableOpacity>

              <Text className="text-xl font-semibold">
                {getMonthYear(currentDate)}
              </Text>

              <TouchableOpacity
                onPress={handleNextMonth}
                className="w-10 h-10 items-center justify-center"
              >
                <Ionicons name="chevron-forward" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            {/* Stats cards */}
            <View className="flex-row mb-6 gap-3">
              {stats.map((stat, index) => (
                <View
                  key={index}
                  className="flex-1 bg-gray-50 rounded-2xl p-4 items-center"
                >
                  <Text className="text-2xl font-bold text-black mb-1">
                    {stat.value}
                  </Text>
                  <Text className="text-xs text-gray-500 text-center">
                    {stat.label}
                  </Text>
                </View>
              ))}
            </View>

            {/* Calendar */}
            <View className="bg-white rounded-2xl overflow-hidden border border-gray-100 min-h-[400px]">
              <Calendar
                key={currentDate}
                current={currentDate}
                monthFormat={"yyyy-MM"}
                onDayPress={handleDayPress}
                markedDates={markedDates}
                theme={{
                  backgroundColor: "#ffffff",
                  calendarBackground: "#ffffff",
                  textSectionTitleColor: "#000000",
                  selectedDayBackgroundColor: "#000000",
                  selectedDayTextColor: "#ffffff",
                  todayTextColor: "#ffffff",
                  todayBackgroundColor: "#4F46E5",
                  dayTextColor: "#000000",
                  textDisabledColor: "#D1D5DB",
                  monthTextColor: "#000000",
                  textMonthFontWeight: "600",
                  textDayFontSize: 16,
                  textMonthFontSize: 18,
                  textDayHeaderFontSize: 13,
                  "stylesheet.calendar.header": {
                    header: {
                      height: 0, // Hide default header
                      opacity: 0,
                    },
                    week: {
                      marginTop: 5,
                      flexDirection: "row",
                      justifyContent: "space-around",
                      backgroundColor: "#F9FAFB",
                      color: "#000000",
                      borderRadius: 12,
                      padding: 8,
                    },
                  },
                }}
                dayComponent={DayComponent}
                enableSwipeMonths={true}
                hideArrows={true}
                hideExtraDays={false}
                style={{
                  paddingBottom: 10,
                }}
                onMonthChange={(month) => {
                  setCurrentDate(
                    `${month.year}-${month.month.toString().padStart(2, "0")}-01`
                  );
                }}
              />
            </View>
          </View>
          {/* items */}
          <Items openSheet1={openSheet1} data={data} />
        </SafeAreaView>
      </ScrollView>
      {/* sheets */}

      {/* sheet 1 */}
      <CustomBottomSheet
        isOpen={isOpen}
        onChange={setIsOpen}
        snapPoints={["90%"]}
        bottomInset={bottomBarHeight}
      >
        <Sheet1
          setIsOpen={setIsOpen}
          openLate={setIsLateOpen}
          setIsPaymentOpen={setIsPaymentOpen}
          setIsEditBookingOpen={setIsEditBookingOpen}
          setIsProfileOpen={setIsProfileOpen}
        />
      </CustomBottomSheet>

      {/* sheet 2 for late late */}
      <CustomBottomSheet
        isOpen={isLateOpen}
        onChange={setIsLateOpen}
        snapPoints={["50%"]}
        bottomInset={bottomBarHeight}
      >
        <LateSheet setIsLateOpen={setIsLateOpen} />
      </CustomBottomSheet>
      {/* payment sheet */}
      <CustomBottomSheet
        isOpen={isPaymentOpen}
        onChange={setIsPaymentOpen}
        snapPoints={["90%"]}
        bottomInset={bottomBarHeight}
      >
        <PaymentComplete setIsPaymentOpen={setIsPaymentOpen} />
      </CustomBottomSheet>
      <CustomBottomSheet
        isOpen={isEditBookingOpen}
        onChange={setIsEditBookingOpen}
        snapPoints={["90%"]}
        bottomInset={bottomBarHeight}
      >
        <EditTimeOfBooking setIsEditBookingOpen={setIsEditBookingOpen} />
      </CustomBottomSheet>
      {/* profile sheet */}
      <CustomBottomSheet
        isOpen={isProfileOpen}
        onChange={setIsProfileOpen}
        snapPoints={["90%"]}
        bottomInset={bottomBarHeight}
      >
        <ProfileSheetMain />
      </CustomBottomSheet>
    </GestureHandlerRootView>
  );
}
