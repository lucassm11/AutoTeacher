// app/login/page.js
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modoRegistro, setModoRegistro] = useState(false);
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const router = useRouter();

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setError('');
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

            <button
              type="submit"
              disabled={cargando}
              className="w-full rounded-lg bg-[color:var(--color-indigo)] hover:bg-[color:var(--color-indigo-light)] disabled:opacity-60 text-white font-medium py-3 transition shadow-sm"
            >
              {cargando ? 'Procesando…' : modoRegistro ? 'Crear cuenta' : 'Entrar'}
            </button>
          </form>

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
