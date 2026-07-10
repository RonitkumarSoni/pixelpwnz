// Design System tokens from design.md
// DO NOT use hardcoded hex values in components. Always use these tokens.

export const Colors = {
  // We're adopting the Web Glassmorphism Light theme as default for mobile
  bg: '#F5F4FA',
  bgLavender: '#ECEAF8',
  surface: '#FFFFFF',
  surfaceElevated: '#FAFAFA',
  border: '#EDEDF5',
  
  primarySolid: '#6C5CE7',
  primaryLight: '#8B7CF7',
  primaryGlow: 'rgba(108, 92, 231, 0.06)',
  
  text: '#12121A',
  textSecondary: '#6B6F8A',
  textMuted: '#9B9FB5',
  
  success: '#10B981',
  error: '#EF4444',

  glass: {
    bg: 'rgba(255, 255, 255, 0.55)',
    border: 'rgba(255, 255, 255, 0.7)',
    tint: 'light' as const, // For expo-blur
    intensity: 20, // For expo-blur
  }
} as const;

// Primary Gradient: #5F5AFF → #9155FF
export const Gradients = {
  primary: ['#5F5AFF', '#9155FF'] as const,
  primaryStart: { x: 0, y: 0 },
  primaryEnd: { x: 1, y: 1 },
} as const;

// Spacing based on 8px grid
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
  '3xl': 40,
  '4xl': 48,
  '5xl': 64,
} as const;

// Typography - Uses system fonts (SF Pro on iOS, Roboto on Android)
export const Typography = {
  h1: { fontSize: 42, lineHeight: 48, fontWeight: '800' as const, letterSpacing: -1 },
  h2: { fontSize: 24, lineHeight: 31, fontWeight: '700' as const },
  h3: { fontSize: 18, lineHeight: 25, fontWeight: '700' as const },
  bodyLarge: { fontSize: 17, lineHeight: 26, fontWeight: '400' as const },
  body: { fontSize: 15, lineHeight: 23, fontWeight: '400' as const },
  small: { fontSize: 13, lineHeight: 18, fontWeight: '500' as const },
} as const;

// Border Radii
export const Radii = {
  card: 18,
  button: 9999, // Fully pill
  bubble: 18,
  input: 12,
  sm: 8,
  md: 12,
  lg: 20,
} as const;

// Touch target minimum (Apple HIG)
export const MIN_TOUCH_TARGET = 44;
