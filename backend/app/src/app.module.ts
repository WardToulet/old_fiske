import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MembersModule } from '@fiske/module-members';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db',
      autoLoadEntities: true,
    }),

    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),

    MembersModule,
  ],
})
export class AppModule {}
