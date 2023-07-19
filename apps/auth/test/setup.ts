import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from '../data-source';

export const TypeORMMySqlTestingModule = (entities: any[]) =>
  TypeOrmModule.forRoot({
    ...config,
    entities,
  });
