'use client';

import { createContext, useContext, useState, useEffect, useRef } from 'react';
import {
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
} from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const AuthContext = createContext({
  user: null,
  plan: 'gratis',
  loading: true,
  signInWithGoogle: () => {},
  registerWithEmail: () => {},
  loginWithEmail: () => {},
  resetPassword: () => {},
  signOut: () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [plan, setPlan] = useState('gratis');
  const [loading, setLoading] = useState(true);
  const popupBusy = useRef(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        try {
          const ref = doc(db, 'usuarios', firebaseUser.uid);
          const snap = await getDoc(ref);
          if (snap.exists()) {
            setPlan(snap.data().plan || 'gratis');
          } else {
            await setDoc(ref, {
              email: firebaseUser.email,
              nombre: firebaseUser.displayName || '',
              plan: 'gratis',
              fecha_creacion: new Date().toISOString(),
            });
            setPlan('gratis');
            try {
              await fetch('/api/bienvenida', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  email: firebaseUser.email,
                  nombre: firebaseUser.displayName || 'Profesor/a',
                }),
              });
            } catch {}
          }
        } catch (err) {
          console.warn('Firestore error:', err.message);
          setPlan('gratis');
        }
      } else {
        setPlan('gratis');
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  async function signInWithGoogle() {
    if (popupBusy.current) return;
    popupBusy.current = true;
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      await signInWithPopup(auth, provider);
    } catch (err) {
      if (err.code !== 'auth/popup-closed-by-user' && err.code !== 'auth/cancelled-popup-request') {
        console.error('Google sign-in error:', err);
      }
    } finally {
      popupBusy.current = false;
    }
  }

  async function registerWithEmail(email, password, nombre) {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (nombre) {
      await updateProfile(cred.user, { displayName: nombre });
    }
    try {
      const ref = doc(db, 'usuarios', cred.user.uid);
      await setDoc(ref, {
        email,
        nombre: nombre || '',
        plan: 'gratis',
        fecha_creacion: new Date().toISOString(),
      });
    } catch {}
    try {
      await fetch('/api/bienvenida', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, nombre: nombre || 'Profesor/a' }),
      });
    } catch {}
  }

  async function loginWithEmail(email, password) {
    await signInWithEmailAndPassword(auth, email, password);
  }

  async function resetPassword(email) {
    await sendPasswordResetEmail(auth, email);
  }

  async function signOut() {
    await firebaseSignOut(auth);
    setUser(null);
    setPlan('gratis');
  }

  return (
    <AuthContext.Provider
      value={{ user, plan, loading, signInWithGoogle, registerWithEmail, loginWithEmail, resetPassword, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
