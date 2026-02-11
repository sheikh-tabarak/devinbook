import React, { useContext } from 'react';
import {
    TextInput,
    View,
    Text,
    StyleSheet,
    TextInputProps,
    ViewStyle,
} from 'react-native';
import { COLORS, BORDER_RADIUS, FONT_SIZES, SPACING } from '../constants/theme';
import { AppContext } from '../contexts/AppContext';

interface InputProps extends TextInputProps {
    label?: string;
    error?: string;
    containerStyle?: ViewStyle;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
    label,
    error,
    containerStyle,
    leftIcon,
    rightIcon,
    style,
    ...props
}) => {
    const { isDarkMode } = useContext(AppContext);

    return (
        <View style={[styles.container, containerStyle]}>
            {label && <Text style={[styles.label, isDarkMode && styles.textGray]}>{label}</Text>}
            <View style={[
                styles.inputContainer,
                isDarkMode && styles.inputContainerDark,
                error && styles.inputError
            ]}>
                {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
                <TextInput
                    style={[
                        styles.input,
                        isDarkMode && styles.textWhite,
                        leftIcon ? styles.inputWithLeftIcon : undefined,
                        style
                    ]}
                    placeholderTextColor={isDarkMode ? COLORS.gray500 : COLORS.gray400}
                    {...props}
                />
                {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
            </View>
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: SPACING.md,
    },
    label: {
        fontSize: FONT_SIZES.sm,
        fontWeight: '600',
        color: COLORS.textPrimary,
        marginBottom: SPACING.xs,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.gray50,
        borderRadius: BORDER_RADIUS.lg,
        borderWidth: 2,
        borderColor: COLORS.border,
    },
    inputError: {
        borderColor: COLORS.error,
    },
    input: {
        flex: 1,
        paddingVertical: SPACING.md,
        paddingHorizontal: SPACING.md,
        fontSize: FONT_SIZES.md,
        color: COLORS.textPrimary,
    },
    inputWithLeftIcon: {
        paddingLeft: SPACING.xs,
    },
    leftIcon: {
        paddingLeft: SPACING.md,
    },
    rightIcon: {
        paddingRight: SPACING.md,
    },
    errorText: {
        fontSize: FONT_SIZES.xs,
        color: COLORS.error,
        marginTop: SPACING.xs,
    },
    // Dark Mode
    textGray: {
        color: COLORS.gray400,
    },
    inputContainerDark: {
        backgroundColor: COLORS.backgroundDark,
        borderColor: COLORS.borderDark,
    },
    textWhite: {
        color: COLORS.white,
    },
});
