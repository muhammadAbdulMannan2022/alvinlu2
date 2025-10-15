import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Modal,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

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

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [categoryName, setCategoryName] = useState<string>("");
  const [visibility, setVisibility] = useState<boolean>(true);
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(
    null
  );

  const handleOpenAddModal = () => {
    setModalMode("add");
    setCategoryName("");
    setVisibility(true);
    setEditingCategoryId(null);
    setIsModalVisible(true);
  };

  const handleOpenEditModal = (category: Category) => {
    // setModalMode("edit");
    // setCategoryName(category.name);
    // setVisibility(true); // Assuming visibility is true by default; adjust if needed
    // setEditingCategoryId(category.id);
    // setIsModalVisible(true);

    router.push("/(tabs)/Management/screens/AddRemoveCategory");
  };

  const handleSaveCategory = () => {
    if (categoryName.trim()) {
      if (modalMode === "add") {
        const newCategory: Category = {
          id: categories.length + 1,
          name: categoryName.trim(),
          serviceCount: 0,
        };
        setCategories([...categories, newCategory]);
      } else if (modalMode === "edit" && editingCategoryId !== null) {
        setCategories(
          categories.map((cat) =>
            cat.id === editingCategoryId
              ? { ...cat, name: categoryName.trim() }
              : cat
          )
        );
      }
      setCategoryName("");
      setVisibility(true);
      setEditingCategoryId(null);
      setIsModalVisible(false);
    }
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

      {/* Add/Edit Category Modal */}
      <Modal
        visible={isModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View className="flex-1 bg-black/50 justify-center items-center px-4">
          <View className="bg-white rounded-2xl w-full max-w-md p-6">
            {/* Modal Header */}
            <View className="flex-row items-center justify-between mb-6">
              <Text className="text-xl font-semibold text-gray-900">
                {modalMode === "add" ? "Add Category" : "Edit Category"}
              </Text>
              <TouchableOpacity
                onPress={() => setIsModalVisible(false)}
                className="p-1"
              >
                <Ionicons name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>

            {/* Category Name Input */}
            <View className="mb-6">
              <Text className="text-sm font-medium text-gray-900 mb-2">
                Category Name <Text className="text-red-500">*</Text>
              </Text>
              <TextInput
                value={categoryName}
                onChangeText={setCategoryName}
                placeholder="Enter category name"
                placeholderTextColor="#9CA3AF"
                className="bg-gray-100 rounded-lg px-4 py-3 text-base text-gray-900"
              />
            </View>

            {/* Visibility Toggle */}
            <View className="mb-6">
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-sm font-medium text-gray-900">
                  Visibility
                </Text>
                <Switch
                  value={visibility}
                  onValueChange={setVisibility}
                  trackColor={{ false: "#D1D5DB", true: "#000000" }}
                  thumbColor="#FFFFFF"
                />
              </View>
              <Text className="text-xs text-gray-600">
                Control whether this category is visible to customers
              </Text>
            </View>

            {/* Action Buttons */}
            <View className="flex-row gap-3">
              <TouchableOpacity
                onPress={() => setIsModalVisible(false)}
                className="flex-1 bg-white border border-gray-300 rounded-lg py-3"
              >
                <Text className="text-center font-medium text-gray-900">
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleSaveCategory}
                className="flex-1 bg-black rounded-lg py-3"
              >
                <Text className="text-center font-medium text-white">
                  {modalMode === "add" ? "Add" : "Save"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MenuCategories;
