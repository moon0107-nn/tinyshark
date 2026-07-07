import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

// ─── Theme Accent Colors ─────────────────────────────────────────────────────
const ACCENT = '#12AEBE';
const BACKGROUND_LIGHT_BLUE = '#d1e7ed';

export default function SpendingLimitScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Header aligned with the other screens */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backBtn}
          activeOpacity={0.7}
          accessibilityLabel="Quay lại"
          accessibilityRole="button"
        >
          <Ionicons name="chevron-back" size={20} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{'Hạn mức chi'}</Text>
        <View style={styles.backBtn} />
      </View>

      {/* Main Content Area */}
      <View style={styles.body}>
        {/* Centered White Card Info Box */}
        <View style={styles.infoCard}>
          
          {/* Stylized Yellow/Orange Question Mark Icon */}
          <Image
            source={require('@/assets/images/question.png')}
            style={styles.questionIcon}
            resizeMode="contain"
          />

          {/* Description Text */}
          <Text style={styles.descriptionText}>
            {'Bạn chưa có hạn mức chi nào!'}
          </Text>

          {/* Action button to add a limit */}
          <TouchableOpacity
            style={styles.addButton}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel="Thêm hạn mức mới"
          >
            <Text style={styles.addButtonText}>
              {'+  Thêm hạn mức'}
            </Text>
          </TouchableOpacity>

        </View>
      </View>
    </SafeAreaView>
  );
}

// ─── STYLESHEET DEFINITION ───────────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },

  // Header styles
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#ffffff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e0e0e0',
  },
  backBtn: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
    flex: 1,
    textAlign: 'center',
  },

  // Body container with the requested background color
  body: {
    flex: 1,
    backgroundColor: BACKGROUND_LIGHT_BLUE,
    paddingHorizontal: 16,
    justifyContent: 'flex-start',
    paddingTop: 16,
  },

  // Centered white card styling matching the visual mockup
  infoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    width: '100%',
  },

  // Question mark icon alignment
  questionIcon: {
    width: 60,
    height: 60,
    marginBottom: 16,
  },

  // Info label style
  descriptionText: {
    fontSize: 12,
    color: '#8E9293',
    fontWeight: '500',
    marginBottom: 20,
    textAlign: 'center',
  },

  // Add Limit button styling
  addButton: {
    backgroundColor: ACCENT,
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 28,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
});
