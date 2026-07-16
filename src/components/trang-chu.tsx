import { Ionicons } from '@expo/vector-icons';
import { Image as ExpoImage, Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import WavyTabBar from './navbar';

const segmentData = {
    tuan: {
        label: "Thu nhập tuần",
        value: "+ 1.204.008đ (2%)",
        tooltip: "505.204đ"
    },
    thang: {
        label: "Thu nhập tháng",
        value: "+ 31.204.008đ (2%)",
        tooltip: "15.000.204đ"
    },
    nam: {
        label: "Thu nhập năm",
        value: "+ 121.000.008đ (2%)",
        tooltip: "31.505.204đ"
    }
};

export default function App() {
    const [activeTab, setActiveTab] = useState<'tuan' | 'thang' | 'nam'>('tuan');
    const currentData = segmentData[activeTab];
    const router = useRouter();

    const handleNavigate = (tab: 'Home' | 'Wallet' | 'Analyst' | 'Other') => {
        if (tab === 'Home') router.replace('/');
        else if (tab === 'Wallet') router.replace('/wallet');
        else if (tab === 'Analyst') router.replace('/analysis');
        else if (tab === 'Other') router.replace('/other');
    };

    return (
        <LinearGradient
            colors={['#00BEB6', '#16BBCB', '#4FC8D5', '#8ED5DF', '#BEE5EC', '#D4EDF2']}
            locations={[0, 0.15, 0.35, 0.55, 0.78, 1]}
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
        >
            <StatusBar barStyle="dark-content" />

            <SafeAreaView style={styles.safeArea}>


                {/* ─── FIXED HEADER ─── */}
                <View style={styles.fixedHeader}>
                    <TouchableOpacity style={styles.headerBtn} id="btn-search">
                        <Ionicons name="search" size={22} color="#000" />
                    </TouchableOpacity>
                    <Image
                        source={require('@/assets/images/logo-tiny.png')}
                        style={styles.logoImg}
                        contentFit="contain"
                    />
                    <TouchableOpacity style={styles.headerBtn} id="btn-notification">
                        <View style={styles.notificationBadge} />
                        <Ionicons name="notifications" size={22} color="#000" />
                    </TouchableOpacity>
                </View>

                {/* ─── FIXED LEFT SHARK BUBBLE ─── */}
                <View style={styles.leftBubble}>
                    <Image
                        source={require('@/assets/images/shark-small.png')}
                        style={styles.floatingSharkImg}
                        contentFit="contain"
                    />
                </View>

                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Spacer for fixed header */}
                    <View style={{ height: 54 }} />

                    {/* ─── LEVEL & XP BAR ─── */}
                    <View style={styles.levelContainer}>
                        <View style={styles.levelBadge}>
                            <Text style={styles.levelText}>Lv10</Text>
                        </View>
                        <View style={styles.xpBarBackground}>
                            <View style={styles.xpBarFill} />
                            <Text style={styles.xpText}>457/1000XP</Text>
                        </View>
                    </View>

                    {/* ─── TOP 3D ISLAND AREA ─── */}
                    <View style={styles.topGraphicArea}>
                        {/* Coin / balance button */}
                        <TouchableOpacity style={styles.coinButton} id="btn-coin">
                            <Image
                                source={require('@/assets/images/gold-coin.png')}
                                style={styles.coinIconImg}
                                contentFit="contain"
                            />
                            <Text style={styles.coinText}>8.40M</Text>
                        </TouchableOpacity>



                        {/* Tinylove – góc trên trái đảo */}
                        <Image
                            source={require('@/assets/images/tinylove.png')}
                            style={styles.loveTopleft}
                            contentFit="contain"
                        />

                        {/* Island center */}
                        <View style={styles.islandContainer}>
                            <Image
                                source={require('@/assets/images/islandMotion.gif')}
                                style={styles.islandImg}
                                contentFit="contain"
                            />
                        </View>

                        {/* Tinylove – góc dưới phải đảo */}
                        <Image
                            source={require('@/assets/images/tinylove.png')}
                            style={styles.loveBottomRight}
                            contentFit="contain"
                        />

                        {/* Floating Right Cart Button */}
                        <TouchableOpacity style={styles.rightCartButton} id="btn-cart">
                            <Image
                                source={require('@/assets/images/shark-cart.png')}
                                style={styles.cartIconImg}
                                contentFit="contain"
                            />
                        </TouchableOpacity>
                    </View>

                    {/* ─── GREETING & VISA CARD ─── */}
                    <View style={styles.profileSection}>
                        <View style={styles.greetingInfo}>
                            <Text style={styles.greetingText}>Xin chào!</Text>
                            <Text style={styles.nameText}>Quang Minh</Text>
                            <Text style={styles.balanceLabel}>Tổng số dư VND</Text>
                            <Text style={styles.balanceAmount}>17.070.206đ</Text>
                        </View>

                        {/* Visa Card */}
                        <View style={styles.visaCard}>
                            <Image
                                source={require('@/assets/images/visa.png')}
                                style={styles.visaLogoImg}
                                contentFit="contain"
                            />
                            <Image
                                source={require('@/assets/images/chip.png')}
                                style={styles.chipImg}
                                contentFit="contain"
                            />
                            <View style={styles.cardDetails}>
                                <Text style={styles.cardHolder}>BUI QUANG MINH</Text>
                                <Text style={styles.cardNumber}>1882 8245 9831 0505</Text>
                                <Text style={styles.cardExpiry}>05 / 25</Text>
                            </View>
                        </View>
                    </View>

                    {/* ─── ENERGY CARD ─── */}
                    <View style={styles.card}>
                        <View style={styles.cardLeft}>
                            <Text style={styles.energyTitle}>Tôi khá nhiều năng lượng</Text>
                            <Text style={styles.energySubtitle}>Đang vui nhé</Text>
                            <View style={styles.circularProgress}>
                                <View style={styles.waterFill} />
                                <Text style={styles.circularText}>63%</Text>
                            </View>
                        </View>
                        <Image
                            source={require('@/assets/images/island-hello.png')}
                            style={styles.islandHello}
                            contentFit="contain"
                        />
                        <Image
                            source={require('@/assets/images/center-shark.gif')}
                            style={styles.sharkImageLarge}
                            contentFit="contain"
                        />
                    </View>

                    {/* ─── SMALL CARDS ROW ─── */}
                    <View style={styles.rowCards}>
                        <View style={styles.smallCard}>
                            <Text style={styles.smallCardTitle}>Tài chính thông minh</Text>
                            <Image
                                source={require('@/assets/images/Coin.gif')}
                                style={styles.smallCardSharkImg}
                                contentFit="contain"
                            />
                        </View>
                        <View style={styles.smallCard}>
                            <Text style={styles.smallCardTitle}>Shark khuyên bạn</Text>
                            <ExpoImage
                                source={require('@/assets/images/shark-flex.gif')}
                                style={styles.smallCardSharkImg}
                                contentFit="contain"
                            />
                        </View>
                    </View>

                    {/* ─── STATS / CHART SECTION ─── */}
                    <View style={styles.statsSection}>
                        {/* Segment control */}
                        <View style={styles.toggleContainer}>
                            <TouchableOpacity
                                style={activeTab === 'tuan' ? styles.toggleButtonActive : styles.toggleButton}
                                onPress={() => setActiveTab('tuan')}
                                id="btn-tuan"
                            >
                                <Text style={activeTab === 'tuan' ? styles.toggleTextActive : styles.toggleText}>Tuần</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={activeTab === 'thang' ? styles.toggleButtonActive : styles.toggleButton}
                                onPress={() => setActiveTab('thang')}
                                id="btn-thang"
                            >
                                <Text style={activeTab === 'thang' ? styles.toggleTextActive : styles.toggleText}>Tháng</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={activeTab === 'nam' ? styles.toggleButtonActive : styles.toggleButton}
                                onPress={() => setActiveTab('nam')}
                                id="btn-nam"
                            >
                                <Text style={activeTab === 'nam' ? styles.toggleTextActive : styles.toggleText}>Năm</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text style={styles.incomeLabel}>{currentData.label}</Text>
                    <Text style={styles.incomeValue}>{currentData.value}</Text>

                    {/* Chart area */}
                    <View style={styles.chartPlaceholder}>
                        <View style={styles.chartTooltip}>
                            <Text style={styles.chartTooltipText}>{currentData.tooltip}</Text>
                        </View>
                        <Image
                            source={require('@/assets/images/shark-big.png')}
                            style={styles.chartSharkImg}
                            contentFit="contain"
                        />
                    </View>
                </ScrollView>

                {/* ─── BOTTOM NAVIGATION BAR ─── */}
                <WavyTabBar
                    activeTabProp="Home"
                    onNavigateToHome={() => handleNavigate('Home')}
                    onNavigateToWallet={() => handleNavigate('Wallet')}
                    onNavigateToAnalysis={() => handleNavigate('Analyst')}
                    onNavigateToOther={() => handleNavigate('Other')}
                />
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    statusBarMock: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 22,
        paddingTop: 12,
        paddingBottom: 4,
        height: 38,
    },
    statusBarTime: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000',
    },
    statusBarIcons: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    // ── Scroll ──
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 215,
    },

    // ── Header ──
    fixedHeader: {
        position: 'absolute',
        top: 38,
        left: 20,
        right: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 44,
        zIndex: 100,
    },
    headerBtn: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoImg: {
        width: 160,
        height: 28,
        alignSelf: 'center',
    },
    notificationBadge: {
        position: 'absolute',
        top: 8,
        right: 8,
        width: 8,
        height: 8,
        backgroundColor: '#FF3B30',
        borderRadius: 4,
        zIndex: 1,
    },

    // ── Level / XP ──
    levelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 35,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 3,
        borderWidth: 1,
        borderColor: '#fff',
    },
    levelBadge: {

    },
    levelText: {
        fontSize: 14,
        color: '#000',
    },
    xpBarBackground: {
        flex: 1,
        left: 5,
        marginRight: 7,
        height: 24,
        backgroundColor: '#F4D7C5',
        borderRadius: 10,
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
    },
    xpBarFill: {
        width: '50%',
        height: '100%',
        backgroundColor: '#59C4BB',
        borderRadius: 10,
        left: 0,
    },
    xpText: {
        position: 'absolute',
        marginLeft: 98,
        fontSize: 14,
        color: '#000',
    },

    // ── Island graphic area ──
    topGraphicArea: {
        height: 620,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        position: 'relative',
    },
    coinButton: {
        position: 'absolute',
        top: 10,
        right: -20,
        flexDirection: 'row',
        backgroundColor: '#FFF',
        borderTopLeftRadius: 7,
        borderBottomLeftRadius: 7,
        paddingHorizontal: 30,
        paddingVertical: 4,
        paddingLeft: 5,
        paddingRight: 30,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        zIndex: 10,
    },
    coinText: {
        color: '#000',
        fontSize: 14,
    },
    coinIconImg: {
        width: 25,
        height: 25,
        marginRight: 6,
    },
    islandContainer: {
        width: 241,
        height: 234,
        justifyContent: 'center',
        alignItems: 'center',
    },
    islandImg: {
        width: '100%',
        height: '100%',
    },
    leftBubble: {
        position: 'absolute',
        left: 20,
        top: 620,
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: 'rgba(0, 160, 160, 0.45)',
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 4,
        zIndex: 90,
    },
    floatingSharkImg: {
        width: '85%',
        height: '85%',
    },
    rightCartButton: {
        position: 'absolute',
        right: -20,
        bottom: 165,
        backgroundColor: '#FFF',
        borderTopLeftRadius: 22,
        borderBottomLeftRadius: 22,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        paddingLeft: 16,
        paddingRight: 10,
        paddingVertical: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.12,
        shadowRadius: 5,
        elevation: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cartIconImg: {
        width: 44,
        height: 30,
    },
    loveTopleft: {
        position: 'absolute',
        top: 233,
        left: 43,
        width: 44,
        height: 44,
        zIndex: 5,
    },
    loveBottomRight: {
        position: 'absolute',
        bottom: 194,
        right: 33,
        width: 44,
        height: 44,
        zIndex: 5,
    },

    // ── Profile / Greeting + VISA ──
    profileSection: {
        flexDirection: 'row',
        marginTop: 65,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    greetingInfo: {
        flex: 1,
    },
    greetingText: {
        fontSize: 14,
        color: '#000',
    },
    nameText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 16,
    },
    balanceLabel: {
        fontSize: 14,
        color: '#000',
    },
    balanceAmount: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
    },
    visaCard: {
        width: 200,
        height: 160,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderTopLeftRadius: 24,
        borderBottomLeftRadius: 24,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        padding: 16,
        marginLeft: 12,
        marginRight: -20,
        transform: [{ translateX: 55 }],
        borderWidth: 1.5,
        borderColor: 'rgba(255, 255, 255, 0.5)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
        justifyContent: 'space-between',
    },
    visaLogoImg: {
        width: 50,
        height: 18,
    },
    chipImg: {
        width: 32,
        height: 26,
        marginVertical: 2,
    },
    cardDetails: {
        gap: 2,
    },
    cardHolder: {
        fontSize: 14,
        color: '#000',
        letterSpacing: 0.2,
    },
    cardNumber: {
        fontSize: 14,
        color: '#000',
        letterSpacing: 0.6,
    },
    cardExpiry: {
        fontSize: 14,
        color: '#000',
    },

    // ── Energy card ──
    card: {
        backgroundColor: 'rgba(255, 255, 255, 0.52)',
        borderRadius: 24,
        borderWidth: 1.5,
        borderColor: 'rgba(255, 255, 255, 0.5)',
        padding: 20,
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center',
        position: 'relative',
        minHeight: 145,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.07,
        shadowRadius: 10,
        elevation: 4,
    },
    cardLeft: {
        flex: 1,
        justifyContent: 'center',
    },
    energyTitle: {
        color: '#1E6F9F',
        fontWeight: 'bold',
        fontSize: 15,
        marginBottom: 2,
    },
    energySubtitle: {
        fontSize: 11,
        color: '#000',
        marginBottom: 12,
    },
    circularProgress: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        position: 'relative',
    },
    waterFill: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '63%',
        backgroundColor: '#1E6F9F',
    },
    circularText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 14,
        zIndex: 2,
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    sharkImageLarge: {
        position: 'absolute',
        right: -10,
        top: -30,
        width: 195,
        height: 195,
        zIndex: 5,
    },
    islandHello: {
        position: 'absolute',
        right: -10,
        top: -30,
        width: 195,
        height: 195,
        zIndex: 2,
    },

    // ── Small cards row ──
    rowCards: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    smallCard: {
        width: '48%',
        backgroundColor: 'rgba(255, 255, 255, 0.52)',
        borderRadius: 24,
        borderWidth: 1.5,
        borderColor: 'rgba(255, 255, 255, 0.5)',
        paddingTop: 14,
        paddingBottom: 0,
        paddingHorizontal: 14,
        alignItems: 'flex-start',
        height: 130,
        position: 'relative',
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.07,
        shadowRadius: 8,
        elevation: 3,
    },
    smallCardTitle: {
        fontSize: 11,
        color: '#1C3F60',
        fontWeight: 'bold',
        textAlign: 'left',
        lineHeight: 16,
        maxWidth: '55%',
    },
    smallCardSharkImg: {
        position: 'absolute',
        bottom: -8,
        right: -8,
        width: 145,
        height: 120,
    },

    // ── Stats / chart section ──
    statsSection: {
        marginTop: 24,
        backgroundColor: '#fff',
        height: 46,
    },
    toggleContainer: {
        flexDirection: 'row',
        backgroundColor: '#59C4BB',
        borderRadius: 20,
        padding: 4,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#59C4BB',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    toggleButtonActive: {
        backgroundColor: '#5E8B87',
        borderRadius: 13,
        paddingVertical: 5,
        alignItems: 'center',
        justifyContent: 'space-around',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
        paddingHorizontal: 24,
    },
    toggleButton: {
        flex: 1,
        paddingVertical: 9,
        alignItems: 'center',
    },
    toggleTextActive: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    toggleText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 14,
    },
    incomeLabel: {
        top: 5,
        fontSize: 12,
        color: '#000',
        opacity: 0.8,
        marginBottom: 2,
    },
    incomeValue: {
        top: 5,
        fontSize: 12,
        color: '#1A99F1',
        marginBottom: 10,
    },
    chartPlaceholder: {
        height: 155,
        marginTop: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.28)',
        borderRadius: 24,
        borderWidth: 1.5,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        overflow: 'visible',
        position: 'relative',
    },
    chartSharkImg: {
        width: 160,
        height: 100,
    },
    chartTooltip: {

    },
    chartTooltipText: {
        color: '#000',
        fontSize: 12,
    },

    // ── Bottom Navigation ──
    bottomNavWrapper: {
        paddingHorizontal: 16,
        paddingBottom: 12,
        paddingTop: 6,
    },
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#0D5968',
        borderRadius: 36,
        paddingVertical: 10,
        paddingHorizontal: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.28,
        shadowRadius: 16,
        elevation: 10,
    },
    navItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
    },
    navCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        borderWidth: 1.5,
        borderColor: 'rgba(255, 255, 255, 0.38)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    navCircleActive: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#F2E4D5',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.12,
        shadowRadius: 4,
        elevation: 3,
    },
    navLabel: {
        fontSize: 10,
        color: 'rgba(255,255,255,0.55)',
        fontWeight: '500',
    },
    navLabelActive: {
        fontSize: 10,
        color: '#F2E4D5',
        fontWeight: 'bold',
    },
});