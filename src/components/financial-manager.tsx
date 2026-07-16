import { Feather as Icon, MaterialIcons as MaterialIcon } from '@expo/vector-icons';
import { Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, G, Path, Text as SvgText } from 'react-native-svg';

// Định nghĩa màu sắc từ hình ảnh
const colors = {
  bg: '#E0F7FA',         // Xanh dương nhạt nền
  text: '#333333',       // Văn bản đen/xám đậm
  subText: '#757575',    // Văn bản xám nhạt hơn
  cardBg: '#FFFFFF',     // Nền thẻ trắng
  cardBgAlt: '#E0E0E0',  // Nền thẻ 'Thêm ví mới'
  summaryBg: '#70E1CB',  // Xanh ngọc tóm tắt quỹ
  spendText: '#FF8A80',  // Hồng phấn cho chi tiêu
  depositText: '#81D4FA',// Xanh dương cho nạp vào
  btnChi: '#26A69A',     // Màu nút 'Chi'
  btnNap: '#FFFFFF',     // Màu nút 'Nạp'
  btnChiText: '#FFFFFF',
  btnNapText: '#80DEEA',
  pieBlueDark: '#4FC3F7',
  pieBlueLight: '#90CAF9',
  pieBorder: '#BBDEFB',
};

// Dữ liệu mẫu (theo ảnh)
const walletData = { name: 'Bảo', balance: '12.000.000VNĐ' };
const summaryData = {
  total: '12.000.000VNĐ',
  spend: '600.000VNĐ',
  deposit: '1.000.000VNĐ'
};
interface SpendCategory {
  icon: string;
  name: string;
  percentage: number;
  amount: string;
  color: string;
  iconBg: string;
}

const spendCategories: SpendCategory[] = [
  { icon: 'local-dining', name: 'Ăn uống', percentage: 67, amount: '150.000VNĐ', color: colors.pieBlueDark, iconBg: '#FFECB3' },
  { icon: 'fitness-center', name: 'Tập gym', percentage: 33, amount: '150.000VNĐ', color: colors.pieBlueLight, iconBg: '#FFCC80' },
];

// Hàm helper để vẽ một cung SVG
const describeArc = (x: number, y: number, radius: number, startAngle: number, endAngle: number) => {
  const startRad = (startAngle - 90) * Math.PI / 180;
  const endRad = (endAngle - 90) * Math.PI / 180;
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

  return [
    'M', x + radius * Math.cos(startRad), y + radius * Math.sin(startRad),
    'A', radius, radius, 0, largeArcFlag, 1, x + radius * Math.cos(endRad), y + radius * Math.sin(endRad),
  ].join(' ');
};

// Thành phần Biểu đồ hình tròn SVG thủ công
const SpendPieChart = ({ categories }: { categories: SpendCategory[] }) => {
  const size = 180;
  const center = size / 2;
  const radius = 70;
  const strokeWidth = 15;

  const renderPieSlices = () => {
    let currentAngle = 0;
    return categories.map((cat: SpendCategory, i: number) => {
      const sliceAngle = cat.percentage * 3.6; // 360 / 100
      const startAngle = currentAngle;
      const endAngle = currentAngle + sliceAngle;
      currentAngle += sliceAngle;
      const d = describeArc(center, center, radius, startAngle, endAngle);
      return <Path key={i} d={d} fill="none" stroke={cat.color} strokeWidth={strokeWidth} />;
    });
  };

  const renderPieIcons = () => {
    let currentAngle = 0;
    return categories.map((cat: SpendCategory, i: number) => {
      const sliceAngle = cat.percentage * 3.6;
      const midAngle = currentAngle + sliceAngle / 2;
      currentAngle += sliceAngle;
      const rad = (midAngle - 90) * Math.PI / 180;
      const x = center + radius * Math.cos(rad);
      const y = center + radius * Math.sin(rad);

      const iconBgSize = 24;
      const iconColor = cat.icon === 'local-dining' ? '#FFECB3' : '#FFCC80';
      return (
        <G key={i}>
          <Circle cx={x} cy={y} r={iconBgSize / 2 + 2} fill={iconColor} stroke="#FFFFFF" strokeWidth="2" />
          <SvgText x={x} y={y + 3} textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="bold">
            {cat.icon === 'local-dining' ? '🍩' : '💪'}
          </SvgText>
        </G>
      );
    });
  };

  return (
    <Svg height={size} width={size} viewBox={`0 0 ${size} ${size}`}>
      <Circle cx={center} cy={center} r={radius} stroke={colors.pieBorder} strokeWidth={strokeWidth} fill="none" />
      {renderPieSlices()}
      {renderPieIcons()}
    </Svg>
  );
};

interface FinancialManagerProps {
  onBack: () => void;
  onNavigateToCreateWallet: () => void;
}

const FinancialManagerScreen = ({ onBack, onNavigateToCreateWallet }: FinancialManagerProps) => {
  return (
    <SafeAreaView style={styles.container} edges={['right', 'left']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.bg} />
      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack}><Icon name="arrow-left" size={24} color={colors.text} /></TouchableOpacity>
          <Text style={styles.headerTitle}>Quản lý tài chính</Text>
          <TouchableOpacity><Icon name="layers" size={24} color={colors.text} /></TouchableOpacity>
        </View>

        {/* Shark Character */}
        <View style={styles.sharkContainer}>
          {/* Tạm thời dùng một ảnh placeholder, bạn cần thay thế bằng ảnh cá mập 3D của mình */}
          <Image source={require('@/assets/images/shark-market.gif')} style={styles.sharkImage} />
          <View style={styles.speechBubble}>
            <Text style={styles.speechText}>Ăn ăn ăn</Text>
          </View>
        </View>

        {/* Wallets Section */}
        <View style={styles.walletsSection}>
          {/* Thẻ ví Bảo */}
          <View style={[styles.walletCard, styles.cardElevated]}>
            <View style={styles.walletCardHeader}>
              <Text style={styles.walletName}>{walletData.name}</Text>
              <TouchableOpacity><Icon name="edit-2" size={16} color={colors.subText} /></TouchableOpacity>
            </View>
            <Text style={styles.walletBalance}>{walletData.balance}</Text>
          </View>
          {/* Thêm ví mới */}
          <TouchableOpacity
            style={[styles.walletCard, styles.addWalletCard]}
            onPress={onNavigateToCreateWallet}
            activeOpacity={0.7}
          >
            <Icon name="plus" size={32} color={colors.subText} />
            <Text style={styles.addWalletText}>Thêm ví mới</Text>
          </TouchableOpacity>
        </View>

        {/* Time Filter */}
        <View style={styles.filterSection}>
          <View style={styles.filterDropdown}>
            <Text style={styles.filterText}>Day</Text>
            <Icon name="chevron-down" size={20} color={colors.subText} />
          </View>
          <View style={styles.filterDropdown}>
            <Text style={styles.filterText}>6/1/2024</Text>
            <Icon name="chevron-down" size={20} color={colors.subText} />
          </View>
        </View>

        {/* Fund Summary */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <Text style={styles.summaryLabel}>Quỹ:</Text>
            <Text style={styles.summaryValue}>{summaryData.total}</Text>
          </View>
          <View style={styles.summaryDetailsRow}>
            <View style={[styles.summaryItem, { borderBottomLeftRadius: 10 }]}>
              <View style={styles.itemHeader}><View style={styles.iconSpend}></View><Text style={styles.itemTitle}>Chi tiêu</Text></View>
              <Text style={[styles.itemAmount, { color: colors.spendText }]}>{summaryData.spend}</Text>
            </View>
            <View style={[styles.summaryItem, { borderBottomRightRadius: 10 }]}>
              <View style={styles.itemHeader}><View style={styles.iconDeposit}></View><Text style={styles.itemTitle}>Nạp vào</Text></View>
              <Text style={[styles.itemAmount, { color: colors.depositText }]}>{summaryData.deposit}</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={[styles.actionBtn, styles.btnChi]}>
            <Text style={styles.btnChiText}>Chi</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionBtn, styles.btnNap]}>
            <Text style={styles.btnNapText}>Nạp</Text>
          </TouchableOpacity>
        </View>

        {/* Spend Chart */}
        <View style={styles.chartContainer}>
          <SpendPieChart categories={spendCategories} />
        </View>

        {/* Spend Details List */}
        <View style={styles.detailsList}>
          {spendCategories.map((item, index) => (
            <View key={index} style={styles.detailItem}>
              <View style={[styles.detailIconContainer, { backgroundColor: item.iconBg }]}>
                <MaterialIcon name={item.icon as any} size={18} color="#FFD54F" />
              </View>
              <Text style={styles.detailName}>{item.name}</Text>
              <View style={styles.percentagePill}><Text style={styles.percentagePillText}>{item.percentage}%</Text></View>
              <Text style={styles.detailAmount}>{item.amount}</Text>
            </View>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  sharkContainer: {
    alignItems: 'center',
    position: 'relative',
    marginVertical: 10,
    marginTop: -20, // Đưa lên một chút để bù cho notch
  },
  sharkImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  speechBubble: {
    backgroundColor: '#FFFFFF',
    padding: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderBottomLeftRadius: 0,
    position: 'absolute',
    top: 5,
    right: 40,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  speechText: {
    fontSize: 12,
    color: colors.text,
  },
  walletsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  walletCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 15,
    padding: 15,
    width: '48%',
    height: 100,
    justifyContent: 'center',
  },
  cardElevated: {
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  walletCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  walletName: {
    fontSize: 14,
    color: colors.text,
  },
  walletBalance: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  addWalletCard: {
    backgroundColor: colors.cardBgAlt,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#D0D0D0',
  },
  addWalletText: {
    fontSize: 12,
    color: colors.subText,
    marginTop: 5,
  },
  filterSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  filterDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6EFF4',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 12,
    width: '48%',
    justifyContent: 'space-between',
  },
  filterText: {
    fontSize: 14,
    color: colors.text,
  },
  summaryCard: {
    backgroundColor: colors.summaryBg,
    borderRadius: 15,
    marginVertical: 10,
    padding: 15,
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  summaryValue: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  summaryDetailsRow: {
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden', // Để bo góc
  },
  summaryItem: {
    backgroundColor: '#FFFFFF',
    width: '50%',
    padding: 10,
    alignItems: 'center',
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  iconSpend: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.spendText,
    marginRight: 5,
  },
  iconDeposit: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.depositText,
    marginRight: 5,
  },
  itemTitle: {
    fontSize: 12,
    color: colors.text,
  },
  itemAmount: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  actionBtn: {
    width: '48%',
    borderRadius: 15,
    paddingVertical: 12,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  btnChi: {
    backgroundColor: colors.btnChi,
  },
  btnNap: {
    backgroundColor: colors.btnNap,
  },
  btnChiText: {
    fontSize: 16,
    color: colors.btnChiText,
    fontWeight: 'bold',
  },
  btnNapText: {
    fontSize: 16,
    color: colors.btnNapText,
    fontWeight: 'bold',
  },
  chartContainer: {
    alignItems: 'center',
    marginVertical: 15,
  },
  detailsList: {
    marginVertical: 10,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
  },
  detailIconContainer: {
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  detailName: {
    fontSize: 14,
    color: colors.text,
    flex: 1,
  },
  percentagePill: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginRight: 15,
  },
  percentagePillText: {
    fontSize: 12,
    color: colors.subText,
    fontWeight: '600',
  },
  detailAmount: {
    fontSize: 14,
    color: colors.text,
    fontWeight: 'bold',
  },
});

export default FinancialManagerScreen;