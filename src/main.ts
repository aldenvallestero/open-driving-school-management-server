import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT =
    process.env.WEBSITE_PORT ||
    process.env.webste_port ||
    process.env.PORT ||
    process.env.port ||
    8080;
  await app.listen(PORT, () => {
    console.log('Server started running on port', PORT);
  });
}
bootstrap();
