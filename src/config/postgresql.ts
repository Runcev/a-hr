import { registerAs } from '@nestjs/config';

export default registerAs('postgresql', () => {
  return {
    type: 'postgres',
    host: process.env.POSTGRESQL_HOST,
    port: process.env.POSTGRESQL_PORT,
    username: process.env.POSTGRESQL_USERNAME,
    password: process.env.POSTGRESQL_PASSWORD,
    database: process.env.POSTGRESQL_DATABASE,
    autoLoadEntities: true,
    synchronize: true,
  };
});
