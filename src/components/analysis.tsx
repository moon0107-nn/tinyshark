import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

interface AnalysisScreenProps {
    onNavigateToWallet?: () => void;
}

export default function AnalysisScreen({ onNavigateToWallet }: AnalysisScreenProps) {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                {/* Header */}
                <View style={styles.header}>
                    <View style={{ width: 24 }} /> {/* Spacer */}
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
                    <TouchableOpacity style={[styles.tab, styles.activeTab]}>
                        <Text style={styles.activeTabText}>Tuần</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tab}>
                        <Text style={styles.tabText}>Tháng</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tab}>
                        <Text style={styles.tabText}>Năm</Text>
                    </TouchableOpacity>
                </View>

                {/* Phần Biểu Đồ */}
                <View style={styles.chartCard}>
                    <Text style={styles.chartTitle}>Cuối tuần trước</Text>
                    <Text style={styles.chartSubtitle}>+ 1.204.008đ (2%)</Text>

                    {/* Mô phỏng biểu đồ lượn sóng */}
                    <View style={styles.chartArea}>
                        <View style={styles.chartMarker}>
                            <Text style={styles.chartValueLabel}>505.204đ</Text>
                            <Text style={styles.fishIcon}>🐟</Text>
                        </View>
                        {/* Đường nét đứt mô phỏng */}
                        <View style={styles.dashedLineContainer}>
                            <View style={styles.dashedLine} />
                        </View>

                        {/* Đường sóng mô phỏng (Trong thực tế nên dùng react-native-svg) */}
                        <View style={styles.waveMockup} />
                    </View>

                    {/* Trục X */}
                    <View style={styles.xAxis}>
                        {['12/12', '13/12', '14/12', '15/12', '16/12', '17/12'].map((date, index) => (
                            <Text style={styles.xAxisLabel} key={index}>{date}</Text>
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
            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.navItem}>
                    <Ionicons name="home-outline" size={24} color="#A1D6D4" />
                    <Text style={styles.navText}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem} onPress={onNavigateToWallet}>
                    <Ionicons name="wallet-outline" size={24} color="#A1D6D4" />
                    <Text style={styles.navText}>Wallet</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem}>
                    <View style={styles.activeNavCircle}>
                        <FontAwesome5 name="chart-bar" size={20} color="#2A8B9D" />
                    </View>
                    <Text style={[styles.navText, { color: 'white', marginTop: 4 }]}>Analyst</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem}>
                    <FontAwesome5 name="fish" size={22} color="#A1D6D4" />
                    <Text style={styles.navText}>Other</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D1EFEF', // Màu nền tổng thể lượn sóng nhạt
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
        backgroundColor: '#82D1C5', // Màu nhạt hơn chút cho box nhỏ
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
        // Trong thực tế, hãy thay cái này bằng SVG Path để tạo độ uốn lượn
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
    bottomNav: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#2A8B9D',
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 15,
        paddingBottom: 25,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    navItem: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    navText: {
        color: '#A1D6D4',
        fontSize: 10,
        marginTop: 4,
        fontWeight: 'bold',
    },
    activeNavCircle: {
        backgroundColor: '#F8E0D5', // Màu da/hồng nhạt
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -20, // Đẩy lên để lồi ra ngoài thanh điều hướng
        borderWidth: 4,
        borderColor: '#2A8B9D',
    }
});