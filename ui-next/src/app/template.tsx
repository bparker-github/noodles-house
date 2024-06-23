import { AuthProvider } from '@/context/authContext';
import { PropsWithChildren } from 'react';

export default function DashboardLayout({ children }: PropsWithChildren) {
  return <AuthProvider>{children}</AuthProvider>;
}
