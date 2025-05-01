'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import styles from './LoginComponent.module.css';

const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setIsLoading(true);
      setError('');

      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError('Invalid email or password');
        setIsLoading(false);
      } else {
        // Successful login
        router.push('/profile');
      }
    } catch (err) {
      setError('An error occurred during login');
      setIsLoading(false);
      console.error('Login error:', err);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h2>Sign In</h2>
        <form onSubmit={handleLogin}>
          {error && <p className={styles.errorMessage}>{error}</p>}

          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            className={styles.inputField}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            className={styles.inputField}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            id="login-button"
            type="submit"
            className={styles.loginButton}
            disabled={isLoading}
          >
            {isLoading ? 'Signing In...' : 'Log In'}
          </button>

          <div className={styles.signupLink}>
            <span>Don&apos;t have an account? </span>
            <Link href="/auth/signup">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
      <div className={styles.logoContainer}>
        <Image
          src="/image.png"
          alt="University Logo"
          width={150}
          height={150}
          priority
          className={styles.logoImage}
        />
      </div>
    </div>
  );
};

export default LoginComponent;
