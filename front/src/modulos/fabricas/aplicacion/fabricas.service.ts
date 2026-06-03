export interface Fabrica {
  id: number;
  nombre: string;
  latitud: number;
  longitud: number;
  activo: boolean;
  creadoEn?: string;
  actualizadoEn?: string;
  descripcion?: string | null;
  direccion?: string | null;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9902';

export const fabricasService = {
  async listar(filtroNombre?: string): Promise<Fabrica[]> {
    const url = new URL(`${API_URL}/fabricas`);
    if (filtroNombre) {
      url.searchParams.append('nombre', filtroNombre);
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
      throw new Error(errorData.mensaje || 'Error al obtener la lista de fábricas.');
    }

    return response.json();
  },

  async obtenerPorId(id: number): Promise<Fabrica> {
    const response = await fetch(`${API_URL}/fabricas/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.mensaje || 'Error al obtener el detalle de la fábrica.');
    }

    return response.json();
  },

  async crear(fabrica: Omit<Fabrica, 'id' | 'creadoEn' | 'actualizadoEn'>): Promise<Fabrica> {
    const response = await fetch(`${API_URL}/fabricas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fabrica),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.mensaje || 'Error al registrar la fábrica.');
    }

    return response.json();
  },

  async actualizar(id: number, fabrica: Partial<Omit<Fabrica, 'id' | 'creadoEn' | 'actualizadoEn'>>): Promise<Fabrica> {
    const response = await fetch(`${API_URL}/fabricas/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fabrica),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.mensaje || 'Error al actualizar la fábrica.');
    }

    return response.json();
  },

  async eliminar(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/fabricas/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.mensaje || 'Error al eliminar la fábrica.');
    }
  }
};
