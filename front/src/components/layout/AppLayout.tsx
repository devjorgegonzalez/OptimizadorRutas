'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Truck, Users, Home, Map, Sun, Moon, Menu, X, Settings } from 'lucide-react';
import { useLoading } from '@/context/LoadingContext';

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<any>;
}

const navegacion: NavigationItem[] = [
  { name: 'Inicio', href: '/', icon: Home },
  { name: 'Camiones', href: '/Mantenedores/Camiones', icon: Truck },
  { name: 'Clientes', href: '/Mantenedores/Clientes', icon: Users },
  { name: 'Fábricas', href: '/Mantenedores/Fabricas', icon: Settings },
  { name: 'Visor de Rutas', href: '/Visor', icon: Map },
];

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const { loading } = useLoading();
  const [tema, setTema] = useState<'light' | 'dark'>('light');
  const [sidebarAbierto, setSidebarAbierto] = useState(false);

  // Inicializar tema desde localStorage
  useEffect(() => {
    const temaGuardado = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const prefiereOscuro = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const temaInicial = temaGuardado || (prefiereOscuro ? 'dark' : 'light');
    
    setTema(temaInicial);
    if (temaInicial === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const alternarTema = () => {
    const nuevoTema = tema === 'light' ? 'dark' : 'light';
    setTema(nuevoTema);
    localStorage.setItem('theme', nuevoTema);
    if (nuevoTema === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background text-foreground">
      {/* Pantalla de carga global */}
      {loading && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center transition-all duration-300">
          <div className="bg-card border border-border p-8 rounded-2xl shadow-2xl flex flex-col items-center max-w-xs w-full mx-4">
            <div className="relative flex items-center justify-center">
              <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
              <Truck className="absolute w-6 h-6 text-primary animate-pulse" />
            </div>
            <span className="mt-6 text-foreground font-semibold text-lg">Cargando datos...</span>
            <span className="mt-1 text-muted-foreground text-sm text-center">Por favor espera un momento</span>
          </div>
        </div>
      )}

      {/* Header móvil */}
      <header className="md:hidden flex items-center justify-between px-6 py-4 bg-card border-b border-border shadow-xs">
        <div className="flex items-center space-x-3">
          <Truck className="w-8 h-8 text-primary" />
          <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">RutaOptima</span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={alternarTema}
            className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          >
            {tema === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
          <button
            onClick={() => setSidebarAbierto(!sidebarAbierto)}
            className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          >
            {sidebarAbierto ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Sidebar - Desktop y Móvil */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-card border-r border-border flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:h-screen
          ${sidebarAbierto ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-primary/10 p-2 rounded-xl">
              <Truck className="w-6 h-6 text-primary" />
            </div>
            <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">RutaOptima</span>
          </div>
          <button
            onClick={() => setSidebarAbierto(false)}
            className="md:hidden p-1 rounded-lg hover:bg-muted text-muted-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {navegacion.map((item) => {
            const Icon = item.icon;
            const activo = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setSidebarAbierto(false)}
                className={`
                  flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group
                  ${activo 
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' 
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }
                `}
              >
                <Icon className={`w-5 h-5 mr-3 transition-transform duration-200 group-hover:scale-110`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border flex items-center justify-between">
          <div className="flex items-center space-x-3 text-sm text-muted-foreground">
            <span>Modo {tema === 'light' ? 'Claro' : 'Oscuro'}</span>
          </div>
          <button
            onClick={alternarTema}
            className="p-2.5 rounded-xl bg-muted hover:bg-accent hover:text-foreground text-muted-foreground transition-all duration-200 shadow-xs"
          >
            {tema === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
        </div>
      </aside>

      {/* Overlay móvil */}
      {sidebarAbierto && (
        <div
          onClick={() => setSidebarAbierto(false)}
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-xs md:hidden"
        />
      )}

      {/* Área de contenido principal */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto bg-background">
        <div className="flex-1 p-6 md:p-10 max-w-7xl w-full mx-auto animate-fade-in">
          {children}
        </div>
      </main>
    </div>
  );
};
