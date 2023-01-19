import { NestFactory } from "@nestjs/core";
import { AppModule } from "./modules/app/app.module";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  //ссылку на конфиг сервис, я положил в переменную configService
  const port = configService.get("port");
  await app.listen(3000);
}

bootstrap();
