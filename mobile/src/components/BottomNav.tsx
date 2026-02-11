import React, { useContext } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { AppContext, Screen } from '../contexts/AppContext';

interface BottomNavProps {
    activeScreen: Screen;
}

export function BottomNav({ activeScreen }: BottomNavProps) {
    const { navigateTo, setAddModalVisible, isDarkMode } = useContext(AppContext);

    return (
        <View style={[styles.bottomNav, isDarkMode && styles.bottomNavDark]}>
            <TouchableOpacity
                style={styles.navItem}
                onPress={() => navigateTo('dashboard')}
                activeOpacity={0.7}
            >
                <Ionicons
                    name={activeScreen === 'dashboard' ? 'home' : 'home-outline'}
                    size={24}
                    color={activeScreen === 'dashboard' ? '#8B5CF6' : '#94A3B8'}
                />
                <Text style={[styles.navLabel, activeScreen === 'dashboard' && styles.navLabelActive]}>
                    Home
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.navItem}
                onPress={() => navigateTo('transactions')}
                activeOpacity={0.7}
            >
                <Ionicons
                    name={activeScreen === 'transactions' ? 'list' : 'list-outline'}
                    size={24}
                    color={activeScreen === 'transactions' ? '#8B5CF6' : '#94A3B8'}
                />
                <Text style={[styles.navLabel, activeScreen === 'transactions' && styles.navLabelActive]}>
                    History
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.addButtonContainer}
                onPress={() => setAddModalVisible(true)}
                activeOpacity={0.9}
            >
                <LinearGradient
                    colors={['#8B5CF6', '#D946EF']}
                    style={styles.addButton}
                >
                    <Ionicons name="add" size={32} color="#FFFFFF" />
                </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.navItem}
                onPress={() => navigateTo('manage')}
                activeOpacity={0.7}
            >
                <Ionicons
                    name={activeScreen === 'manage' ? 'settings' : 'settings-outline'}
                    size={24}
                    color={activeScreen === 'manage' ? '#8B5CF6' : '#94A3B8'}
                />
                <Text style={[styles.navLabel, activeScreen === 'manage' && styles.navLabelActive]}>
                    Manage
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.navItem}
                onPress={() => navigateTo('profile')}
                activeOpacity={0.7}
            >
                <Ionicons
                    name={activeScreen === 'profile' ? 'person' : 'person-outline'}
                    size={24}
                    color={activeScreen === 'profile' ? '#8B5CF6' : '#94A3B8'}
                />
                <Text style={[styles.navLabel, activeScreen === 'profile' && styles.navLabelActive]}>
                    Profile
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    bottomNav: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 80,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#E2E8F0',
        paddingBottom: 20,
        paddingTop: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 8,
    },
    navItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    navLabel: {
        fontSize: 10,
        fontWeight: '600',
        color: '#94A3B8',
        marginTop: 4,
    },
    navLabelActive: {
        fontWeight: '700',
        color: '#8B5CF6',
    },
    addButtonContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -30,
    },
    addButton: {
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#8B5CF6',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    bottomNavDark: {
        backgroundColor: '#1E293B',
        borderTopColor: '#334155',
    },
});
