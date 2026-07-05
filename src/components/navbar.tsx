import { Image } from 'expo-image';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface WavyTabBarProps {
    onNavigateToHome?: () => void;
    onNavigateToWallet?: () => void;
    onNavigateToAnalysis?: () => void;
    onNavigateToOther?: () => void;
    activeTabProp?: 'Home' | 'Wallet' | 'Analyst' | 'Other';
}

export default function WavyTabBar({
    onNavigateToHome,
    onNavigateToWallet,
    onNavigateToAnalysis,
    onNavigateToOther,
    activeTabProp = 'Wallet'
}: WavyTabBarProps) {
    return (
        <View style={styles.bottomNavContainer}>
            <Image
                source={require('@/assets/images/button.png')}
                style={styles.bottomNavImgWeb}
                contentFit="contain"
            />
            <View style={styles.bottomNavOverlay}>
                <TouchableOpacity style={styles.overlayTab} onPress={onNavigateToHome} />
                <TouchableOpacity style={styles.overlayTab} onPress={onNavigateToWallet} />
                <TouchableOpacity style={styles.overlayTab} onPress={onNavigateToAnalysis} />
                <TouchableOpacity style={styles.overlayTab} onPress={onNavigateToOther} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    bottomNavContainer: {
        position: 'absolute',
        bottom: 0,
        left: 20,
        right: 20,
        height: 110,
        width: '90%',
        alignSelf: 'center',
        zIndex: 1000,
    },
    bottomNavImgWeb: {
        width: '100%',
        height: '100%',
    },
    bottomNavOverlay: {
        position: 'absolute',
        top: 20,
        left: 0,
        right: 0,
        bottom: 0,
        flexDirection: 'row',
    },
    overlayTab: {
        flex: 1,
        height: '100%',
    },
});