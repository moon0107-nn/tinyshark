import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// ─── Types ───────────────────────────────────────────────────────────────────
type ThemeOption = 'light' | 'dark';

interface InterfaceScreenProps {
  onGoBack?: () => void;
}

const ACCENT = '#12AEBE';

// ─── Main Component ──────────────────────────────────────────────────────────
export default function InterfaceScreen({ onGoBack }: InterfaceScreenProps) {
  const router = useRouter();
  const [selectedTheme, setSelectedTheme] = useState<ThemeOption>('light');

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* ── Header ── */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onGoBack} style={styles.backBtn} activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={18} color="#555" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Lựa chọn giao diện</Text>
        <View style={styles.backBtn} />
      </View>

      {/* ── Body (light blue background) ── */}
      <View style={styles.body}>

        {/* ── Section 1: Giao diện ứng dụng ── */}
        <View style={styles.sectionWrapper}>
          {/* Section header row */}
          <TouchableOpacity style={styles.sectionHeaderRow} activeOpacity={0.8}>
            <Text style={styles.sectionHeaderText}>{'Giao diện ứng dụng'}</Text>
            <Ionicons name="chevron-down" size={18} color="#555" />
          </TouchableOpacity>

          {/* Options area */}
          <View style={styles.optionsArea}>
            {/* Option: Giao diện sáng */}
            <TouchableOpacity
              style={[
                styles.optionRow,
                selectedTheme === 'light' && styles.optionRowSelected,
              ]}
              onPress={() => setSelectedTheme('light')}
              activeOpacity={0.85}
            >
              <Text style={[
                styles.optionLabel,
                selectedTheme === 'light' && styles.optionLabelSelected,
              ]}>
                {'Giao diện sáng'}
              </Text>
              <View style={[
                styles.radio,
                selectedTheme === 'light' && styles.radioSelected,
              ]}>
                {selectedTheme === 'light' && <View style={styles.radioDot} />}
              </View>
            </TouchableOpacity>

            {/* Option: Giao diện tối */}
            <TouchableOpacity
              style={[
                styles.optionRow,
                selectedTheme === 'dark' && styles.optionRowSelected,
              ]}
              onPress={() => setSelectedTheme('dark')}
              activeOpacity={0.85}
            >
              <View style={styles.optionLabelGroup}>
                <Text style={[
                  styles.optionLabel,
                  selectedTheme === 'dark' && styles.optionLabelSelected,
                ]}>
                  {'Giao diện tối'}
                </Text>
                <Text style={styles.premiumBadge}>{'Premium'}</Text>
              </View>
              <View style={[
                styles.radio,
                selectedTheme === 'dark' && styles.radioSelected,
              ]}>
                {selectedTheme === 'dark' && <View style={styles.radioDot} />}
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* ── Section 2: Bộ sưu tập thẻ VISA ── */}
        <TouchableOpacity
          style={styles.visaRow}
          activeOpacity={0.85}
          onPress={() => router.push('/visa-collection')}
        >
          <Text style={styles.visaText}>{'Bộ sưu tập thẻ VISA'}</Text>
          <Ionicons name="chevron-forward" size={18} color="#888" />
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#ffffff',
  },
  backBtn: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 22,
    fontWeight: '600',
    color: '#1A1A2E',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1A1A2E',
    flex: 1,
    textAlign: 'center',
  },

  // Body — light blue background
  body: {
    flex: 1,
    backgroundColor: '#C5E3EC',
    paddingHorizontal: 14,
    paddingTop: 16,
    gap: 10,
  },

  // Section wrapper (white card)
  sectionWrapper: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    overflow: 'hidden',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
  },
  sectionHeaderText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A2E',
  },
  chevronDown: {
    fontSize: 15,
    color: '#000',
    fontWeight: '900', // Dày hơn 'bold'
    textShadowColor: '#000',
    textShadowOffset: { width: 0.5, height: 0.5 }, // Tạo độ dày ảo
    textShadowRadius: 0.5,
  },

  // Options area (light blue background inside card)
  optionsArea: {
    backgroundColor: '#d1e7ed',
    paddingHorizontal: 10,
    paddingVertical: 8,
    gap: 8,
  },

  // Option row
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(210, 232, 238, 0.75)',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: 'transparent',
    paddingVertical: 14,
    paddingHorizontal: 14,
  },
  optionRowSelected: {
    borderColor: ACCENT,
    backgroundColor: 'rgba(200, 232, 238, 0.85)',
  },
  optionLabelGroup: {
    flex: 1,
    marginRight: 12,
  },
  optionLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2C3A4A',
  },
  optionLabelSelected: {
    fontWeight: '600',
    color: '#1A2A30',
  },
  premiumBadge: {
    fontSize: 11,
    fontWeight: '700',
    color: '#D4A017',
    marginTop: 2,
  },

  // Radio
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  radioSelected: {
    borderColor: ACCENT,
    backgroundColor: '#ffffff',
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: ACCENT,
  },

  // VISA row
  visaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 18,
  },
  visaText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A2E',
  },
});
