import { DarkTheme, DefaultTheme, Slot, ThemeProvider } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, useColorScheme, View } from 'react-native';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import AnalysisScreen from '@/components/analysis';
import { AnimatedSplashOverlay } from '@/components/animated-icon';
import CreateAccountScreen from '@/components/create-wallet';
import FinancialManagerScreen from '@/components/financial-manager';
import { LoginScreen } from '@/components/login-screen';
import { OnboardingScreen } from '@/components/onboarding-screen';
import OtherScreen from '@/components/other';
import WalletScreen from '@/components/wallet';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [onboardingDone, setOnboardingDone] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<'wallet' | 'financial-manager' | 'create-wallet' | 'analysis' | 'other'>('wallet');

  return (
    <GestureHandlerRootView style={styles.root}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <AnimatedSplashOverlay />
        <View style={{ display: 'none' }}>
          <Slot />
        </View>

        {isLoggedIn ? (
          currentScreen === 'wallet' ? (
            <WalletScreen
              onNavigateToFinancialManager={() => setCurrentScreen('financial-manager')}
              onNavigateToAnalysis={() => setCurrentScreen('analysis')}
              onNavigateToOther={() => setCurrentScreen('other')}
            />
          ) : currentScreen === 'analysis' ? (
            <AnalysisScreen
              onNavigateToWallet={() => setCurrentScreen('wallet')}
              onNavigateToOther={() => setCurrentScreen('other')}
            />
          ) : currentScreen === 'other' ? (
            <OtherScreen
              onNavigateToWallet={() => setCurrentScreen('wallet')}
              onNavigateToAnalyst={() => setCurrentScreen('analysis')}
            />
          ) : currentScreen === 'financial-manager' ? (
            <FinancialManagerScreen
              onBack={() => setCurrentScreen('wallet')}
              onNavigateToCreateWallet={() => setCurrentScreen('create-wallet')}
            />
          ) : (
            <CreateAccountScreen onBack={() => setCurrentScreen('financial-manager')} />
          )
        ) : onboardingDone ? (
          <LoginScreen onLogin={() => setIsLoggedIn(true)} />
        ) : (
          <OnboardingScreen onComplete={() => setOnboardingDone(true)} />
        )}
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});
