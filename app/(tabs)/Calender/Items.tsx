// Items.tsx
import BookingsCard from "@/components/Home/BookingsCard";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Booking {
  id: number;
  status: string;
  name: string;
  image_url: string;
  service_name: string;
  service_type: string[];
  budget: number;
  time_in_min: number;
  service_img: string;
  date: string;
  start_time: string;
  end_time: string;
  note?: string;
}

interface ItemsProps {
  data: Booking[];
  selectedDate?: string | null;
  openSheet1?: any;
}

export default function Items({ data, selectedDate, openSheet1 }: ItemsProps) {
  // Log data to debug visibility
  console.log("Items data:", data);

  // Open sheet 1

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text className="text-lg font-semibold mb-4">Today's Schedule</Text>
      {data.length > 0 ? (
        data.map((item, i) => (
          <View key={i} className="mb-4">
            <BookingsCard setItemSheetOpen={openSheet1} {...item} />
          </View>
        ))
      ) : (
        <Text className="text-center text-gray-500 mt-4">
          No bookings available
        </Text>
      )}
    </SafeAreaView>
  );
}
