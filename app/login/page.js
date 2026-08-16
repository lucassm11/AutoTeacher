// app/login/page.js
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modoRegistro, setModoRegistro] = useState(false);
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const router = useRouter();

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setError('');

    if (modoRegistro && !aceptaTerminos) {
      setError('Debes aceptar los términos y la política de privacidad para crear una cuenta.');
      return;
    }

    setCargando(true);

    try {
      if (modoRegistro) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.push('/dashboard');
    } catch (err) {
      const mensajes = {
        'auth/email-already-in-use': 'Ese email ya tiene una cuenta. Prueba a iniciar sesión.',
        'auth/invalid-email': 'El email no tiene un formato válido.',
        'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres.',
        'auth/wrong-password': 'Contraseña incorrecta.',
        'auth/user-not-found': 'No existe ninguna cuenta con ese email.',
        'auth/invalid-credential': 'Email o contraseña incorrectos.',
      };
      setError(mensajes[err.code] || 'Ha ocurrido un error. Inténtalo de nuevo.');
    } finally {
      setCargando(false);
    }
  };

  const iniciarConGoogle = async () => {
    setError('');
    setCargando(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push('/dashboard');
    } catch (err) {
      // Si el profesor cierra la ventana de Google sin elegir cuenta,
      // no es un error real, así que no mostramos nada en ese caso.
      if (err.code !== 'auth/popup-closed-by-user') {
        setError('No se pudo iniciar sesión con Google. Inténtalo de nuevo.');
      }
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="notebook-lines min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Wordmark */}
        <div className="text-center mb-8">
          <h1 className="font-display italic text-5xl text-[color:var(--color-pine)]">
            Auto<span className="text-[color:var(--color-red-pen)]">Teacher</span>
          </h1>
          <p className="mt-2 text-sm tracking-wide text-[color:var(--color-ink)]/60">
            Corrección con IA, revisada por ti
          </p>
        </div>

        {/* Tarjeta */}
        <div className="bg-white rounded-2xl shadow-xl shadow-black/5 border-l-4 border-[color:var(--color-red-pen)] p-8">
          <h2 className="font-display text-2xl text-[color:var(--color-pine)] mb-6">
            {modoRegistro ? 'Crear cuenta' : 'Bienvenido de nuevo'}
          </h2>

          <form onSubmit={manejarEnvio} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[color:var(--color-ink)]/80 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-lg border border-black/10 px-4 py-2.5 outline-none focus:ring-2 focus:ring-[color:var(--color-indigo)] transition"
                placeholder="tu@centro.edu"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[color:var(--color-ink)]/80 mb-1">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full rounded-lg border border-black/10 px-4 py-2.5 outline-none focus:ring-2 focus:ring-[color:var(--color-indigo)] transition"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="text-sm text-[color:var(--color-red-pen-dark)] bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            {modoRegistro && (
              <label className="flex items-start gap-2 text-xs text-[color:var(--color-ink)]/70">
                <input
                  type="checkbox"
                  checked={aceptaTerminos}
                  onChange={(e) => setAceptaTerminos(e.target.checked)}
                  className="mt-0.5"
                />
                <span>
                  Acepto los{' '}
                  <Link href="/terminos" target="_blank" className="text-[color:var(--color-indigo)] underline">
                    términos
                  </Link>{' '}
                  y la{' '}
                  <Link href="/privacidad" target="_blank" className="text-[color:var(--color-indigo)] underline">
                    política de privacidad
                  </Link>
                </span>
              </label>
            )}

            <button
              type="submit"
              disabled={cargando}
              className="w-full rounded-lg bg-[color:var(--color-indigo)] hover:bg-[color:var(--color-indigo-light)] disabled:opacity-60 text-white font-medium py-3 transition shadow-sm"
            >
              {cargando ? 'Procesando…' : modoRegistro ? 'Crear cuenta' : 'Entrar'}
            </button>
          </form>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-black/10" />
            <span className="text-xs text-[color:var(--color-ink)]/40 uppercase tracking-wide">
              o
            </span>
            <div className="flex-1 h-px bg-black/10" />
          </div>

          <button
            onClick={iniciarConGoogle}
            disabled={cargando}
            className="w-full flex items-center justify-center gap-3 rounded-lg border border-black/10 hover:bg-black/5 disabled:opacity-60 font-medium py-3 transition"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.91c1.7-1.57 2.69-3.88 2.69-6.62z" />
              <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.91-2.26c-.81.54-1.84.86-3.05.86-2.34 0-4.32-1.58-5.03-3.71H.96v2.33A9 9 0 0 0 9 18z" />
              <path fill="#FBBC05" d="M3.97 10.71a5.4 5.4 0 0 1 0-3.42V4.96H.96a9 9 0 0 0 0 8.08l3.01-2.33z" />
              <path fill="#EA4335" d="M9 3.58c1.32 0 2.51.46 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .96 4.96l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58z" />
            </svg>
            Continuar con Google
          </button>

          <p className="mt-6 text-center text-sm text-[color:var(--color-ink)]/70">
            {modoRegistro ? '¿Ya tienes cuenta?' : '¿Todavía no tienes cuenta?'}{' '}
            <button
              onClick={() => setModoRegistro(!modoRegistro)}
              className="text-[color:var(--color-indigo)] font-medium underline underline-offset-2 hover:text-[color:var(--color-indigo-light)]"
            >
              {modoRegistro ? 'Inicia sesión' : 'Regístrate'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
