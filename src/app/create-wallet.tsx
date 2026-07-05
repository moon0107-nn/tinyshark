import CreateAccountScreen from '@/components/create-wallet';
import { useRouter } from 'expo-router';

export default function CreateWalletRoute() {
  const router = useRouter();

  return (
    <CreateAccountScreen
      onBack={() => router.back()}
    />
  );
}
