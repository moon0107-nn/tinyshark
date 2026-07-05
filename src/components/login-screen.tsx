import { FontAwesome6 } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { SymbolView } from 'expo-symbols';
import { useEffect, useState } from 'react';
import {
  Dimensions,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Animated, {
  Easing,
  runOnUI,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming
} from 'react-native-reanimated';

const { width: W, height: H } = Dimensions.get('window');

// ── Layout constants ──────────────────────────────────────────────────────────
// Modern compact heights to reveal the shark's face fully
const CARD_H_WELCOME = H * 0.44;
const CARD_H_LOGIN = H * 0.52;
const CARD_H_REGISTER = H * 0.60;
const CARD_TOP_LOGIN = H - CARD_H_LOGIN;
const CARD_TOP_REGISTER = H - CARD_H_REGISTER;

// ─── Bubble ──────────────────────────────────────────────────────────────────
interface BubbleProps { delay: number; x: number; size: number; duration: number }

function Bubble({ delay, x, size, duration }: BubbleProps) {
  const posY = useSharedValue(H + 30);
  const opacity = useSharedValue(0);

  useEffect(() => {
    posY.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(H + 30, { duration: 0 }),
          withTiming(H * 0.04, { duration, easing: Easing.linear })
        ),
        -1, false
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
        -1, false
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
    backgroundColor: 'rgba(190, 235, 255, 0.50)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
  }));

  return <Animated.View style={style} pointerEvents="none" />;
}

const BUBBLES: BubbleProps[] = [
  { delay: 0, x: W * 0.07, size: 8, duration: 5500 },
  { delay: 700, x: W * 0.18, size: 5, duration: 4800 },
  { delay: 1400, x: W * 0.45, size: 10, duration: 6300 },
  { delay: 900, x: W * 0.68, size: 6, duration: 5100 },
  { delay: 300, x: W * 0.85, size: 9, duration: 5800 },
  { delay: 1800, x: W * 0.30, size: 7, duration: 6000 },
];

// ─── Password strength ────────────────────────────────────────────────────────
function getStrength(pw: string) {
  if (!pw) return { label: '', color: 'transparent', dashes: 0 };
  if (pw.length < 6) return { label: 'Weak', color: '#ff4d4f', dashes: 1 };
  if (pw.length < 8) return { label: 'Medium', color: '#faad14', dashes: 2 };
  return { label: 'Strong', color: '#4cd137', dashes: 3 };
}

// ─── Social Button ────────────────────────────────────────────────────────────
function SocialBtn({ label }: { label: string }) {
  let iconName = '';
  let logoColor = '#ffffff';

  if (label === 'Apple') {
    iconName = 'apple';
    logoColor = '#ffffff'; // Apple trắng
  } else if (label === 'f') {
    iconName = 'facebook-f';
    logoColor = '#1877f2'; // Facebook xanh
  } else if (label === 'X') {
    iconName = 'x-twitter';
    logoColor = '#000000'; // X đen
  }

  if (label === 'G') {
    return (
      <Pressable style={({ pressed }) => [styles.socialCircle, pressed && { opacity: 0.7 }]}>
        <Image
          source={{ uri: 'https://www.gstatic.com/images/branding/product/2x/googleg_64dp.png' }}
          style={{ width: 22, height: 22 }}
          contentFit="contain"
        />
      </Pressable>
    );
  }

  return (
    <Pressable style={({ pressed }) => [styles.socialCircle, pressed && { opacity: 0.7 }]}>
      <FontAwesome6 name={iconName as any} size={20} color={logoColor} />
    </Pressable>
  );
}

// ─── Main ────────────────────────────────────────────────────────────────────
type Step = 'welcome' | 'login' | 'register';

interface Props { onLogin: () => void }

export function LoginScreen({ onLogin }: Props) {
  const [step, setStep] = useState<Step>('welcome');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);

  // ── Shared animation values ──────────────────────────────────────────────
  const sharkBob = useSharedValue(0);
  const cardOpacity = useSharedValue(1);
  const cardHeight = useSharedValue(CARD_H_WELCOME);   // animate card height on switch
  const taoOpacity = useSharedValue(0);                // tao2 only visible on register

  // Shark bob
  useEffect(() => {
    sharkBob.value = withRepeat(
      withSequence(
        withTiming(-10, { duration: 1600, easing: Easing.inOut(Easing.sin) }),
        withTiming(10, { duration: 1600, easing: Easing.inOut(Easing.sin) })
      ),
      -1, true
    );
  }, []);

  const sharkAnim = useAnimatedStyle(() => ({
    transform: [{ translateY: sharkBob.value }],
  }));

  const cardAnim = useAnimatedStyle(() => ({
    opacity: cardOpacity.value,
    height: cardHeight.value,
  }));

  // tao2 fade animation (visible only on register)
  const taoAnim = useAnimatedStyle(() => ({
    opacity: taoOpacity.value,
  }));

  const sharkZoneAnim = useAnimatedStyle(() => ({
    height: H - cardHeight.value,
  }));

  // ── Step transition ───────────────────────────────────────────────────────
  const go = (next: Step) => {
    // Fade out card content
    runOnUI(() => {
      'worklet';
      cardOpacity.value = withTiming(0, { duration: 160 });
    })();

    setTimeout(() => {
      setStep(next);

      // Slide card height
      let targetH = CARD_H_WELCOME;
      if (next === 'login') targetH = CARD_H_LOGIN;
      else if (next === 'register') targetH = CARD_H_REGISTER;

      const isReg = next === 'register';
      runOnUI((h: number, reg: boolean) => {
        'worklet';
        cardHeight.value = withTiming(h, { duration: 320, easing: Easing.out(Easing.cubic) });
        taoOpacity.value = withTiming(reg ? 1 : 0, { duration: 400 });
        cardOpacity.value = withTiming(1, { duration: 280 });
      })(targetH, isReg);
    }, 160);
  };

  const strength = getStrength(password);

  return (
    <View style={styles.root}>

      {/* ①  background.png — full screen */}
      <Image
        source={require('@/assets/images/background.png')}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
      />

      {/* ②  Bubbles */}
      {BUBBLES.map((b, i) => <Bubble key={i} {...b} />)}

      {/*
       * ③  tao.png / tao1.png seaweed — dynamic based on step.
       *    welcome shows tao.png on the right.
       *    login/register shows tao1.png octopus clip.
       */}
      {step === 'welcome' ? (
        <Image
          source={require('@/assets/images/tao.png')}
          style={styles.welcomeTao}
          contentFit="contain"
          pointerEvents="none"
        />
      ) : (
        <Image
          source={require('@/assets/images/tao1.png')}
          style={styles.loginTao}
          contentFit="contain"
          pointerEvents="none"
        />
      )}

      {/*
       * ④  tao2.png coral reef — fades in on Register screen.
       *    Placed at the bottom of the top-hero area (just above the card).
       *    tao2 is a horizontal strip, so we display it spanning full width
       *    and positioned at the bottom of the hero zone.
       */}
      <Animated.View
        style={[styles.tao2Wrap, taoAnim]}
        pointerEvents="none"
      >
        <Image
          source={require('@/assets/images/tao2.png')}
          style={styles.tao2Img}
          contentFit="cover"
        />
      </Animated.View>

      {/*
       * ⑤  shark1.png — centred in hero zone, bobs gently.
       *    Uses an animated height so it never gets cut off when the card expands.
       */}
      <Animated.View style={[styles.sharkZone, sharkZoneAnim]} pointerEvents="none">
        <Animated.View style={sharkAnim}>
          <Image
            source={require('@/assets/images/shark1.png')}
            style={styles.sharkImg}
            contentFit="contain"
          />
        </Animated.View>
      </Animated.View>

      {/* ⑥  Glassmorphism card — animated height */}
      <Animated.View style={[styles.card, cardAnim]}>

        {/* Back Button chevron to return to Welcome */}
        {step !== 'welcome' && (
          <Pressable style={styles.backBtn} onPress={() => go('welcome')} hitSlop={12}>
            <SymbolView
              name={{ ios: 'chevron.left', android: 'chevron_left', web: 'chevron_left' }}
              size={20}
              tintColor="rgba(255,255,255,0.7)"
            />
          </Pressable>
        )}

        {/* ────── WELCOME ────── */}
        {step === 'welcome' && (
          <View style={styles.inner}>
            {/* shark2.png: cartoon shark wearing glasses */}
            <Image
              source={require('@/assets/images/shark2.png')}
              style={styles.welcomeSharkImg}
              contentFit="contain"
            />

            {/* solid cyan button "Đăng nhập" */}
            <Pressable
              style={({ pressed }) => [styles.btnCyan, pressed && styles.pressed]}
              onPress={() => go('login')}
            >
              <Text style={styles.btnCyanTxt}>Đăng nhập</Text>
            </Pressable>

            {/* outline cyan button "Đăng kí" */}
            <Pressable
              style={({ pressed }) => [styles.btnOutline, pressed && styles.pressed]}
              onPress={() => go('register')}
            >
              <Text style={styles.btnOutlineTxt}>Đăng kí</Text>
            </Pressable>

            {/* underlined text "cần hỗ trợ" */}
            <Pressable style={styles.supportWrap}>
              <Text style={styles.supportTxt}>cần hỗ trợ</Text>
            </Pressable>
          </View>
        )}

        {/* ────── LOGIN ────── */}
        {step === 'login' && (
          <ScrollView
            style={{ width: '100%' }}
            contentContainerStyle={styles.inner}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.sub}>miễn phí vĩnh viễn, không cần thẻ cứng</Text>

            {/* Username */}
            <Text style={styles.label}>Tên đăng nhập</Text>
            <View style={styles.inputBox}>
              <SymbolView
                name={{ ios: 'person', android: 'person', web: 'person' }}
                size={18}
                tintColor="rgba(255,255,255,0.6)"
                style={styles.ico}
              />
              <TextInput
                style={styles.textIn}
                placeholder="Username"
                placeholderTextColor="rgba(255,255,255,0.36)"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
              />
            </View>

            {/* Password */}
            <View style={styles.inputBox}>
              <SymbolView
                name={{ ios: 'key', android: 'key', web: 'key' }}
                size={18}
                tintColor="rgba(255,255,255,0.6)"
                style={styles.ico}
              />
              <TextInput
                style={styles.textIn}
                placeholder="••••••••"
                placeholderTextColor="rgba(255,255,255,0.36)"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPw}
                autoCapitalize="none"
              />
              <Pressable onPress={() => setShowPw(!showPw)} hitSlop={8}>
                <SymbolView
                  name={showPw ? { ios: 'eye.slash', android: 'visibility_off', web: 'visibility_off' } : { ios: 'eye', android: 'visibility', web: 'visibility' }}
                  size={18}
                  tintColor="rgba(255,255,255,0.6)"
                />
              </Pressable>
            </View>

            <Pressable style={styles.forgotWrap}>
              <Text style={styles.link}>quên mật khẩu</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [styles.btnCyan, pressed && styles.pressed]}
              onPress={onLogin}
            >
              <Text style={styles.btnCyanTxt}>Đăng nhập</Text>
            </Pressable>

            {/* Divider + Social */}
            <View style={styles.divRow}>
              <View style={styles.divLine} />
              <Text style={styles.divTxt}>hoặc tiếp tục với</Text>
              <View style={styles.divLine} />
            </View>
            <View style={styles.socialRow}>
              <SocialBtn label="G" />
              <SocialBtn label="Apple" />
              <SocialBtn label="f" />
              <SocialBtn label="X" />
            </View>

            {/* Toggle to register */}
            <Pressable style={styles.toggleWrap} onPress={() => go('register')}>
              <Text style={styles.toggleTxt}>
                Chưa có tài khoản?{' '}
                <Text style={styles.toggleAction}>Đăng ký ngay</Text>
              </Text>
            </Pressable>
          </ScrollView>
        )}

        {/* ────── REGISTER ────── */}
        {step === 'register' && (
          <ScrollView
            style={{ width: '100%' }}
            contentContainerStyle={styles.inner}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.mainTitle}>Đăng kí miễn phí</Text>
            <Text style={styles.sub}>miễn phí vĩnh viễn, không cần thẻ cứng</Text>

            {/* Email */}
            <Text style={styles.label}>Địa chỉ Email</Text>
            <View style={styles.inputBox}>
              <SymbolView
                name={{ ios: 'envelope', android: 'mail', web: 'mail' }}
                size={18}
                tintColor="rgba(255,255,255,0.6)"
                style={styles.ico}
              />
              <TextInput
                style={styles.textIn}
                placeholder="yourname@gmail.com"
                placeholderTextColor="rgba(255,255,255,0.36)"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Username */}
            <Text style={styles.label}>Tên tài khoản</Text>
            <View style={styles.inputBox}>
              <SymbolView
                name={{ ios: 'person', android: 'person', web: 'person' }}
                size={18}
                tintColor="rgba(255,255,255,0.6)"
                style={styles.ico}
              />
              <TextInput
                style={styles.textIn}
                placeholder="@tên tài khoản"
                placeholderTextColor="rgba(255,255,255,0.36)"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
              />
            </View>

            {/* Password + strength indicator */}
            <Text style={styles.label}>Mật khẩu</Text>
            <View style={styles.inputBox}>
              <SymbolView
                name={{ ios: 'key', android: 'key', web: 'key' }}
                size={18}
                tintColor="rgba(255,255,255,0.6)"
                style={styles.ico}
              />
              <TextInput
                style={styles.textIn}
                placeholder="••••••••"
                placeholderTextColor="rgba(255,255,255,0.36)"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPw}
                autoCapitalize="none"
              />
              {/* Strength dashes on the right */}
              <View style={styles.strengthRow}>
                {[1, 2, 3].map(n => (
                  <View
                    key={n}
                    style={[
                      styles.dash,
                      {
                        backgroundColor:
                          n <= strength.dashes
                            ? strength.color
                            : 'rgba(255,255,255,0.18)',
                      },
                    ]}
                  />
                ))}
                {strength.label ? (
                  <Text style={[styles.strengthLbl, { color: strength.color }]}>
                    {strength.label}
                  </Text>
                ) : null}
              </View>
            </View>

            {/* Button "Đăng kí" - di chuyển lên trên */}
            <Pressable
              style={({ pressed }) => [styles.btnCyan, pressed && styles.pressed, { marginTop: 6 }]}
              onPress={onLogin}
            >
              <Text style={styles.btnCyanTxt}>Đăng kí</Text>
            </Pressable>

            {/* Divider + Social - di chuyển xuống dưới */}
            <View style={[styles.divRow, { marginTop: 8, marginBottom: 12 }]}>
              <View style={styles.divLine} />
              <Text style={styles.divTxt}>hoặc tiếp tục với</Text>
              <View style={styles.divLine} />
            </View>
            <View style={[styles.socialRow, { marginBottom: 12 }]}>
              <SocialBtn label="G" />
              <SocialBtn label="Apple" />
              <SocialBtn label="f" />
              <SocialBtn label="X" />
            </View>

            {/* Toggle to login */}
            <Pressable style={styles.toggleWrap} onPress={() => go('login')}>
              <Text style={styles.toggleTxt}>
                Đã có tài khoản?{' '}
                <Text style={styles.toggleAction}>Đăng nhập</Text>
              </Text>
            </Pressable>
          </ScrollView>
        )}

      </Animated.View>
    </View>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#052b3d',
  },

  // ── Welcome Screen Styles ──
  welcomeTao: {
    position: 'absolute',
    right: 0,
    top: 30,
    width: W * 0.42,
    height: CARD_TOP_LOGIN * 0.85,
    zIndex: 2,
  },
  welcomeSharkImg: {
    width: 120,
    height: 120,
    marginBottom: 20,
    marginTop: 6,
  },
  btnOutline: {
    width: '100%',
    height: 46,
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#14c5d8',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  btnOutlineTxt: {
    color: '#14c5d8',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  supportWrap: {
    paddingVertical: 8,
    alignItems: 'center',
    marginTop: 2,
  },
  supportTxt: {
    color: 'rgba(255,255,255,0.46)',
    fontSize: 13,
    textDecorationLine: 'underline',
  },
  backBtn: {
    position: 'absolute',
    top: 18,
    left: 18,
    zIndex: 10,
  },

  // ── tao1 octopus (top-right) ──
  loginTao: {
    position: 'absolute',
    right: -15,
    top: H * 0.05,
    width: W * 0.46,
    height: H * 0.40,
    zIndex: 2,
  },

  // ── tao2 coral reef (bottom of hero, fades in on register) ──
  tao2Wrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    // bottom of the hero zone: sits just above CARD_TOP_REGISTER
    bottom: CARD_H_REGISTER - 20,  // slight overlap for seamless blend
    height: 130,
    overflow: 'hidden',
  },
  tao2Img: {
    width: '100%',
    height: '100%',
  },

  // ── Shark ──
  sharkZone: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 15,
    zIndex: 3,
  },
  sharkImg: {
    width: W * 0.70,
    height: W * 0.70 * (100 / 130),
  },

  // ── Card ──
  card: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(6, 24, 40, 0.12)', // Highly transparent/translucent glass effect to reveal background ruins
    borderTopLeftRadius: 44,
    borderTopRightRadius: 44,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    borderBottomWidth: 0,
    alignItems: 'center',
    overflow: 'hidden',
    zIndex: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -6 },
        shadowOpacity: 0.45,
        shadowRadius: 20,
      },
    }),
  },
  inner: {
    width: '100%',
    paddingHorizontal: 24,
    paddingTop: 18,
    paddingBottom: Platform.OS === 'ios' ? 32 : 18,
    alignItems: 'center',
  },

  // ── Typography ──
  mainTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 4,
    letterSpacing: 0.2,
  },
  sub: {
    fontSize: 12.5,
    color: 'rgba(255,255,255,0.46)',
    textAlign: 'center',
    marginBottom: 14,
  },
  label: {
    alignSelf: 'flex-start',
    color: 'rgba(255,255,255,0.72)',
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 4,
  },

  // ── Input ──
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.16)',
    borderRadius: 16,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  ico: {
    marginRight: 10,
  },
  textIn: {
    flex: 1,
    color: '#fff',
    fontSize: 15,
    paddingVertical: 0,
  },

  // ── Forgot ──
  forgotWrap: {
    alignSelf: 'flex-end',
    marginBottom: 12,
    marginTop: -2,
  },
  link: {
    color: '#17c4d6',
    fontSize: 13,
    textDecorationLine: 'underline',
  },

  // ── Password strength ──
  strengthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  dash: {
    width: 14,
    height: 3,
    borderRadius: 2,
  },
  strengthLbl: {
    fontSize: 11,
    fontWeight: '600',
    marginLeft: 4,
  },

  // ── Buttons ──
  progressBtn: {
    width: '100%',
    height: 38,
    borderWidth: 1.2,
    borderColor: 'rgba(20, 197, 216, 0.55)',
    borderRadius: 10,
    justifyContent: 'center',
    paddingHorizontal: 4,
    backgroundColor: 'rgba(6, 24, 40, 0.25)',
    marginTop: 8,
    marginBottom: 16,
  },
  progressBarFill: {
    width: '60%', // about 60% filled as in design
    height: 6,
    backgroundColor: '#14c5d8',
    borderRadius: 3,
    alignSelf: 'center',
  },
  btnCyan: {
    width: '100%',
    height: 46,
    backgroundColor: '#14c5d8',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#14c5d8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.38,
    shadowRadius: 10,
    elevation: 6,
  },
  btnCyanTxt: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  pressed: {
    opacity: 0.82,
    transform: [{ scale: 0.975 }],
  },

  // ── Divider ──
  divRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 12,
  },
  divLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  divTxt: {
    color: 'rgba(255,255,255,0.36)',
    fontSize: 12,
    paddingHorizontal: 10,
  },

  // ── Social ──
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 14,
    marginBottom: 8,
  },
  socialCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.16)', // viền mảnh màu sáng
    backgroundColor: 'rgba(255, 255, 255, 0.08)', // kính mờ trong suốt nhẹ
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  // ── Toggle link ──
  toggleWrap: {
    paddingVertical: 8,
    alignItems: 'center',
  },
  toggleTxt: {
    color: 'rgba(255,255,255,0.50)',
    fontSize: 13,
  },
  toggleAction: {
    color: '#17c4d6',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});
