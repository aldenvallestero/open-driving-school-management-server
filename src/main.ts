import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const PORT =
    process.env.WEBSITES_PORT ||
    process.env.websites_port ||
    process.env.PORT ||
    process.env.port ||
    8080;
  await app.listen(PORT, () => {
    console.log('Server started running on port', PORT);
  });
}
bootstrap();
