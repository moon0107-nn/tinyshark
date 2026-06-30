import { Feather, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import WavyTabBar from './navbar';

const { width } = Dimensions.get('window');

interface OtherScreenProps {
    onNavigateToHome?: () => void;
    onNavigateToWallet?: () => void;
    onNavigateToAnalyst?: () => void;
}

export default function OtherScreen({ onNavigateToHome, onNavigateToWallet, onNavigateToAnalyst }: OtherScreenProps) {

    // 1. Mảng dữ liệu Tính năng
    const features = [
        { id: '1', title: 'Giao diện', imageSource: require('@/assets/images/otherIcons/giaodien-icon.png') },
        { id: '2', title: 'Hạn mức chi', imageSource: require('@/assets/images/otherIcons/hanmucchi-icon.png') },
        { id: '3', title: 'Hạng mục thu/chi', imageSource: require('@/assets/images/otherIcons/hangmucthuchi-icon.png') },
        { id: '4', title: 'Dự thu/\nDự chi', imageSource: require('@/assets/images/otherIcons/duthuduchi-icon.png') },
        { id: '5', title: 'Kết nối ngân hàng', imageSource: require('@/assets/images/otherIcons/ketnoinganhang-icon.png') },
        { id: '6', title: 'Du lịch', imageSource: require('@/assets/images/otherIcons/dulich-icon.png') },
        { id: '7', title: 'Danh sách\nmua sắm', imageSource: require('@/assets/images/otherIcons/danhsachmuasam-icon.png') },
        { id: '8', title: 'Lời khuyên\ntừ shark', imageSource: require('@/assets/images/otherIcons/loikhuyen-icon.png') },
    ];

    // 2. Mảng dữ liệu Tiện ích
    const utilities = [
        { id: '1', title: 'Tiết kiệm\ngửi góp', imageSource: require('@/assets/images/otherIcons/tietkiemguigop-icon.png') },
        { id: '2', title: 'Xuất khẩu\ndữ liệu', imageSource: require('@/assets/images/otherIcons/xuatkhaudulieu-icon.png') },
        { id: '3', title: 'Tra cứu\ntỷ giá', imageSource: require('@/assets/images/otherIcons/tracuutygia-icon.png') },
    ];

    // 3. Mảng danh sách cài đặt phía dưới
    // Thêm interface này trước return
    type SettingItem = {
        id: string;
        title: string;
        subtitle?: string;   // ← dấu ? = optional
        icon: any;
    };

    const settingsList: SettingItem[] = [
        { id: '1', title: 'Cài đặt chung', icon: require('@/assets/images/otherIcons/caidatchung-icon.png') },
        { id: '2', title: 'Cài đặt dữ liệu', icon: require('@/assets/images/otherIcons/caidatdulieu-icon.png') },
        { id: '3', title: 'Giới thiệu cho bạn', icon: require('@/assets/images/otherIcons/chiasechoban-icon.png') },
        { id: '4', title: 'Bạn thích ứng dụng này?', icon: require('@/assets/images/otherIcons/danhgia-icon.png') },
        { id: '5', title: 'Góp ý với nhà phát triển', icon: require('@/assets/images/otherIcons/gopyvoinhaphattrien-icon.png') },
        { id: '6', title: 'Trợ giúp & thông tin', icon: require('@/assets/images/otherIcons/trogiupvathongtin-icon.png') },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.gradientHeader} />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                <View style={styles.profileContainer}>
                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' }}
                        style={styles.avatar}
                    />
                    <Text style={styles.profileName}>Quang Minh</Text>
                </View>

                <TouchableOpacity style={styles.premiumButton} activeOpacity={0.9}>
                    <Text style={styles.premiumText}>
                        Năng cấp <Text style={styles.premiumHighlight}>Premium ⭐️</Text>
                    </Text>
                </TouchableOpacity>

                <View style={styles.rowInfo}>
                    <View style={styles.infoBox}>
                        <FontAwesome5 name="coins" size={16} color="#E5A93C" />
                        <Text style={styles.infoText}>8.40M</Text>
                    </View>
                    <TouchableOpacity style={styles.infoBox}>
                        <Ionicons name="share-social-outline" size={18} color="#4FA7D8" />
                        <Text style={[styles.infoText, { color: '#8F9293' }]}>Mã chia sẻ: </Text>
                        <Text style={[styles.infoText, { fontWeight: 'bold', color: '#8F9293' }]}>6283581</Text>
                        <Feather name="chevron-right" size={16} color="#8F9293" style={{ marginLeft: 5 }} />
                    </TouchableOpacity>
                </View>

                <View style={styles.sectionCard}>
                    <Text style={styles.sectionTitle}>Tính năng</Text>
                    <View style={styles.gridContainer}>
                        {features.map((item) => (
                            <TouchableOpacity key={item.id} style={styles.gridItem} activeOpacity={0.7}>
                                {item.imageSource ? (
                                    <Image source={item.imageSource} style={styles.iconImage} />
                                ) : (
                                    <View style={styles.imagePlaceholder} />
                                )}
                                <Text style={styles.gridItemText} numberOfLines={2}>{item.title}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Khối Tiện Ích */}
                <View style={styles.sectionCard}>
                    <Text style={styles.sectionTitle}>Tiện ích</Text>
                    <View style={styles.gridContainer}>
                        {utilities.map((item) => (
                            <TouchableOpacity key={item.id} style={styles.gridItem} activeOpacity={0.7}>
                                {item.imageSource ? (
                                    <Image source={item.imageSource} style={styles.iconImage} />
                                ) : (
                                    <View style={styles.imagePlaceholder} />
                                )}
                                <Text style={styles.gridItemText} numberOfLines={2}>{item.title}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={styles.settingsContainer}>
                    {settingsList.map((item) => (
                        <TouchableOpacity key={item.id} style={styles.settingRow} activeOpacity={0.7}>
                            <View style={styles.settingIconWrapper}>
                                <Image source={item.icon} style={styles.settingIcon} />
                            </View>
                            <View style={styles.settingTextWrapper}>
                                <Text style={styles.settingTitleText}>{item.title}</Text>
                                {item.subtitle && <Text style={styles.settingSubtitleText}>{item.subtitle}</Text>}
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity style={styles.syncButton} activeOpacity={0.8}>
                    <Image
                        source={require('@/assets/images/otherIcons/dongbo-icon.png')}
                        style={styles.syncIcon}
                    />
                    <Text style={styles.syncButtonText}>Đồng bộ dữ liệu</Text>
                </TouchableOpacity>
                <Text style={styles.syncTimeText}>Đồng bộ lần cuối lúc 18/12/2025 02:09:44</Text>

            </ScrollView>

            <WavyTabBar
                activeTabProp="Other"
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F9FA',
    },
    gradientHeader: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 180,
        backgroundColor: '#72C7C4',
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingTop: 15,
        paddingBottom: 110,
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    avatar: {
        width: 46,
        height: 46,
        borderRadius: 23,
        borderWidth: 2,
        borderColor: '#A1E5E2',
    },
    profileName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 12,
    },
    premiumButton: {
        backgroundColor: '#1E8296',
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 14,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    premiumText: {
        color: 'white',
        fontSize: 15,
        fontWeight: '600',
    },
    premiumHighlight: {
        color: '#F4DF67',
        fontWeight: 'bold',
    },
    rowInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    infoBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.85)',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#E6EFF0',
    },
    infoText: {
        fontSize: 13,
        fontWeight: '500',
        marginLeft: 6,
        color: '#333',
    },
    sectionCard: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 16,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.04,
        shadowRadius: 4,
        elevation: 2,
    },
    sectionTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 16,
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    gridItem: {
        width: '33.33%', // Vẫn giữ chuẩn 3 mục 1 hàng
        alignItems: 'center',
        marginBottom: 20,
    },
    imagePlaceholder: {
        width: 60,
        height: 60,
        marginBottom: 8,
    },
    iconImage: {
        width: 60, // Kích thước này đủ to để hiển thị gộp cả bong bóng lẫn icon
        height: 60,
        marginBottom: 8,
        resizeMode: 'contain',
    },
    gridItemText: {
        fontSize: 12,
        color: '#333',
        textAlign: 'center',
        lineHeight: 16,
        paddingHorizontal: 2,
    },
    settingsContainer: {
        backgroundColor: 'white',
        borderRadius: 16,
        paddingVertical: 4,
        marginBottom: 20,
    },
    settingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    settingIconWrapper: {
        width: 30,
    },
    settingTextWrapper: {
        flex: 1,
        marginLeft: 4,
    },
    settingTitleText: {
        fontSize: 13,
        color: '#333',
        fontWeight: '500',
    },
    settingSubtitleText: {
        fontSize: 10,
        color: '#999',
        marginTop: 2,
    },
    syncButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E2ECEE',
        borderRadius: 10,
        paddingVertical: 12,
        marginHorizontal: 10,
    },
    syncButtonText: {
        color: '#2A8B9D',
        fontWeight: 'bold',
        fontSize: 13,
        marginLeft: 6,
    },
    syncTimeText: {
        textAlign: 'center',
        fontSize: 11,
        color: '#9EA1A2',
        fontStyle: 'italic',
        marginTop: 8,
    },
    settingIcon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
    },
    syncIcon: {
        width: 18,
        height: 18,
        resizeMode: 'contain',
        marginRight: 6,
    },
});