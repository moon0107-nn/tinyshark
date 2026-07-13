import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    FlatList,
    Image,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import WavyTabBar from './navbar';

// ─── THEME ────────────────────────────────────────────────────────────────────
const ACCENT = '#12AEBE';
const GOLD = '#E0CE28';
const BG = '#fff';
const GREEN = '#AFE85A';
const RED = '#EE6868';

// ─── DATA TYPES ───────────────────────────────────────────────────────────────
interface StockAsset {
    id: string;
    symbol: string;
    pair: string;
    price: string;
    change: string;
    changeNum: number;
    logo: ReturnType<typeof require> | null;
    category: string;
}

interface PreciousMetal {
    id: string;
    symbol: string;
    price: string;
    change: string;
    isPositive: boolean;
    updateTime: string;
}

interface EstateAsset {
    id: string;
    title: string;
    location: string;
    price: string;
    image: any;
    updateTime: string;
}

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const FAV_DATA: StockAsset[] = [
    { id: 'f1', symbol: 'BTC', pair: 'USDT', price: '$62,659.15', change: '-1,54%', changeNum: -1.54, logo: null, category: 'fav' },
    { id: 'f2', symbol: 'ETH', pair: 'USDT', price: '$1,665.07', change: '-2,98%', changeNum: -2.98, logo: null, category: 'fav' },
    { id: 'f3', symbol: 'SOL', pair: 'USDT', price: '$69.35', change: '-2,68%', changeNum: -2.68, logo: null, category: 'fav' },
    { id: 'f4', symbol: 'USDC', pair: 'USDT', price: '$1.0098', change: '+0,01%', changeNum: 0.01, logo: null, category: 'fav' },
    { id: 'f5', symbol: 'FDUSH', pair: 'USDT', price: '$0.9987', change: '-0,07%', changeNum: -0.07, logo: null, category: 'fav' },
    { id: 'f6', symbol: 'SUI', pair: 'USDT', price: '$0.6981', change: '-3,05%', changeNum: -3.05, logo: null, category: 'fav' },
    { id: 'f7', symbol: 'HYPE', pair: 'USDT', price: '$61.66', change: '-7,23%', changeNum: -7.23, logo: null, category: 'fav' },
    { id: 'f8', symbol: 'SPCX', pair: 'USDT', price: '$154.99', change: '+1,28%', changeNum: 1.28, logo: null, category: 'fav' },
];

const CRYPTO_DATA: StockAsset[] = [
    { id: 'c1', symbol: 'BTC', pair: 'USDT', price: '$62,659.15', change: '-1,54%', changeNum: -1.54, logo: require('@/assets/images/btc.png'), category: 'crypto' },
    { id: 'c2', symbol: 'ETH', pair: 'USDT', price: '$1,665.07', change: '-2,98%', changeNum: -2.98, logo: require('@/assets/images/eth.png'), category: 'crypto' },
    { id: 'c3', symbol: 'SOL', pair: 'USDT', price: '$69.35', change: '-2,68%', changeNum: -2.68, logo: require('@/assets/images/sol.png'), category: 'crypto' },
    { id: 'c4', symbol: 'USDC', pair: 'USDT', price: '$1.0098', change: '+0,01%', changeNum: 0.01, logo: require('@/assets/images/usdc.png'), category: 'crypto' },
    { id: 'c5', symbol: 'TRX', pair: 'USDT', price: '$0.3291', change: '-0,87%', changeNum: -0.87, logo: require('@/assets/images/trx.png'), category: 'crypto' },
    { id: 'c6', symbol: 'BNB', pair: 'USDT', price: '$577.21', change: '-0,78%', changeNum: -0.78, logo: require('@/assets/images/bnb.png'), category: 'crypto' },
    { id: 'c7', symbol: 'XPR', pair: 'USDT', price: '$0.1507', change: '-3,02%', changeNum: -3.02, logo: require('@/assets/images/xpr.png'), category: 'crypto' },
    { id: 'c8', symbol: 'AVAX', pair: 'USDT', price: '$6.40', change: '+3,72%', changeNum: 3.72, logo: require('@/assets/images/avax1.png'), category: 'crypto' },
    { id: 'c9', symbol: 'AVAX', pair: 'USDT', price: '$0.00000455', change: '-0,022%', changeNum: -0.022, logo: require('@/assets/images/avax2.png'), category: 'crypto' },
];

const GOLD_DATA: StockAsset[] = [
    { id: 'g1', symbol: 'Vàng SJC', pair: 'VND', price: '79.5 Mđ', change: '+0,85%', changeNum: 0.85, logo: null, category: 'gold' },
    { id: 'g2', symbol: 'Vàng 9999', pair: 'VND', price: '68.2 Mđ', change: '+0,12%', changeNum: 0.12, logo: null, category: 'gold' },
    { id: 'g3', symbol: 'Gold XAU', pair: 'USD', price: '$2,315.40', change: '-0,32%', changeNum: -0.32, logo: null, category: 'gold' },
];

const ESTATE_DATA: StockAsset[] = [
    { id: 'r1', symbol: 'Chung cư HN', pair: 'BĐS', price: '5.2 tỷ', change: '+2,10%', changeNum: 2.10, logo: null, category: 'estate' },
    { id: 'r2', symbol: 'Đất nền HCM', pair: 'BĐS', price: '12.8 tỷ', change: '-1,25%', changeNum: -1.25, logo: null, category: 'estate' },
    { id: 'r3', symbol: 'Biệt thự Đà Nẵng', pair: 'BĐS', price: '24.5 tỷ', change: '+0,00%', changeNum: 0.00, logo: null, category: 'estate' },
];

const GOLD_METALS: PreciousMetal[] = [
    { id: 'gm1', symbol: '18K Vàng / g', price: '$95.72', change: '-4,49%', isPositive: false, updateTime: 'cập nhật lần cuối vào 8:00 24 tháng 6 năm 2026' },
    { id: 'gm2', symbol: '22K Vàng / g', price: '$116.99', change: '-4,49%', isPositive: false, updateTime: 'cập nhật lần cuối vào 8:00 24 tháng 6 năm 2026' },
    { id: 'gm3', symbol: '24K Vàng / g', price: '$127.62', change: '-4,49%', isPositive: false, updateTime: 'cập nhật lần cuối vào 8:00 24 tháng 6 năm 2026' },
];

const SILVER_METALS: PreciousMetal[] = [
    { id: 'sm1', symbol: '900 Bạc / g', price: '$1.71', change: '-9,06%', isPositive: false, updateTime: 'cập nhật lần cuối vào 8:00 24 tháng 6 năm 2026' },
    { id: 'sm2', symbol: '925 Bạc / g', price: '$1.75', change: '-9,06%', isPositive: false, updateTime: 'cập nhật lần cuối vào 8:00 24 tháng 6 năm 2026' },
    { id: 'sm3', symbol: '999 Bạc / g', price: '$1.90', change: '-9,06%', isPositive: false, updateTime: 'cập nhật lần cuối vào 8:00 24 tháng 6 năm 2026' },
];

const PLATINUM_METALS: PreciousMetal[] = [
    { id: 'pm1', symbol: '900 Bạch Kim / g', price: '$46.68', change: '-3,27%', isPositive: false, updateTime: 'cập nhật lần cuối vào 8:00 24 tháng 6 năm 2026' },
    { id: 'pm2', symbol: '950 Bạch Kim / g', price: '$49.27', change: '-3,27%', isPositive: false, updateTime: 'cập nhật lần cuối vào 8:00 24 tháng 6 năm 2026' },
    { id: 'pm3', symbol: '999 Bạch Kim / g', price: '$51.86', change: '-3,27%', isPositive: false, updateTime: 'cập nhật lần cuối vào 8:00 24 tháng 6 năm 2026' },
];

const REAL_ESTATE_DATA: EstateAsset[] = [
    {
        id: 're1',
        title: 'Resort 2 phòng ngủ',
        location: 'Đại Lại resort',
        price: '30 triệu / m²',
        image: require('@/assets/images/house1.png'),
        updateTime: 'cập nhật lần cuối vào 8:00 24 tháng 6 năm 2026',
    },
    {
        id: 're2',
        title: 'Chung cư Homeland',
        location: 'Long Biên, Hà Nội',
        price: '25 triệu / m²',
        image: require('@/assets/images/house2.png'),
        updateTime: 'cập nhật lần cuối vào 8:00 24 tháng 6 năm 2026',
    },
    {
        id: 're3',
        title: 'Chung cư Ciputra',
        location: 'Long Biên, Hà Nội',
        price: '25 triệu / m',
        image: require('@/assets/images/house3.png'),
        updateTime: 'cập nhật lần cuối vào 8:00 24 tháng 6 năm 2026',
    },
];

// ─── CANDLESTICK CHART COMPONENT ──────────────────────────────────────────────
const CandlestickMiniChart = () => {
    const candles = [
        { isGreen: true, mt: 30, wickTop: 6, bodyH: 14, wickBot: 6 },
        { isGreen: true, mt: 18, wickTop: 8, bodyH: 18, wickBot: 5 },
        { isGreen: true, mt: 4, wickTop: 6, bodyH: 24, wickBot: 8 },
        { isGreen: false, mt: 10, wickTop: 8, bodyH: 22, wickBot: 6 },
        { isGreen: false, mt: 26, wickTop: 6, bodyH: 20, wickBot: 6 },
        { isGreen: true, mt: 8, wickTop: 6, bodyH: 20, wickBot: 8 },
        { isGreen: true, mt: 0, wickTop: 4, bodyH: 26, wickBot: 8 },
        { isGreen: false, mt: 22, wickTop: 8, bodyH: 18, wickBot: 6 },
        { isGreen: false, mt: 42, wickTop: 6, bodyH: 18, wickBot: 5 },
        { isGreen: false, mt: 52, wickTop: 5, bodyH: 16, wickBot: 6 },
    ];

    return (
        <View style={styles.miniChart}>
            {candles.map((c, i) => {
                const color = c.isGreen ? '#AFE85A' : '#EE6868';
                return (
                    <View key={i} style={[styles.candleCol, { marginTop: c.mt }]}>
                        <View style={[styles.wickLine, { height: c.wickTop, backgroundColor: color }]} />
                        <View style={[styles.bodyBlock, { height: c.bodyH, backgroundColor: color }]} />
                        <View style={[styles.wickLine, { height: c.wickBot, backgroundColor: color }]} />
                    </View>
                );
            })}
        </View>
    );
};

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function StocksScreen() {
    const router = useRouter();

    const [activeTab, setActiveTab] = useState<string>('fav');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [activePage, setActivePage] = useState<number>(1);
    const [goldSubTab, setGoldSubTab] = useState<'gold' | 'silver' | 'platinum'>('gold');
    const [favorites, setFavorites] = useState<Set<string>>(
        new Set(['f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8'])
    );

    const toggleFav = (id: string) => {
        setFavorites(prev => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    };

    const getTabData = (): StockAsset[] => {
        let base: StockAsset[];
        switch (activeTab) {
            case 'fav': base = FAV_DATA; break;
            case 'crypto': base = CRYPTO_DATA; break;
            case 'gold': base = GOLD_DATA; break;
            case 'estate': base = ESTATE_DATA; break;
            default: base = [];
        }
        if (searchQuery.trim()) {
            return base.filter(i => i.symbol.toLowerCase().includes(searchQuery.toLowerCase()));
        }
        return base;
    };

    const data = getTabData();

    const renderFavRow = ({ item }: { item: StockAsset }) => {
        const isFav = favorites.has(item.id);
        const isPos = item.changeNum >= 0;
        return (
            <View style={styles.row}>
                <View style={styles.favColName}>
                    <TouchableOpacity onPress={() => toggleFav(item.id)} activeOpacity={0.7} hitSlop={{ top: 8, bottom: 8, left: 4, right: 4 }}>
                        <Ionicons name="star" size={16} color={isFav ? GOLD : '#CFD8DC'} />
                    </TouchableOpacity>
                    <View style={styles.nameGroup}>
                        <Text style={styles.symbolBold}>{item.symbol}</Text>
                        <Text style={styles.pairSlash}>{'/'}</Text>
                        <Text style={styles.pairThin}>{item.pair}</Text>
                    </View>
                </View>

                <View style={styles.favColPrice}>
                    <Text style={styles.priceText}>{item.price}</Text>
                </View>

                <View style={styles.favColChange}>
                    <View style={[styles.pill, { backgroundColor: isPos ? GREEN : RED }]}>
                        <Text style={styles.pillText}>{item.change}</Text>
                    </View>
                </View>
            </View>
        );
    };

    const renderCryptoRow = ({ item }: { item: StockAsset }) => {
        const isPos = item.changeNum >= 0;
        return (
            <View style={styles.row}>
                <View style={styles.cryptoColName}>
                    {item.logo ? (
                        <Image source={item.logo} style={styles.coinLogo} resizeMode="contain" />
                    ) : (
                        <View style={[styles.coinLogo, styles.coinLogoFallback]}>
                            <Text style={styles.coinLogoFallbackText}>{item.symbol.charAt(0)}</Text>
                        </View>
                    )}
                    <Text style={styles.symbolBold}>{item.symbol}</Text>
                </View>

                <View style={styles.cryptoColRight}>
                    <Text style={styles.priceText}>{item.price}</Text>
                    <Text style={[styles.changeSmall, { color: isPos ? GREEN : RED }]}>
                        {item.change}
                    </Text>
                </View>
            </View>
        );
    };

    const renderItem = ({ item }: { item: StockAsset }) => {
        if (activeTab === 'crypto' || activeTab === 'gold' || activeTab === 'estate') {
            return renderCryptoRow({ item });
        }
        return renderFavRow({ item });
    };

    const PaginationSimple = () => (
        <View style={styles.pagination}>
            <TouchableOpacity style={styles.pageArrow} onPress={() => setActivePage(p => Math.max(1, p - 1))}>
                <Ionicons name="chevron-back" size={14} color="#555" />
            </TouchableOpacity>
            <View style={styles.pageNumActive}>
                <Text style={styles.pageNumActiveText}>{'1'}</Text>
            </View>
            <TouchableOpacity style={styles.pageArrow} onPress={() => setActivePage(p => p + 1)}>
                <Ionicons name="chevron-forward" size={14} color="#555" />
            </TouchableOpacity>
        </View>
    );

    const PaginationFull = () => {
        const pages = [1, 2, 3, 4, 5];
        return (
            <View style={styles.pagination}>
                <TouchableOpacity style={styles.pageArrow} onPress={() => setActivePage(p => Math.max(1, p - 1))}>
                    <Ionicons name="chevron-back" size={14} color="#555" />
                </TouchableOpacity>
                {pages.map(p => (
                    <TouchableOpacity
                        key={p}
                        style={[styles.pageBtn, activePage === p && styles.pageBtnActive]}
                        onPress={() => setActivePage(p)}
                    >
                        <Text style={[styles.pageBtnText, activePage === p && styles.pageBtnTextActive]}>{p}</Text>
                    </TouchableOpacity>
                ))}
                <Text style={styles.pageEllipsis}>{'...'}</Text>
                <TouchableOpacity
                    style={[styles.pageBtn, activePage === 99 && styles.pageBtnActive]}
                    onPress={() => setActivePage(99)}
                >
                    <Text style={[styles.pageBtnText, activePage === 99 && styles.pageBtnTextActive]}>{'99'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.pageArrow} onPress={() => setActivePage(p => Math.min(99, p + 1))}>
                    <Ionicons name="chevron-forward" size={14} color="#555" />
                </TouchableOpacity>
            </View>
        );
    };

    const TabBtn = ({ id, label }: { id: string; label: string }) => (
        <TouchableOpacity
            onPress={() => { setActiveTab(id); setActivePage(1); }}
            style={styles.tabItem}
            activeOpacity={0.8}
        >
            <Text style={[styles.tabText, activeTab === id && styles.tabActiveText]}>{label}</Text>
            {activeTab === id && <View style={styles.tabUnderline} />}
        </TouchableOpacity>
    );

    const SortIcon = ({ color = '#000' }: { color?: string }) => (
        <View style={styles.sortIconWrap}>
            <Ionicons name="caret-up" size={8} color={color} style={styles.sortIconUp} />
            <Ionicons name="caret-down" size={8} color={color} />
        </View>
    );

    const HeaderLabel = ({
        label,
        align = 'left',
        underline = false,
    }: {
        label: string;
        align?: 'left' | 'right';
        underline?: boolean;
    }) => (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: align === 'right' ? 'flex-end' : 'flex-start',
            }}
        >
            <Text
                style={[
                    styles.thLabel,
                    align === 'right' && { textAlign: 'right' },
                    underline && styles.thLabelUnderline,
                ]}
            >
                {label}
            </Text>
            <SortIcon />
        </View>
    );

    const TableHeader = () => {
        if (activeTab === 'fav') {
            return (
                <View style={[styles.tableHeader, styles.tableHeaderFav]}>
                    <View style={styles.favColName}>
                        <HeaderLabel label="Tên" underline />
                    </View>
                    <View style={styles.favColPrice}>
                        <HeaderLabel label="Giá" align="right" />
                    </View>
                    <View style={styles.favColChange}>
                        <HeaderLabel label="Thay đổi" align="right" />
                    </View>
                </View>
            );
        }
        return (
            <View style={[styles.tableHeader, styles.tableHeaderCrypto]}>
                <View style={styles.cryptoColName}>
                    <HeaderLabel label="Tên" underline />
                </View>
                <View style={styles.cryptoColRight}>
                    <HeaderLabel label="Giá/Thay đổi" align="right" />
                </View>
            </View>
        );
    };

    const GoldSection = () => {
        const getGoldData = () => {
            if (goldSubTab === 'gold') return GOLD_METALS;
            if (goldSubTab === 'silver') return SILVER_METALS;
            return PLATINUM_METALS;
        };

        const renderMetalCard = ({ item }: { item: PreciousMetal }) => {
            return (
                <View style={styles.metalCard}>
                    <View style={styles.metalCardTop}>
                        <View style={styles.metalCardInfo}>
                            <Text style={styles.metalCardTitle}>{item.symbol}</Text>
                            <Text style={styles.metalCardPrice}>{item.price}</Text>
                            <View style={[styles.metalPill, { backgroundColor: '#ef4444' }]}>
                                <Text style={styles.metalPillText}>{item.change}</Text>
                            </View>
                        </View>
                        <CandlestickMiniChart />
                    </View>
                    <Text style={styles.metalCardUpdate}>{item.updateTime}</Text>
                </View>
            );
        };

        return (
            <View style={{ flex: 1 }}>
                <View style={styles.subTabsWrapper}>
                    <TouchableOpacity style={[styles.subTabItem]} onPress={() => setGoldSubTab('gold')}>
                        <View style={[styles.subTabPill, goldSubTab === 'gold' && styles.subTabItemActive]}>
                            <Text style={[styles.subTabText, goldSubTab === 'gold' && styles.subTabTextActive]}>Vàng</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.subTabItem]} onPress={() => setGoldSubTab('silver')}>
                        <View style={[styles.subTabPill, goldSubTab === 'silver' && styles.subTabItemActive]}>
                            <Text style={[styles.subTabText, goldSubTab === 'silver' && styles.subTabTextActive]}>Bạc</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.subTabItem]} onPress={() => setGoldSubTab('platinum')}>
                        <View style={[styles.subTabPill, goldSubTab === 'platinum' && styles.subTabItemActive]}>
                            <Text style={[styles.subTabText, goldSubTab === 'platinum' && styles.subTabTextActive]}>Bạch Kim</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.countryPickerRow}>
                    <TouchableOpacity style={styles.countryPickerButton} activeOpacity={0.8}>
                        <Image source={require('@/assets/images/usa.png')} style={styles.flagImage} resizeMode="contain" />
                        <Ionicons name="chevron-down" size={16} color="#12AEBE" style={{ marginLeft: 6 }} />
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={getGoldData()}
                    renderItem={renderMetalCard}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 130 }}
                />
            </View>
        );
    };

    const EstateSection = () => {
        const renderEstateCard = ({ item }: { item: EstateAsset }) => {
            return (
                <View style={styles.estateCard}>
                    <Image source={item.image} style={styles.estateImage} />
                    <View style={styles.estateInfoCol}>
                        <Text style={styles.estateTitle} numberOfLines={1}>{item.title}</Text>
                        <View style={styles.estateMetaRow}>
                            <Ionicons name="location" size={14} color="#12AEBE" style={{ marginRight: 6 }} />
                            <Text style={styles.estateMetaText} numberOfLines={1}>{item.location}</Text>
                        </View>
                        <View style={styles.estateMetaRow}>
                            <Image
                                source={require('@/assets/images/gold-coin.png')}
                                style={{ width: 14, height: 14, marginRight: 6 }}
                                resizeMode="contain"
                            />
                            <Text style={styles.estateMetaText} numberOfLines={1}>{item.price}</Text>
                        </View>
                        <View style={styles.estateCardBottom}>
                            <Text style={styles.estateUpdateTime}>{item.updateTime}</Text>
                            <TouchableOpacity style={styles.contactBtn} activeOpacity={0.8}>
                                <Text style={styles.contactBtnText}>Liên hệ</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            );
        };

        return (
            <View style={{ flex: 1 }}>
                <View style={styles.filtersRow}>
                    <TouchableOpacity style={[styles.filterPill, { marginRight: 15 }]} activeOpacity={0.8}>
                        <Ionicons name="funnel" size={12} color="#565555" style={{ marginRight: 15 }} />
                        <Text style={styles.filterPillText}>Lọc</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.filterPill, { marginRight: 15 }]} activeOpacity={0.8}>
                        <Text style={styles.filterPillText}>Loại nhà đất</Text>
                        <Ionicons name="chevron-down" size={12} color="#565555" style={{ marginLeft: 4 }} />
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.filterPill, { marginRight: 0 }]} activeOpacity={0.8}>
                        <Text style={styles.filterPillText}>Giá / diện tích</Text>
                        <Ionicons name="chevron-down" size={12} color="#565555" style={{ marginLeft: 7 }} />
                    </TouchableOpacity>

                    <View style={{ flex: 1 }} />

                    <TouchableOpacity style={[styles.mapIconBtn, { marginLeft: 'auto' }]} activeOpacity={0.8}>
                        <Ionicons name="map-outline" size={16} color="#000" />
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={REAL_ESTATE_DATA}
                    renderItem={renderEstateCard}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 130 }}
                />
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} activeOpacity={0.7}>
                    <Ionicons name="chevron-back" size={22} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{'Chứng khoán'}</Text>
                <View style={styles.backBtn} />
            </View>

            {/* Body */}
            <View style={styles.body}>
                <Image
                    source={require('@/assets/images/background-wallet.png')}
                    style={styles.backgroundImage}
                    resizeMode="cover"
                />
                {/* Search bar */}
                <View style={styles.searchBar}>
                    <Ionicons name="search" size={16} color="#000" style={{ marginRight: 8 }} />
                    <TextInput
                        placeholder="Crypto, Cổ phiếu, vàng, dApp, nhà đất ....."
                        placeholderTextColor="#4D4848"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        style={styles.searchInput}
                    />
                </View>

                {/* Tabs */}
                <View style={styles.tabsRow}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsScroll}>
                        <TabBtn id="fav" label="Yêu thích" />
                        <TabBtn id="crypto" label="Tiền mã hóa" />
                        <TabBtn id="gold" label="Vàng" />
                        <TabBtn id="estate" label="Nhà đất" />
                        <TabBtn id="other" label="Cổ phiếu" />
                    </ScrollView>
                    <TouchableOpacity style={styles.menuBtn}>
                        <View style={styles.menuLine} />
                        <View style={styles.menuLine} />
                        <View style={styles.menuLine} />
                    </TouchableOpacity>
                </View>

                {activeTab === 'fav' && (
                    <View style={styles.chipsRow}>
                        <TouchableOpacity style={styles.chipActive} activeOpacity={0.8}>
                            <Text style={styles.chipActiveText}>{`Tất cả (${data.length})`}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.chipInactive} activeOpacity={0.8}>
                            <Text style={styles.chipInactiveText}>{`Spot (${data.length})`}</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {activeTab === 'crypto' && (
                    <TouchableOpacity style={styles.exploreBanner} activeOpacity={0.8}>
                        <Text style={styles.exploreBannerText}>{'Khám phá thị trường'}</Text>
                        <Ionicons name="chevron-forward" size={18} color={'#fff'} />
                    </TouchableOpacity>
                )}

                {activeTab !== 'gold' && activeTab !== 'estate' && <TableHeader />}

                {activeTab === 'gold' ? (
                    <GoldSection />
                ) : activeTab === 'estate' ? (
                    <EstateSection />
                ) : (
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 130 }}
                        ListFooterComponent={
                            activeTab === 'fav' ? <PaginationSimple /> : <PaginationFull />
                        }
                    />
                )}
            </View>

            <WavyTabBar
                activeTabProp="Wallet"
                onNavigateToHome={() => router.replace('/')}
                onNavigateToWallet={() => router.replace('/wallet')}
                onNavigateToAnalysis={() => router.replace('/analysis')}
                onNavigateToOther={() => router.replace('/other')}
            />
        </SafeAreaView>
    );
}

// ─── STYLES ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
        paddingVertical: 12,
        backgroundColor: '#fff',
        borderBottomColor: '#e5e7eb',
    },
    backBtn: {
        width: 36,
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        flex: 1,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '700',
        color: '#111',
    },
    body: {
        flex: 1,
        backgroundColor: '#d1e7ed',
        paddingHorizontal: 14,
        position: 'relative',
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#59C4BB',
        borderRadius: 22,
        paddingHorizontal: 14,
        height: 38,
        marginTop: 12,
        marginBottom: 6,
    },
    searchInput: {
        flex: 1,
        fontSize: 11,
        textAlign: 'center',
        color: '#222',
        padding: 0,
        paddingRight: 30,
    },
    tabsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: 'rgba(18,174,190,0.3)',
        marginBottom: 10,
    },
    tabsScroll: {
        alignItems: 'center',
        flexGrow: 1,
        paddingRight: 6,
    },
    tabItem: {
        paddingVertical: 9,
        marginRight: 24,
        position: 'relative',
    },
    tabText: {
        fontSize: 16,
        color: '#A99E9E',
    },
    tabActiveText: {
        color: '#111',
    },
    tabUnderline: {
        position: 'absolute',
        bottom: 0,
        left: 18,
        right: 18,
        height: 4,
        backgroundColor: '#E0CE28',
        borderRadius: 3,
    },
    thLabelUnderline: {
        borderBottomColor: '#bbb',
        borderStyle: 'dashed',
    },
    sortIconWrap: {
        marginLeft: 3,
        justifyContent: 'center',
        flexShrink: 0,
    },
    sortIconUp: {
        marginBottom: -3,
    },
    menuBtn: {
        paddingHorizontal: 4,
        paddingBottom: -5,
        justifyContent: 'center',
        gap: 3,
    },
    menuLine: {
        width: 18,
        height: 2,
        backgroundColor: '#000',
        borderRadius: 1,
    },
    chipsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 12,
    },
    chipActive: {
        backgroundColor: '#54B5B2',
        borderRadius: 8,
        paddingVertical: 5,
        paddingHorizontal: 12,
    },
    chipActiveText: {
        color: '#fff',
        fontSize: 14,
    },
    chipInactive: {
        backgroundColor: 'transparent',
        borderRadius: 8,
        paddingVertical: 5,
        paddingHorizontal: 8,
    },
    chipInactiveText: {
        color: '#000',
        fontSize: 14,
    },
    exploreBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        justifyContent: 'space-between',
        backgroundColor: '#54B5B2',
        borderRadius: 11,
        borderWidth: 1,
        borderColor: '#54B5B2',
        paddingVertical: 7,
        paddingHorizontal: 16,
        marginBottom: 12,
        paddingRight: 2,
        width: 186,
        height: 27,
    },
    exploreBannerText: {
        fontSize: 14,
        color: '#fff',
        marginRight: 4,
    },
    tableHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 6,
        borderBottomColor: 'rgba(18,174,190,0.3)',
        marginBottom: 2,
    },
    tableHeaderFav: {},
    tableHeaderCrypto: {},
    thLabel: {
        fontSize: 14,
        color: '#000',
        fontWeight: '700',
        paddingBottom: 2,
        borderBottomColor: 'transparent',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomColor: 'rgba(18,174,190,0.2)',
    },
    favColName: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    favColPrice: {
        flex: 1.4,
        alignItems: 'flex-end',
        paddingRight: 8,
    },
    favColChange: {
        flex: 1,
        alignItems: 'flex-end',
    },
    cryptoColName: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    cryptoColRight: {
        flex: 1,
        alignItems: 'flex-end',
    },
    coinLogo: {
        width: 32,
        height: 32,
        borderRadius: 16,
    },
    coinLogoFallback: {
        backgroundColor: '#EE6868',
        justifyContent: 'center',
        alignItems: 'center',
    },
    coinLogoFallbackText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 13,
    },
    nameGroup: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    symbolBold: {
        fontSize: 13.5,
        fontWeight: '700',
        color: '#1a1a2e',
    },
    pairSlash: {
        fontSize: 12,
        color: '#95a5a6',
        marginHorizontal: 1,
    },
    pairThin: {
        fontSize: 12,
        color: '#95a5a6',
        fontWeight: '400',
    },
    priceText: {
        fontSize: 13.5,
        fontWeight: '700',
        color: '#1a1a2e',
        textAlign: 'right',
    },
    changeSmall: {
        fontSize: 12,
        fontWeight: '600',
        textAlign: 'right',
        marginTop: 2,
    },
    pill: {
        borderRadius: 6,
        paddingVertical: 5,
        paddingHorizontal: 8,
        minWidth: 64,
        alignItems: 'center',
        justifyContent: 'center',
    },
    pillText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '700',
    },
    pagination: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingVertical: 18,
        gap: 2,
    },
    pageArrow: {
        width: 26,
        height: 26,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pageNumActive: {
        width: 26,
        height: 26,
        borderRadius: 5,
        backgroundColor: '#e5e7eb',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pageNumActiveText: {
        fontSize: 13,
        fontWeight: '700',
        color: '#111',
    },
    pageBtn: {
        minWidth: 26,
        height: 26,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 4,
    },
    pageBtnActive: {
        backgroundColor: '#e5e7eb',
    },
    pageBtnText: {
        fontSize: 12.5,
        color: '#555',
        fontWeight: '500',
    },
    pageBtnTextActive: {
        fontWeight: '700',
        color: '#111',
    },
    pageEllipsis: {
        fontSize: 12.5,
        color: '#888',
        paddingHorizontal: 2,
    },

    // ── Precious metals / Gold styles ──────────────────────────────────────────
    subTabsWrapper: {
        flexDirection: 'row',
        backgroundColor: '#e6f4f6',
        borderRadius: 14,
        padding: 7,
        marginVertical: 10,
    },
    subTabItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    subTabPill: {
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 9,
    },
    subTabItemActive: {
        backgroundColor: '#12AEBE',
        borderRadius: 9,
        marginHorizontal: 4,
        marginVertical: 2,
    },
    subTabText: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#000',
    },
    subTabTextActive: {
        color: '#000',
        fontWeight: 'bold',
    },
    countryPickerRow: {
        alignSelf: 'flex-start',
        marginBottom: 12,
    },
    countryPickerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e6f4f6',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    flagImage: {
        width: 30,
        height: 30,
    },
    metalCard: {
        backgroundColor: '#edf9fa',
        borderRadius: 20,
        padding: 16,
        marginBottom: 14,
    },
    metalCardTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    metalCardInfo: {
        flex: 1,
    },
    metalCardTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
    },
    metalCardPrice: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#000',
        marginVertical: 6,
    },
    metalPill: {
        alignSelf: 'flex-start',
        borderRadius: 12,
        paddingHorizontal: 10,
        paddingVertical: 4,
    },
    metalPillText: {
        color: '#ffffff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    metalCardUpdate: {
        fontSize: 11,
        color: '#7f8c8d',
        marginTop: 12,
    },
    miniChart: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        height: 90,
        width: 100,
        gap: 2,
    },
    candleCol: {
        alignItems: 'center',
        width: 8,
    },
    wickLine: {
        width: 1.5,
        borderRadius: 0.75,
    },
    bodyBlock: {
        width: 8,
        borderRadius: 2,
    },

    // ── Real Estate styles ─────────────────────────────────────────────────────
    filtersRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    filterPill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#C1E9E6',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 6,
    },
    filterPillText: {
        fontSize: 13,
        color: '#333',
        fontWeight: '500',
    },
    mapIconBtn: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#C1E9E6',
        borderRadius: 8,
        width: 43,
        height: 32,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    estateCard: {
        flexDirection: 'row',
        backgroundColor: '#EFFDFC',
        borderRadius: 15,
        padding: 12,
        marginTop: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: 'rgba(18, 174, 190, 0.1)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    estateImage: {
        width: 150,
        height: 200,
        borderRadius: 20,
    },
    estateInfoCol: {
        flex: 1,
        marginTop: 15,
        marginLeft: 40,
        justifyContent: 'flex-start',
    },
    estateTitle: {
        fontSize: 16,
        color: '#000',
        marginBottom: 4,
    },
    estateMetaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    estateMetaText: {
        fontSize: 16,
        color: '#000',
        flex: 1,
    },
    estateCardBottom: {
        flexDirection: 'column',
        alignItems: 'flex-end',
    },
    estateUpdateTime: {
        fontSize: 8,
        color: '#7f8c8d',
        marginTop: 50,
        marginBottom: 4,
        marginRight: 4,
    },
    contactBtn: {
        backgroundColor: '#53B4B1',
        borderRadius: 11,
        paddingHorizontal: 20,
        paddingVertical: 6,
        marginTop: 6,
    },
    contactBtnText: {
        color: '#fff',
        fontSize: 16,
    },
});
