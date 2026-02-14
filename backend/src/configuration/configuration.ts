import { DataSourceOptions } from 'typeorm'

export default () => ({
  basePath: process.env.BASE_PATH || '',
  baseApiPath: process.env.BASE_API_PATH || `http://localhost:${parseInt(process.env.PORT || '3003', 10)}`,
  port: parseInt(process.env.PORT || '3003', 10),
  logger: 'console',
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5532', 10),
    type: 'postgres',
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    logging: ['warn', 'error'],
    maxQueryExecutionTime: 500,
    autoLoadEntities: true,
    uuidExtension: 'pgcrypto',
    synchronize: false,
    migrationsRun: false,
    useUTC: true,
  } as DataSourceOptions,
})
