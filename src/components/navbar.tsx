import { Image as ExpoImage } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

interface WavyTabBarProps {
    onNavigateToHome?: () => void;
    onNavigateToWallet?: () => void;
    onNavigateToAnalysis?: () => void;
    onNavigateToOther?: () => void;
    activeTabProp?: 'Home' | 'Wallet' | 'Analyst' | 'Other';
}

type TabKey = 'home' | 'wallet' | 'shark' | 'analyst' | 'other';

// Gradient colors from the design: #F4D7C5 (0%) → #1CBDBC (40%) → #108AA7 (100%)
const ACTIVE_GRADIENT_COLORS: [string, string, string] = ['#F4D7C5', '#1CBDBC', '#108AA7'];
const ACTIVE_GRADIENT_LOCATIONS: [number, number, number] = [0, 0.4, 1.0];

export default function WavyTabBar({
    onNavigateToHome,
    onNavigateToWallet,
    onNavigateToAnalysis,
    onNavigateToOther,
    activeTabProp = 'Home',
}: WavyTabBarProps) {
    const deriveKey = (prop: string): TabKey => {
        const lower = prop.toLowerCase();
        if (['home', 'wallet', 'shark', 'analyst', 'other'].includes(lower)) {
            return lower as TabKey;
        }
        return 'home';
    };

    const [activeTab, setActiveTab] = useState<TabKey>(deriveKey(activeTabProp));

    const handlePress = (tabName: TabKey) => {
        setActiveTab(tabName);
        if (tabName === 'home') onNavigateToHome?.();
        else if (tabName === 'wallet') onNavigateToWallet?.();
        else if (tabName === 'analyst') onNavigateToAnalysis?.();
        else if (tabName === 'other') onNavigateToOther?.();
    };

    // Renders a regular icon tab (home, wallet, analyst, other)
    const renderTabButton = (tabName: 'home' | 'wallet' | 'analyst' | 'other', iconSource: ReturnType<typeof require>) => {
        const isActive = activeTab === tabName;
        return (
            <TouchableOpacity
                key={tabName}
                style={styles.tabButton}
                onPress={() => handlePress(tabName)}
                activeOpacity={0.8}
            >
                {isActive ? (
                    <LinearGradient
                        colors={ACTIVE_GRADIENT_COLORS}
                        locations={ACTIVE_GRADIENT_LOCATIONS}
                        style={styles.activeGlowCircle}
                        start={{ x: 1, y: 0 }}
                        end={{ x: 0, y: 1 }}
                    >
                        <Image
                            source={iconSource}
                            style={styles.activeIcon}
                            resizeMode="contain"
                        />
                    </LinearGradient>
                ) : (
                    <ExpoImage
                        source={iconSource}
                        style={styles.inactiveIcon}
                        resizeMode="contain"
                    />
                )}
            </TouchableOpacity>
        );
    };

    const isSharkActive = activeTab === 'shark';

    return (
        <View style={styles.outerContainer}>
            {/* Background pill/capsule */}
            <LinearGradient
                colors={['#087c94', '#0c99b5']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientContainer}
            >
                {/* Tab 1: Home */}
                {renderTabButton('home', require('@/assets/images/home.png'))}

                {/* Tab 2: Wallet */}
                {renderTabButton('wallet', require('@/assets/images/wallet.png'))}

                {/* Tab 3: Center placeholder – the shark button is absolutely positioned above */}
                <View style={styles.placeholderTab} />

                {/* Tab 4: Analyst */}
                {renderTabButton('analyst', require('@/assets/images/analyst.png'))}

                {/* Tab 5: Other */}
                {renderTabButton('other', require('@/assets/images/other.png'))}
            </LinearGradient>

            {/* Center Shark Button */}
            <TouchableOpacity
                style={styles.sharkButtonContainer}
                onPress={() => handlePress('shark')}
                activeOpacity={0.85}
            >
                {/* Vòng tròn gradient nền – nằm phía sau, căn sát đáy */}
                <LinearGradient
                    colors={ACTIVE_GRADIENT_COLORS}
                    locations={ACTIVE_GRADIENT_LOCATIONS}
                    style={styles.sharkActiveCircle}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 0, y: 1 }}
                />

                {/* Layer 1: Phần trên của cá mập (đầu, gai, vây 2 bên) - không bị cắt ở trên/hai bên */}
                <View style={styles.sharkTopContainer}>
                    <ExpoImage
                        source={require('@/assets/images/center-shark.gif')}
                        style={styles.sharkGifTop}
                        contentFit="contain"
                    />
                </View>

                {/* Layer 2: Phần dưới của cá mập - được cắt cong theo vòng tròn 90x90 */}
                <View style={styles.sharkBottomContainer}>
                    <ExpoImage
                        source={require('@/assets/images/center-shark.gif')}
                        style={styles.sharkGifBottom}
                        contentFit="contain"
                    />
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    outerContainer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        height: 75,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
    },
    gradientContainer: {
        width: '100%',
        height: '100%',
        borderRadius: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        shadowColor: '#054e5c',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.35,
        shadowRadius: 15,
        elevation: 8,
    },
    tabButton: {
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderTab: {
        flex: 1,
        height: '100%',
    },
    // Active circle for regular tabs — gradient #F4D7C5 → #1CBDBC → #108AA7
    activeGlowCircle: {
        width: 50,
        height: 50,
        borderRadius: 25, // Fixed to 25 for a perfect circle of 50x50
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#1CBDBC',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.7,
        shadowRadius: 10,
        elevation: 5,
    },
    activeIcon: {
        width: 28,
        height: 28,
        tintColor: '#ffffff',
    },
    inactiveIcon: {
        width: 26,
        height: 26,
        opacity: 0.6,
        tintColor: '#ffffff',
    },

    // ── Center Shark ──────────────────────────────────────────────────────────
    sharkButtonContainer: {
        position: 'absolute',
        alignSelf: 'center',
        bottom: 5,
        width: 110,
        height: 95,
        zIndex: 9999,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },

    sharkActiveCircle: {
        position: 'absolute',
        bottom: -10,
        width: 90,
        height: 90,
        borderRadius: 45,
        shadowColor: '#1CBDBC',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.7,
        shadowRadius: 14,
        elevation: 8,
    },

    // Layer 1: phần trên 
    sharkTopContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 110,
        height: 95,
        overflow: 'hidden',
    },
    sharkGifTop: {
        width: 110,
        height: 110,
        marginTop: -1,
    },

    // Layer 2: phần thân dưới 
    sharkBottomContainer: {
        position: 'absolute',
        bottom: -10,
        left: 10,
        width: 90,
        height: 90,
        borderRadius: 45,
        overflow: 'hidden',
    },

    sharkGifBottom: {
        width: 110,
        height: 110,
        marginTop: -16,
        marginLeft: -10,
    },
});