import { Image } from 'expo-image';
import { useCallback, useEffect, useState } from 'react';
import { Dimensions, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

const { width: W, height: H } = Dimensions.get('window');

const SHARK_W = 180;
const SHARK_H = 133;

// Target center: entrance of the underwater house (bottom-right)
const TARGET_CX = W * 0.76;
const TARGET_CY = H * 0.73;

// ─── Bubble ────────────────────────────────────────────────────────────────
interface BubbleProps {
  delay: number;
  x: number;
  size: number;
  duration: number;
}

function Bubble({ delay, x, size, duration }: BubbleProps) {
  const posY = useSharedValue(H + 30);
  const opacity = useSharedValue(0);

  useEffect(() => {
    posY.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(H + 30, { duration: 0 }),
          withTiming(H * 0.04, { duration: duration, easing: Easing.linear })
        ),
        -1,
        false
      )
    );
    opacity.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(0, { duration: 0 }),
          withTiming(0.55, { duration: 400 }),
          withTiming(0.55, { duration: Math.max(duration - 900, 100) }),
          withTiming(0, { duration: 500 })
        ),
        -1,
        false
      )
    );
  }, []);

  const style = useAnimatedStyle(() => ({
    position: 'absolute',
    left: x,
    top: posY.value,
    width: size,
    height: size,
    borderRadius: size / 2,
    opacity: opacity.value,
    backgroundColor: 'rgba(190, 235, 255, 0.45)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.38)',
  }));

  return <Animated.View style={style} pointerEvents="none" />;
}

// ─── Target Glow Ring ──────────────────────────────────────────────────────
function TargetGlow() {
  const ringScale = useSharedValue(1);
  const ringOpacity = useSharedValue(0.65);
  const innerOpacity = useSharedValue(0.15);

  useEffect(() => {
    ringScale.value = withRepeat(
      withSequence(
        withTiming(1.4, { duration: 950, easing: Easing.inOut(Easing.sin) }),
        withTiming(1, { duration: 950, easing: Easing.inOut(Easing.sin) })
      ),
      -1,
      false
    );
    ringOpacity.value = withRepeat(
      withSequence(
        withTiming(0.2, { duration: 950 }),
        withTiming(0.65, { duration: 950 })
      ),
      -1,
      false
    );
    innerOpacity.value = withRepeat(
      withSequence(
        withTiming(0.05, { duration: 950 }),
        withTiming(0.2, { duration: 950 })
      ),
      -1,
      false
    );
  }, []);

  const outerStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    left: TARGET_CX - 46,
    top: TARGET_CY - 46,
    width: 92,
    height: 92,
    borderRadius: 46,
    borderWidth: 2.5,
    borderColor: 'rgba(130, 250, 255, 0.95)',
    backgroundColor: 'rgba(100, 225, 255, 0.12)',
    transform: [{ scale: ringScale.value }],
    opacity: ringOpacity.value,
  }));

  const innerStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    left: TARGET_CX - 22,
    top: TARGET_CY - 22,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(140, 255, 255, 0.18)',
    opacity: innerOpacity.value,
  }));

  return (
    <>
      <Animated.View style={outerStyle} pointerEvents="none" />
      <Animated.View style={innerStyle} pointerEvents="none" />
    </>
  );
}

// ─── Instruction Text ──────────────────────────────────────────────────────
function InstructionText({ draggingStarted, hasFinished }: { draggingStarted: boolean; hasFinished: boolean }) {
  const opacity = useSharedValue(1);

  useEffect(() => {
    if (hasFinished) {
      opacity.value = withTiming(0, { duration: 250 });
    } else {
      opacity.value = 1;
    }
  }, [hasFinished]);

  const style = useAnimatedStyle(() => ({ opacity: opacity.value }));

  const text = draggingStarted
    ? 'Điều khiển cá mập đến đây\nđể vào nhà'
    : 'Điều khiển cá mập\nbằng cách di chuyển ngón tay';

  return (
    <Animated.View style={[styles.instructionContainer, style]} pointerEvents="none">
      <Text style={styles.instructionText}>{text}</Text>
    </Animated.View>
  );
}

// ─── Bubbles config ────────────────────────────────────────────────────────
const BUBBLES_CONFIG: BubbleProps[] = [
  { delay: 0, x: W * 0.06, size: 8, duration: 5300 },
  { delay: 650, x: W * 0.20, size: 6, duration: 4700 },
  { delay: 1350, x: W * 0.43, size: 11, duration: 6200 },
  { delay: 880, x: W * 0.60, size: 7, duration: 5000 },
  { delay: 250, x: W * 0.76, size: 9, duration: 5700 },
  { delay: 1100, x: W * 0.88, size: 5, duration: 4400 },
  { delay: 420, x: W * 0.33, size: 7, duration: 5900 },
];

// ─── Main Component ────────────────────────────────────────────────────────
interface Props {
  onComplete: () => void;
}

export function OnboardingScreen({ onComplete }: Props) {
  const [draggingStarted, setDraggingStarted] = useState(false);
  const [hasFinishedState, setHasFinishedState] = useState(false);

  const START_X = W / 2 - SHARK_W / 2;
  const START_Y = H * 0.28;

  const sharkX = useSharedValue(START_X);
  const sharkY = useSharedValue(START_Y);
  const sharkScale = useSharedValue(1.0); // Set initial scale to 1.0 (large shark due to base dimensions)
  const sharkOpacity = useSharedValue(1);
  const sharkBob = useSharedValue(0);

  const isDragging = useSharedValue(false);
  const hasFinished = useSharedValue(false);

  const dragOffsetX = useSharedValue(0);
  const dragOffsetY = useSharedValue(0);

  const handX = useSharedValue(START_X + SHARK_W * 0.45);
  const handY = useSharedValue(START_Y + SHARK_H * 0.85);
  const handOpacity = useSharedValue(1);

  const containerOpacity = useSharedValue(1);

  // Idle bobbing animation
  useEffect(() => {
    sharkBob.value = withRepeat(
      withSequence(
        withTiming(-8, { duration: 1100, easing: Easing.inOut(Easing.sin) }),
        withTiming(8, { duration: 1100, easing: Easing.inOut(Easing.sin) })
      ),
      -1,
      true
    );
  }, []);

  // Blinking effect for hand pointer (indicating user should touch)
  useEffect(() => {
    handOpacity.value = withRepeat(
      withSequence(
        withTiming(0.35, { duration: 700 }),
        withTiming(1, { duration: 700 })
      ),
      -1,
      true
    );
  }, []);

  const triggerOnComplete = () => {
    setTimeout(() => {
      containerOpacity.value = withTiming(0, { duration: 450 });
      setTimeout(onComplete, 500);
    }, 900);
  };

  const gesture = Gesture.Pan()
    .onStart((e) => {
      if (hasFinished.value) return;
      isDragging.value = true;
      runOnJS(setDraggingStarted)(true);
      dragOffsetX.value = sharkX.value;
      dragOffsetY.value = sharkY.value;
      // Bounce/Pop scale up to 1.35 on touch start with custom cubic-bezier
      sharkScale.value = withTiming(1.35, {
        duration: 300,
        easing: Easing.bezier(0.175, 0.885, 0.32, 1.275),
      });
    })
    .onUpdate((e) => {
      if (hasFinished.value) return;
      sharkX.value = dragOffsetX.value + e.translationX;
      sharkY.value = dragOffsetY.value + e.translationY;
      
      // Calculate drag distance from initial starting position
      const dragDist = Math.hypot(sharkX.value - START_X, sharkY.value - START_Y);
      // Interpolate scale from 1.35 (at start) to 0.75 (at distance >= 120px)
      const progress = Math.min(dragDist / 120, 1);
      sharkScale.value = 1.35 - progress * (1.35 - 0.75);
    })
    .onEnd(() => {
      if (hasFinished.value) return;
      isDragging.value = false;

      const sharkCX = sharkX.value + SHARK_W / 2;
      const sharkCY = sharkY.value + SHARK_H / 2;
      const dist = Math.hypot(sharkCX - TARGET_CX, sharkCY - TARGET_CY);

      if (dist < 75) {
        hasFinished.value = true;
        runOnJS(setHasFinishedState)(true);
        sharkX.value = withTiming(TARGET_CX - SHARK_W / 2, { duration: 400 });
        sharkY.value = withTiming(TARGET_CY - SHARK_H / 2, { duration: 400 });
        
        // Scale down to 0 and fade out on target collision
        sharkScale.value = withTiming(0, { duration: 800 });
        sharkOpacity.value = withTiming(0, { duration: 800 });

        runOnJS(triggerOnComplete)();
      } else {
        // Spring back if dropped outside target area
        runOnJS(setDraggingStarted)(false);
        sharkX.value = withSpring(START_X, { damping: 15 });
        sharkY.value = withSpring(START_Y, { damping: 15 });
        // Smoothly scale back to default 1.0 (large size)
        sharkScale.value = withTiming(1.0, { duration: 300 });
      }
    });

  const sharkPositionStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      left: 0,
      top: 0,
      transform: [
        { translateX: sharkX.value },
        { translateY: sharkY.value },
        { scale: sharkScale.value },
      ],
      opacity: sharkOpacity.value,
    };
  });

  const bobStyle = useAnimatedStyle(() => {
    const applyBob = !isDragging.value && !hasFinished.value;
    return {
      width: SHARK_W,
      height: SHARK_H,
      transform: [{ translateY: applyBob ? sharkBob.value : 0 }],
    };
  });

  const handStyle = useAnimatedStyle(() => {
    const isVisible = !isDragging.value && !hasFinished.value;
    return {
      position: 'absolute',
      left: 0,
      top: 0,
      width: 60,
      height: 60,
      opacity: withTiming(isVisible ? handOpacity.value : 0, { duration: 250 }),
      transform: [
        { translateX: handX.value },
        { translateY: handY.value },
      ],
    };
  });

  const containerStyle = useAnimatedStyle(() => ({
    opacity: containerOpacity.value,
  }));

  return (
    <Animated.View style={[StyleSheet.absoluteFill, styles.overlay, containerStyle]}>
      {/* Underwater scene background */}
      <Image
        source={require('@/assets/images/background.png')}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
      />

      {/* Bottom vignette for atmosphere */}
      <View style={styles.bottomVignette} pointerEvents="none" />

      {/* Top vignette */}
      <View style={styles.topVignette} pointerEvents="none" />

      {/* Floating bubbles */}
      {BUBBLES_CONFIG.map((b, i) => (
        <Bubble key={i} {...b} />
      ))}

      {/* Target glow ring (house entrance) */}
      <TargetGlow />

      {/* Instruction text */}
      <InstructionText draggingStarted={draggingStarted} hasFinished={hasFinishedState} />

      {/* Animated shark with Pan Gesture */}
      <GestureDetector gesture={gesture}>
        <Animated.View style={sharkPositionStyle as any}>
          <Animated.View style={bobStyle} pointerEvents="none">
            <Image
              source={
                draggingStarted || hasFinished.value
                  ? require('@/assets/images/shark1.png')
                  : require('@/assets/images/shark full.png')
              }
              style={{ width: SHARK_W, height: SHARK_H }}
              contentFit="contain"
              pointerEvents="none"
            />
          </Animated.View>
        </Animated.View>
      </GestureDetector>

      {/* Animated hand pointer */}
      <Animated.View style={handStyle as any} pointerEvents="none">
        <Image
          source={require('@/assets/images/hand.png')}
          style={{ width: 60, height: 60 }}
          contentFit="contain"
          pointerEvents="none"
        />
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    zIndex: 999,
    backgroundColor: '#08304d',
  },
  skipBtn: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 35,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.2,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    zIndex: 1000,
  },
  skipText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  bottomVignette: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: H * 0.38,
    backgroundColor: 'rgba(2, 10, 22, 0.58)',
  },
  topVignette: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: H * 0.08,
    backgroundColor: 'rgba(5, 50, 80, 0.25)',
  },
  instructionContainer: {
    position: 'absolute',
    top: H * 0.10,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 36,
  },
  instructionText: {
    fontSize: 19,
    color: 'rgba(255, 255, 255, 0.93)',
    textAlign: 'center',
    lineHeight: 30,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 10, 40, 0.75)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
    letterSpacing: 0.25,
  },
});
