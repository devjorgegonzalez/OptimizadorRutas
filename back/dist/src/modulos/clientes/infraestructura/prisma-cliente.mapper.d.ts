import { Cliente as ClienteDominio } from '../dominio/cliente';
import { Cliente as ClientePrisma } from '@prisma/client';
export declare class PrismaClienteMapper {
    static toDomain(prismaCliente: ClientePrisma): ClienteDominio;
}
