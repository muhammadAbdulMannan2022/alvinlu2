import { ModalContext } from "@/app/_layout";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useContext, useEffect, useRef, useState } from "react";
import {
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface AddStoreCradittModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function AddStoreCradittModal({
  visible,
  onClose,
}: AddStoreCradittModalProps) {
  const { setIsCraditModalOpen, isAddingCredit, setIsAddingCredit } =
    useContext(ModalContext);
  //
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const inputRef = useRef<TextInput>(null);

  // Manage focus for TextInput to avoid autoFocus causing re-renders
  useEffect(() => {
    if (visible) {
      inputRef.current?.focus();
    }
  }, [visible]);

  const handleDateChange = (event: any, selectedDate: any) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      setDate(selectedDate);
      const formatted = `${String(selectedDate.getMonth() + 1).padStart(2, "0")}/${String(selectedDate.getDate()).padStart(2, "0")}/${selectedDate.getFullYear()}`;
      setExpiryDate(formatted);
    }
  };

  const handleAmountChange = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, "");
    setAmount(numericValue || "");
  };

  const handleAddCredit = () => {
    console.log("Adding credit:", { amount, description, expiryDate });
    onClose(); // Close the modal via parent
  };

  const handleCancel = () => {
    onClose(); // Close the modal via parent
  };

  return (
    <View className="bg-white rounded-2xl w-full max-w-md p-6">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-6">
        <View className="flex-row items-center">
          <Ionicons name="add" size={24} color="#000" />
          <Text className="text-xl font-semibold ml-2">Add Store Credit</Text>
        </View>
        <TouchableOpacity onPress={handleCancel}>
          <Ionicons name="close" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Credit Amount */}
      <View className="bg-gray-50 rounded-lg border border-gray-200 p-4">
        <TextInput
          className="text-3xl font-semibold"
          keyboardType="numeric"
          value={amount}
          onBlur={() => setAmount(amount + "¥")}
          onChangeText={handleAmountChange}
        />
        <Text className="text-gray-400 text-sm mt-1">
          Enter the amount of store credit to add
        </Text>
      </View>

      {/* Description */}
      <View className="mb-5">
        <Text className="text-base font-semibold mb-2">Description</Text>
        <TextInput
          className="bg-gray-50 rounded-lg px-4 py-3 text-base"
          placeholder="Reason for adding store credit"
          placeholderTextColor="#9CA3AF"
          value={description}
          onChangeText={setDescription}
          multiline={false}
        />
      </View>

      {/* Expiry Date */}
      {isAddingCredit && (
        <View className="mb-6">
          <Text className="text-base font-semibold mb-2">
            Expiry Date (Optional)
          </Text>
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            className="bg-gray-50 rounded-lg px-4 py-3 flex-row items-center justify-between"
          >
            <Text
              className={`text-base ${expiryDate ? "text-black" : "text-gray-400"}`}
            >
              {expiryDate || "mm/dd/yyyy"}
            </Text>
            <Ionicons name="calendar-outline" size={20} color="#666" />
          </TouchableOpacity>
        </View>
      )}

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleDateChange}
        />
      )}

      {/* Action Buttons */}
      <View className="flex-row gap-3">
        <TouchableOpacity
          onPress={handleCancel}
          className="flex-1 bg-white border border-gray-300 rounded-lg py-3 items-center"
        >
          <Text className="text-base font-semibold text-gray-700">Cancel</Text>
        </TouchableOpacity>
        {isAddingCredit ? (
          <TouchableOpacity
            onPress={handleAddCredit}
            className="flex-1 bg-gray-700 rounded-lg py-3 items-center"
          >
            <Text className="text-base font-semibold text-white">Confirm</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={handleAddCredit}
            className="flex-1 bg-gray-700 rounded-lg py-3 items-center"
          >
            <Text className="text-base font-semibold text-white">Confirm</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
