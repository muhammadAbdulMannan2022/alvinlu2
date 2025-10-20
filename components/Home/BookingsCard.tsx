import { Feather, MaterialIcons } from "@expo/vector-icons";
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

interface BookingCardProp {
  id: number | string;
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
  setItemSheetOpen: ((arg0: string | number) => void) | undefined;
}

export default function BookingsCard({
  id,
  status,
  name,
  image_url,
  service_name,
  service_type,
  budget,
  time_in_min,
  service_img,
  date,
  note,
  start_time,
  end_time,
  setItemSheetOpen,
}: BookingCardProp) {
  return (
    <TouchableWithoutFeedback
      onPress={() => setItemSheetOpen && setItemSheetOpen(id)}
    >
      <View>
        <ImageBackground
          source={{ uri: service_img }}
          className=" min-h-[250] h-[250] rounded-xl overflow-hidden"
          resizeMode="cover"
        >
          {/* {console.log(service_img)} */}
          <View className={`bg-black/60 h-full w-full min-w-[300px]  p-4`}>
            <View className="flex-row justify-between mb-4">
              <View className="flex-row items-center gap-4">
                <View
                  className={`${status === "Completed" ? "bg-green-500" : "bg-[#6A7282]"} ${status === "Cancelled" && "bg-red-500"} ${status === "In Progress" && "bg-yellow-600"} px-2 py-1.5 rounded-md`}
                >
                  <Text className="text-white">{status}</Text>
                </View>
                {note && (
                  <MaterialIcons
                    name="speaker-notes"
                    size={24}
                    color="#E5C059"
                  />
                )}
              </View>
              {/* <View className="bg-white p-1.5 rounded-md">
                <Feather name="user" size={24} color="black" />
              </View> */}
            </View>
            <View className="flex-row items-center gap-3">
              <Image
                source={{ uri: image_url }}
                className="w-8 h-8 md:h-10 md:w-10"
              />
              <Text className="text-xl font-bold text-white">{name}</Text>
            </View>
            <View className="my-2">
              <Text className="text-white text-lg">
                {start_time} - {end_time}
              </Text>
            </View>
            <View className="mb-2 grow">
              <Text className="text-white text-lg font-bold">
                {service_name}
              </Text>
              <ScrollView>
                {service_type.map((sv_type, I) => (
                  <View className="flex-row items-center gap-2" key={I}>
                    <Feather name="plus" size={14} color="#CDCDCD" />
                    <Text className="text-[#CDCDCD]">{sv_type}</Text>
                  </View>
                ))}
              </ScrollView>
            </View>
            <View className="border-t pt-2" style={{ borderColor: "#fffff4" }}>
              <Text className="text-white font-bold text-lg">
                ¥{budget} • {time_in_min} min
              </Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}
