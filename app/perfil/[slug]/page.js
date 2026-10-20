import { notFound } from 'next/navigation';
import { PERFILES_DATA } from '@/app/data/perfiles';
import ProfileView from './ProfileView';

const allProfiles = Object.values(PERFILES_DATA);

export function generateStaticParams() {
  return allProfiles.map((perfil) => ({ slug: perfil.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const perfil = PERFILES_DATA[slug];
  if (!perfil) {
    return { title: 'Perfil no encontrado — Adapto' };
  }
  return {
    title: `${perfil.name} — Adapto`,
    description: perfil.shortDescription,
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const perfil = PERFILES_DATA[slug];
  if (!perfil) notFound();
  return <ProfileView perfil={perfil} />;
}
