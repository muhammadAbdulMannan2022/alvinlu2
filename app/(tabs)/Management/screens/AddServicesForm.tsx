import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Category {
  id: string;
  name: string;
}

interface AddOn {
  id: string;
  name: string;
}

interface ServiceImage {
  id: string;
  uri: string;
}

const AddServiceScreen = () => {
  const router = useRouter();
  // Form States
  const [serviceName, setServiceName] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("60");
  const [description, setDescription] = useState("");
  const bottomBarHeight = useBottomTabBarHeight();

  // Categories
  const [availableCategories] = useState<Category[]>([
    { id: "1", name: "Popular" },
    { id: "2", name: "Summer" },
    { id: "3", name: "Wave" },
    { id: "4", name: "This Month" },
    { id: "5", name: "New Arrival" },
  ]);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [categoryDropdownVisible, setCategoryDropdownVisible] = useState(false);

  // Discount Settings
  const [discountEnabled, setDiscountEnabled] = useState(false);
  const [discountPercentage, setDiscountPercentage] = useState("10");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  // Service Thumbnail
  const [thumbnail, setThumbnail] = useState<string | null>(null);

  // Detail Images
  const [detailImages, setDetailImages] = useState<ServiceImage[]>([]);

  // Add-on Services
  const [addOnEnabled, setAddOnEnabled] = useState(false);
  const [availableAddOns] = useState<AddOn[]>([
    { id: "1", name: "Gel Polish" },
    { id: "2", name: "French Tips" },
    { id: "3", name: "Nail Art" },
    { id: "4", name: "Cuticle Care" },
  ]);
  const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>([]);
  const [addOnDropdownVisible, setAddOnDropdownVisible] = useState(false);

  // Special Requirements
  const [requirements, setRequirements] = useState<string[]>([
    "required to order",
    "required to order",
    "required to order",
  ]);
  const [newRequirement, setNewRequirement] = useState("");

  // Format date for API compatibility (ISO format for backend)
  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}-${day}`; // ISO format for backend
  };

  // Add Category
  const addCategory = (category: Category) => {
    if (!selectedCategories.find((c) => c.id === category.id)) {
      setSelectedCategories([...selectedCategories, category]);
    }
    setCategoryDropdownVisible(false);
  };

  // Remove Category
  const removeCategory = (id: string) => {
    setSelectedCategories(selectedCategories.filter((c) => c.id !== id));
  };

  // Add AddOn
  const addAddOn = (addOn: AddOn) => {
    if (!selectedAddOns.find((a) => a.id === addOn.id)) {
      setSelectedAddOns([...selectedAddOns, addOn]);
    }
    setAddOnDropdownVisible(false);
  };

  // Remove AddOn
  const removeAddOn = (id: string) => {
    setSelectedAddOns(selectedAddOns.filter((a) => a.id !== id));
  };

  // Pick Thumbnail
  const pickThumbnail = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setThumbnail(result.assets[0].uri);
    }
  };

  // Pick Detail Image
  const pickDetailImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setDetailImages([
        ...detailImages,
        { id: Date.now().toString(), uri: result.assets[0].uri },
      ]);
    }
  };

  // Remove Detail Image
  const removeDetailImage = (id: string) => {
    setDetailImages(detailImages.filter((img) => img.id !== id));
  };

  // Add Requirement
  const addRequirement = () => {
    if (newRequirement.trim()) {
      setRequirements([...requirements, newRequirement.trim()]);
      setNewRequirement("");
    }
  };

  // Remove Requirement
  const removeRequirement = (index: number) => {
    setRequirements(requirements.filter((_, i) => i !== index));
  };

  // Get Price Range
  const getPriceRange = () => {
    if (!price) return "NT$0";
    const basePrice = parseFloat(price);
    return `NT$${basePrice.toFixed(0)}`;
  };

  // Get Duration Range
  const getDurationRange = () => {
    return `${duration} min`;
  };

  // Create Service with Backend Integration
  const handleCreateService = async () => {
    // Validate required fields
    if (!serviceName || !price || !duration) {
      alert("Please fill in all required fields.");
      return;
    }

    const service = {
      serviceName,
      price: parseFloat(price),
      duration: parseInt(duration),
      description,
      categories: selectedCategories.map((c) => c.id), // Send category IDs
      discount: discountEnabled
        ? {
            percentage: parseFloat(discountPercentage),
            startDate: formatDate(startDate),
            endDate: formatDate(endDate),
          }
        : null,
      thumbnail, // URI or base64 for backend
      detailImages: detailImages.map((img) => img.uri), // Array of URIs
      addOns: selectedAddOns.map((a) => a.id), // Send add-on IDs
      requirements,
    };

    try {
      // Placeholder for backend API call
      // Example: const response = await axios.post('/api/services', service);
      console.log("Sending service to backend:", service);

      // TODO: Implement API call to your backend
      // - Use FormData for image uploads if required
      // - Handle response (e.g., success or error)
      // Example:
      // const formData = new FormData();
      // formData.append('service', JSON.stringify(service));
      // if (thumbnail) formData.append('thumbnail', { uri: thumbnail, name: 'thumbnail.jpg', type: 'image/jpeg' });
      // detailImages.forEach((img, index) => {
      //   formData.append(`detailImage${index}`, { uri: img.uri, name: `detail${index}.jpg`, type: 'image/jpeg' });
      // });
      // await axios.post('/api/services', formData, { headers: { 'Content-Type': 'multipart/form-data' } });

      alert("Service created successfully!");
    } catch (error) {
      console.error("Error creating service:", error);
      alert("Failed to create service. Please try again.");
    }
  };

  return (
    <SafeAreaView
      className="flex-1 bg-white" // Changed to bg-white
      edges={["top"]}
      style={{ paddingBottom: bottomBarHeight + 60 }}
    >
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Header */}
        <View className="bg-white px-5 py-4 border-b border-gray-100 flex-row items-center justify-between">
          <View className="flex-row items-center">
            <TouchableOpacity
              onPress={() =>
                router.push("/(tabs)/Management/screens/ServiceMenuPriceing")
              }
              className="mr-3"
            >
              <Ionicons name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
            <Text className="text-lg font-semibold text-gray-900">
              Add Service
            </Text>
          </View>
        </View>

        <View className="px-5 py-4">
          {/* Service Name */}
          <View className="mb-4">
            <Text className="text-sm font-semibold text-gray-900 mb-2">
              Service Name <Text className="text-red-500">*</Text>
            </Text>
            <TextInput
              value={serviceName}
              onChangeText={setServiceName}
              placeholder="Enter service name"
              className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-base text-gray-900"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          {/* Price */}
          <View className="mb-4">
            <Text className="text-sm font-semibold text-gray-900 mb-2">
              Price (NT$) <Text className="text-red-500">*</Text>
            </Text>
            <TextInput
              value={price}
              onChangeText={setPrice}
              placeholder="100"
              keyboardType="numeric"
              className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-base text-gray-900"
              placeholderTextColor="#9CA3AF"
            />
            <Text className="text-xs text-gray-500 mt-1">
              Service base's Taiwan dollars
            </Text>
          </View>

          {/* Duration */}
          <View className="mb-4">
            <Text className="text-sm font-semibold text-gray-900 mb-2">
              Duration (min) <Text className="text-red-500">*</Text>
            </Text>
            <TextInput
              value={duration}
              onChangeText={setDuration}
              placeholder="60 min"
              keyboardType="numeric"
              className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-base text-gray-900"
              placeholderTextColor="#9CA3AF"
            />
            <Text className="text-xs text-gray-500 mt-1">
              Set duration in minutes
            </Text>
          </View>

          {/* Description */}
          <View className="mb-4">
            <Text className="text-sm font-semibold text-gray-900 mb-2">
              Description
            </Text>
            <TextInput
              value={description}
              onChangeText={setDescription}
              placeholder="Describe your service..."
              multiline
              numberOfLines={6}
              className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-base text-gray-900"
              placeholderTextColor="#9CA3AF"
              style={{ height: 120, textAlignVertical: "top" }}
            />
          </View>

          {/* Categories */}
          <View className="mb-4">
            <Text className="text-sm font-semibold text-gray-900 mb-2">
              Categories
            </Text>
            <TouchableOpacity
              onPress={() =>
                setCategoryDropdownVisible(!categoryDropdownVisible)
              }
              className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 flex-row items-center justify-between"
            >
              <Text className="text-gray-500 text-base">
                Select one or multiple
              </Text>
              <Ionicons
                name={categoryDropdownVisible ? "chevron-up" : "chevron-down"}
                size={20}
                color="#6B7280"
              />
            </TouchableOpacity>

            {/* Category Dropdown */}
            {categoryDropdownVisible && (
              <View className="mt-2 bg-gray-50 border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                {availableCategories
                  .filter(
                    (cat) => !selectedCategories.find((sc) => sc.id === cat.id)
                  )
                  .map((category) => (
                    <TouchableOpacity
                      key={category.id}
                      onPress={() => addCategory(category)}
                      className="px-4 py-3 border-b border-gray-100"
                    >
                      <Text className="text-base text-gray-700">
                        {category.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
              </View>
            )}

            {/* Selected Categories Pills */}
            {selectedCategories.length > 0 && (
              <View className="flex-row flex-wrap mt-2">
                {selectedCategories.map((category) => (
                  <View
                    key={category.id}
                    className="flex-row items-center bg-gray-200 border border-gray-300 rounded-full px-3 py-1.5 mr-2 mb-2"
                  >
                    <Text className="text-sm text-gray-900 font-medium">
                      {category.name}
                    </Text>
                    <TouchableOpacity
                      onPress={() => removeCategory(category.id)}
                      className="ml-1"
                    >
                      <Ionicons name="close" size={16} color="#EF4444" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Discount Settings */}
          <View className="mb-4 bg-gray-50 rounded-lg p-4 border border-gray-200">
            <View className="flex-row items-center justify-between mb-2">
              <View className="flex-1">
                <Text className="text-sm font-semibold text-gray-900">
                  % Discount Settings
                </Text>
                <Text className="text-xs text-gray-500 mt-0.5">
                  Set up a promotional pricing for this service
                </Text>
              </View>
              <Switch
                value={discountEnabled}
                onValueChange={setDiscountEnabled}
                trackColor={{ false: "#D1D5DB", true: "#10B981" }}
                thumbColor="#FFFFFF"
              />
            </View>

            {discountEnabled && (
              <>
                <View className="mb-3 mt-3">
                  <Text className="text-sm font-medium text-gray-900 mb-2">
                    Discount Percentage
                  </Text>
                  <View className="flex-row items-center">
                    <TextInput
                      value={discountPercentage}
                      onChangeText={setDiscountPercentage}
                      keyboardType="numeric"
                      className="flex-1 bg-gray-50 border border-gray-300 rounded-lg px-4 py-2.5 text-base text-gray-900"
                    />
                    <Text className="ml-2 text-base text-gray-700">%</Text>
                  </View>
                  <Text className="text-xs text-gray-500 mt-1">
                    Set up promotional pricing for this service
                  </Text>
                </View>

                <View className="flex-row items-center justify-between">
                  <View className="flex-1 mr-2">
                    <Text className="text-sm font-medium text-gray-900 mb-2">
                      Start Date
                    </Text>
                    <TouchableOpacity
                      onPress={() => setShowStartDatePicker(true)}
                      className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-2.5"
                    >
                      <Text className="text-sm text-gray-900">
                        {formatDate(startDate)}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View className="flex-1 ml-2">
                    <Text className="text-sm font-medium text-gray-900 mb-2">
                      End Date
                    </Text>
                    <TouchableOpacity
                      onPress={() => setShowEndDatePicker(true)}
                      className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-2.5"
                    >
                      <Text className="text-sm text-gray-900">
                        {formatDate(endDate)}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Date Pickers */}
                {showStartDatePicker && (
                  <DateTimePicker
                    value={startDate}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                      setShowStartDatePicker(false);
                      if (selectedDate) setStartDate(selectedDate);
                    }}
                  />
                )}
                {showEndDatePicker && (
                  <DateTimePicker
                    value={endDate}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                      setShowEndDatePicker(false);
                      if (selectedDate) setEndDate(selectedDate);
                    }}
                  />
                )}
              </>
            )}
          </View>

          {/* Service Thumbnail */}
          <View className="mb-4">
            <Text className="text-sm font-semibold text-gray-900 mb-2">
              Service Thumbnail
            </Text>
            <Text className="text-xs text-gray-500 mb-3">
              Upload a single image for your service (recommended resolution)
            </Text>

            {thumbnail ? (
              <View className="relative">
                <Image
                  source={{ uri: thumbnail }}
                  className="w-full h-48 rounded-lg"
                  resizeMode="cover"
                />
                <TouchableOpacity
                  onPress={() => setThumbnail(null)}
                  className="absolute top-2 right-2 bg-red-500 rounded-full p-1"
                >
                  <Ionicons name="close" size={16} color="#FFF" />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                onPress={pickThumbnail}
                className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg py-8 items-center"
              >
                <Ionicons name="image-outline" size={32} color="#9CA3AF" />
                <Text className="text-sm text-gray-600 mt-2">Upload Image</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Detail Images */}
          <View className="mb-4">
            <Text className="text-sm font-semibold text-gray-900 mb-2">
              Detail Images (Optional)
            </Text>
            <Text className="text-xs text-gray-500 mb-3">
              Upload up to 3 additional images showing service details
            </Text>

            <View className="flex-row flex-wrap">
              {detailImages.map((image) => (
                <View key={image.id} className="relative mr-3 mb-3">
                  <Image
                    source={{ uri: image.uri }}
                    className="w-24 h-24 rounded-lg"
                    resizeMode="cover"
                  />
                  <TouchableOpacity
                    onPress={() => removeDetailImage(image.id)}
                    className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1"
                  >
                    <Ionicons name="close" size={12} color="#FFF" />
                  </TouchableOpacity>
                </View>
              ))}

              {detailImages.length < 3 && (
                <TouchableOpacity
                  onPress={pickDetailImage}
                  className="w-24 h-24 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg items-center justify-center"
                >
                  <Ionicons name="add" size={24} color="#9CA3AF" />
                  <Text className="text-xs text-gray-600 mt-1">Add Image</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Add-on Services */}
          <View className="mb-4 bg-gray-50 rounded-lg p-4 border border-gray-200">
            <View className="flex-row items-center justify-between mb-2">
              <View className="flex-1">
                <Text className="text-sm font-semibold text-gray-900">
                  Add-on Services
                </Text>
                <Text className="text-xs text-gray-500 mt-0.5">
                  Select add-on services that customers can choose with this
                  service
                </Text>
              </View>
              <Switch
                value={addOnEnabled}
                onValueChange={setAddOnEnabled}
                trackColor={{ false: "#D1D5DB", true: "#10B981" }}
                thumbColor="#FFFFFF"
              />
            </View>

            {addOnEnabled && (
              <>
                <TouchableOpacity
                  onPress={() => setAddOnDropdownVisible(!addOnDropdownVisible)}
                  className="mt-3 border border-gray-300 rounded-lg px-4 py-2.5 flex-row items-center justify-between bg-gray-50"
                >
                  <Text className="text-sm text-gray-600">
                    Select add-on available
                  </Text>
                  <Ionicons
                    name={addOnDropdownVisible ? "chevron-up" : "chevron-down"}
                    size={20}
                    color="#6B7280"
                  />
                </TouchableOpacity>

                {/* Add-on Dropdown */}
                {addOnDropdownVisible && (
                  <View className="mt-2 bg-gray-50 border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                    {availableAddOns
                      .filter(
                        (addon) =>
                          !selectedAddOns.find((sa) => sa.id === addon.id)
                      )
                      .map((addOn) => (
                        <TouchableOpacity
                          key={addOn.id}
                          onPress={() => addAddOn(addOn)}
                          className="px-4 py-3 border-b border-gray-100"
                        >
                          <Text className="text-base text-gray-700">
                            {addOn.name}
                          </Text>
                        </TouchableOpacity>
                      ))}
                  </View>
                )}

                {/* Selected Add-ons */}
                {selectedAddOns.length > 0 && (
                  <View className="flex-row flex-wrap mt-2">
                    {selectedAddOns.map((addOn) => (
                      <View
                        key={addOn.id}
                        className="flex-row items-center bg-gray-100 border border-gray-300 rounded-full px-3 py-1.5 mr-2 mb-2"
                      >
                        <Text className="text-sm text-gray-900">
                          {addOn.name}
                        </Text>
                        <TouchableOpacity
                          onPress={() => removeAddOn(addOn.id)}
                          className="ml-1"
                        >
                          <Ionicons name="close" size={16} color="#EF4444" />
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                )}
              </>
            )}
          </View>

          {/* Special Requirements */}
          <View className="mb-4">
            <Text className="text-sm font-semibold text-gray-900 mb-2">
              Special Requirements/Options
            </Text>
            <Text className="text-xs text-gray-500 mb-3">Request to order</Text>
            {/* Input with Add Button */}
            <View className="flex-row items-center mb-2">
              <TextInput
                value={newRequirement}
                onChangeText={setNewRequirement}
                placeholder="Request to order..."
                className="flex-1 bg-gray-50 border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-900 mr-2"
                placeholderTextColor="#9CA3AF"
              />
              <TouchableOpacity
                onPress={addRequirement}
                className="bg-gray-700 rounded-lg px-4 py-2.5"
              >
                <Text className="text-white font-medium text-sm">Add</Text>
              </TouchableOpacity>
            </View>

            {/* Selected Requirements */}
            {requirements.length > 0 && (
              <View className="flex-row flex-wrap mb-3">
                {requirements.map((req, index) => (
                  <View
                    key={index}
                    className="bg-pink-50 border border-pink-200 rounded-full px-3 py-1.5 flex-row items-center mr-2 mb-2"
                  >
                    <Text className="text-sm text-pink-700">{req}</Text>
                    <TouchableOpacity
                      onPress={() => removeRequirement(index)}
                      className="ml-1"
                    >
                      <Ionicons name="close" size={16} color="#EC4899" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Service Summary */}
          <View className="mb-4 bg-gray-50 rounded-lg p-4 border border-gray-200">
            <Text className="text-sm font-semibold text-gray-900 mb-3">
              Service Summary
            </Text>
            <View className="flex-row justify-between mb-2">
              <Text className="text-sm text-gray-600">Price Range:</Text>
              <Text className="text-sm font-medium text-gray-900">
                {getPriceRange()}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-sm text-gray-600">Duration Range:</Text>
              <Text className="text-sm font-medium text-gray-900">
                {getDurationRange()}
              </Text>
            </View>
          </View>

          {/* Create Button */}
          <TouchableOpacity
            onPress={handleCreateService}
            className="bg-black rounded-xl py-4 items-center mb-4"
          >
            <Text className="text-white text-base font-semibold">
              Create Service
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddServiceScreen;
