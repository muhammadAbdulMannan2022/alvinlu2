import BottomSheet, {
  BottomSheetBackdropProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useEffect, useRef } from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

interface CustomBottomSheetProps {
  isOpen: boolean;
  onChange?: (isOpen: boolean) => void;
  children: React.ReactNode;
  snapPoints: (string | number)[];
  bottomInset?: number;
  style?: StyleProp<ViewStyle>;
}

// 🖤 Backdrop: under sheet but over everything else
const BackdropComponent: React.FC<BottomSheetBackdropProps> = ({
  animatedIndex,
  style: backdropStyle,
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      animatedIndex.value,
      [-1, 0],
      [0, 0.5],
      Extrapolate.CLAMP
    );
    return { opacity };
  });

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        StyleSheet.absoluteFill,
        { backgroundColor: "black" },
        backdropStyle,
        animatedStyle,
      ]}
    />
  );
};

const CustomBottomSheet: React.FC<CustomBottomSheetProps> = ({
  isOpen,
  onChange,
  children,
  snapPoints,
  bottomInset = 0,
  style,
}) => {
  const sheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    if (isOpen) {
      sheetRef.current?.expand();
    } else {
      sheetRef.current?.close();
    }
  }, [isOpen]);

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={snapPoints}
      index={isOpen ? 0 : -1}
      bottomInset={bottomInset}
      enablePanDownToClose
      style={[{ zIndex: 50 }, style]} // sheet layer
      backdropComponent={(props) => <BackdropComponent {...props} />}
      onChange={(index) => {
        if (onChange) onChange(index >= 0);
      }}
    >
      <BottomSheetView
        style={{
          padding: 16,
          backgroundColor: "#fff",
          minHeight: 200,
        }}
      >
        {children}
      </BottomSheetView>
    </BottomSheet>
  );
};

export default CustomBottomSheet;
