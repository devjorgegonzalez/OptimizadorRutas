import { Cliente as ClienteDominio } from '../dominio/cliente';
import { Cliente as ClientePrisma } from '@prisma/client';

export class PrismaClienteMapper {
  static toDomain(prismaCliente: ClientePrisma): ClienteDominio {
    return new ClienteDominio(
      prismaCliente.id,
      prismaCliente.nombre,
      prismaCliente.latitud,
      prismaCliente.longitud,
      prismaCliente.activo,
      prismaCliente.creadoEn,
      prismaCliente.actualizadoEn,
      prismaCliente.descripcion,
      prismaCliente.direccion,
    );
  }
}
