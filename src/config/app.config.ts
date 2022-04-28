import { registerAs } from '@nestjs/config';

export const appConfig = registerAs('app', () => {
  return {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    name: process.env.APP_NAME,
    url: process.env.APP_URL,
  };
});
