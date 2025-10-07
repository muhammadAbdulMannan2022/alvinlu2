import { Entypo, Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { Calendar } from "react-native-calendars";

const EditTimeOfBooking = ({ setIsEditBookingOpen }: any) => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [addOns, setAddOns] = useState<string[]>([]);
  const [newAddOn, setNewAddOn] = useState<string>("");

  const timeSlots: string[] = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
  ];

  const handleAddAddOn = () => {
    if (newAddOn.trim()) {
      setAddOns([...addOns, newAddOn]);
      setNewAddOn("");
    }
  };

  const handleRemoveAddOn = (index: number) => {
    setAddOns(addOns.filter((_, i) => i !== index));
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
        Date & Time
      </Text>
      <Calendar
        current={new Date().toISOString().split("T")[0]}
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={{
          [selectedDate]: {
            selected: true,
            marked: false,
            selectedColor: "black",
          },
        }}
        theme={{
          selectedDayBackgroundColor: "black",
          todayTextColor: "#00adf5",
        }}
      />
      <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 20 }}>
        Select Time
      </Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 10 }}>
        {timeSlots.map((time) => (
          <TouchableOpacity
            key={time}
            style={{
              backgroundColor: selectedTime === time ? "black" : "white",
              padding: 10,
              margin: 5,
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 5,
            }}
            onPress={() => setSelectedTime(time)}
          >
            <Text style={{ color: selectedTime === time ? "white" : "black" }}>
              {time}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 20 }}>
        Service Details
      </Text>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 10,
          marginVertical: 10,
          borderRadius: 5,
        }}
        value="Classic French"
        editable={false}
      />
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>Add-ons</Text>
      <View
        className="gap-2"
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 10,
        }}
      >
        <TextInput
          className="line-clamp-1"
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 10,
            borderRadius: 5,
          }}
          value={newAddOn}
          onChangeText={setNewAddOn}
          placeholder="Enter add-on"
        />
        <TouchableOpacity
          onPress={() => handleAddAddOn()}
          className="flex-row items-center justify-center px-4 py-2 gap-3 border  bg-black"
          style={{ borderColor: "#00000040", borderRadius: 10 }}
        >
          <Entypo name="plus" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>
      {addOns.map((item, index) => (
        <View
          key={index}
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 5,
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 10,
            borderRadius: 5,
          }}
        >
          <Text style={{ flex: 1 }}>{item}</Text>
          <TouchableOpacity onPress={() => handleRemoveAddOn(index)}>
            <Ionicons name="close-circle" size={24} color="red" />
          </TouchableOpacity>
        </View>
      ))}
      <View className="flex-row gap-4 mt-4 mb-20">
        <TouchableOpacity
          onPress={() => {
            setIsEditBookingOpen();
          }}
          className="flex-row items-center justify-center px-4 py-2 gap-3 border flex-1"
          style={{ borderColor: "#00000040", borderRadius: 10 }}
        >
          <Text className="text-base font-bold">cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setIsEditBookingOpen();
          }}
          className="flex-row items-center justify-center px-4 py-2 gap-3 border flex-1 bg-black"
          style={{ borderColor: "#00000040", borderRadius: 10 }}
        >
          <Text className="text-base font-bold text-white">Save Changes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditTimeOfBooking;
