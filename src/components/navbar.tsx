import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Chia màn hình làm 4 phần cho 4 tabs
const TAB_WIDTH = SCREEN_WIDTH / 4;
const BAR_HEIGHT = 110; // Chiều cao tổng thể của thanh navigation

export default function WavyTabBar() {
    const [activeTab, setActiveTab] = useState('Wallet');

    // Vẽ đường cong lượn sóng ôm trọn 4 nút tròn
    // Sử dụng Cubic Bezier Curves (C) để tạo các điểm uốn mượt mà
    const createSvgPath = () => {
        const h = BAR_HEIGHT;
        const w = SCREEN_WIDTH;

        // Điểm bắt đầu ở góc dưới bên trái, đi lên rồi uốn lượn qua 4 đỉnh
        return `
      M 0,${h} 
      L 0,50 
      C ${TAB_WIDTH * 0.1},25 ${TAB_WIDTH * 0.4},25 ${TAB_WIDTH * 0.5},25
      C ${TAB_WIDTH * 0.6},25 ${TAB_WIDTH * 0.9},25 ${TAB_WIDTH},50
      
      C ${TAB_WIDTH * 1.1},75 ${TAB_WIDTH * 1.4},75 ${TAB_WIDTH * 1.5},50
      C ${TAB_WIDTH * 1.6},25 ${TAB_WIDTH * 1.9},25 ${TAB_WIDTH * 2},25
      
      C ${TAB_WIDTH * 2.1},25 ${TAB_WIDTH * 2.4},25 ${TAB_WIDTH * 2.5},50
      C ${TAB_WIDTH * 2.6},75 ${TAB_WIDTH * 2.9},75 ${TAB_WIDTH * 3},50
      
      C ${TAB_WIDTH * 3.1},25 ${TAB_WIDTH * 3.4},25 ${TAB_WIDTH * 3.5},25
      C ${TAB_WIDTH * 3.6},25 ${TAB_WIDTH * 3.9},25 ${w},50
      L w,${h} 
      Z
    `;
    };

    // Hàm này tao vẽ đường cong chuẩn xác dựa trên hình dáng lượn sóng thực tế của ảnh mày đưa
    const generateLiquidPath = () => {
        const w = SCREEN_WIDTH;
        // Điểm uốn xuống giữa các tab tạo hiệu ứng liên kết mượt mà
        return `
      M 0,110 
      L 0,50
      Q ${TAB_WIDTH * 0.5}, -5 ${TAB_WIDTH}, 50
      T ${TAB_WIDTH * 2}, 50
      T ${TAB_WIDTH * 3}, 50
      T ${w}, 50
      L ${w}, 110
      Z
    `;
    };

    const tabs = [
        { id: 'Home', label: 'Home', icon: null }, // Mày thay require('./xxx.png') vào đây
        { id: 'Wallet', label: 'Wallet', icon: null },
        { id: 'Analyst', label: 'Analyst', icon: null },
        { id: 'Other', label: 'Other', icon: null },
    ];

    return (
        <View style={styles.bottomNavContainer}>
            <View style={styles.bottomNavBackground}>
                <TouchableOpacity style={styles.navItem}>
                    <Text style={styles.navLabel}>Home</Text>
                    <View style={styles.navIconCircle}>
                        <Feather name="home" size={20} color="#fff" />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
                    <Text style={styles.navLabel}>Wallet</Text>
                    <View style={styles.activeNavIconCircle}>
                        <MaterialCommunityIcons name="wallet-outline" size={24} color="#112d32" />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem}>
                    <Text style={styles.navLabel}>Analyst</Text>
                    <View style={styles.navIconCircle}>
                        <Ionicons name="stats-chart" size={20} color="#fff" />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem}>
                    <Text style={styles.navLabel}>Other</Text>
                    <View style={styles.navIconCircle}>
                        <Feather name="more-horizontal" size={20} color="#fff" />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    // Giả lập Bottom Navigation
    bottomNavContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        paddingHorizontal: 10,
        paddingBottom: 20,
    },
    bottomNavBackground: {
        backgroundColor: '#278b97',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        height: 70,
        borderRadius: 35,
        paddingHorizontal: 10,
    },
    navItem: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    activeNavItem: {
        marginBottom: 20, // Đẩy nút giữa lên cao hơn
    },
    navLabel: {
        color: '#fff',
        fontSize: 10,
        marginBottom: 4,
    },
    navIconCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#4ba096',
        justifyContent: 'center',
        alignItems: 'center',
    },
    activeNavIconCircle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#f6d3c5', // Màu da cam nhạt chỗ nút Ví
        justifyContent: 'center',
        alignItems: 'center',
    },
});