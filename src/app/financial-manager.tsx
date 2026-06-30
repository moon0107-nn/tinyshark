import FinancialManagerScreen from '@/components/financial-manager';
import { useRouter } from 'expo-router';

export default function FinancialManagerRoute() {
  const router = useRouter();

  return (
    <FinancialManagerScreen
      onBack={() => router.back()}
      onNavigateToCreateWallet={() => router.push('/create-wallet' as any)}
    />
  );
}
