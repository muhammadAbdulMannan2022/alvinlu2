import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Dimensions,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

const EditTemplateModal = ({
  visible,
  onClose,
  templateKey,
  initialMessage,
  variables,
  onSave,
}: any) => {
  const [editedMessage, setEditedMessage] = useState(initialMessage);

  // Dummy data for preview
  const dummyData = {
    customer_name: "John Doe",
    service_name: "Haircut",
    date: "October 19, 2025",
    time: "2:00 PM",
    shop_name: "Style Salon",
  };

  // Function to replace variables with dummy data for preview
  const replaceVariablesWithDummyData = (message: string) => {
    let previewMessage = message;
    Object.entries(dummyData).forEach(([key, value]) => {
      previewMessage = previewMessage.replace(`{${key}}`, value);
    });
    return previewMessage;
  };

  const handleInsertVariable = (variable: any) => {
    setEditedMessage((prev: any) => prev + " " + variable);
  };

  const handleSave = () => {
    onSave(templateKey, editedMessage);
  };

  const sectionBorderStyle = {
    borderColor: "#00000020",
    borderWidth: 1,
    borderRadius: 10,
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 items-center justify-center">
        <View
          className="bg-white rounded-2xl p-4"
          style={{
            width: width * 0.8,
            height: height * 0.7,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 5,
            ...sectionBorderStyle,
          }}
        >
          {/* Modal Header */}
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-lg font-semibold text-gray-900">
              Edit Message Template
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <Text className="text-sm text-gray-600 mb-4">
              Customize your message template
            </Text>

            {/* Quick Insert Variables */}
            <Text className="text-sm font-semibold text-gray-900 mb-3">
              Quick Insert Variables
            </Text>
            <View className="flex-row flex-wrap gap-2 mb-4">
              {variables.map((variable: any, index: number) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleInsertVariable(variable)}
                  className="bg-gray-100 px-3 py-2 rounded-lg"
                >
                  <Text className="text-sm text-gray-700">{variable}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Message Input */}
            <Text className="text-sm font-semibold text-gray-900 mb-2">
              Message (max 500 characters)
            </Text>
            <View
              className="bg-gray-50 rounded-lg p-4 mb-2"
              style={sectionBorderStyle}
            >
              <TextInput
                value={editedMessage}
                onChangeText={setEditedMessage}
                placeholder="Enter here"
                placeholderTextColor="#9CA3AF"
                multiline
                numberOfLines={6}
                maxLength={500}
                textAlignVertical="top"
                className="text-sm text-gray-900 min-h-[120px]"
              />
            </View>
            <Text className="text-xs text-gray-500 text-right mb-4">
              {editedMessage.length}/500 characters
            </Text>

            {/* Preview */}
            <Text className="text-sm font-semibold text-gray-900 mb-2">
              Preview
            </Text>
            <View
              className="bg-gray-50 rounded-lg p-4 min-h-[120px]"
              style={sectionBorderStyle}
            >
              <Text className="text-sm text-gray-900 leading-5">
                {replaceVariablesWithDummyData(editedMessage) ||
                  "Preview will appear here..."}
              </Text>
            </View>
          </ScrollView>

          {/* Modal Footer */}
          <View className="flex-row gap-3 mt-4">
            <TouchableOpacity
              onPress={onClose}
              className="flex-1 bg-white border border-gray-300 rounded-lg py-3"
            >
              <Text className="text-center font-medium text-gray-900">
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSave}
              className="flex-1 bg-black rounded-lg py-3"
            >
              <Text className="text-center font-medium text-white">
                Save Template
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EditTemplateModal;
