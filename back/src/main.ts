import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS para permitir solicitudes del front (puerto 9901)
  app.enableCors();

  // Configuración de Swagger en castellano
  const config = new DocumentBuilder()
    .setTitle('API Optimizador de Rutas')
    .setDescription('Especificación de la API para el control de camiones, fábricas, clientes y rutas en Venezuela')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT ?? 9902;
  await app.listen(port);
  console.log(`Servidor escuchando en: http://localhost:${port}`);
  console.log(`Documentación de Swagger en: http://localhost:${port}/api`);
}
bootstrap();
