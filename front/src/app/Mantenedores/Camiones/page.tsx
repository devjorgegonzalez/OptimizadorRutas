'use client';
import dynamic from 'next/dynamic';

const PaginaCamionesContent = dynamic(
  () => import('./PaginaCamionesContent'),
  { ssr: false }
);

export default function Pagina() {
  return <PaginaCamionesContent />;
}
