import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import * as Clipboard from "expo-clipboard";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Share,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const BookingLinkScreen = () => {
  const router = useRouter();
  const bookingURL = "https://nailstudio.booking.com/linda-nails";
  const [copied, setCopied] = useState(false);
  const bottomBarHeight = useBottomTabBarHeight();

  const handleCopyLink = async () => {
    try {
      await Clipboard.setStringAsync(bookingURL);
      setCopied(true);
      Alert.alert("Success", "Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      Alert.alert("Error", "Failed to copy link");
    }
  };

  const handleShare = async (platform: string) => {
    try {
      let message = `Book your appointment here: ${bookingURL}`;

      const result = await Share.share({
        message: message,
        url: bookingURL,
        title: "Booking Link",
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log("Shared with activity type:", result.activityType);
        } else {
          console.log("Shared successfully");
        }
      }
    } catch (error) {
      // @ts-ignore
      Alert.alert("Error", error.message);
    }
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
              Booking Link
            </Text>
          </View>
        </View>
        {/* Services Offering URL Section */}
        <View
          className="bg-white mt-4 mx-4 p-4 border"
          style={{ borderColor: "#00000020", borderWidth: 1, borderRadius: 10 }}
        >
          <View className="flex-row items-center mb-3">
            <Ionicons name="link-outline" size={20} color="#6B7280" />
            <Text className="text-base font-semibold text-gray-900 ml-2">
              Services offering Url
            </Text>
          </View>

          <View className="bg-gray-100 rounded-lg p-4 mb-4">
            <Text className="text-sm font-medium text-gray-600 mb-2">
              Booking URL:
            </Text>
            <Text className="text-sm text-gray-900 leading-5">
              {bookingURL}
            </Text>
          </View>

          <TouchableOpacity
            onPress={handleCopyLink}
            className="bg-black rounded-lg py-3 flex-row items-center justify-center"
          >
            <Ionicons name="copy-outline" size={18} color="#FFF" />
            <Text className="text-white font-medium ml-2">
              {copied ? "Copied!" : "Copy Link"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* QR Code Section */}
        <View
          className="bg-white mt-4 mx-4 rounded-lg p-4 shadow-sm border"
          style={{ borderColor: "#00000020", borderWidth: 1, borderRadius: 10 }}
        >
          <Text className="text-base font-semibold text-gray-900 mb-2">
            QR Code
          </Text>
          <Text className="text-sm text-gray-600 mb-4">
            Customers can scan this QR code to access your booking page directly
          </Text>

          <View className="items-center py-4 ">
            <Image
              source={{
                uri:
                  "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=" +
                  encodeURIComponent(bookingURL),
              }}
              className="w-52 h-52 "
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Quick Share Section */}
        <View
          style={{
            borderColor: "#00000020",
            borderWidth: 1,
            borderRadius: 10,
          }}
          className="bg-white mt-4 mx-4  p-4 border"
        >
          <View className="flex-row items-center mb-4">
            <Ionicons name="share-outline" size={20} color="#6B7280" />
            <Text className="text-base font-semibold text-gray-900 ml-2">
              Quick Share
            </Text>
          </View>

          {/* Share to LINE */}
          <TouchableOpacity
            onPress={() => handleShare("LINE")}
            className="flex-row items-center py-3 border-b border-gray-100"
          >
            <View className="w-10 h-10 bg-green-500 rounded-full items-center justify-center mr-3">
              <FontAwesome name="comment" size={20} color="#FFF" />
            </View>
            <Text className="text-base text-gray-900">Share to LINE</Text>
          </TouchableOpacity>

          {/* Share to Facebook */}
          <TouchableOpacity
            onPress={() => handleShare("Facebook")}
            className="flex-row items-center py-3 border-b border-gray-100"
          >
            <View className="w-10 h-10 bg-blue-600 rounded-full items-center justify-center mr-3">
              <FontAwesome name="facebook" size={22} color="#FFF" />
            </View>
            <Text className="text-base text-gray-900">Share to Facebook</Text>
          </TouchableOpacity>

          {/* Share to Instagram */}
          <TouchableOpacity
            onPress={() => handleShare("Instagram")}
            className="flex-row items-center py-3"
          >
            <View
              className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full items-center justify-center mr-3"
              style={{ backgroundColor: "#E1306C" }}
            >
              <AntDesign name="instagram" size={22} color="#FFF" />
            </View>
            <Text className="text-base text-gray-900">Share to Instagram</Text>
          </TouchableOpacity>
        </View>

        {/* Usage Tips Section */}
        <View
          style={{
            borderColor: "#00000020",
            borderWidth: 1,
            borderRadius: 10,
          }}
          className="bg-white mt-4 mx-4 mb-6  p-4 border"
        >
          <Text className="text-base font-semibold text-gray-900 mb-4">
            Usage Tips
          </Text>

          <View className="space-y-3">
            <View className="flex-row">
              <View className="w-1.5 h-1.5 rounded-full bg-gray-900 mt-2 mr-3" />
              <Text className="flex-1 text-sm text-gray-700 leading-5">
                Add the booking link to your social media posts to let followers
                book directly
              </Text>
            </View>

            <View className="flex-row mt-3">
              <View className="w-1.5 h-1.5 rounded-full bg-gray-900 mt-2 mr-3" />
              <Text className="flex-1 text-sm text-gray-700 leading-5">
                Print the QR code on business cards or promotional materials
              </Text>
            </View>

            <View className="flex-row mt-3">
              <View className="w-1.5 h-1.5 rounded-full bg-gray-900 mt-2 mr-3" />
              <Text className="flex-1 text-sm text-gray-700 leading-5">
                Send the link directly to customers via LINE or other messaging
                apps
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BookingLinkScreen;
