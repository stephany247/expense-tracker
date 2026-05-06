import React, { useCallback, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { Camera, useCameraDevices, useFrameProcessor } from "react-native-vision-camera";
import { useFaceDetector } from "react-native-vision-camera-face-detector";

import FaceFrame from "@/components/security/FaceFrame";
import BlinkPrompt from "@/components/security/BlinkPrompt";
import LivenessButton from "@/components/security/LivenessButton";
import CameraPermissionGate from "@/components/security/CameraPermissionGate";
import { Colors } from "@/constants/theme";
import useFaceLiveness, { LivenessState } from "@/hooks/useFaceLiveness";
import { router } from "expo-router";



export default function IdentityVerificationScreen() {
  const insets = useSafeAreaInsets();

  const {
    livenessState,
    blinkCount,
    blinkCountRequired,
    attemptCount,
    maxAttempts,
    errorMessage,
    startDetection,
    stopDetection,
    reset,
    onFacesDetected,
    isDetecting,
  } = useFaceLiveness();

  // ── Camera setup ─────────────────────────
  const devices = useCameraDevices();
  const device = devices.front;

  const { detectFaces } = useFaceDetector({
    performanceMode: "fast",
    trackingEnabled: true,
  });

  // ── Frame processor ──────────────────────
  const frameProcessor = useFrameProcessor(
    (frame) => {
      "worklet";
      const faces = detectFaces(frame);
      onFacesDetected(faces);
    },
    [onFacesDetected],
  );

  // ── Button logic ─────────────────────────
  const handleButtonPress = useCallback(() => {
    if (livenessState === LivenessState.VERIFIED) {
      router.replace("/(tabs)")
    } else if (livenessState === LivenessState.FAILED) {
      if (attemptCount >= maxAttempts) {
        Alert.alert(
          "Too Many Attempts",
          "Please try again later or contact support.",
          [{ text: "OK", onPress: () => router.back() }],
        );
      } else {
        reset();
      }
    }
  }, [livenessState, attemptCount, maxAttempts, router, reset]);

  // ── Frame tap ────────────────────────────
  const handleFramePress = useCallback(() => {
    if (
      livenessState === LivenessState.IDLE ||
      livenessState === LivenessState.FAILED
    ) {
      startDetection();
    }
  }, [livenessState, startDetection]);

  // ── Camera render ────────────────────────
  const cameraView = useMemo(() => {
    if (!device || !isDetecting) return null;

    return (
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={isDetecting}
        frameProcessor={frameProcessor}
      />
    );
  }, [device, isDetecting, frameProcessor]);

  // ── Status chip ──────────────────────────
  const chipText = useMemo(() => {
    switch (livenessState) {
      case LivenessState.VERIFIED:
        return "✓ Identity Confirmed";
      case LivenessState.FAILED:
        return errorMessage || "Verification failed";
      case LivenessState.DETECTING:
        return "Searching for face…";
      case LivenessState.FACE_DETECTED:
      case LivenessState.BLINKING:
        return `Blink ${blinkCount}/${blinkCountRequired} detected`;
      default:
        return "Center your face in the frame";
    }
  }, [livenessState, blinkCount, blinkCountRequired, errorMessage]);

  const chipStyle = useMemo(() => {
    if (livenessState === LivenessState.VERIFIED) return styles.chipVerified;
    if (livenessState === LivenessState.FAILED) return styles.chipFailed;
    return styles.chipDefault;
  }, [livenessState]);

  const chipTextStyle = useMemo(() => {
    if (livenessState === LivenessState.VERIFIED)
      return styles.chipTextVerified;
    if (livenessState === LivenessState.FAILED) return styles.chipTextFailed;
    return styles.chipTextDefault;
  }, [livenessState]);

  return (
    <CameraPermissionGate>
      <LinearGradient
        colors={["#E8EEFF", "#F4F6FF", "#F8F9FF"]}
        style={[styles.root, { paddingTop: insets.top }]}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          bounces={false}
          showsVerticalScrollIndicator={false}
        >
          {/* Icon */}
          <View style={styles.iconWrap}>
            <Ionicons name="happy-outline" size={32} color={Colors.blue} />
          </View>

          {/* Title */}
          <Text style={styles.title}>Identity Verification</Text>
          <Text style={styles.subtitle}>
            We need to perform a quick liveness check
          </Text>

          {/* Chip */}
          <View style={[styles.chip, chipStyle]}>
            <Ionicons
              name={
                livenessState === LivenessState.VERIFIED
                  ? "checkmark-circle"
                  : livenessState === LivenessState.FAILED
                    ? "alert-circle"
                    : "information-circle-outline"
              }
              size={15}
              color={
                livenessState === LivenessState.VERIFIED
                  ? Colors.success
                  : livenessState === LivenessState.FAILED
                    ? Colors.danger
                    : Colors.blue
              }
              style={{ marginRight: 6 }}
            />
            <Text style={[styles.chipText, chipTextStyle]}>{chipText}</Text>
          </View>

          {/* Face frame */}
          <Pressable onPress={handleFramePress} style={styles.framePressable}>
            <FaceFrame
              livenessState={livenessState}
              cameraComponent={cameraView}
            />
          </Pressable>

          {/* Blink prompt */}
          <BlinkPrompt
            livenessState={livenessState}
            blinkCount={blinkCount}
            blinkCountRequired={blinkCountRequired}
          />

          {/* CTA */}
          <View style={styles.btnWrap}>
            <LivenessButton
              livenessState={livenessState}
              onPress={handleButtonPress}
            />

            <Pressable
              onPress={() => {
                stopDetection();
                router.back();
              }}
              style={styles.cancelBtn}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>
          </View>
        </ScrollView>
      </LinearGradient>
    </CameraPermissionGate>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    alignItems: "center",
    paddingHorizontal: 24,
    paddingBottom: 32,
  },

  // ── Icon ──────────────────────────────────────────────────────────────────
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: Colors.blueLight,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 28,
    marginBottom: 20,
  },

  // ── Title ─────────────────────────────────────────────────────────────────
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: Colors.navy,
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.gray500,
    textAlign: "center",
    marginBottom: 20,
  },

  // ── Status chip ───────────────────────────────────────────────────────────
  chip: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 99,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 4,
  },
  chipDefault: { backgroundColor: Colors.blueLight },
  chipVerified: { backgroundColor: Colors.successLight },
  chipFailed: { backgroundColor: Colors.dangerLight },
  chipText: { fontSize: 13, fontWeight: "600" },
  chipTextDefault: { color: Colors.navy },
  chipTextVerified: { color: Colors.success },
  chipTextFailed: { color: Colors.danger },

  // ── Frame press area ──────────────────────────────────────────────────────
  framePressable: {
    alignItems: "center",
    width: "100%",
  },
  tapHint: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: -8,
    marginBottom: 8,
  },
  tapHintText: {
    fontSize: 12,
    color: Colors.gray400,
  },

  // ── Blink progress dots ───────────────────────────────────────────────────
  blinkDots: {
    flexDirection: "row",
    gap: 10,
    marginVertical: 8,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: Colors.blue,
    backgroundColor: "transparent",
  },
  dotFilled: {
    backgroundColor: Colors.blue,
  },

  // ── Encryption badge ──────────────────────────────────────────────────────
  encryptedBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surface,
    borderRadius: 99,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  encryptedText: {
    fontSize: 12,
    color: Colors.gray500,
    fontWeight: "500",
  },

  // ── Bottom section ────────────────────────────────────────────────────────
  btnWrap: {
    width: "100%",
    gap: 0,
  },
  cancelBtn: {
    alignItems: "center",
    paddingVertical: 18,
  },
  cancelText: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.blue,
  },
});
