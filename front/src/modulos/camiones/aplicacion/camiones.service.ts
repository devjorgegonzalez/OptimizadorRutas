export interface UbicacionCamion {
  latitud: number;
  longitud: number;
}

export interface Camion {
  id: number;
  placa: string;
  capacidad: number;
  puntoOrigen: UbicacionCamion;
  ultimaUbicacion: UbicacionCamion;
  creadoEn?: string;
  actualizadoEn?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9902';

export const camionesService = {
  async listar(filtroPlaca?: string): Promise<Camion[]> {
    const url = new URL(`${API_URL}/camiones`);
    if (filtroPlaca) {
      url.searchParams.append('placa', filtroPlaca);
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.mensaje || 'Error al obtener la lista de camiones.');
    }

    return response.json();
  },

  async obtenerPorId(id: number): Promise<Camion> {
    const response = await fetch(`${API_URL}/camiones/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.mensaje || 'Error al obtener el detalle del camión.');
    }

    return response.json();
  },

  async crear(camion: Omit<Camion, 'id' | 'creadoEn' | 'actualizadoEn'>): Promise<Camion> {
    const response = await fetch(`${API_URL}/camiones`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(camion),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.mensaje || 'Error al registrar el camión.');
    }

    return response.json();
  },

  async actualizar(id: number, camion: Partial<Omit<Camion, 'id' | 'creadoEn' | 'actualizadoEn'>>): Promise<Camion> {
    const response = await fetch(`${API_URL}/camiones/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(camion),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.mensaje || 'Error al actualizar el camión.');
    }

    return response.json();
  },

  async eliminar(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/camiones/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.mensaje || 'Error al eliminar el camión.');
    }
  }
};
