'use client';
import dynamic from 'next/dynamic';

const PaginaClientesContent = dynamic(
  () => import('./PaginaClientesContent'),
  { ssr: false }
);

export default function Pagina() {
  return <PaginaClientesContent />;
}
