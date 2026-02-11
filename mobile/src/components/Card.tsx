import React, { useContext } from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { COLORS, BORDER_RADIUS, FONT_SIZES, FONT_WEIGHTS, SHADOWS, SPACING } from '../constants/theme';
import { AppContext } from '../contexts/AppContext';

interface CardProps {
    children: React.ReactNode;
    title?: string;
    subtitle?: string;
    style?: ViewStyle;
    headerRight?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
    children,
    title,
    subtitle,
    style,
    headerRight,
}) => {
    const { isDarkMode } = useContext(AppContext);

    return (
        <View style={[styles.card, isDarkMode && styles.cardDark, style]}>
            {(title || subtitle || headerRight) && (
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        {title && <Text style={[styles.title, isDarkMode && styles.textWhite]}>{title}</Text>}
                        {subtitle && <Text style={[styles.subtitle, isDarkMode && styles.textGray]}>{subtitle}</Text>}
                    </View>
                    {headerRight && <View style={styles.headerRight}>{headerRight}</View>}
                </View>
            )}
            <View style={styles.content}>{children}</View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.white,
        borderRadius: BORDER_RADIUS.xl,
        padding: SPACING.lg,
        ...SHADOWS.md,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: SPACING.md,
    },
    headerLeft: {
        flex: 1,
    },
    headerRight: {
        marginLeft: SPACING.md,
    },
    title: {
        fontSize: FONT_SIZES.xl,
        fontWeight: FONT_WEIGHTS.bold,
        color: COLORS.textPrimary,
        marginBottom: SPACING.xs,
    },
    subtitle: {
        fontSize: FONT_SIZES.sm,
        color: COLORS.textSecondary,
    },
    content: {
        // Content styles
    },
    // Dark Mode
    cardDark: {
        backgroundColor: COLORS.surfaceDark,
    },
    textWhite: {
        color: COLORS.white,
    },
    textGray: {
        color: COLORS.gray400,
    },
});
