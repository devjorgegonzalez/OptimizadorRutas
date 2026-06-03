'use client';
import dynamic from 'next/dynamic';

const PaginaFabricasContent = dynamic(
  () => import('./PaginaFabricasContent'),
  { ssr: false }
);

export default function Pagina() {
  return <PaginaFabricasContent />;
}
