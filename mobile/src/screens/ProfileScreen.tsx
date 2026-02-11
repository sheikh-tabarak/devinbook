import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Linking, Image, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { AppContext } from '../contexts/AppContext';
import { BottomNav } from '../components/BottomNav';
import { CONFIG } from '../constants/config';

export function ProfileScreen() {
    const { user, logout, navigateTo, isDarkMode, toggleDarkMode } = useContext(AppContext);

    const handleLogout = () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Logout', style: 'destructive', onPress: logout },
            ]
        );
    };

    const openWebsite = () => {
        Linking.openURL(CONFIG.DEVELOPER.WEBSITE);
    };

    return (
        <View style={[styles.container, isDarkMode && styles.containerDark]}>
            <LinearGradient
                colors={['#8B5CF6', '#A855F7', '#D946EF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.header}
            >
                <Text style={styles.headerTitle}>Profile</Text>
                <Text style={styles.headerSubtitle}>Manage your account</Text>
            </LinearGradient>

            <ScrollView style={styles.content}>
                {/* User Info Card */}
                <View style={[styles.userCard, isDarkMode && styles.userCardDark]}>
                    <View style={styles.avatar}>
                        <Image
                            source={{ uri: `https://api.dicebear.com/7.x/avataaars/png?seed=${user?.email || 'User'}&backgroundColor=8B5CF6&mood[]=happy&size=128` }}
                            style={styles.avatarImage}
                        />
                    </View>
                    <Text style={[styles.userName, isDarkMode && styles.textWhite]}>{user?.name}</Text>
                    <Text style={[styles.userEmail, isDarkMode && styles.textGray]}>{user?.email}</Text>
                </View>

                {/* App Settings */}
                <View style={[styles.section, isDarkMode && styles.sectionDark]}>
                    <Text style={[styles.sectionTitle, isDarkMode && styles.textWhite]}>App Settings</Text>
                    <View style={styles.infoItem}>
                        <View style={styles.infoLabelRow}>
                            <Ionicons name={isDarkMode ? "moon" : "sunny"} size={20} color={isDarkMode ? "#A855F7" : "#F59E0B"} />
                            <Text style={[styles.infoLabel, isDarkMode && styles.textGray]}>Dark Mode</Text>
                        </View>
                        <Switch
                            value={isDarkMode}
                            onValueChange={toggleDarkMode}
                            trackColor={{ false: '#E2E8F0', true: '#A855F7' }}
                            thumbColor={isDarkMode ? '#8B5CF6' : '#F1F5F9'}
                        />
                    </View>
                </View>

                {/* App Info */}
                <View style={[styles.section, isDarkMode && styles.sectionDark]}>
                    <Text style={[styles.sectionTitle, isDarkMode && styles.textWhite]}>App Information</Text>
                    <View style={[styles.infoItem, isDarkMode && styles.borderDark]}>
                        <Text style={[styles.infoLabel, isDarkMode && styles.textGray]}>Version</Text>
                        <Text style={[styles.infoValue, isDarkMode && styles.textWhite]}>{CONFIG.VERSION}</Text>
                    </View>
                    <TouchableOpacity style={[styles.infoItem, isDarkMode && styles.borderDark]} onPress={openWebsite}>
                        <Text style={[styles.infoLabel, isDarkMode && styles.textGray]}>Developer</Text>
                        <Text style={[styles.infoValue, { color: '#8B5CF6' }]}>{CONFIG.DEVELOPER.NAME}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.infoItem, isDarkMode && styles.borderDark]}
                        onPress={() => Linking.openURL(CONFIG.DEVELOPER.SUPPORT_URL)}
                    >
                        <Text style={[styles.infoLabel, isDarkMode && styles.textGray]}>Enterprise inquiry</Text>
                        <Text style={[styles.infoValue, { color: '#8B5CF6' }]}>Project Inquiry</Text>
                    </TouchableOpacity>
                </View>

                {/* Logout Button */}
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutButtonText}>Logout</Text>
                </TouchableOpacity>
            </ScrollView>

            {/* Bottom Navigation */}
            <BottomNav activeScreen="profile" />
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
    userCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 32,
        alignItems: 'center',
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#8B5CF6',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        overflow: 'hidden',
    },
    avatarImage: {
        width: 80,
        height: 80,
    },
    avatarText: {
        fontSize: 32,
        fontWeight: '900',
        color: '#FFFFFF',
    },
    userName: {
        fontSize: 24,
        fontWeight: '900',
        color: '#0F172A',
        marginBottom: 4,
    },
    userEmail: {
        fontSize: 14,
        color: '#64748B',
    },
    section: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 20,
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '900',
        color: '#0F172A',
        marginBottom: 16,
    },
    infoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    infoLabel: {
        fontSize: 14,
        color: '#64748B',
    },
    infoValue: {
        fontSize: 14,
        fontWeight: '700',
        color: '#0F172A',
    },
    logoutButton: {
        backgroundColor: '#EF4444',
        borderRadius: 16,
        padding: 16,
        alignItems: 'center',
    },
    logoutButtonText: {
        fontSize: 16,
        fontWeight: '900',
        color: '#FFFFFF',
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
    // Dark mode additions
    containerDark: {
        backgroundColor: '#0F172A',
    },
    userCardDark: {
        backgroundColor: '#1E293B',
        shadowColor: '#000',
        shadowOpacity: 0.2,
    },
    sectionDark: {
        backgroundColor: '#1E293B',
    },
    textWhite: {
        color: '#FFFFFF',
    },
    textGray: {
        color: '#94A3B8',
    },
    borderDark: {
        borderBottomColor: '#334155',
    },
    infoLabelRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
});
