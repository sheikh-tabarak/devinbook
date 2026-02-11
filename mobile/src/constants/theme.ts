// Design System - Matching Web App
// This matches the exact colors and styling from the web application

export const COLORS = {
    // Primary Colors (matching web app gradient)
    primary: '#8B5CF6',
    primaryDark: '#7C3AED',
    primaryLight: '#A78BFA',
    secondary: '#D946EF',
    secondaryDark: '#C026D3',

    // Gradient
    gradientStart: '#8B5CF6',
    gradientMiddle: '#A855F7',
    gradientEnd: '#D946EF',

    // Neutral Colors
    white: '#FFFFFF',
    black: '#000000',

    // Gray Scale
    gray50: '#F8FAFC',
    gray100: '#F1F5F9',
    gray200: '#E2E8F0',
    gray300: '#CBD5E1',
    gray400: '#94A3B8',
    gray500: '#64748B',
    gray600: '#475569',
    gray700: '#334155',
    gray800: '#1E293B',
    gray900: '#0F172A',

    // Semantic Colors
    success: '#10B981',
    successLight: '#D1FAE5',
    error: '#EF4444',
    errorLight: '#FEE2E2',
    warning: '#F59E0B',
    warningLight: '#FEF3C7',
    info: '#3B82F6',
    infoLight: '#DBEAFE',

    // Background
    background: '#FFFFFF',
    backgroundDark: '#0F172A',
    surface: '#F8FAFC',
    surfaceDark: '#1E293B',

    // Text
    textPrimary: '#0F172A',
    textSecondary: '#64748B',
    textTertiary: '#94A3B8',
    textInverse: '#FFFFFF',

    // Border
    border: '#E2E8F0',
    borderDark: '#334155',
};

export const SPACING = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
};

export const BORDER_RADIUS = {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
    full: 9999,
};

export const FONT_SIZES = {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
    xxl: 20,
    xxxl: 24,
    display: 32,
    hero: 48,
};

export const FONT_WEIGHTS: {
    regular: '400';
    medium: '500';
    semibold: '600';
    bold: '700';
    extrabold: '800';
    black: '900';
} = {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
};

export const SHADOWS = {
    sm: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    md: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    lg: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 16,
        elevation: 8,
    },
    xl: {
        shadowColor: '#8B5CF6',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.2,
        shadowRadius: 24,
        elevation: 12,
    },
};

export const LAYOUT = {
    screenPadding: SPACING.md,
    containerMaxWidth: 1200,
    headerHeight: 60,
    tabBarHeight: 60,
};

// Theme object for easy access
export const theme = {
    colors: COLORS,
    spacing: SPACING,
    borderRadius: BORDER_RADIUS,
    fontSize: FONT_SIZES,
    fontWeight: FONT_WEIGHTS,
    shadows: SHADOWS,
    layout: LAYOUT,
};

export type Theme = typeof theme;
