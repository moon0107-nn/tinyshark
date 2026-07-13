import { Feather, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import WavyTabBar from './navbar';

interface WalletScreenProps {
    onNavigateToFinancialManager: () => void;
    onNavigateToAnalysis?: () => void;
    onNavigateToOther?: () => void;
    onNavigateToHome?: () => void;
    onNavigateToStocks?: () => void;
}

export default function WalletScreen({ onNavigateToFinancialManager, onNavigateToAnalysis, onNavigateToOther, onNavigateToHome, onNavigateToStocks }: WalletScreenProps) {
    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerSpacer} />
                <Text style={styles.headerTitle}>Ví</Text>
                <TouchableOpacity style={styles.searchIcon}>
                    <Feather name="search" size={24} color="#112d32" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <Image
                    source={require('@/assets/images/background-wallet.png')}
                    style={styles.backgroundImage}
                    resizeMode="cover"
                />

                {/* Link Bank Banner */}
                <View style={styles.bannerContainer}>
                    <Text style={styles.bannerText}>
                        <Text style={{ fontWeight: 'bold' }}>Liên kết ngân hàng</Text> để ghi nhận các giao dịch phát sinh từ tài khoản ngân hàng.
                    </Text>
                    <TouchableOpacity style={styles.linkButton}>
                        <Text style={styles.linkButtonText}>Liên kết ngay</Text>
                        <Feather name="arrow-right" size={16} color="#0d5b74" />
                    </TouchableOpacity>
                </View>

                {/* Top Action Buttons */}
                <View style={styles.row}>
                    <TouchableOpacity style={styles.smallCard}>
                        <MaterialCommunityIcons name="cash-plus" size={32} color="#fff" />
                        <Text style={styles.cardText}>Nạp tiền</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.smallCard}>
                        <MaterialCommunityIcons name="cash-minus" size={32} color="#fff" />
                        <Text style={styles.cardText}>Rút tiền</Text>
                    </TouchableOpacity>
                </View>

                {/* Full Width Banners with Mascot */}
                <TouchableOpacity style={styles.largeCard}>
                    <View style={styles.largeCardContent}>
                        <MaterialCommunityIcons name="chart-box-outline" size={28} color="#fff" style={styles.cardIcon} />
                        <Text style={styles.largeCardText}>Lịch sử giao dịch</Text>
                    </View>
                    {/* Chỗ này mày chèn ảnh cá mập cầm kính lúp nha */}
                    <Image source={require('@/assets/images/shark-thinking.png')} style={styles.mascotImage} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.largeCard}>
                    <View style={styles.largeCardContent}>
                        <MaterialCommunityIcons name="qrcode-scan" size={28} color="#fff" style={styles.cardIcon} />
                        <Text style={styles.largeCardText}>QR Thanh toán</Text>
                    </View>
                    {/* Chỗ này mày chèn ảnh cá mập đeo kính râm */}
                    <Image source={require('@/assets/images/shark-tie.png')} style={styles.mascotImage} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.largeCard} onPress={onNavigateToFinancialManager}>
                    <View style={styles.largeCardContent}>
                        <MaterialCommunityIcons name="finance" size={28} color="#fff" style={styles.cardIcon} />
                        <Text style={styles.largeCardText}>Quản lí tài chính</Text>
                    </View>
                    {/* Chỗ này mày chèn ảnh cá mập mặc vest */}
                    <Image source={require('@/assets/images/shark-vest.png')} style={styles.mascotImage} />
                </TouchableOpacity>

                {/* Bottom Grid Actions */}
                <View style={styles.row}>
                    <TouchableOpacity style={styles.smallCard} onPress={onNavigateToStocks}>
                        <MaterialCommunityIcons name="candycane" size={32} color="#fff" />
                        <Text style={styles.cardText}>Chứng khoán</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.smallCard}>
                        <FontAwesome5 name="hand-holding-usd" size={28} color="#fff" />
                        <Text style={styles.cardText}>Sàn đầu tư</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.row}>
                    <TouchableOpacity style={styles.smallCard}>
                        <Ionicons name="people-outline" size={32} color="#fff" />
                        <Text style={styles.cardText}>Cộng đồng</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.smallCard}>
                        <Feather name="gift" size={32} color="#fff" />
                        <Text style={styles.cardText}>Ưu đãi</Text>
                    </TouchableOpacity>
                </View>

                {/* Padding cho khỏi bị vướng bottom bar */}
                <View style={{ height: 100 }} />
            </ScrollView>

            {/* Bottom Navigation */}
            <WavyTabBar
                activeTabProp="Wallet"
                onNavigateToHome={onNavigateToHome}
                onNavigateToAnalysis={onNavigateToAnalysis}
                onNavigateToOther={onNavigateToOther}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        height: 1400,
    },
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 20,
    },
    headerSpacer: {
        width: 24,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#112d32',
    },
    searchIcon: {
        padding: 5,
    },
    scrollContent: {
        paddingHorizontal: 20,
    },
    bannerContainer: {
        marginBottom: 20,
    },
    bannerText: {
        fontSize: 14,
        color: '#112d32',
        lineHeight: 20,
        marginBottom: 10,
    },
    linkButton: {
        backgroundColor: '#ebf8fa',
        alignSelf: 'flex-start',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    linkButtonText: {
        color: '#112d32',
        fontWeight: 'bold',
        marginRight: 8,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    smallCard: {
        backgroundColor: '#60c3b8', // Màu xanh ngọc
        width: '48%',
        borderRadius: 16,
        padding: 15,
        height: 100,
        justifyContent: 'space-between',
    },
    cardText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '500',
    },
    largeCard: {
        backgroundColor: '#60c3b8',
        width: '100%',
        borderRadius: 16,
        height: 90,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
        overflow: 'hidden',
    },
    largeCardContent: {
        padding: 15,
        justifyContent: 'center',
    },
    cardIcon: {
        marginBottom: 5,
    },
    largeCardText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '500',
    },
    mascotImage: {
        width: 90,
        height: 90,
        resizeMode: 'contain',
    },
});