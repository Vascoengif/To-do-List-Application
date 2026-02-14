import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TaskModule } from './api/task/task.module';
import { addTransactionalDataSource } from 'typeorm-transactional'
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import configuration from './configuration/configuration';

@Module({
  imports: [
    // Application Modules
    TaskModule,
    // Dependecy Modules
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `./src/api/config/.env.local`,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        ...configService.get('database'),
        autoLoadEntities: true, // because of feature modules
        synchronize: false,
      }),
      async dataSourceFactory(options) {
        if (!options) {
          throw new Error('Invalid geoDataDatabase options passed')
        }
        return addTransactionalDataSource({ name: options.name, dataSource: new DataSource(options) })
      },
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
