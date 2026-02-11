import React, { useState, useEffect, useContext } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    TextInput,
    Alert,
    Modal,
    KeyboardAvoidingView,
    Platform,
    Pressable,
} from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppContext } from '../contexts/AppContext';
import { CONFIG } from '../constants/config';

const API_URL = CONFIG.API_URL;

interface Category {
    _id: string;
    name: string;
    type: 'income' | 'expense';
    icon?: string;
}

interface Account {
    _id: string;
    name: string;
    balance: number;
}

export function AddTransactionModal() {
    const { isAddModalVisible, setAddModalVisible, refreshData, logout, editingTransaction, initialType, isDarkMode } = useContext(AppContext);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState<'income' | 'expense'>('expense');
    const [categoryId, setCategoryId] = useState('');
    const [accountId, setAccountId] = useState('');
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [pickerMode, setPickerMode] = useState<'date' | 'time'>('date');

    const [categories, setCategories] = useState<Category[]>([]);
    const [accounts, setAccounts] = useState<Account[]>([]);

    useEffect(() => {
        if (isAddModalVisible) {
            if (editingTransaction) {
                setAmount(editingTransaction.amount.toString());
                setDescription(editingTransaction.description || '');
                setType(editingTransaction.type);
                setCategoryId(editingTransaction.categoryId?._id || editingTransaction.categoryId || '');
                setAccountId(editingTransaction.accountId?._id || editingTransaction.accountId || '');
                setDate(new Date(editingTransaction.date));
            } else {
                setAmount('');
                setDescription('');
                setType(initialType || 'expense');
                setCategoryId('');
                setDate(new Date());
            }
            loadData();
        }
    }, [isAddModalVisible, editingTransaction]);

    const loadData = async () => {
        try {
            setLoading(true);
            const token = await AsyncStorage.getItem('authToken');
            if (!token) {
                logout();
                return;
            }

            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            const [catsRes, accsRes] = await Promise.all([
                axios.get(`${API_URL}/categories`, config),
                axios.get(`${API_URL}/accounts`, config)
            ]);

            setCategories(catsRes.data);
            setAccounts(accsRes.data);

            if (!editingTransaction && accsRes.data.length > 0) {
                setAccountId(accsRes.data[0]._id);
            }
        } catch (error: any) {
            Alert.alert('Error', 'Failed to load data');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!amount || isNaN(parseFloat(amount))) {
            Alert.alert('Error', 'Please enter a valid amount');
            return;
        }

        if (!categoryId) {
            Alert.alert('Error', 'Please select a category');
            return;
        }

        if (!accountId) {
            Alert.alert('Error', 'Please select an account');
            return;
        }

        setSubmitting(true);
        try {
            const token = await AsyncStorage.getItem('authToken');
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            const payload = {
                amount: parseFloat(amount),
                description,
                type,
                categoryId,
                accountId,
                date: date.toISOString(),
            };

            if (editingTransaction) {
                await axios.put(`${API_URL}/transactions/${editingTransaction._id || editingTransaction.id}`, payload, config);
            } else {
                await axios.post(`${API_URL}/transactions`, payload, config);
            }

            setAddModalVisible(false);
            refreshData();
        } catch (error: any) {
            Alert.alert('Error', error.response?.data?.message || 'Failed to save transaction');
        } finally {
            setSubmitting(false);
        }
    };

    const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        if (event.type === 'dismissed') {
            setShowPicker(false);
            return;
        }

        if (selectedDate) {
            // Merge time if in date mode, merge date if in time mode
            const newDate = new Date(date);
            if (pickerMode === 'date') {
                newDate.setFullYear(selectedDate.getFullYear());
                newDate.setMonth(selectedDate.getMonth());
                newDate.setDate(selectedDate.getDate());
            } else {
                newDate.setHours(selectedDate.getHours());
                newDate.setMinutes(selectedDate.getMinutes());
            }
            setDate(newDate);

            // On Android, date and time pickers are separate dialogs
            if (Platform.OS === 'android') {
                setShowPicker(false);
            }
        }
    };

    const showPickerHandler = (mode: 'date' | 'time') => {
        setPickerMode(mode);
        setShowPicker(true);
    };

    const formatDate = (d: Date) => {
        return d.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    const formatTime = (d: Date) => {
        return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    };

    const filteredCategories = categories.filter(c => c.type === type);

    return (
        <Modal
            visible={isAddModalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setAddModalVisible(false)}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.modalOverlay}
            >
                <View style={{ flex: 1 }}>
                    <TouchableOpacity
                        style={styles.dismissArea}
                        activeOpacity={1}
                        onPress={() => setAddModalVisible(false)}
                    />
                    <View style={[styles.modalContent, isDarkMode && styles.modalContentDark]}>
                        <View style={[styles.modalHeader, isDarkMode && styles.modalHeaderDark]}>
                            <View style={styles.headerBar} />
                            <View style={styles.headerTitleRow}>
                                <Text style={[styles.modalTitle, isDarkMode && styles.textWhite]}>
                                    {editingTransaction ? 'Edit Transaction' : 'Add Transaction'}
                                </Text>
                                <TouchableOpacity onPress={() => setAddModalVisible(false)}>
                                    <Ionicons name="close-circle" size={28} color="#94A3B8" />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {loading ? (
                            <View style={styles.loadingContainer}>
                                <ActivityIndicator size="large" color="#8B5CF6" />
                            </View>
                        ) : (
                            <ScrollView
                                style={styles.body}
                                contentContainerStyle={styles.bodyContent}
                                showsVerticalScrollIndicator={false}
                            >
                                {/* Type Selector */}
                                <View style={styles.typeSelector}>
                                    <TouchableOpacity
                                        style={[
                                            styles.typeButton,
                                            isDarkMode && styles.inputDark,
                                            type === 'expense' && styles.typeButtonActiveExpense
                                        ]}
                                        onPress={() => {
                                            setType('expense');
                                            setCategoryId('');
                                        }}
                                        activeOpacity={0.8}
                                    >
                                        <View style={[styles.typeIconContainer, type === 'expense' && styles.typeIconContainerActiveExpense]}>
                                            <Ionicons name="arrow-up-circle" size={20} color={type === 'expense' ? '#FFFFFF' : '#EF4444'} />
                                        </View>
                                        <Text style={[styles.typeButtonText, type === 'expense' && styles.typeButtonTextActive]}>Expense</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.typeButton, type === 'income' && styles.typeButtonActiveIncome]}
                                        onPress={() => {
                                            setType('income');
                                            setCategoryId('');
                                        }}
                                        activeOpacity={0.8}
                                    >
                                        <View style={[styles.typeIconContainer, type === 'income' && styles.typeIconContainerActiveIncome]}>
                                            <Ionicons name="arrow-down-circle" size={20} color={type === 'income' ? '#FFFFFF' : '#22C55E'} />
                                        </View>
                                        <Text style={[styles.typeButtonText, type === 'income' && styles.typeButtonTextActive]}>Income</Text>
                                    </TouchableOpacity>
                                </View>

                                {/* Amount Input */}
                                <View style={styles.inputGroup}>
                                    <Text style={[styles.label, isDarkMode && styles.textGray]}>Amount (Rs)</Text>
                                    <TextInput
                                        style={[styles.amountInput, isDarkMode && styles.textWhite, isDarkMode && styles.borderDark]}
                                        value={amount}
                                        onChangeText={setAmount}
                                        keyboardType="numeric"
                                        placeholder="0.00"
                                        placeholderTextColor={isDarkMode ? "#64748B" : "#94A3B8"}
                                        autoFocus
                                    />
                                </View>

                                {/* Account Selector */}
                                <View style={styles.inputGroup}>
                                    <Text style={[styles.label, isDarkMode && styles.textGray]}>Account</Text>
                                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.accountScroller}>
                                        {accounts.map(acc => (
                                            <TouchableOpacity
                                                key={acc._id}
                                                style={[styles.accountItem, accountId === acc._id && styles.accountItemActive]}
                                                onPress={() => setAccountId(acc._id)}
                                                activeOpacity={0.8}
                                            >
                                                <View style={[styles.accountIconCircle, accountId === acc._id && styles.accountIconCircleActive]}>
                                                    <Ionicons name="wallet" size={16} color={accountId === acc._id ? '#8B5CF6' : '#64748B'} />
                                                </View>
                                                <Text style={[styles.accountLabel, accountId === acc._id && styles.accountLabelActive]}>{acc.name}</Text>
                                            </TouchableOpacity>
                                        ))}
                                    </ScrollView>
                                </View>

                                {/* Category Selector */}
                                <View style={styles.inputGroup}>
                                    <Text style={[styles.label, isDarkMode && styles.textGray]}>Category</Text>
                                    <View style={styles.selectorGrid}>
                                        {filteredCategories.map(cat => (
                                            <TouchableOpacity
                                                key={cat._id}
                                                style={[
                                                    styles.selectorItem,
                                                    isDarkMode && styles.selectorItemDark,
                                                    categoryId === cat._id && styles.selectorItemActive
                                                ]}
                                                onPress={() => setCategoryId(cat._id)}
                                                activeOpacity={0.7}
                                            >
                                                <View style={[styles.iconContainer, categoryId === cat._id && styles.iconContainerActive]}>
                                                    {cat.icon && cat.icon.length > 2 ? (
                                                        <Ionicons
                                                            name={(cat.icon as any)}
                                                            size={22}
                                                            color={categoryId === cat._id ? '#8B5CF6' : '#64748B'}
                                                        />
                                                    ) : (
                                                        <Text style={styles.selectorIconEmoji}>{cat.icon || '📊'}</Text>
                                                    )}
                                                </View>
                                                <Text style={[styles.selectorLabel, categoryId === cat._id && styles.selectorLabelActive]} numberOfLines={1}>
                                                    {cat.name}
                                                </Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                </View>

                                {/* Description Input */}
                                <View style={styles.inputGroup}>
                                    <Text style={[styles.label, isDarkMode && styles.textGray]}>Description</Text>
                                    <TextInput
                                        style={[styles.input, isDarkMode && styles.inputDark]}
                                        value={description}
                                        onChangeText={setDescription}
                                        placeholder="What was this for?"
                                        placeholderTextColor={isDarkMode ? "#64748B" : "#94A3B8"}
                                    />
                                </View>

                                {/* Date & Time Input */}
                                <View style={styles.inputGroup}>
                                    <Text style={[styles.label, isDarkMode && styles.textGray]}>Date & Time</Text>
                                    <View style={styles.dateTimeRow}>
                                        <TouchableOpacity
                                            style={[styles.dateTimeButton, isDarkMode && styles.inputDark]}
                                            onPress={() => showPickerHandler('date')}
                                        >
                                            <Ionicons name="calendar-outline" size={20} color="#8B5CF6" />
                                            <Text style={[styles.dateTimeText, isDarkMode && styles.textWhite]}>{formatDate(date)}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={[styles.dateTimeButton, isDarkMode && styles.inputDark]}
                                            onPress={() => showPickerHandler('time')}
                                        >
                                            <Ionicons name="time-outline" size={20} color="#8B5CF6" />
                                            <Text style={[styles.dateTimeText, isDarkMode && styles.textWhite]}>{formatTime(date)}</Text>
                                        </TouchableOpacity>
                                    </View>

                                    {showPicker && (
                                        <DateTimePicker
                                            value={date}
                                            mode={pickerMode}
                                            is24Hour={true}
                                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                            onChange={onDateChange}
                                        />
                                    )}
                                </View>

                            </ScrollView>
                        )}

                        {!loading && (
                            <View style={[styles.modalFooter, isDarkMode && styles.modalHeaderDark]}>
                                <TouchableOpacity
                                    style={[styles.saveButton, submitting && styles.saveButtonDisabled]}
                                    onPress={handleSave}
                                    disabled={submitting}
                                    activeOpacity={0.9}
                                >
                                    {submitting ? (
                                        <ActivityIndicator color="#FFFFFF" />
                                    ) : (
                                        <Text style={styles.saveButtonText}>
                                            {editingTransaction ? 'Update Transaction' : 'Add Transaction'}
                                        </Text>
                                    )}
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Modal >
    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    dismissArea: {
        flex: 1,
    },
    modalContent: {
        backgroundColor: '#F8FAFC',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        maxHeight: '90%',
        minHeight: '60%',
    },
    modalHeader: {
        padding: 20,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
    },
    headerBar: {
        width: 40,
        height: 4,
        backgroundColor: '#E2E8F0',
        borderRadius: 2,
        marginBottom: 16,
    },
    headerTitleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '900',
        color: '#0F172A',
    },
    loadingContainer: {
        padding: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    body: {
        flex: 1,
    },
    bodyContent: {
        padding: 24,
        paddingBottom: 40,
    },
    typeSelector: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 24,
    },
    typeButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderRadius: 18,
        backgroundColor: '#FFFFFF',
        borderWidth: 2,
        borderColor: '#F1F5F9',
        gap: 10,
    },
    typeButtonActiveExpense: {
        backgroundColor: '#FEF2F2',
        borderColor: '#FECACA',
    },
    typeButtonActiveIncome: {
        backgroundColor: '#F0FDF4',
        borderColor: '#BBF7D0',
    },
    typeIconContainer: {
        width: 32,
        height: 32,
        borderRadius: 10,
        backgroundColor: '#F8FAFC',
        justifyContent: 'center',
        alignItems: 'center',
    },
    typeIconContainerActiveExpense: {
        backgroundColor: '#EF4444',
    },
    typeIconContainerActiveIncome: {
        backgroundColor: '#22C55E',
    },
    typeButtonText: {
        fontSize: 14,
        fontWeight: '800',
        color: '#64748B',
    },
    typeButtonTextActive: {
        color: '#0F172A',
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 12,
        fontWeight: '700',
        color: '#0F172A',
        marginBottom: 8,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    amountInput: {
        fontSize: 36,
        fontWeight: '900',
        color: '#0F172A',
        borderBottomWidth: 2,
        borderBottomColor: '#E2E8F0',
        paddingVertical: 8,
    },
    input: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        paddingVertical: 14,
        paddingHorizontal: 16,
        fontSize: 14,
        color: '#0F172A',
        borderWidth: 2,
        borderColor: '#F1F5F9',
    },
    dateTimeRow: {
        flexDirection: 'row',
        gap: 12,
    },
    dateTimeButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderWidth: 2,
        borderColor: '#F1F5F9',
        gap: 8,
    },
    dateTimeText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#0F172A',
    },
    selectorGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    selectorItem: {
        width: '31%',
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#F1F5F9',
        paddingTop: 10,
        paddingBottom: 14,
        paddingHorizontal: 8,
        shadowColor: '#64748B',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    selectorItemActive: {
        borderColor: '#8B5CF6',
        backgroundColor: '#F5F3FF',
        elevation: 4,
        shadowOpacity: 0.1,
    },
    iconContainer: {
        width: 44,
        height: 44,
        borderRadius: 14,
        backgroundColor: '#F8FAFC',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 6,
    },
    iconContainerActive: {
        backgroundColor: '#FFFFFF',
    },
    selectorIconEmoji: {
        fontSize: 20,
    },
    selectorLabel: {
        fontSize: 10,
        fontWeight: '800',
        color: '#64748B',
        textAlign: 'center',
        width: '100%',
    },
    selectorLabelActive: {
        color: '#8B5CF6',
    },
    accountScroller: {
        flexDirection: 'row',
    },
    accountItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        paddingVertical: 10,
        paddingHorizontal: 14,
        marginRight: 10,
        borderWidth: 2,
        borderColor: '#F1F5F9',
        shadowColor: '#64748B',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 1,
    },
    accountItemActive: {
        backgroundColor: '#F5F3FF',
        borderColor: '#C4B5FD',
    },
    accountIconCircle: {
        width: 28,
        height: 28,
        borderRadius: 9,
        backgroundColor: '#F8FAFC',
        justifyContent: 'center',
        alignItems: 'center',
    },
    accountIconCircleActive: {
        backgroundColor: '#FFFFFF',
    },
    accountLabel: {
        fontSize: 13,
        fontWeight: '800',
        color: '#64748B',
    },
    accountLabelActive: {
        color: '#8B5CF6',
    },
    modalFooter: {
        padding: 24,
        paddingTop: 16,
        paddingBottom: Platform.OS === 'ios' ? 40 : 24,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#F1F5F9',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -10 },
        shadowOpacity: 0.03,
        shadowRadius: 10,
        elevation: 10,
    },
    saveButton: {
        backgroundColor: '#8B5CF6',
        borderRadius: 22,
        height: 64,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#8B5CF6',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 8,
    },
    saveButtonDisabled: {
        opacity: 0.6,
    },
    saveButtonText: {
        fontSize: 18,
        fontWeight: '900',
        color: '#FFFFFF',
        letterSpacing: 0.5,
    },
    // Dark Mode Styles
    modalContentDark: {
        backgroundColor: '#0F172A',
    },
    modalHeaderDark: {
        backgroundColor: '#1E293B',
        borderBottomColor: '#334155',
        borderTopColor: '#334155',
    },
    textWhite: {
        color: '#FFFFFF',
    },
    textGray: {
        color: '#94A3B8',
    },
    inputDark: {
        backgroundColor: '#1E293B',
        borderColor: '#334155',
        color: '#FFFFFF',
    },
    borderDark: {
        borderBottomColor: '#334155',
    },
    selectorItemDark: {
        backgroundColor: '#1E293B',
        borderColor: '#334155',
    },
});
