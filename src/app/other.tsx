import OtherScreen from '@/components/other';
import { useRouter } from 'expo-router';

export default function OtherRoute() {
  const router = useRouter();

  return (
    <OtherScreen
      onNavigateToHome={() => router.replace('/')}
      onNavigateToWallet={() => router.replace('/wallet')}
      onNavigateToAnalyst={() => router.replace('/analysis')}
      onNavigateToInterface={() => router.push('/interface')}
      onNavigateToSpendingLimit={() => router.push('/spending-limit')}
    />
  );
}
