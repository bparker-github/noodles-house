import { AuthProvider } from '@/context/authContext';
import { PropsWithChildren } from 'react';
import { UnsplashProvider } from '@noodles-house/unsplash';

export default function DashboardLayout({ children }: PropsWithChildren) {
  const unsplashAccessKey = process.env.NOOD_UNSPLASH_ACCESS_KEY ?? '';
  const uiEndpoint =
    typeof window === 'undefined' ? '' : window?.location?.origin + '/api/unsplash';

  return (
    <AuthProvider>
      <UnsplashProvider
        uiEndpoint={uiEndpoint}
        apiKey={unsplashAccessKey}
      >
        {children}
      </UnsplashProvider>
    </AuthProvider>
  );
}
