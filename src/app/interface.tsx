import InterfaceScreen from '@/components/interface';
import { useRouter } from 'expo-router';

export default function InterfaceRoute() {
  const router = useRouter();

  return (
    <InterfaceScreen
      onGoBack={() => router.back()}
    />
  );
}
