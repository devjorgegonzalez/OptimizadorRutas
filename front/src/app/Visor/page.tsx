'use client';
import dynamic from 'next/dynamic';

const PaginaVisorContent = dynamic(
  () => import('./PaginaVisorContent'),
  { ssr: false }
);

export default function Pagina() {
  return <PaginaVisorContent />;
}
