// styles.js
import { Platform } from "react-native";

export const shadowStyle = {
  ...Platform.select({
    ios: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 1,
      shadowRadius: 3.84,
    },
    android: {
      elevation: 8,
    },
  }),
};
