'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import Button from '@/component/components/Button';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
}

export default function SignupPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError('');
      setLoading(true);

      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        setLoading(false);
        return;
      }

      if (!formData.agreeTerms) {
        setError('Please agree to the terms and conditions');
        setLoading(false);
        return;
      }

      try {
        const res = await fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
          }),
        });

        const data = await res.json().catch(() => null);

        if (!res.ok || !data?.ok) {
          setError(data?.message || 'Signup failed. Please try again.');
          setLoading(false);
          return;
        }

        const loginResult = await signIn('credentials', {
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
          redirect: false,
        });

        if (loginResult?.error) {
          router.push('/login');
          return;
        }

        router.replace('/');
        router.refresh();
      } catch (err) {
        console.error('Signup error:', err);
        setError('Unable to create your account. Please try again.');
        setLoading(false);
      }
    },
    [formData, router]
  );

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-16 px-4">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl border border-[#F0E6D8] p-8 sm:p-10">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl font-bold tracking-widest text-[#2A2421] uppercase mb-2">ARomanova</h1>
          <p className="text-sm text-[#7A7267]">Create your account and start shopping</p>
          <div className="w-10 h-[2px] bg-[#C9A038] mx-auto mt-3 rounded-full" />
        </div>

        {error && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-3 py-3 text-sm text-red-700">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-[#574F46] mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-[#FAF7F2]/50 text-[#2A2421] placeholder-gray-400 focus:outline-none focus:border-[#C9A038] focus:ring-2 focus:ring-[#C9A038]/20"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#574F46] mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-[#FAF7F2]/50 text-[#2A2421] placeholder-gray-400 focus:outline-none focus:border-[#C9A038] focus:ring-2 focus:ring-[#C9A038]/20"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#574F46] mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-[#FAF7F2]/50 text-[#2A2421] placeholder-gray-400 focus:outline-none focus:border-[#C9A038] focus:ring-2 focus:ring-[#C9A038]/20"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#574F46] mb-2">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-[#FAF7F2]/50 text-[#2A2421] placeholder-gray-400 focus:outline-none focus:border-[#C9A038] focus:ring-2 focus:ring-[#C9A038]/20"
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-start gap-2 pt-1">
            <input
              type="checkbox"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
              className="mt-1 h-4 w-4 rounded border-gray-300 text-[#C9A038] focus:ring-[#C9A038]"
            />
            <label className="text-sm text-[#574F46]">
              I agree to the{' '}
              <a href="#" className="font-semibold text-[#C9A038] hover:text-[#B38C2B]">
                terms and conditions
              </a>
            </label>
          </div>

          <Button type="submit" fullWidth disabled={loading} className="py-3 mt-6">
            {loading ? 'Creating account...' : 'Sign Up'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-[#7A7267]">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-[#C9A038] hover:text-[#B38C2B]">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
