import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from '../contexts/AppContext';
import { BottomNav } from '../components/BottomNav';

export function ManageScreen() {
    const { navigateTo, isDarkMode } = useContext(AppContext);

    return (
        <View style={[styles.container, isDarkMode && styles.containerDark]}>
            <LinearGradient
                colors={['#8B5CF6', '#A855F7', '#D946EF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.header}
            >
                <Text style={styles.headerTitle}>Manage</Text>
                <Text style={styles.headerSubtitle}>Categories & Accounts</Text>
            </LinearGradient>

            <ScrollView style={styles.content}>
                <TouchableOpacity
                    style={[styles.menuItem, isDarkMode && styles.menuItemDark]}
                    onPress={() => navigateTo('categories')}
                >
                    <View style={[styles.menuIconContainer, isDarkMode && styles.menuIconContainerDark]}>
                        <Ionicons name="folder-open" size={28} color="#8B5CF6" />
                    </View>
                    <View style={styles.menuTextContainer}>
                        <Text style={[styles.menuTitle, isDarkMode && styles.textWhite]}>Categories</Text>
                        <Text style={[styles.menuSubtitle, isDarkMode && styles.textGray]}>Manage income & expense categories</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.menuItem, isDarkMode && styles.menuItemDark]}
                    onPress={() => navigateTo('accounts')}
                >
                    <View style={[styles.menuIconContainer, isDarkMode && styles.menuIconContainerDark]}>
                        <Ionicons name="wallet" size={28} color="#8B5CF6" />
                    </View>
                    <View style={styles.menuTextContainer}>
                        <Text style={[styles.menuTitle, isDarkMode && styles.textWhite]}>Accounts</Text>
                        <Text style={[styles.menuSubtitle, isDarkMode && styles.textGray]}>Manage your bank accounts</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
                </TouchableOpacity>
            </ScrollView>

            {/* Bottom Navigation */}
            <BottomNav activeScreen="manage" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    header: {
        paddingTop: 60,
        paddingBottom: 24,
        paddingHorizontal: 24,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '900',
        color: '#FFFFFF',
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#FFFFFF',
        opacity: 0.9,
        marginTop: 4,
    },
    content: {
        flex: 1,
        padding: 16,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 20,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    menuIconContainer: {
        width: 56,
        height: 56,
        borderRadius: 16,
        backgroundColor: '#F1F5F9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuIcon: {
        fontSize: 28,
    },
    menuTextContainer: {
        flex: 1,
        marginLeft: 16,
    },
    menuTitle: {
        fontSize: 16,
        fontWeight: '900',
        color: '#0F172A',
    },
    menuSubtitle: {
        fontSize: 12,
        color: '#64748B',
        marginTop: 2,
    },
    menuArrow: {
        fontSize: 20,
        color: '#94A3B8',
    },
    bottomNav: {
        height: 80,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#E2E8F0',
        paddingBottom: 20,
        paddingTop: 8,
    },
    navItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    navIcon: {
        fontSize: 24,
        opacity: 0.5,
    },
    navIconActive: {
        fontSize: 24,
    },
    navLabel: {
        fontSize: 10,
        fontWeight: '600',
        color: '#94A3B8',
        marginTop: 4,
    },
    navLabelActive: {
        fontSize: 10,
        fontWeight: '700',
        color: '#8B5CF6',
        marginTop: 4,
    },
    // Dark Mode Styles
    containerDark: {
        backgroundColor: '#0F172A',
    },
    menuItemDark: {
        backgroundColor: '#1E293B',
    },
    menuIconContainerDark: {
        backgroundColor: '#0F172A',
    },
    textWhite: {
        color: '#FFFFFF',
    },
    textGray: {
        color: '#94A3B8',
    },
});
