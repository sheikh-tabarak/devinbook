import React, { useContext } from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
    ViewStyle,
    TextStyle,
    TouchableOpacityProps,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, BORDER_RADIUS, FONT_SIZES, FONT_WEIGHTS, SHADOWS } from '../constants/theme';
import { AppContext } from '../contexts/AppContext';

interface ButtonProps extends TouchableOpacityProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    loading?: boolean;
    disabled?: boolean;
    fullWidth?: boolean;
    icon?: React.ReactNode;
    style?: ViewStyle;
    textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
    title,
    onPress,
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
    fullWidth = false,
    icon,
    style,
    textStyle,
    ...props
}) => {
    const { isDarkMode } = useContext(AppContext);
    const isDisabled = disabled || loading;

    const getButtonStyle = (): ViewStyle => {
        const baseStyle: ViewStyle = {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: BORDER_RADIUS.lg,
            ...SHADOWS.md,
        };

        // Size
        switch (size) {
            case 'sm':
                baseStyle.paddingVertical = 8;
                baseStyle.paddingHorizontal = 16;
                baseStyle.minHeight = 36;
                break;
            case 'lg':
                baseStyle.paddingVertical = 16;
                baseStyle.paddingHorizontal = 32;
                baseStyle.minHeight = 56;
                break;
            default:
                baseStyle.paddingVertical = 12;
                baseStyle.paddingHorizontal = 24;
                baseStyle.minHeight = 44;
        }

        // Variant
        switch (variant) {
            case 'secondary':
                baseStyle.backgroundColor = isDarkMode ? COLORS.surfaceDark : COLORS.gray100;
                break;
            case 'outline':
                baseStyle.backgroundColor = 'transparent';
                baseStyle.borderWidth = 2;
                baseStyle.borderColor = COLORS.primary;
                break;
            case 'ghost':
                baseStyle.backgroundColor = 'transparent';
                baseStyle.shadowOpacity = 0;
                baseStyle.elevation = 0;
                break;
        }

        if (fullWidth) {
            baseStyle.width = '100%';
        }

        if (isDisabled) {
            baseStyle.opacity = 0.5;
        }

        return baseStyle;
    };

    const getTextStyle = (): TextStyle => {
        const baseTextStyle: TextStyle = {
            fontWeight: FONT_WEIGHTS.bold,
            textAlign: 'center',
        };

        // Size
        switch (size) {
            case 'sm':
                baseTextStyle.fontSize = FONT_SIZES.sm;
                break;
            case 'lg':
                baseTextStyle.fontSize = FONT_SIZES.xl;
                break;
            default:
                baseTextStyle.fontSize = FONT_SIZES.md;
        }

        // Variant
        switch (variant) {
            case 'primary':
                baseTextStyle.color = COLORS.white;
                break;
            case 'secondary':
                baseTextStyle.color = isDarkMode ? COLORS.white : COLORS.textPrimary;
                break;
            case 'outline':
                baseTextStyle.color = COLORS.primary;
                break;
            case 'ghost':
                baseTextStyle.color = COLORS.primary;
                break;
        }

        return baseTextStyle;
    };

    const renderContent = () => (
        <>
            {loading ? (
                <ActivityIndicator
                    color={variant === 'primary' ? COLORS.white : COLORS.primary}
                    size="small"
                />
            ) : (
                <>
                    {icon && <>{icon}</>}
                    <Text style={[getTextStyle(), textStyle, icon ? { marginLeft: 8 } : undefined]}>
                        {title}
                    </Text>
                </>
            )}
        </>
    );

    if (variant === 'primary') {
        return (
            <TouchableOpacity
                onPress={onPress}
                disabled={isDisabled}
                activeOpacity={0.8}
                style={[getButtonStyle(), style]}
                {...props}
            >
                <LinearGradient
                    colors={[COLORS.gradientStart, COLORS.gradientMiddle, COLORS.gradientEnd]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{
                        ...StyleSheet.absoluteFillObject,
                        borderRadius: BORDER_RADIUS.lg,
                    }}
                />
                {renderContent()}
            </TouchableOpacity>
        );
    }

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={isDisabled}
            activeOpacity={0.7}
            style={[getButtonStyle(), style]}
            {...props}
        >
            {renderContent()}
        </TouchableOpacity>
    );
};
