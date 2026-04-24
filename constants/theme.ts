export const Colors = {
  // Primary
  navy: "#00327D",
  navyMid: "#1A3A8F",
  blue: "#2152E8",
  blueBright: "#3366FF",
  blueLight: "#EEF3FF",
  blueGhost: "#F3F5F7",
  blueBg: "#F7F9FB",
  inputBg: "#F2F4F6",

  // Semantic
  success: "#0F6E3A",
  successLight: "#E6F7EE",
  successBright: "#12B76A",
  danger: "#BA1A1A",
  dangerLight: "#FFF0F0",
  warning: "#B45309",
  warningLight: "#FFF8EC",
  warningBright: "#F59E0B",

  // Neutrals
  gray50: "#F8F9FC",
  gray100: "#F0F2F7",
  gray200: "#E4E7EF",
  gray300: "#C9CFD8",
  gray400: "#9AA1AF",
  gray500: "#6B7280",
  gray600: "#4B5563",
  gray700: "#374151",
  gray800: "#1F2937",
  gray900: "#111827",

  // Backgrounds
  background: "#F0F2F7",
  surface: "#FFFFFF",
  surfaceSecondary: "#F8F9FC",

  // Text
  textPrimary: "#586377",
  textSecondary: "#737784",
  textTertiary: "#C3C6D5",
  textWhite: "#FFFFFF",
  textBlack: "#191C1E",

  // Chart colors
  chartNavy: "#0D2160",
  chartBlue: "#2152E8",
  chartGreen: "#12B76A",
  chartGray: "#C9CFD8",
  chartAmber: "#F59E0B",
  chartRed: "#E03131",
};

export const Typography = {
  // Sizes
  xs: 11,
  sm: 12,
  base: 14,
  md: 15,
  lg: 16,
  xl: 18,
  "2xl": 20,
  "3xl": 24,
  "4xl": 28,
  "5xl": 32,
  "6xl": 36,

  // Weights
  regular: "400" as const,
  medium: "500" as const,
  semibold: "600" as const,
  bold: "700" as const,
  extrabold: "800" as const,
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  "2xl": 24,
  "3xl": 32,
  "4xl": 40,
  "5xl": 48,
};

export const Radii = {
  xs: 6,
  sm: 8,
  md: 10,
  lg: 12,
  xl: 16,
  "2xl": 20,
  "3xl": 24,
  full: 9999,
};

export const Shadows = {
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  lg: {
    shadowColor: "#0D2160",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 8,
  },
  card: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
};
