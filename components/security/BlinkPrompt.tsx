import { LivenessState } from "@/hooks/useFaceLiveness";
import { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, Text } from "react-native";

type Props = {
  livenessState: LivenessState;
  blinkCount: number;
  blinkCountRequired: number;
};

// Slides in from below and sits between the frame and the bottom buttons.
// Only visible in FACE_DETECTED and BLINKING states.
export default function BlinkPrompt({
  livenessState,
  blinkCount,
  blinkCountRequired,
}: Props) {
  const translateY = useRef(new Animated.Value(30)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.92)).current;

  const visible =
    livenessState === LivenessState.FACE_DETECTED ||
    livenessState === LivenessState.BLINKING ||
    livenessState === LivenessState.VERIFIED_BLINK ||
    livenessState === LivenessState.SMILING;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          tension: 80,
          friction: 10,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: 1,
          tension: 80,
          friction: 10,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 20,
          duration: 200,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, translateY, opacity, scale]);

  const remaining = blinkCountRequired - blinkCount;

  const label =
    livenessState === LivenessState.VERIFIED_BLINK ||
    livenessState === LivenessState.SMILING
      ? "😁 Now give us a big smile!"
      : livenessState === LivenessState.BLINKING
        ? "Blink detected… keep going"
        : remaining === blinkCountRequired
          ? "Blink Twice If you're safe"
          : `${remaining} more blink${remaining !== 1 ? "s" : ""} to go`;

  const bgColor =
    livenessState === LivenessState.VERIFIED_BLINK ||
    livenessState === LivenessState.SMILING
      ? "#E8F5E9"
      : "#FFF3CD";
  return (
    <Animated.View
      style={[
        styles.container,
        { backgroundColor: bgColor },
        {
          opacity,
          transform: [{ translateY }, { scale }],
        },
      ]}
      pointerEvents="none"
    >
      <Text style={styles.text}>{label}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    backgroundColor: "#FFF3CD",
    borderRadius: 14,
    paddingHorizontal: 24,
    paddingVertical: 14,
    marginBottom: 16,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,

    minWidth: 260,
    alignItems: "center",
  },

  text: {
    fontSize: 16,
    fontWeight: "600",
    color: "#5C4A00",
    textAlign: "center",
  },
});
