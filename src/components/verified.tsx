// pages/auth/verified.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';

export default function Verified() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      signIn(undefined, { callbackUrl: '/' });
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container">
      <h1>Email Verified Successfully!</h1>
      <p>You'll be redirected to your account shortly.</p>
    </div>
  );
}