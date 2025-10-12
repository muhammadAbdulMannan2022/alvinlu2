import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { createContext, useState } from "react";
import "react-native-reanimated";
import "../global.css";
export const ModalContext = createContext<any>(null);
export default function RootLayout() {
  // modal
  const [isCraditModalOpen, setIsCraditModalOpen] = useState(false);
  const [isAddingCredit, setIsAddingCredit] = useState(false);
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ModalContext.Provider
      value={{
        isCraditModalOpen,
        setIsCraditModalOpen,
        isAddingCredit,
        setIsAddingCredit,
      }}
    >
      <ThemeProvider value={DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </ModalContext.Provider>
  );
}
