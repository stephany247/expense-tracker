import { LivenessState } from "@/hooks/useFaceLiveness";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";
import { Colors } from "../../constants/theme";

const FRAME_SIZE = 220;

type Props = {
  livenessState: LivenessState;
  cameraComponent?: React.ReactNode | null;
};

export default function FaceFrame({ livenessState, cameraComponent }: Props) {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const borderColor = useRef(new Animated.Value(0)).current;

  const pulseLoop = useRef<Animated.CompositeAnimation | null>(null);

  // ── Border color interpolation ─────────────────────────
  const borderColorStr = borderColor.interpolate({
    inputRange: [0, 1, 2, 3],
    outputRange: [Colors.blue, Colors.blue, "#12B76A", Colors.danger],
  });

  // ── Pulse animation ────────────────────────────────────
  useEffect(() => {
    pulseLoop.current?.stop();

    switch (livenessState) {
      case LivenessState.FACE_DETECTED:
        pulseLoop.current = Animated.loop(
          Animated.sequence([
            Animated.timing(pulseAnim, {
              toValue: 1.06,
              duration: 700,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: false,
            }),
            Animated.timing(pulseAnim, {
              toValue: 1,
              duration: 700,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: false,
            }),
          ]),
        );
        pulseLoop.current.start();
        borderColor.setValue(1);
        break;

      case LivenessState.BLINKING:
        pulseLoop.current = Animated.loop(
          Animated.sequence([
            Animated.timing(pulseAnim, {
              toValue: 1.09,
              duration: 200,
              easing: Easing.out(Easing.ease),
              useNativeDriver: false,
            }),
            Animated.timing(pulseAnim, {
              toValue: 1,
              duration: 200,
              easing: Easing.in(Easing.ease),
              useNativeDriver: false,
            }),
          ]),
        );
        pulseLoop.current.start();
        borderColor.setValue(1);
        break;

      case LivenessState.VERIFIED:
        Animated.spring(pulseAnim, {
          toValue: 1,
          useNativeDriver: false,
        }).start();

        Animated.timing(borderColor, {
          toValue: 2,
          duration: 400,
          useNativeDriver: false,
        }).start();
        break;

      case LivenessState.FAILED:
        Animated.timing(borderColor, {
          toValue: 3,
          duration: 300,
          useNativeDriver: false,
        }).start();

        Animated.spring(pulseAnim, {
          toValue: 1,
          useNativeDriver: false,
        }).start();
        break;

      default:
        Animated.spring(pulseAnim, {
          toValue: 1,
          useNativeDriver: false,
        }).start();

        borderColor.setValue(0);
        break;
    }

    return () => {
      pulseLoop.current?.stop();
    };
  }, [livenessState, pulseAnim, borderColor]);

  const showCamera = livenessState !== LivenessState.IDLE;

  return (
    <View style={styles.wrapper}>
      <Animated.View
        style={[
          styles.outerRing,
          {
            borderColor: borderColorStr,
            transform: [{ scale: pulseAnim }],
          },
        ]}
      >
        <View style={styles.inner}>
          {showCamera && cameraComponent ? (
            cameraComponent
          ) : (
            <Ionicons
              name="videocam-outline"
              size={44}
              color={Colors.gray300}
            />
          )}
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 24,
  },

  outerRing: {
    width: FRAME_SIZE + 16,
    height: FRAME_SIZE + 16,
    borderRadius: (FRAME_SIZE + 16) / 2,
    borderWidth: 5,
    borderColor: Colors.blue,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },

  inner: {
    width: FRAME_SIZE,
    height: FRAME_SIZE,
    borderRadius: FRAME_SIZE / 2,
    backgroundColor: Colors.blueLight,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
});
