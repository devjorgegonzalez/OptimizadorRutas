"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    const config = new swagger_1.DocumentBuilder()
        .setTitle('API Optimizador de Rutas')
        .setDescription('Especificación de la API para el control de camiones, fábricas, clientes y rutas en Venezuela')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    const port = process.env.PORT ?? 9902;
    await app.listen(port);
    console.log(`Servidor escuchando en: http://localhost:${port}`);
    console.log(`Documentación de Swagger en: http://localhost:${port}/api`);
}
bootstrap();
//# sourceMappingURL=main.js.map