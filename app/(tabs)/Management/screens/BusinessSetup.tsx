import { Ionicons } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BusinessSetup() {
  const router = useRouter();
  const [companyName, setCompanyName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [notes, setNotes] = useState("");
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [cancellationsNote, setCancellationNote] = useState("");
  const [isCEditingNotes, setIsCEdingNotes] = useState(false);
  const bottomBarHeight = useBottomTabBarHeight();

  const maxNotesLength = 500;

  return (
    <SafeAreaView
      className="flex-1 bg-white"
      style={{ paddingBottom: bottomBarHeight + 60 }}
    >
      <ScrollView className="flex-1">
        {/* Header */}
        <View
          className="px-4 pt-4 pb-4 flex-row items-center bg-white border-b"
          style={{ borderColor: "#00000020" }}
        >
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/Management/inxex")}
            className="mr-3"
          >
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text className="text-xl font-semibold text-gray-900">
            Business Setup
          </Text>
        </View>

        <View className="px-4 py-6">
          {/* Business Information Card */}
          <View
            className="bg-white  p-5 mb-4 shadow-sm border"
            style={{ borderColor: "#00000020", borderRadius: 10 }}
          >
            <View className="flex-row items-center mb-3">
              <Ionicons name="location" size={20} color="#000" />
              <Text className="text-base font-semibold text-gray-900 ml-2">
                Business Information
              </Text>
            </View>

            <Text className="text-sm text-gray-500 mb-5">
              This information will be displayed to customers after booking
              confirmation
            </Text>

            {/* Company Name */}
            <View className="mb-4">
              <Text className="text-sm font-semibold text-gray-900 mb-2">
                Company Name
              </Text>
              <TextInput
                value={companyName}
                onChangeText={setCompanyName}
                placeholder="Elegant Nails Studio"
                className="bg-gray-50 rounded-xl p-4 text-base text-gray-900"
                placeholderTextColor="#9ca3af"
              />
            </View>

            {/* Address */}
            <View className="mb-4">
              <Text className="text-sm font-semibold text-gray-900 mb-2">
                Address
              </Text>
              <TextInput
                value={address}
                onChangeText={setAddress}
                placeholder="123 Beauty Street, Taipei City, Taiwan 10491"
                multiline
                numberOfLines={2}
                className="bg-gray-50 rounded-xl p-4 text-base text-gray-900"
                placeholderTextColor="#9ca3af"
              />
            </View>

            {/* Phone Number */}
            <View>
              <Text className="text-sm font-semibold text-gray-900 mb-2">
                Phone Number
              </Text>
              <TextInput
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholder="+886 2 2345 6789"
                keyboardType="phone-pad"
                className="bg-gray-50 rounded-xl p-4 text-base text-gray-900"
                placeholderTextColor="#9ca3af"
              />
            </View>
          </View>

          {/* Important Notes Card */}
          <View
            className="bg-white border p-5 mb-6 shadow-sm"
            style={{ borderColor: "#00000020", borderRadius: 10 }}
          >
            <View className="flex-row items-center justify-between mb-3">
              <View className="flex-row items-center">
                <Ionicons
                  name="document-text-outline"
                  size={24}
                  color="black"
                />
                <Text className="text-base font-semibold text-gray-900 ml-2">
                  Important Notes
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setIsEditingNotes(!isEditingNotes)}
              >
                <Text className="text-blue-500 font-medium">
                  {isEditingNotes ? "Done" : "Edit"}
                </Text>
              </TouchableOpacity>
            </View>

            <Text className="text-sm text-gray-500 mb-4">
              Additional information that customers should know after booking
            </Text>

            {/* Notes */}
            <View>
              <Text className="text-sm font-semibold text-gray-900 mb-2">
                Notes
              </Text>
              <View
                className={`rounded-xl p-4 relative ${
                  isEditingNotes ? "bg-gray-50" : "bg-gray-100"
                }`}
              >
                {isEditingNotes ? (
                  <TextInput
                    value={notes}
                    onChangeText={(text) => {
                      if (text.length <= maxNotesLength) setNotes(text);
                    }}
                    placeholder="Please arrive 10 minutes early for your appointment. For cancellations, please notify us at least 24 hours in advance. We accept cash and major credit cards. Parking is available in the building basement (B1-B3)."
                    multiline
                    numberOfLines={8}
                    textAlignVertical="top"
                    className="text-base text-gray-900 min-h-[140px]"
                    placeholderTextColor="#9ca3af"
                  />
                ) : (
                  <Text
                    className={`text-base min-h-[140px] ${
                      notes ? "text-gray-900" : "text-gray-400 italic"
                    }`}
                  >
                    {notes ||
                      "Please arrive 10 minutes early for your appointment. For cancellations, please notify us at least 24 hours in advance. We accept cash and major credit cards. Parking is available in the building basement (B1-B3)."}
                  </Text>
                )}

                {isEditingNotes && (
                  <View className="absolute bottom-3 right-3">
                    <Text className="text-xs text-gray-400">
                      {notes.length}/{maxNotesLength}
                    </Text>
                  </View>
                )}
              </View>

              <Text className="text-xs text-gray-500 mt-2">
                These notes will appear on the booking confirmation page
              </Text>
            </View>
          </View>
          {/* Cancellations Notes Card */}
          <View
            className="bg-white border p-5 mb-6 shadow-sm"
            style={{ borderColor: "#00000020", borderRadius: 10 }}
          >
            <View className="flex-row items-center justify-between mb-3">
              <View className="flex-row items-center">
                <Ionicons
                  name="document-text-outline"
                  size={24}
                  color="black"
                />
                <Text className="text-base font-semibold text-gray-900 ml-2">
                  Important Notes
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setIsCEdingNotes(!isCEditingNotes)}
              >
                <Text className="text-blue-500 font-medium">
                  {isCEditingNotes ? "Done" : "Edit"}
                </Text>
              </TouchableOpacity>
            </View>

            <Text className="text-sm text-gray-500 mb-4">
              Additional information that customers should know after booking
            </Text>

            {/* Notes */}
            <View>
              <Text className="text-sm font-semibold text-gray-900 mb-2">
                Notes
              </Text>
              <View
                className={`rounded-xl p-4 relative ${
                  isCEditingNotes ? "bg-gray-50" : "bg-gray-100"
                }`}
              >
                {isCEditingNotes ? (
                  <TextInput
                    value={cancellationsNote}
                    onChangeText={(text) => {
                      if (text.length <= maxNotesLength)
                        setCancellationNote(text);
                    }}
                    placeholder="Please arrive 10 minutes early for your appointment. For cancellations, please notify us at least 24 hours in advance. We accept cash and major credit cards. Parking is available in the building basement (B1-B3)."
                    multiline
                    numberOfLines={8}
                    textAlignVertical="top"
                    className="text-base text-gray-900 min-h-[140px]"
                    placeholderTextColor="#9ca3af"
                  />
                ) : (
                  <Text
                    className={`text-base min-h-[140px] ${
                      cancellationsNote
                        ? "text-gray-900"
                        : "text-gray-400 italic"
                    }`}
                  >
                    {cancellationsNote ||
                      "Please arrive 10 minutes early for your appointment. For cancellations, please notify us at least 24 hours in advance. We accept cash and major credit cards. Parking is available in the building basement (B1-B3)."}
                  </Text>
                )}

                {isEditingNotes && (
                  <View className="absolute bottom-3 right-3">
                    <Text className="text-xs text-gray-400">
                      {cancellationsNote.length}/{maxNotesLength}
                    </Text>
                  </View>
                )}
              </View>

              <Text className="text-xs text-gray-500 mt-2">
                These notes will appear on the booking confirmation page
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Buttons */}
      <View className="px-4 pb-6 pt-3 bg-white border-t border-gray-200">
        <View className="flex-row gap-3">
          <TouchableOpacity className="flex-1 bg-white border border-gray-300 rounded-full py-4 items-center">
            <Text className="text-gray-900 font-semibold text-base">
              Cancel
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-1 bg-gray-900 rounded-full py-4 items-center">
            <Text className="text-white font-semibold text-base">
              Save Changes
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
