import { DarkTheme, DefaultTheme, Slot, ThemeProvider } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { LoginScreen } from '@/components/login-screen';
import { OnboardingScreen } from '@/components/onboarding-screen';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [onboardingDone, setOnboardingDone] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <GestureHandlerRootView style={styles.root}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <AnimatedSplashOverlay />

        {isLoggedIn ? (
          <Slot />
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