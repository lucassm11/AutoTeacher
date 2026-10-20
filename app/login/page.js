'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const { user, signInWithGoogle, registerWithEmail, loginWithEmail, resetPassword, loading } = useAuth();
  const router = useRouter();

  const [mode, setMode] = useState('login');
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) router.push('/auditor-dua');
  }, [user, loading, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSubmitting(true);
    try {
      if (mode === 'register') {
        if (!nombre.trim()) { setError('El nombre es obligatorio.'); setSubmitting(false); return; }
        if (password.length < 6) { setError('La contraseña debe tener al menos 6 caracteres.'); setSubmitting(false); return; }
        await registerWithEmail(email, password, nombre.trim());
        setSuccess('¡Cuenta creada! Revisa tu bandeja de entrada.');
      } else {
        await loginWithEmail(email, password);
      }
    } catch (err) {
      const msg = {
        'auth/email-already-in-use': 'Este email ya está registrado. Inicia sesión.',
        'auth/invalid-email': 'Email no válido.',
        'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres.',
        'auth/invalid-credential': 'Email o contraseña incorrectos.',
        'auth/user-not-found': 'No existe una cuenta con este email.',
        'auth/wrong-password': 'Contraseña incorrecta.',
        'auth/too-many-requests': 'Demasiados intentos. Espera un momento.',
        'auth/invalid-login-credentials': 'Email o contraseña incorrectos.',
      };
      setError(msg[err.code] || err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email) { setError('Escribe tu email primero.'); return; }
    setError('');
    setSuccess('');
    try {
      await resetPassword(email);
      setSuccess('Email de recuperación enviado. Revisa tu bandeja.');
    } catch (err) {
      setError(err.code === 'auth/user-not-found' ? 'No existe una cuenta con este email.' : err.message);
    }
  };

  const handleGoogle = async () => {
    setError('');
    setSuccess('');
    await signInWithGoogle();
  };

  return (
    <div className="min-h-screen bg-[color:var(--color-paper)] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="flex items-center gap-2.5 justify-center">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[color:var(--color-pine)] to-[#2d6b5a] flex items-center justify-center">
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 20L12 4L20 20" />
                <path d="M7.5 14H16.5" />
              </svg>
            </div>
            <span className="flex items-baseline">
              <span className="font-display text-3xl text-[color:var(--color-ink)]">adap</span>
              <span className="font-display text-3xl text-[color:var(--color-pine)]">to</span>
            </span>
          </Link>
          <p className="text-sm text-[color:var(--color-ink)]/60 mt-2">
            {mode === 'login' ? 'Inicia sesión para auditar exámenes' : 'Crea tu cuenta gratis'}
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-black/5 shadow-sm p-8 space-y-5">
          <h1 className="font-display text-xl text-[color:var(--color-pine)] text-center">
            {mode === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}
          </h1>

          <button
            onClick={handleGoogle}
            disabled={submitting}
            className="w-full flex items-center justify-center gap-3 border border-black/15 rounded-xl px-4 py-3 text-sm font-medium hover:bg-black/5 transition cursor-pointer disabled:opacity-50"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continuar con Google
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-black/10"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-3 text-[color:var(--color-ink)]/40">o con email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            {mode === 'register' && (
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Tu nombre"
                className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm outline-none focus:border-[color:var(--color-indigo)] transition"
              />
            )}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
              className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm outline-none focus:border-[color:var(--color-indigo)] transition"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña (mín. 6 caracteres)"
              required
              minLength={6}
              className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm outline-none focus:border-[color:var(--color-indigo)] transition"
            />

            {error && (
              <p className="text-xs text-red-700 bg-red-50 p-2.5 rounded-lg border border-red-200">{error}</p>
            )}
            {success && (
              <p className="text-xs text-emerald-700 bg-emerald-50 p-2.5 rounded-lg border border-emerald-200">{success}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[color:var(--color-indigo)] hover:bg-[color:var(--color-indigo-light)] disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition cursor-pointer text-sm"
            >
              {submitting ? 'Procesando...' : mode === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}
            </button>
          </form>

          <div className="text-center space-y-2">
            {mode === 'login' ? (
              <>
                <button
                  onClick={handleResetPassword}
                  className="text-xs text-[color:var(--color-indigo)] hover:underline cursor-pointer"
                >
                  ¿Olvidaste tu contraseña?
                </button>
                <p className="text-xs text-[color:var(--color-ink)]/50">
                  ¿No tienes cuenta?{' '}
                  <button onClick={() => { setMode('register'); setError(''); setSuccess(''); }} className="text-[color:var(--color-indigo)] font-medium hover:underline cursor-pointer">
                    Regístrate gratis
                  </button>
                </p>
              </>
            ) : (
              <p className="text-xs text-[color:var(--color-ink)]/50">
                ¿Ya tienes cuenta?{' '}
                <button onClick={() => { setMode('login'); setError(''); setSuccess(''); }} className="text-[color:var(--color-indigo)] font-medium hover:underline cursor-pointer">
                  Inicia sesión
                </button>
              </p>
            )}
          </div>
        </div>

        <div className="text-center mt-6">
          <Link href="/" className="text-xs text-[color:var(--color-ink)]/50 hover:text-[color:var(--color-ink)]">
            ← Volver a Adapto
          </Link>
        </div>
      </div>
    </div>
  );
}
