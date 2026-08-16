import { auth, db } from '@/lib/firebase';

console.log('Firebase conectado:', auth.app.name);

export default function Home() {
  return (
    <div>
      <h1>AutoTeacher</h1>
    </div>
  );
}