import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

interface CreateAccountScreenProps {
  onBack: () => void;
}

export default function CreateAccountScreen({ onBack }: CreateAccountScreenProps) {
  const options = [
    {
      id: 'spending',
      title: 'Tạo tài khoản chi tiêu',
      subtitle: 'Quản lý chi tiêu hằng ngày',
      image: require('@/assets/images/shark-vest.png'),
    },
    {
      id: 'saving',
      title: 'Tạo sổ tiết kiệm',
      subtitle: 'Tiết kiệm cho tương lai',
      image: require('@/assets/images/shark-thinking.png'),
    },
    {
      id: 'accumulation',
      title: 'Tạo sổ tích lũy',
      subtitle: 'Tích lũy cho mục tiêu của bạn',
      image: require('@/assets/images/shark-market.png'),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header với nút back */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn} activeOpacity={0.7}>
          <Feather name="arrow-left" size={24} color="#1a1a1a" />
        </TouchableOpacity>
        <Text style={styles.mainTitle}>Tạo mới tài khoản</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.cardContainer}>
        {options.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            activeOpacity={0.7}
            onPress={() => console.log(`Bấm vào: ${item.title}`)}
          >
            <View style={styles.cardLeft}>
              <View style={styles.imageWrapper}>
                <Image source={item.image} style={styles.mascotImage} />
              </View>
              <View style={styles.textWrapper}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
              </View>
            </View>
            <Feather name="chevron-right" size={24} color="#7f7f7f" />
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F7FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  backBtn: {
    padding: 4,
  },
  mainTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  headerSpacer: {
    width: 32,
  },
  cardContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: 10,
  },
  imageWrapper: {
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  mascotImage: {
    width: 64,
    height: 64,
    resizeMode: 'contain',
  },
  textWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#757575',
  },
});
