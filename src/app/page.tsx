'use client';

import { useAuth } from '@/hooks/useAuthDev';
import LoginForm from '@/components/auth/LoginForm';
import AppLayout from '@/components/layout/AppLayout';

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="text-center">
          <div className="spinner-eco w-16 h-16 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading Carbon Tracker...</p>
          <div className="mt-4 flex justify-center space-x-2">
            <span className="floating-element text-2xl">🌱</span>
            <span className="floating-element text-2xl">🌿</span>
            <span className="floating-element text-2xl">🍃</span>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  return <AppLayout />;
}
