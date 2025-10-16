import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

// Define TypeScript interfaces
interface Category {
  id: number;
  name: string;
  serviceCount: number;
}

const MenuCategories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, name: "This Month", serviceCount: 8 },
    { id: 2, name: "Popular", serviceCount: 12 },
    { id: 3, name: "Summer", serviceCount: 6 },
    { id: 4, name: "Wave", serviceCount: 4 },
  ]);
  const router = useRouter();

  const handleOpenAddModal = () => {
    router.push({
      pathname: "/(tabs)/Management/screens/AddRemoveCategory",
      params: { mode: "add" },
    });
  };

  const handleOpenEditModal = (category: Category) => {
    router.push({
      pathname: "/(tabs)/Management/screens/AddRemoveCategory",
      params: { mode: "edit", category: JSON.stringify(category) },
    });
  };

  const handleDeleteCategory = (id: number) => {
    setCategories(categories.filter((cat) => cat.id !== id));
  };

  return (
    <View>
      <View className="bg-white p-4">
        {/* Header */}
        <View className="flex-row items-center justify-between mb-4">
          <View>
            <Text className="text-lg font-semibold text-gray-900">
              Menu Categories
            </Text>
            <Text className="text-sm text-gray-600 mt-0.5">
              {categories.length}/20 categories
            </Text>
          </View>
          <TouchableOpacity
            onPress={handleOpenAddModal}
            className="bg-black rounded-lg px-4 py-2 flex-row items-center"
          >
            <Ionicons name="add" size={18} color="#FFF" />
            <Text className="text-white font-medium ml-1">Add Category</Text>
          </TouchableOpacity>
        </View>

        {/* Categories List */}
        <View>
          {categories.map((category, index) => (
            <View
              key={category.id}
              className={`flex-row items-center bg-gray-50 rounded-lg p-4 ${
                index !== categories.length - 1 ? "mb-3" : ""
              }`}
            >
              {/* Drag Handle */}
              <MaterialIcons name="drag-indicator" size={20} color="#9CA3AF" />

              {/* Category Info */}
              <View className="flex-1 ml-3">
                <Text className="text-base font-semibold text-gray-900">
                  {category.name}
                </Text>
                <TouchableOpacity className="flex-row items-center mt-1">
                  <Text className="text-sm text-gray-600">
                    {category.serviceCount} services
                  </Text>
                  <Ionicons
                    name="open-outline"
                    size={12}
                    color="#6B7280"
                    style={{ marginLeft: 4 }}
                  />
                </TouchableOpacity>
              </View>

              {/* Action Buttons */}
              <View className="flex-row items-center gap-3">
                <TouchableOpacity className="p-1">
                  <Ionicons name="eye-outline" size={20} color="#6B7280" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleOpenEditModal(category)}
                  className="p-1"
                >
                  <Ionicons name="create-outline" size={20} color="#6B7280" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDeleteCategory(category.id)}
                  className="p-1"
                >
                  <Ionicons name="trash-outline" size={20} color="#EF4444" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default MenuCategories;
