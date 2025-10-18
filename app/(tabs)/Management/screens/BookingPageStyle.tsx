// BookingPageStyleScreen.js
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const BookingPageStyleScreen = () => {
  const router = useRouter();
  const bottomBarHeight = useBottomTabBarHeight();
  const [logoImage, setLogoImage] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);

  // Business info for preview
  const [businessName] = useState("Nail Studio");
  const [businessTagline] = useState("Professional Nail Care");

  const pickImage = async (type: any) => {
    try {
      // Request permission
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        Alert.alert(
          "Permission Required",
          "Permission to access camera roll is required!"
        );
        return;
      }

      // Pick image
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: type === "logo" ? [1, 1] : [16, 9],
        quality: 1,
      });

      if (!result.canceled) {
        if (type === "logo") {
          // @ts-ignore
          setLogoImage(result.assets[0].uri);
        } else if (type === "banner") {
          // @ts-ignore
          setBannerImage(result.assets[0].uri);
        }
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick image");
      console.error(error);
    }
  };

  const handleSaveStyle = () => {
    console.log("Saving page style...");
    Alert.alert("Success", "Logo and Page Style saved successfully!");
  };

  return (
    <SafeAreaView
      className="flex-1 bg-white"
      style={{ paddingBottom: bottomBarHeight + 60 }}
    >
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="bg-white px-4 py-4 border-b border-gray-200">
          <View className="flex-row items-center">
            <TouchableOpacity
              onPress={() => router.push("/(tabs)/Management")}
              className="mr-4"
            >
              <Ionicons name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
            <Text className="text-xl font-semibold text-gray-900">
              Booking Page Style
            </Text>
          </View>
        </View>

        {/* Logo Upload Section */}
        <View className="mt-6 mx-4">
          <View className="flex-row items-center mb-3">
            <Ionicons name="cloud-upload-outline" size={20} color="#6B7280" />
            <Text className="text-base font-semibold text-gray-900 ml-2">
              Logo Upload
            </Text>
          </View>
          <Text className="text-sm text-gray-600 mb-4">
            Upload your logo that customer can see. Recommended: Square image,
            200×200px, max 2MB
          </Text>

          {/* Upload Box */}
          <TouchableOpacity
            onPress={() => pickImage("logo")}
            className="bg-white border-2 border-dashed p-6 items-center"
            style={{ borderColor: "#D1D5DB", borderRadius: 12 }}
          >
            <View
              className="w-12 h-12 bg-gray-100 items-center justify-center mb-3"
              style={{ borderRadius: 24 }}
            >
              <Ionicons name="cloud-upload-outline" size={24} color="#6B7280" />
            </View>
            <Text className="text-sm font-medium text-gray-900 mb-1">
              Click to upload logo
            </Text>
            <Text className="text-xs text-gray-500">PNG, JPG up to 2MB</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => pickImage("logo")}
            className="mt-3 flex-row items-center justify-center py-2"
          >
            <Ionicons name="image-outline" size={18} color="#6B7280" />
            <Text className="text-sm text-gray-700 ml-2">Choose Logo File</Text>
          </TouchableOpacity>
        </View>

        {/* Background Banner Section */}
        <View className="mt-6 mx-4">
          <View className="flex-row items-center mb-3">
            <Ionicons name="image-outline" size={20} color="#6B7280" />
            <Text className="text-base font-semibold text-gray-900 ml-2">
              Background Banner (Optional)
            </Text>
          </View>
          <Text className="text-sm text-gray-600 mb-4">
            Upload a banner for additional branding Recommended: 1920×600px, max
            2MB
          </Text>

          {/* Upload Box */}
          <TouchableOpacity
            onPress={() => pickImage("banner")}
            className="bg-white border-2 border-dashed p-6 items-center"
            style={{ borderColor: "#D1D5DB", borderRadius: 12 }}
          >
            <View
              className="w-12 h-12 bg-gray-100 items-center justify-center mb-3"
              style={{ borderRadius: 24 }}
            >
              <Ionicons name="cloud-upload-outline" size={24} color="#6B7280" />
            </View>
            <Text className="text-sm font-medium text-gray-900 mb-1">
              Click to upload banner
            </Text>
            <Text className="text-xs text-gray-500">PNG, JPG up to 2MB</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => pickImage("banner")}
            className="mt-3 flex-row items-center justify-center py-2"
          >
            <Ionicons name="image-outline" size={18} color="#6B7280" />
            <Text className="text-sm text-gray-700 ml-2">
              Choose Banner File
            </Text>
          </TouchableOpacity>
        </View>

        {/* Customer View Preview Section */}
        <View className="mt-6 mx-4 mb-6">
          <View className="flex-row items-center mb-3">
            <MaterialIcons name="preview" size={20} color="#6B7280" />
            <Text className="text-base font-semibold text-gray-900 ml-2">
              Customer View Preview (Mobile)
            </Text>
          </View>
          <Text className="text-sm text-gray-600 mb-4">
            See how your logo page will appear to customers on mobile devices
          </Text>

          {/* Mobile Preview Card */}
          <View
            className="bg-white overflow-hidden border"
            style={{ borderColor: "#00000020", borderRadius: 16 }}
          >
            {/* Banner Image */}
            {bannerImage ? (
              <Image
                source={{ uri: bannerImage }}
                className="w-full h-32"
                resizeMode="cover"
              />
            ) : (
              <View className="w-full h-32 bg-pink-100" />
            )}

            {/* Content */}
            <View className="items-center pb-6 -mt-8 px-4">
              {/* Logo */}
              <View
                className="w-20 h-20 bg-pink-100 items-center justify-center mb-4 overflow-hidden border"
                style={{
                  borderRadius: 40,
                  borderColor: "#00000020",
                  borderWidth: 1,
                }}
              >
                {logoImage ? (
                  <Image
                    source={{ uri: logoImage }}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                ) : (
                  <Ionicons name="business" size={32} color="#EC4899" />
                )}
              </View>

              {/* Business Name */}
              <Text className="text-xl font-bold text-gray-900 mb-1">
                {businessName}
              </Text>
              <Text className="text-sm text-gray-600">{businessTagline}</Text>
            </View>
            {/* Action Buttons */}
            <View className="mx-4 mb-6">
              <TouchableOpacity
                onPress={handleSaveStyle}
                className="bg-green-500 py-4 items-center mb-3"
                style={{ borderRadius: 12 }}
              >
                <Text className="text-white font-semibold text-base">
                  Logo and Page
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Save Logo Page Style Button (Bottom) */}
        <View className="mx-4 mb-6">
          <TouchableOpacity
            onPress={handleSaveStyle}
            className="bg-gray-400 py-4 items-center"
            style={{ borderRadius: 12 }}
          >
            <Text className="text-white font-semibold text-base">
              Save Logo Page Style
            </Text>
          </TouchableOpacity>
          <Text className="text-center text-xs text-gray-500 mt-2">
            Upload at least one image to Save
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BookingPageStyleScreen;
