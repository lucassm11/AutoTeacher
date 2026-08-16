// app/login/page.js
//
// 'use client' es obligatorio aquí: esta página necesita interactividad
// en el navegador (formularios, clicks, estado), a diferencia de las
// páginas normales de Next.js que se generan en el servidor.
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function Login() {
  // Guardamos en estado lo que el profesor escribe en el formulario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Controla si mostramos el formulario de "crear cuenta" o el de "entrar"
  const [modoRegistro, setModoRegistro] = useState(false);
  // Para mostrar mensajes de error si algo falla
  const [error, setError] = useState('');
  // Para desactivar el botón mientras se procesa, y que no hagan doble click
  const [cargando, setCargando] = useState(false);

  const router = useRouter();

  // Esta función se ejecuta al enviar el formulario (tanto en registro como en login)
  const manejarEnvio = async (e) => {
    e.preventDefault(); // evita que la página se recargue, como hace un formulario normal
    setError('');
    setCargando(true);

    try {
      if (modoRegistro) {
        // Crea una cuenta nueva con email y contraseña
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        // Inicia sesión con una cuenta ya existente
        await signInWithEmailAndPassword(auth, email, password);
      }
      // Si todo fue bien, mandamos al profesor a la pantalla principal
      router.push('/dashboard');
    } catch (err) {
      // Firebase devuelve códigos de error en inglés tipo "auth/wrong-password".
      // Los traducimos a mensajes simples para el profesor.
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
    <div style={{ maxWidth: '400px', margin: '80px auto', padding: '20px' }}>
      <h1>AutoTeacher</h1>
      <h2>{modoRegistro ? 'Crear cuenta' : 'Iniciar sesión'}</h2>

      <form onSubmit={manejarEnvio}>
        <div style={{ marginBottom: '12px' }}>
          <label>Email</label>
          <br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '12px' }}>
          <label>Contraseña</label>
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        {error && (
          <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>
        )}

        <button
          type="submit"
          disabled={cargando}
          style={{ width: '100%', padding: '10px', marginTop: '10px' }}
        >
          {cargando ? 'Procesando...' : modoRegistro ? 'Crear cuenta' : 'Entrar'}
        </button>
      </form>

      <p style={{ marginTop: '16px', fontSize: '14px' }}>
        {modoRegistro ? '¿Ya tienes cuenta?' : '¿Todavía no tienes cuenta?'}{' '}
        <button
          onClick={() => setModoRegistro(!modoRegistro)}
          style={{ textDecoration: 'underline', border: 'none', background: 'none', cursor: 'pointer' }}
        >
          {modoRegistro ? 'Inicia sesión' : 'Regístrate'}
        </button>
      </p>
    </div>
  );
}
