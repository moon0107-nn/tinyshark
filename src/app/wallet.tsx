import WalletScreen from '@/components/wallet';
import { useRouter } from 'expo-router';

export default function WalletRoute() {
  const router = useRouter();

  return (
    <WalletScreen
      onNavigateToFinancialManager={() => router.push('/financial-manager')}
      onNavigateToAnalysis={() => router.replace('/analysis')}
      onNavigateToOther={() => router.replace('/other')}
      onNavigateToHome={() => router.replace('/')}
    />
  );
}
