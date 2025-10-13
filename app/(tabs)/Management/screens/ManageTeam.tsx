import GrantAccountAccess from "@/components/Home/Sheets/Management/AddUser";
import ModalComponent from "@/components/Modals/ReuseableModals";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Define TypeScript interfaces
interface TeamMember {
  id: number;
  name: string;
  email: string;
  initials: string;
  role: string;
  status: string;
  joined: string;
  commission?: string;
  avatarUrl: string;
}

const TeamManagement: React.FC = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const menuButtonRef = useRef(null);
  const router = useRouter();

  // Dummy team data
  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Emily Wang",
      email: "emily@nailstudio.com",
      initials: "EW",
      role: "Owner",
      status: "Active",
      joined: "1/15/2023",
      avatarUrl:
        "https://ui-avatars.com/api/?name=Emily+Wang&size=128&rounded=true&background=F3F4F6&color=6B7280",
    },
    {
      id: 2,
      name: "Jessica Liu",
      email: "jessica@example.com",
      initials: "JL",
      role: "Manager",
      status: "Active",
      joined: "2/2/2024",
      commission: "10% commission",
      avatarUrl:
        "https://ui-avatars.com/api/?name=Jessica+Liu&size=128&rounded=true&background=F3F4F6&color=6B7280",
    },
    {
      id: 3,
      name: "Jessica Liu",
      email: "jessica@example.com",
      initials: "JL",
      role: "Viewer",
      status: "Active",
      joined: "2/2/2024",
      commission: "10% commission",
      avatarUrl:
        "https://ui-avatars.com/api/?name=Jessica+Liu&size=128&rounded=true&background=F3F4F6&color=6B7280",
    },
  ];

  const handleMenuPress = (member: TeamMember) => {
    setSelectedMember(member);
    // Measure the position of the menu button

    // @ts-ignore
    menuButtonRef.current?.measure(
      (fx: any, fy: any, width: any, height: any, px: any, py: any) => {
        setMenuPosition({ top: py + height, left: px - 150 }); // Adjust left to position menu
        setMenuVisible(true);
      }
    );
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "Owner":
        return "bg-red-50 border-red-200";
      case "Manager":
        return "bg-gray-50 border-gray-200";
      case "Viewer":
        return "bg-gray-50 border-gray-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  const getRoleTextColor = (role: string) => {
    switch (role) {
      case "Owner":
        return "text-red-600";
      case "Manager":
        return "text-gray-600";
      case "Viewer":
        return "text-gray-600";
      default:
        return "text-gray-600";
    }
  };

  const handleAddPerson = () => {
    console.log("Button pressed - Starting handleAddPerson");
    try {
      console.log("Setting isAdding to true");
      setIsAdding(true);
      console.log("isAdding set to:", true);
    } catch (error) {
      console.error("Error in handleAddPerson:", error);
    }
  };

  // Debugging
  console.log("Render - isAdding state:", isAdding);

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="bg-white px-4 py-4 border-b border-gray-200 flex-row items-center justify-between">
        <View className="flex-row items-center">
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/Management/inxex")}
            className="mr-4"
          >
            <Feather name="arrow-left" size={24} color="#000" />
          </TouchableOpacity>
          <Text className="text-xl font-semibold text-gray-900">
            Team Management
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1">
        {/* Add Person Button */}
        <View className="px-4 pt-4">
          <TouchableOpacity
            onPress={handleAddPerson}
            className="bg-gray-900 rounded-lg py-3 flex-row items-center justify-center"
          >
            <Feather name="user-plus" size={18} color="#FFF" />
            <Text className="text-white font-medium ml-2">Add a Person</Text>
          </TouchableOpacity>
        </View>

        {/* Section Header */}
        <View className="px-4 pt-6 pb-3 flex-row items-center">
          <Feather name="users" size={18} color="#6B7280" />
          <Text className="text-sm font-medium text-gray-700 ml-2">
            People who can manage your account ({teamMembers.length})
          </Text>
        </View>

        {/* Team Members List */}
        <View className="px-4">
          {teamMembers.map((member, index) => (
            <View
              key={member.id}
              className={`bg-gray-50 p-4 mb-3 rounded-lg ${
                index === 0 ? "border-l-4 border-red-400" : ""
              }`}
            >
              <View className="flex-row items-start">
                {/* Avatar */}
                <View className="w-10 h-10 rounded-full bg-gray-300 items-center justify-center mr-3">
                  <Text className="text-sm font-semibold text-gray-700">
                    {member.initials}
                  </Text>
                </View>

                {/* Member Info */}
                <View className="flex-1">
                  <View className="flex-row items-start justify-between mb-1">
                    <View className="flex-1">
                      <Text className="text-base font-semibold text-gray-900">
                        {member.name}
                      </Text>
                      <Text className="text-sm text-gray-600 mt-0.5">
                        {member.email}
                      </Text>
                      <Text className="text-xs text-gray-500 mt-1">
                        Joined {member.joined}
                      </Text>
                      {member.commission && (
                        <Text className="text-xs text-gray-500 mt-0.5">
                          {member.commission}
                        </Text>
                      )}
                    </View>

                    {/* Menu Button */}
                    <TouchableOpacity
                      ref={menuButtonRef}
                      onPress={() => handleMenuPress(member)}
                      className="p-1"
                    >
                      <Feather name="more-vertical" size={20} color="#6B7280" />
                    </TouchableOpacity>
                  </View>

                  {/* Role and Status Badges */}
                  <View className="flex-row items-center mt-2">
                    <View
                      className={`flex-row items-center px-2.5 py-1 rounded border ${getRoleBadgeColor(member.role)} mr-2`}
                    >
                      {member.role === "Owner" && (
                        <MaterialIcons
                          name="security"
                          size={12}
                          color="#DC2626"
                        />
                      )}
                      {member.role === "Viewer" && (
                        <Feather name="eye" size={12} color="#6B7280" />
                      )}
                      <Text
                        className={`text-xs font-medium ml-1 ${getRoleTextColor(member.role)}`}
                      >
                        {member.role}
                      </Text>
                    </View>

                    <View className="bg-green-100 px-2.5 py-1 rounded">
                      <Text className="text-xs font-medium text-green-700">
                        {member.status}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Security Reminder */}
        <View className="mx-4 mt-4 mb-6 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <View className="flex-row items-start">
            <Feather name="alert-triangle" size={20} color="#F59E0B" />
            <View className="flex-1 ml-3">
              <Text className="text-sm font-semibold text-yellow-800">
                Security Reminder
              </Text>
              <Text className="text-sm text-yellow-700 mt-1">
                Only give account access to people you trust. Admins can modify
                your business data and settings.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Menu Dropdown */}
      {menuVisible && (
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setMenuVisible(false)}
          className="absolute top-0 left-0 right-0 bottom-0"
        >
          <View
            className="bg-white rounded-lg shadow-lg min-w-[200px]"
            style={{
              position: "absolute",
              top: menuPosition.top,
              left: menuPosition.left,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setMenuVisible(false);
                router.push("/(tabs)/Management/screens/CommissionAdjustment");
              }}
              className="flex-row items-center px-4 py-3 border-b border-gray-100"
            >
              <Feather name="percent" size={18} color="#374151" />
              <Text className="text-base text-gray-900 ml-3">
                Commission adjustment
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setMenuVisible(false);
                // Handle edit info
              }}
              className="flex-row items-center px-4 py-3 border-b border-gray-100"
            >
              <Feather name="edit-2" size={18} color="#374151" />
              <Text className="text-base text-gray-900 ml-3">Edit info</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setMenuVisible(false);
                // Handle delete
              }}
              className="flex-row items-center px-4 py-3"
            >
              <Feather name="trash-2" size={18} color="#EF4444" />
              <Text className="text-base text-red-500 ml-3">Delete</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )}

      {/* Add User Modal */}
      <ModalComponent visible={isAdding} onClose={() => setIsAdding(false)}>
        <GrantAccountAccess
          onClose={() => setIsAdding(false)}
          onGrant={() => setIsAdding(false)}
        />
      </ModalComponent>
    </SafeAreaView>
  );
};

export default TeamManagement;
