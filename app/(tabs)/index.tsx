import BookingsCard from "@/components/Home/BookingsCard";
import TopPart from "@/components/Home/TopPart";
import CustomBottomSheet from "@/components/ReuseableBottomSheets/CustomBottomSheet";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useState } from "react";
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
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
  const snapPoints = ["90%"];
  const today = new Date("2025-10-04").toISOString().split("T")[0];
  const tomorrow = new Date("2025-10-05").toISOString().split("T")[0];
  const todaysBookings = data.filter((item) => item.date === today);
  const tomorrowsBookings = data.filter((item) => item.date === tomorrow);
  const nextBookings = data.filter((item) => item.date < today);
  const bottomBarHeight = useBottomTabBarHeight();

  const openSheet1 = (id: string | number) => {
    setIsOpen(true);
    console.log(id);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView
        className="flex-1 bg-white"
        style={{ paddingBottom: bottomBarHeight - 25 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="px-4 bg-white">
            <TopPart />
          </View>

          {/* Today's bookings */}
          <View className="mt-4">
            <Text className="text-xl md:text-3xl font-bold px-4">
              Today's Bookings
            </Text>
            <FlatList
              data={todaysBookings}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <BookingsCard setItemSheetOpen={openSheet1} {...item} />
              )}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={{
                paddingVertical: 8,
                gap: 10,
                paddingHorizontal: 10,
              }}
            />
          </View>

          {/* Tomorrow's Bookings */}
          <View className="mt-4">
            <Text className="text-xl md:text-3xl font-bold px-4">
              Tomorrow's Bookings
            </Text>
            <FlatList
              data={tomorrowsBookings}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <BookingsCard setItemSheetOpen={openSheet1} {...item} />
              )}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={{
                paddingVertical: 8,
                gap: 10,
                paddingHorizontal: 10,
              }}
            />
          </View>

          {/* Next Bookings */}
          <View className="mt-4">
            <Text className="text-xl md:text-3xl font-bold px-4">
              Next Bookings
            </Text>
            <FlatList
              data={nextBookings}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <BookingsCard setItemSheetOpen={openSheet1} {...item} />
              )}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={{
                paddingVertical: 8,
                gap: 10,
                paddingHorizontal: 10,
              }}
            />
          </View>
        </ScrollView>
        {/* sheet 1 */}
        <CustomBottomSheet
          isOpen={isOpen}
          onChange={setIsOpen}
          snapPoints={snapPoints}
          bottomInset={bottomBarHeight}
        >
          <Text style={{ fontSize: 20, color: "#000" }}>Hello World</Text>
          <Text style={{ fontSize: 16, color: "#000" }}>
            This is a test to ensure visibility.
          </Text>
          <TouchableOpacity
            onPress={() => {
              setIsOpen(false);
              console.log("Closing BottomSheet");
            }}
            style={{
              padding: 10,
              backgroundColor: "#FF5555",
              borderRadius: 5,
              marginTop: 10,
            }}
          >
            <Text style={{ color: "#fff", textAlign: "center" }}>
              Close Bottom Sheet
            </Text>
          </TouchableOpacity>
        </CustomBottomSheet>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
