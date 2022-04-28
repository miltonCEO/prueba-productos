import { registerAs } from '@nestjs/config';

export const databaseConfig = registerAs('database', () => {
  return {
    default: {
      url: process.env.DB_DEFAULT_URL,
    },
  };
});
