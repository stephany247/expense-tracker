import { useState, useCallback, useRef } from "react";
import { runOnJS } from "react-native-reanimated";

// Proper enum (better than plain object)
export enum LivenessState {
  IDLE = "IDLE",
  DETECTING = "DETECTING",
  FACE_DETECTED = "FACE_DETECTED",
  BLINKING = "BLINKING",
  VERIFIED = "VERIFIED",
  FAILED = "FAILED",
}

type FaceBox = {
  x: number;
  y: number;
  w: number;
  h: number;
};

type Face = {
  bounds?: {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
  };
  leftEyeOpenProbability?: number;
  rightEyeOpenProbability?: number;
};

const BLINK_THRESHOLD = 0.25;
const OPEN_THRESHOLD = 0.65;
const BLINKS_REQUIRED = 2;
const MAX_ATTEMPTS = 3;
const DETECT_TIMEOUT_MS = 15000;

export default function useFaceLiveness() {
  const [livenessState, setLivenessState] = useState<LivenessState>(
    LivenessState.IDLE,
  );
  const [blinkCount, setBlinkCount] = useState<number>(0);
  const [attemptCount, setAttemptCount] = useState<number>(0);
  const [faceBox, setFaceBox] = useState<FaceBox | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // ✅ FIX: useRef (JS thread)
  const eyeWasClosedRef = useRef<boolean>(false);
  const blinkCountRef = useRef<number>(0);
  const detectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isActiveRef = useRef<boolean>(false);

  // ── Safe setters ─────────────────────────
  const _setStateSafe = useCallback(
    (s: LivenessState) => setLivenessState(s),
    [],
  );

  const _incrementBlink = useCallback(() => {
    blinkCountRef.current += 1;
    setBlinkCount(blinkCountRef.current);

    if (blinkCountRef.current >= BLINKS_REQUIRED) {
      isActiveRef.current = false;
      if (detectTimerRef.current) clearTimeout(detectTimerRef.current);
      setLivenessState(LivenessState.VERIFIED);
    }
  }, []);

  // ── Start detection ──────────────────────
  const startDetection = useCallback(() => {
    if (attemptCount >= MAX_ATTEMPTS) {
      setLivenessState(LivenessState.FAILED);
      setErrorMessage("Maximum attempts reached.");
      return;
    }

    blinkCountRef.current = 0;
    eyeWasClosedRef.current = false;

    setBlinkCount(0);
    setFaceBox(null);
    setErrorMessage("");
    isActiveRef.current = true;

    setAttemptCount((prev) => prev + 1);
    setLivenessState(LivenessState.DETECTING);

    if (detectTimerRef.current) clearTimeout(detectTimerRef.current);

    detectTimerRef.current = setTimeout(() => {
      if (isActiveRef.current && livenessState !== LivenessState.VERIFIED) {
        isActiveRef.current = false;
        setLivenessState(LivenessState.FAILED);
        setErrorMessage("No face detected.");
      }
    }, DETECT_TIMEOUT_MS);
  }, [attemptCount, livenessState]);

  // ── Stop ────────────────────────────────
  const stopDetection = useCallback(() => {
    isActiveRef.current = false;
    if (detectTimerRef.current) clearTimeout(detectTimerRef.current);
  }, []);

  // ── Reset ───────────────────────────────
  const reset = useCallback(() => {
    stopDetection();
    blinkCountRef.current = 0;
    eyeWasClosedRef.current = false;

    setLivenessState(LivenessState.IDLE);
    setBlinkCount(0);
    setFaceBox(null);
    setAttemptCount(0);
    setErrorMessage("");
  }, [stopDetection]);

  // ── Frame processor ─────────────────────
  // const onFacesDetected = useCallback(
  //   (faces: Face[]) => {
  //     "worklet";

  //     // ❗ IMPORTANT FIX
  //     // Worklet cannot read useRef safely → pass via runOnJS OR simplify
  //     if (!faces || faces.length === 0) return;

  //     const face = faces[0];

  //     const box = {
  //       x: face.bounds?.x ?? 0,
  //       y: face.bounds?.y ?? 0,
  //       w: face.bounds?.width ?? 0,
  //       h: face.bounds?.height ?? 0,
  //     };

  //     runOnJS(setFaceBox)(box);
  //     runOnJS(_setStateSafe)(LivenessState.FACE_DETECTED);

  //     const left = face.leftEyeOpenProbability ?? 1;
  //     const right = face.rightEyeOpenProbability ?? 1;
  //     const avg = (left + right) / 2;

  //     runOnJS(handleBlinkLogic)(avg);
  //   },
  //   [_setStateSafe],
  // );

const processFaces = useCallback((faces: any[]) => {
  if (!isActiveRef.current || !faces || faces.length === 0) return;  // isActive → isActiveRef

  const face = faces[0];
  setLivenessState(LivenessState.FACE_DETECTED);

  const leftOpen = face.leftEyeOpenProbability ?? 1;
  const rightOpen = face.rightEyeOpenProbability ?? 1;
  const avgOpen = (leftOpen + rightOpen) / 2;

  if (!eyeWasClosedRef.current && avgOpen < BLINK_THRESHOLD) {  // eyeWasClosed → eyeWasClosedRef
    eyeWasClosedRef.current = true;
    setLivenessState(LivenessState.BLINKING);
  } else if (eyeWasClosedRef.current && avgOpen > OPEN_THRESHOLD) {
    eyeWasClosedRef.current = false;
    blinkCountRef.current += 1;
    setBlinkCount(blinkCountRef.current);

    if (blinkCountRef.current >= BLINKS_REQUIRED) {
      isActiveRef.current = false;
      if (detectTimerRef.current) clearTimeout(detectTimerRef.current);  // detectTimer → detectTimerRef
      setLivenessState(LivenessState.VERIFIED);
    }
  }
}, []);

  // ✅ Move blink logic to JS thread
  const handleBlinkLogic = (avgOpen: number) => {
    if (!eyeWasClosedRef.current && avgOpen < BLINK_THRESHOLD) {
      eyeWasClosedRef.current = true;
      setLivenessState(LivenessState.BLINKING);
    } else if (eyeWasClosedRef.current && avgOpen > OPEN_THRESHOLD) {
      eyeWasClosedRef.current = false;
      _incrementBlink();
    }
  };

  return {
    livenessState,
    blinkCount,
    blinkCountRequired: BLINKS_REQUIRED,
    attemptCount,
    maxAttempts: MAX_ATTEMPTS,
    faceBox,
    errorMessage,
    startDetection,
    stopDetection,
    reset,
    processFaces,
    isDetecting:
      livenessState === LivenessState.DETECTING ||
      livenessState === LivenessState.FACE_DETECTED ||
      livenessState === LivenessState.BLINKING,
  };
}