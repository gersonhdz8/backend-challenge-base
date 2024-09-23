import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*', 
  });

  const config = new DocumentBuilder()
    .setTitle('Inlaze Challenge')
    .setDescription('Gestión de usuarios, autenticación y gestión de favoritos')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('inlaze')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT || 3000);
}
void bootstrap();
