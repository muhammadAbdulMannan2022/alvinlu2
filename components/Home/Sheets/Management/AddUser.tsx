import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface GrantAccountAccessProps {
  onClose: () => void;
  onGrant: (email: string, role: string) => void;
}

const GrantAccountAccess: React.FC<GrantAccountAccessProps> = ({
  onClose,
  onGrant,
}) => {
  const [email, setEmail] = useState("");
  const [selectedRole, setSelectedRole] = useState("Viewer");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const roles = [
    {
      value: "Viewer",
      label: "Viewer Access",
      icon: "eye" as const,
      permissions: [
        "See customer information",
        "Access reports and analytics",
        "Cannot make changes",
      ],
    },
    {
      value: "Manager",
      label: "Manager Access",
      icon: "users" as const,
      permissions: [
        "Full customer management",
        "Edit services and pricing",
        "Manage bookings and schedule",
      ],
    },
  ];

  const selectedRoleData = roles.find((role) => role.value === selectedRole);

  const handleGrantAccess = () => {
    if (email.trim()) {
      onGrant(email, selectedRole);
      setEmail("");
      setSelectedRole("Viewer");
    }
  };

  return (
    <View className="bg-white">
      {/* Header */}
      <View className="px-6 pt-6 pb-4 border-b border-gray-100">
        <View className="flex-row items-start justify-between">
          <View className="flex-1 pr-4">
            <Text className="text-xl font-bold text-gray-900 mb-2">
              Grant Account Access
            </Text>
            <Text className="text-sm text-gray-600 leading-5">
              Give someone permission to help manage your nail studio account.
              Choose their access level carefully.
            </Text>
          </View>
          <TouchableOpacity onPress={onClose} className="p-1">
            <Feather name="x" size={24} color="#6B7280" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="max-h-96">
        <View className="px-6 py-4">
          {/* Email Input */}
          <View className="mb-4">
            <Text className="text-sm font-semibold text-gray-900 mb-2">
              Email Address
            </Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="colleague@example.com"
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              autoCapitalize="none"
              className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-base text-gray-900"
            />
          </View>

          {/* Role Selector */}
          <View className="mb-4">
            <Text className="text-sm font-semibold text-gray-900 mb-2">
              What can they do with your account?
            </Text>

            <TouchableOpacity
              onPress={() => setDropdownOpen(!dropdownOpen)}
              className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex-row items-center justify-between"
            >
              <View className="flex-row items-center flex-1">
                <Feather
                  name={selectedRoleData?.icon || "eye"}
                  size={18}
                  color="#6B7280"
                />
                <Text className="text-base text-gray-900 ml-3">
                  {selectedRoleData?.label}
                </Text>
              </View>
              <Feather
                name={dropdownOpen ? "chevron-up" : "chevron-down"}
                size={20}
                color="#6B7280"
              />
            </TouchableOpacity>

            {/* Dropdown Options */}
            {dropdownOpen && (
              <View className="mt-2 bg-white border border-gray-200 rounded-lg overflow-hidden">
                {roles.map((role, index) => (
                  <TouchableOpacity
                    key={role.value}
                    onPress={() => {
                      setSelectedRole(role.value);
                      setDropdownOpen(false);
                    }}
                    className={`px-4 py-3 ${
                      index !== roles.length - 1
                        ? "border-b border-gray-100"
                        : ""
                    } ${selectedRole === role.value ? "bg-gray-50" : ""}`}
                  >
                    <View className="flex-row items-center">
                      <Feather name={role.icon} size={18} color="#6B7280" />
                      <Text className="text-base text-gray-900 ml-3 font-medium">
                        {role.label}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Permissions Info */}
          <View className="bg-gray-50 rounded-lg p-4">
            <Text className="text-sm font-semibold text-gray-900 mb-2">
              {selectedRoleData?.label} permissions include:
            </Text>
            {selectedRoleData?.permissions.map((permission, index) => (
              <Text
                key={index}
                className="text-sm text-gray-600 leading-5 mb-1"
              >
                • {permission}
              </Text>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Footer Buttons */}
      <View className="px-6 py-4 border-t border-gray-100 flex-row gap-3">
        <TouchableOpacity
          onPress={onClose}
          className="flex-1 py-3 bg-white border border-gray-300 rounded-lg"
        >
          <Text className="text-center text-base font-semibold text-gray-900">
            Cancel
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleGrantAccess}
          className="flex-1 py-3 bg-gray-900 rounded-lg flex-row items-center justify-center"
        >
          <Feather name="user-plus" size={18} color="#FFF" />
          <Text className="text-center text-base font-semibold text-white ml-2">
            Grant Access
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GrantAccountAccess;
