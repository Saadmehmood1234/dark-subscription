"use client";

import { useRouter } from "next/navigation"; 
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function VerifyEmail() {
  const [isResending, setIsResending] = useState(false);
  const router = useRouter();

  const resendVerificationEmail = async () => {
    setIsResending(true);
    try {
      const response = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        alert('Verification email resent!');
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to resend verification email');
      }
    } catch (error) {
      console.error('Resend error:', error);
      alert('Failed to resend verification email');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="container p-8 max-w-lg mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">Verify Your Email</h1>
      <p className="mb-2">We've sent a verification link to your email address.</p>
      <p className="mb-6">Please check your inbox and click the link to complete your registration.</p>
      
      <div className="space-x-4">
        {/* <button
          className="bg-blue-600 text-white cursor-pointer px-4 py-2 rounded hover:bg-blue-700"
          onClick={resendVerificationEmail}
          disabled={isResending}
        >
          {isResending ? 'Sending...' : 'Resend Verification Email'}
        </button> */}
        <button
          className="bg-green-600 cursor-pointer text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={() => signIn()}
        >
          Already verified? Sign in
        </button>
      </div>
    </div>
  );
}
