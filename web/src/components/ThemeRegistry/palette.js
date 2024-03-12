"use client";

import { alpha } from "@mui/material/styles";

function createGradient(color1, color2) {
  return `linear-gradient(to bottom, ${color1}, ${color2})`;
}

// SETUP COLORS
const PRIMARY_LIGHT = {
  lighter: "#C4CDD5",
  light: "#919EAB",
  main: "#637381",
  dark: "#454F5B",
  darker: "#212B36",
};
const SECONDARY = {
  lighter: "#C4CDD5",
  light: "#919EAB",
  main: "#637381",
  dark: "#454F5B",
  darker: "#212B36",
};
const INFO = {
  lighter: "#D0F2FF",
  light: "#74CAFF",
  main: "#1890FF",
  dark: "#0C53B7",
  darker: "#04297A",
};
const SUCCESS = {
  lighter: "#E9FCD4",
  light: "#AAF27F",
  main: "#54D62C",
  dark: "#229A16",
  darker: "#08660D",
};
const WARNING = {
  lighter: "#FFF7CD",
  light: "#FFE16A",
  main: "#FFC107",
  dark: "#B78103",
  darker: "#7A4F01",
};
const ERROR = {
  lighter: "#FFE7D9",
  light: "#FFA48D",
  main: "#FF4842",
  dark: "#B72136",
  darker: "#7A0C2E",
};

const GREY = {
  0: "#FFFFFF",
  100: "#F9FAFB",
  200: "#F4F6F8",
  300: "#DFE3E8",
  400: "#C4CDD5",
  500: "#919EAB",
  600: "#637381",
  700: "#454F5B",
  800: "#1e1e1e",
  900: "#111111",
  500_8: alpha("#919EAB", 0.08),
  500_12: alpha("#919EAB", 0.12),
  500_16: alpha("#919EAB", 0.16),
  500_24: alpha("#919EAB", 0.24),
  500_32: alpha("#919EAB", 0.32),
  500_48: alpha("#919EAB", 0.48),
  500_56: alpha("#919EAB", 0.56),
  500_80: alpha("#919EAB", 0.8),
};

const GRADIENTS = {
  primary: createGradient(PRIMARY_LIGHT.light, PRIMARY_LIGHT.main), // TODO: define PRIMARY_DARK palette
  info: createGradient(INFO.light, INFO.main),
  success: createGradient(SUCCESS.light, SUCCESS.main),
  warning: createGradient(WARNING.light, WARNING.main),
  error: createGradient(ERROR.light, ERROR.main),
};

const CHART_COLORS = {
  violet: ["#826AF9", "#9E86FF", "#D0AEFF", "#F7D2FF"],
  blue: ["#2D99FF", "#83CFFF", "#A5F3FF", "#CCFAFF"],
  green: ["#2CD9C5", "#60F1C8", "#A4F7CC", "#C0F2DC"],
  yellow: ["#FFE700", "#FFEF5A", "#FFF7AE", "#FFF3D6"],
  red: ["#FF6C40", "#FF8F6D", "#FFBD98", "#FFF2D4"],
};

const COMMON = {
  common: { black: "#000", white: "#fff" },
  secondary: { ...SECONDARY, contrastText: "#fff" },
  info: { ...INFO, contrastText: "#fff" },
  success: { ...SUCCESS, contrastText: GREY[800] },
  warning: { ...WARNING, contrastText: GREY[800] },
  error: { ...ERROR, contrastText: "#fff" },
  grey: GREY,
  gradients: GRADIENTS,
  chart: CHART_COLORS,
  divider: "#000",
  action: {
    hover: PRIMARY_LIGHT.light,
    selected: GREY[500_16],
    disabled: GREY[500_80],
    disabledBackground: GREY[500_24],
    focus: GREY[500_24],
    hoverOpacity: 0.08,
    disabledOpacity: 0.1,
  },
};

const palette = {
  light: {
    ...COMMON,
    primary: { ...PRIMARY_LIGHT, contrastText: "#fff" },
    mode: "light",
    text: {
      primary: GREY[900],
      secondary: GREY[800],
      disabled: GREY[600],
      light: GREY[300],
      lighter: GREY[100],
      menu: "#004720",
      opposite: "#fff",
    },
    background: {
      paper: "#A6CF98",
      default: "#E0F2FF",
      neutral: "#E0F2FF",
      menu: "#004720",
    },
    action: { active: GREY[600], ...COMMON.action },
    accent: PRIMARY_LIGHT.main,
  },
  dark: {
    ...COMMON,
    primary: { ...PRIMARY_LIGHT, contrastText: "#fff" }, // TODO: define PRIMARY_DARK palette
    mode: "dark",
    text: {
      primary: "#e3e3e3",
      secondary: alpha(GREY[400], 0.82),
      disabled: GREY[600],
    },
    background: {
      paper: GREY[800],
      default: "#111111",
      neutral: GREY[500_16],
      menu: "#e74c3c",
    },
    action: { active: GREY[500], ...COMMON.action },
    accent: PRIMARY_LIGHT.main, // TODO: define PRIMARY_DARK palette
  },
};

export default palette;
