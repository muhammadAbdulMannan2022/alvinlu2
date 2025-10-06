import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function LateSheet({ setIsLateOpen }: any) {
  const [customMinutes, setCustomMinutes] = useState("");

  const handleMinuteSelect = (minutes: any) => {
    setCustomMinutes(minutes.toString());
  };

  return (
    <View className="p-4 bg-white rounded-lg justify-between h-full">
      <View>
        <Text className="text-gray-500 text-sm mb-2">Mark as Late</Text>
        <Text className="text-gray-700 mb-4">
          How many minutes late was the customer?
        </Text>

        <View className="flex-row flex-wrap gap-2 mb-4">
          {[5, 10, 15, 20, 30, 45].map((minutes) => (
            <TouchableOpacity
              key={minutes}
              onPress={() => handleMinuteSelect(minutes)}
              className={`px-4 py-2 rounded-full ${customMinutes === minutes.toString() ? "bg-black" : "bg-gray-300"}`}
            >
              <Text
                className={`text-center ${customMinutes === minutes.toString() ? "text-white" : "text-gray-700"}`}
              >
                {minutes}min
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View className="mb-4">
          <Text className="text-gray-700 mr-2 mb-2 text-lg font-bold">
            Custom Minutes
          </Text>
          <View className="flex-1">
            <TextInput
              className="border border-gray-300 rounded p-2"
              value={customMinutes}
              onChangeText={setCustomMinutes}
              keyboardType="numeric"
              placeholder="5"
            />
          </View>
        </View>
      </View>

      <View className="flex-row justify-between mt-16 md:mt-20 gap-3">
        <TouchableOpacity
          onPress={() => setIsLateOpen(false)}
          className="px-4 py-2 items-center justify-center bg-gray-200 flex-1"
          style={{ borderRadius: 8 }}
        >
          <Text className="text-gray-700">Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsLateOpen(false)}
          className="px-4 py-2 items-center justify-center bg-black flex-1"
          style={{ borderRadius: 8 }}
        >
          <Text className="text-white">Apply Adjustment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
