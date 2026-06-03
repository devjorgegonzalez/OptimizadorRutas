export interface Cliente {
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

export const clientesService = {
  async listar(filtroNombre?: string): Promise<Cliente[]> {
    const url = new URL(`${API_URL}/clientes`);
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
      throw new Error(errorData.mensaje || 'Error al obtener la lista de clientes.');
    }

    return response.json();
  },

  async obtenerPorId(id: number): Promise<Cliente> {
    const response = await fetch(`${API_URL}/clientes/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.mensaje || 'Error al obtener el detalle del cliente.');
    }

    return response.json();
  },

  async crear(cliente: Omit<Cliente, 'id' | 'creadoEn' | 'actualizadoEn'>): Promise<Cliente> {
    const response = await fetch(`${API_URL}/clientes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cliente),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.mensaje || 'Error al registrar el cliente.');
    }

    return response.json();
  },

  async actualizar(id: number, cliente: Partial<Omit<Cliente, 'id' | 'creadoEn' | 'actualizadoEn'>>): Promise<Cliente> {
    const response = await fetch(`${API_URL}/clientes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cliente),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.mensaje || 'Error al actualizar el cliente.');
    }

    return response.json();
  },

  async eliminar(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/clientes/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.mensaje || 'Error al eliminar el cliente.');
    }
  }
};
