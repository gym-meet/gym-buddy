'use client';

// components/SignupComponent.js
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { createUser } from '@/lib/dbActions';
import styles from './SignupComponent.module.css';

type SignUpForm = {
  email: string;
  password: string;
  confirmPassword: string;
};

const SignupComponent = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email is required')
      .email('Email is invalid')
      .test(
        'is-hawaii-email',
        'Email must be a @hawaii.edu address',
        (value) => value?.endsWith('@hawaii.edu') || false,
      ),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .max(40, 'Password must not exceed 40 characters'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), ''], 'Passwords do not match'),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: SignUpForm) => {
    try {
      setIsSubmitting(true);
      setSubmitError('');

      // Create user in the database
      await createUser(data);

      // Sign in and redirect
      await signIn('credentials', {
        callbackUrl: '/profile',
        email: data.email,
        password: data.password,
      });
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'An error occurred during signup');
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.signupContainer}>
      <div className={styles.signupBox}>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Email"
            className={styles.inputField}
            {...register('email')}
          />
          {errors.email && <p className={styles.errorMessage}>{errors.email.message}</p>}

          <input
            type="password"
            placeholder="Password"
            className={styles.inputField}
            {...register('password')}
          />
          {errors.password && <p className={styles.errorMessage}>{errors.password.message}</p>}

          <input
            type="password"
            placeholder="Confirm Password"
            className={styles.inputField}
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && <p className={styles.errorMessage}>{errors.confirmPassword.message}</p>}

          {submitError && <p className={styles.errorMessage}>{submitError}</p>}

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing Up...' : 'Sign Up'}
          </button>

          <button
            type="button"
            className={`${styles.submitButton} ${styles.resetButton}`}
            onClick={() => reset()}
            style={{ backgroundColor: '#e0e0e0', color: '#333', marginTop: '10px' }}
          >
            Reset
          </button>
        </form>
        <p className={styles.loginLink}>
          Already have an account?
          {' '}
          <a href="/auth/signin">Log In</a>
        </p>
      </div>
    </div>
  );
};

export default SignupComponent;
