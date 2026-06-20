import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import WavyTabBar from './navbar';

const { width } = Dimensions.get('window');

interface AnalysisScreenProps {
    onNavigateToWallet?: () => void;
    onNavigateToOther?: () => void;
}

type TabType = 'Tuần' | 'Tháng' | 'Năm';

// 1. Định nghĩa dữ liệu mẫu cho từng Tab
const chartDataMock = {
    'Tuần': {
        title: 'Cuối tuần trước',
        subtitle: '+ 1.204.008đ (2%)',
        valueLabel: '505.204đ',
        xAxis: ['12/12', '13/12', '14/12', '15/12', '16/12', '17/12']
    },
    'Tháng': {
        title: 'Tháng này so với tháng trước',
        subtitle: '+ 5.450.000đ (12%)',
        valueLabel: '4.120.000đ',
        xAxis: ['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4']
    },
    'Năm': {
        title: 'Năm nay so với năm trước',
        subtitle: '+ 45.800.000đ (25%)',
        valueLabel: '17.070.206đ',
        xAxis: ['Q1', 'Q2', 'Q3', 'Q4']
    }
};

export default function AnalysisScreen({ onNavigateToWallet, onNavigateToOther }: AnalysisScreenProps) {
    const [activeTab, setActiveTab] = useState<TabType>('Tuần');
    const tabs: TabType[] = ['Tuần', 'Tháng', 'Năm'];

    // 2. Lấy dữ liệu của tab hiện tại để hiển thị
    const currentChartData = chartDataMock[activeTab];

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                {/* Header */}
                <View style={styles.header}>
                    <View style={{ width: 24 }} />
                    <Text style={styles.headerTitle}>Báo Cáo</Text>
                    <TouchableOpacity>
                        <Ionicons name="search" size={24} color="black" />
                    </TouchableOpacity>
                </View>

                {/* Thẻ Tài chính hiện tại */}
                <View style={styles.mainCard}>
                    <Text style={styles.cardSubtitle}>Tài chính hiện tại</Text>
                    <Text style={styles.cardBalance}>
                        17.070.206 <Text style={styles.currencyUnderline}>đ</Text>
                    </Text>

                    <View style={styles.cardRow}>
                        {/* Tổng có */}
                        <View style={styles.innerBox}>
                            <View style={styles.innerBoxHeader}>
                                <Text style={styles.innerBoxTitle}>Tổng có</Text>
                                <Ionicons name="arrow-forward-circle" size={20} color="white" />
                            </View>
                            <Text style={styles.innerBoxValue}>
                                17.070.206 <Text style={styles.currencyUnderline}>đ</Text>
                            </Text>
                        </View>

                        {/* Tổng nợ */}
                        <View style={styles.innerBox}>
                            <View style={styles.innerBoxHeader}>
                                <Text style={styles.innerBoxTitle}>Tổng nợ</Text>
                                <Ionicons name="arrow-forward-circle" size={20} color="white" />
                            </View>
                            <Text style={styles.innerBoxValue}>
                                0 <Text style={styles.currencyUnderline}>đ</Text>
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Tab Lọc Thời Gian */}
                <View style={styles.tabContainer}>
                    {tabs.map((tab) => {
                        const isActive = activeTab === tab;
                        return (
                            <TouchableOpacity
                                key={tab}
                                style={[styles.tab, isActive && styles.activeTab]}
                                onPress={() => setActiveTab(tab)}
                                activeOpacity={0.8}
                            >
                                <Text style={isActive ? styles.activeTabText : styles.tabText}>
                                    {tab}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {/* Phần Biểu Đồ - Đã đổ dữ liệu động theo Tab */}
                <View style={styles.chartCard}>
                    <Text style={styles.chartTitle}>{currentChartData.title}</Text>
                    <Text style={styles.chartSubtitle}>{currentChartData.subtitle}</Text>

                    {/* Mô phỏng biểu đồ lượn sóng */}
                    <View style={styles.chartArea}>
                        <View style={styles.chartMarker}>
                            <Text style={styles.chartValueLabel}>{currentChartData.valueLabel}</Text>
                            <Image source={require('@/assets/images/big-shark.png')} style={styles.sharkImage} />
                        </View>
                        {/* Đường nét đứt mô phỏng */}
                        <View style={styles.dashedLineContainer}>
                            <View style={styles.dashedLine} />
                        </View>

                        {/* Đường sóng mô phỏng */}
                        <View style={styles.waveMockup} />
                    </View>

                    {/* Trục X */}
                    <View style={styles.xAxis}>
                        {currentChartData.xAxis.map((label, index) => (
                            <Text style={styles.xAxisLabel} key={index}>{label}</Text>
                        ))}
                    </View>
                </View>

                {/* Các nút Hành Động */}
                <View style={styles.actionRow}>
                    <TouchableOpacity style={styles.actionButton}>
                        <Ionicons name="document-text-outline" size={20} color="white" />
                        <Text style={styles.actionText}>Theo dõi vay nợ</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                        <Ionicons name="person-outline" size={20} color="white" />
                        <Text style={styles.actionText}>Đối tượng thu/chi</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>

            {/* Thanh Điều Hướng (Bottom Navigation) */}
            <WavyTabBar 
                activeTabProp="Analyst"
                onNavigateToWallet={onNavigateToWallet}
                onNavigateToOther={onNavigateToOther}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D1EFEF',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 100,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000',
    },
    mainCard: {
        backgroundColor: '#62C4B5',
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,
    },
    cardSubtitle: {
        color: '#E0F4F2',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 8,
    },
    cardBalance: {
        color: 'white',
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    currencyUnderline: {
        textDecorationLine: 'underline',
    },
    cardRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    innerBox: {
        backgroundColor: '#82D1C5',
        borderRadius: 12,
        padding: 12,
        width: '48%',
        borderWidth: 1,
        borderColor: '#9BDCD3',
    },
    innerBoxHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    innerBoxTitle: {
        color: 'white',
        fontSize: 14,
    },
    innerBoxValue: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#62C4B5',
        borderRadius: 30,
        padding: 4,
        marginBottom: 20,
    },
    tab: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 25,
    },
    activeTab: {
        backgroundColor: '#8ED1C8',
    },
    tabText: {
        color: 'white',
        fontSize: 16,
    },
    activeTabText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    chartCard: {
        backgroundColor: '#BCE3FF',
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,
        minHeight: 250,
    },
    chartTitle: {
        fontSize: 14,
        color: '#333',
    },
    chartSubtitle: {
        fontSize: 14,
        color: '#3B98E7',
        marginTop: 4,
    },
    chartArea: {
        height: 120,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    chartMarker: {
        alignItems: 'center',
        zIndex: 10,
    },
    chartValueLabel: {
        fontSize: 12,
        color: '#000',
        marginBottom: 4,
    },
    fishIcon: {
        fontSize: 24,
    },
    dashedLineContainer: {
        position: 'absolute',
        top: 50,
        bottom: -20,
        width: 1,
        overflow: 'hidden',
    },
    dashedLine: {
        height: '100%',
        width: 1,
        borderWidth: 1,
        borderColor: '#54A0FF',
        borderStyle: 'dashed',
    },
    waveMockup: {
        position: 'absolute',
        top: 60,
        width: '100%',
        height: 2,
        backgroundColor: '#3B98E7',
    },
    xAxis: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30,
    },
    xAxisLabel: {
        fontSize: 12,
        color: '#333',
    },
    actionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    actionButton: {
        backgroundColor: '#62C4B5',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 12,
        width: '48%',
    },
    actionText: {
        color: 'white',
        marginLeft: 8,
        fontSize: 14,
        fontWeight: '500',
    },
    sharkImage: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
    },
});