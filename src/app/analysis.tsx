import AnalysisScreen from '@/components/analysis';
import { useRouter } from 'expo-router';

export default function AnalysisRoute() {
  const router = useRouter();

  return (
    <AnalysisScreen
      onNavigateToWallet={() => router.replace('/wallet')}
      onNavigateToOther={() => router.replace('/other')}
      onNavigateToHome={() => router.replace('/')}
    />
  );
}
