import { extractMs } from './utils.js';
import tokens from '../tokens/utils/tokenUtils.js';

// Safe duration extraction from token value
export const getDurationInMs = (tokenName, fallback = 200) => {
  try {
    const tokenValue = tokens[tokenName];
    if (typeof tokenValue === 'string') {
      const extracted = extractMs(tokenValue);
      return extracted || fallback;
    }
    return fallback;
  } catch (e) {
    console.error(`Error extracting duration for ${tokenName}:`, e);
    return fallback;
  }
};

// Safe conversion from ms to seconds
export const msToSeconds = (ms) => {
  return typeof ms === 'number' ? ms / 1000 : 0.2;
};

export const getBottomSheetTransitionConfig = (tokens) => ({
  type: "tween",
  duration: extractMs(tokens.BOTTOM_SHEET_ENTER_DURATION) / 1000,
  ease: tokens.BOTTOM_ENTER_EASING
});

export const getBottomSheetExitConfig = (tokens) => ({
  type: "tween",
  duration: extractMs(tokens.BOTTOM_SHEET_EXIT_DURATION) / 1000,
  ease: tokens.BOTTOM_EXIT_EASING
});

export const getOverlayAnimationConfig = (tokens) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: {
    duration: extractMs(tokens.BOTTOM_SHEET_OVERLAY_ENTER_DURATION) / 1000,
    ease: tokens.BOTTOM_SHEET_OVERLAY_ENTER_EASING
  }
});

export const getOverlayExitConfig = (tokens) => ({
  duration: extractMs(tokens.BOTTOM_SHEET_OVERLAY_EXIT_DURATION) / 1000,
  ease: tokens.BOTTOM_SHEET_OVERLAY_EXIT_EASING
});

export const getSheetAnimationConfig = (tokens) => ({
  initial: { y: "100%" },
  animate: { y: 0 },
  exit: { y: "100%" },
  transition: {
    duration: extractMs(tokens.BOTTOM_SHEET_ENTER_DURATION) / 1000,
    ease: tokens.BOTTOM_ENTER_EASING
  },
  exitTransition: {
    duration: extractMs(tokens.BOTTOM_SHEET_EXIT_DURATION) / 1000,
    ease: tokens.BOTTOM_EXIT_EASING
  }
});

// For creating static exports, get tokens at module load time
const staticTokens = tokens;

// Export pre-configured animations with current CSS variable values
export const bottomSheetAnimationConfig = getBottomSheetTransitionConfig(staticTokens);
export const overlayAnimation = getOverlayAnimationConfig(staticTokens);
export const sheetAnimation = getSheetAnimationConfig(staticTokens);
export const overlayExitConfig = getOverlayExitConfig(staticTokens);
export const bottomSheetExitConfig = getBottomSheetExitConfig(staticTokens);
