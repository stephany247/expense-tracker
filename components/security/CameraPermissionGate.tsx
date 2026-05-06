import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, Linking } from "react-native";
import { Camera } from "react-native-vision-camera";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/theme";

type Props = {
  children: React.ReactNode;
};

type PermissionStatus = "not-determined" | "authorized" | "denied";

export default function CameraPermissionGate({ children }: Props) {
  const [status, setStatus] = useState<PermissionStatus>("not-determined");

  useEffect(() => {
    checkOrRequest();
  }, []);

  const checkOrRequest = async () => {
    const current = await Camera.getCameraPermissionStatus();

    if (current === "authorized") {
      setStatus("authorized");
    } else if (current === "not-determined") {
      const result = await Camera.requestCameraPermission();
      setStatus(result === "authorized" ? "authorized" : "denied");
    } else {
      setStatus("denied");
    }
  };

  if (status === "authorized") return <>{children}</>;

  return (
    <View style={styles.center}>
      <Ionicons
        name={status === "denied" ? "ban-outline" : "camera-outline"}
        size={48}
        color={status === "denied" ? Colors.danger : Colors.gray400}
      />

      <Text style={styles.title}>
        {status === "denied" ? "Camera Access Denied" : "Requesting Camera…"}
      </Text>

      {status === "denied" && (
        <>
          <Text style={styles.body}>
            Please enable camera access in your device Settings to use facial
            verification.
          </Text>

          <Pressable
            style={styles.retryBtn}
            onPress={() => Linking.openSettings()}
          >
            <Text style={styles.retryLabel}>Open Settings</Text>
          </Pressable>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
    gap: 12,
  },

  title: {
    fontSize: 17,
    fontWeight: "700",
    color: Colors.navy,
    textAlign: "center",
  },

  body: {
    fontSize: 14,
    color: Colors.gray500,
    textAlign: "center",
    lineHeight: 20,
  },

  retryBtn: {
    marginTop: 8,
    backgroundColor: Colors.blue,
    borderRadius: 12,
    paddingHorizontal: 28,
    paddingVertical: 12,
  },

  retryLabel: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
});
