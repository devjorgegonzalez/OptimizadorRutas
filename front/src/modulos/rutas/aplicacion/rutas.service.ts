export interface PuntoRuta {
  id: number;
  rutaCamionId: number;
  orden: number;
  tipoPunto: 'ORIGEN' | 'FABRICA' | 'CLIENTE';
  latitud: number;
  longitud: number;
  descripcion: string | null;
  creadoEn?: string;
  actualizadoEn?: string;
}

export interface RutaCamion {
  id: number;
  camionId: number;
  puntos: PuntoRuta[];
  creadoEn?: string;
  actualizadoEn?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9902';

export const rutasService = {
  async obtenerPorCamionId(camionId: number): Promise<RutaCamion> {
    const response = await fetch(`${API_URL}/rutas/camion/${camionId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('ROUTE_NOT_FOUND');
      }
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.mensaje || 'Error al obtener la ruta del camión.');
    }

    return response.json();
  },

  async generarRutas(): Promise<RutaCamion[]> {
    const response = await fetch(`${API_URL}/rutas/generar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.mensaje || 'Error al generar y optimizar las rutas.');
    }

    return response.json();
  },

  async eliminarRuta(camionId: number): Promise<void> {
    const response = await fetch(`${API_URL}/rutas/camion/${camionId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.mensaje || 'Error al eliminar la ruta del camión.');
    }
  }
};
