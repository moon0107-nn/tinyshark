import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// ─── CENTRALIZED THEME CONSTANTS ─────────────────────────────────────────────
const THEME = {
  colors: {
    accent: '#12AEBE',           // Signature TinyShark cyan accent
    background: '#ffffff',       // Safe area and header background
    listBackground: '#bfe3eb',   // Light cyan-blue grid background
    radioBorder: '#ffffff',      // Border for radio circles
    radioDot: '#ffffff',         // Center dot color when selected
    textDark: '#000000',         // Header text color
    borderGray: '#e0e0e0',       // Header bottom line
  },
  layout: {
    padding: 12,                 // Outer screen padding
    itemSpacing: 18,             // Vertical gap between cells
    cardAspectRatio: 1.58,       // Real world card aspect ratio
    headerHeight: 14,
  },
};

// ─── CARD DATA MODEL ─────────────────────────────────────────────────────────
interface VisaCardItem {
  id: string;
  imageSource: any;             // Background image source containing the full design
}

// ─── 8 CARD DATA SPECIFICATIONS ──────────────────────────────────────────────
const VISA_CARDS: VisaCardItem[] = [
  { id: '1', imageSource: require('@/assets/images/card1.png') },
  { id: '2', imageSource: require('@/assets/images/card2.png') },
  { id: '3', imageSource: require('@/assets/images/card3.png') },
  { id: '4', imageSource: require('@/assets/images/card4.png') },
  { id: '5', imageSource: require('@/assets/images/card5.png') },
  { id: '6', imageSource: require('@/assets/images/card6.png') },
  { id: '7', imageSource: require('@/assets/images/card7.png') },
  { id: '8', imageSource: require('@/assets/images/card8.png') },
];

const COLUMNS_COUNT = 2;

export default function VisaCollectionScreen() {
  const router = useRouter();
  
  // State selection manager
  const [selectedCardId, setSelectedCardId] = useState<string>('1');

  // Render method for a single card cell
  const renderCardItem = ({ item }: { item: VisaCardItem }) => {
    const isSelected = selectedCardId === item.id;

    return (
      <TouchableOpacity
        style={styles.gridItem}
        activeOpacity={0.9}
        onPress={() => setSelectedCardId(item.id)}
        accessibilityRole="radio"
        accessibilityState={{ checked: isSelected }}
      >
        {/* Card wrapper to render platform dropshadows correctly */}
        <View style={styles.cardWrapper}>
          <Image
            source={item.imageSource}
            style={styles.cardImage}
            resizeMode="cover"
          />
        </View>

        {/* Custom radio button located underneath the card */}
        <View style={styles.radioWrapper}>
          <View style={[styles.radioOutline, isSelected && styles.radioOutlineSelected]}>
            {isSelected && <View style={styles.radioInnerDot} />}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={THEME.colors.background} />

      {/* Screen Header matching layout design */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backBtn}
          activeOpacity={0.7}
          accessibilityLabel="Quay lại"
          accessibilityRole="button"
        >
          <Ionicons name="chevron-back" size={20} color={THEME.colors.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{'Bộ sưu tập thẻ VISA'}</Text>
        <View style={styles.backBtn} />
      </View>

      {/* Scrollable grid of 8 cards */}
      <FlatList
        data={VISA_CARDS}
        renderItem={renderCardItem}
        keyExtractor={(item) => item.id}
        numColumns={COLUMNS_COUNT}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

// ─── STYLESHEET DEFINITION ───────────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: THEME.colors.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },

  // Header components
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: THEME.layout.headerHeight,
    backgroundColor: THEME.colors.background,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: THEME.colors.borderGray,
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
    color: THEME.colors.textDark,
    flex: 1,
    textAlign: 'center',
  },

  // Grid wrapper styles
  listContent: {
    backgroundColor: THEME.colors.listBackground,
    paddingHorizontal: THEME.layout.padding,
    paddingTop: 16,
    paddingBottom: 40,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  // Individual grid cells (47% width ensures two cards render side-by-side)
  gridItem: {
    width: '47%',
    marginBottom: THEME.layout.itemSpacing,
    alignItems: 'center',
  },

  // Outer container implementing shadow and border-radius correctly
  cardWrapper: {
    width: '100%',
    aspectRatio: THEME.layout.cardAspectRatio,
    borderRadius: 12,
    backgroundColor: 'transparent',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.16,
    shadowRadius: 6,
    elevation: 4,
  },

  // Card Image maintaining standard visa scale and clipping content
  cardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    overflow: 'hidden',
  },

  // Radio button components
  radioWrapper: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioOutline: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: THEME.colors.radioBorder,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioOutlineSelected: {
    borderColor: THEME.colors.radioBorder,
    backgroundColor: THEME.colors.accent, // Selected state fills circle with cyan #12AEBE
  },
  radioInnerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: THEME.colors.radioDot, // Selected state center dot is white
  },
});
