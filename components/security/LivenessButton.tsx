import { LivenessState } from "@/hooks/useFaceLiveness";
import { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";
import { useEffect, useRef } from "react";
import {
    ActivityIndicator,
    Animated,
    Pressable,
    StyleSheet,
    Text,
} from "react-native";
import { Colors } from "../../constants/theme";

type IconName = ComponentProps<typeof Ionicons>["name"];

type Props = {
  livenessState: LivenessState;
  onPress: () => void;
};

type ButtonConfig = {
  colorIndex: number;
  enabled: boolean;
  label: string;
  showArrow: boolean;
  icon: IconName | null;
  loading: boolean;
  textColor: string;
};

export default function LivenessButton({ livenessState, onPress }: Props) {
  const bgAnim = useRef(new Animated.Value(0)).current;

  const config = getConfig(livenessState);

  useEffect(() => {
    Animated.timing(bgAnim, {
      toValue: config.colorIndex,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [livenessState, config.colorIndex, bgAnim]);

  const backgroundColor = bgAnim.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [Colors.gray200, Colors.blue, Colors.danger],
  });

  return (
    <Animated.View style={[styles.btn, { backgroundColor }]}>
      <Pressable
        onPress={config.enabled ? onPress : undefined}
        style={({ pressed }) => [
          styles.pressable,
          pressed && config.enabled && { opacity: 0.85 },
        ]}
        android_ripple={
          config.enabled ? { color: "rgba(255,255,255,0.2)" } : undefined
        }
      >
        {config.loading && (
          <ActivityIndicator
            color={config.textColor}
            size="small"
            style={{ marginRight: 8 }}
          />
        )}

        {config.icon && !config.loading && (
          <Ionicons
            name={config.icon}
            size={18}
            color={config.textColor}
            style={{ marginRight: 6 }}
          />
        )}

        <Text style={[styles.label, { color: config.textColor }]}>
          {config.label}
        </Text>

        {config.showArrow && (
          <Ionicons
            name="arrow-forward"
            size={18}
            color={config.textColor}
            style={{ marginLeft: 6 }}
          />
        )}
      </Pressable>
    </Animated.View>
  );
}

// ✅ Typed config function
function getConfig(state: LivenessState): ButtonConfig {
  switch (state) {
    case LivenessState.VERIFIED:
      return {
        colorIndex: 1,
        enabled: true,
        label: "Start Verification",
        showArrow: true,
        icon: null,
        loading: false,
        textColor: "#fff",
      };

    case LivenessState.FAILED:
      return {
        colorIndex: 2,
        enabled: true,
        label: "Try Again",
        showArrow: false,
        icon: "refresh-outline",
        loading: false,
        textColor: "#fff",
      };

    case LivenessState.DETECTING:
      return {
        colorIndex: 0,
        enabled: false,
        label: "Scanning…",
        showArrow: false,
        icon: null,
        loading: true,
        textColor: Colors.gray400,
      };

    case LivenessState.BLINKING:
      return {
        colorIndex: 0,
        enabled: false,
        label: "Verifying blink…",
        showArrow: false,
        icon: null,
        loading: true,
        textColor: Colors.gray400,
      };

    case LivenessState.FACE_DETECTED:
      return {
        colorIndex: 0,
        enabled: false,
        label: "Blink to verify",
        showArrow: false,
        icon: null,
        loading: false,
        textColor: Colors.gray400,
      };

    case LivenessState.IDLE:
    default:
      return {
        colorIndex: 0,
        enabled: false,
        label: "Start Verification",
        showArrow: true,
        icon: null,
        loading: false,
        textColor: Colors.gray400,
      };
  }
}

const styles = StyleSheet.create({
  btn: {
    borderRadius: 16,
    overflow: "hidden",
    marginTop: 4,
  },

  pressable: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 17,
    paddingHorizontal: 24,
  },

  label: {
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
});
