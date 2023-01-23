import { NestFactory } from "@nestjs/core";
import { AppModule } from "./modules/app/app.module";
import { ConfigService } from "@nestjs/config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  //ссылку на конфиг сервис, я положил в переменную configService
  const port = configService.get("port");
  app.useGlobalPipes(new ValidationPipe())

  const config = new DocumentBuilder()
    .setTitle("Techjs api")
    .setDescription("This api for Techjs app")
    .setVersion("0.1")
    .addTag("API")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api',app,document)
  //передаём префикс, который используеться для входа на страницу доки;экземпляр нашего приложения;полный
  //екземпляр документа созданный  выше

  await app.listen(port);
}

bootstrap();
