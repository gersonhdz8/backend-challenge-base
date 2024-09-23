import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import { Session } from "src/users/entities/session.entity";
import { Favorite } from "src/favorites/entities/favorite.entity";
import { UsersModule } from "src/users/users.module";
import { AuthModule } from "src/auth/auth.module";
import { FavoritesModule } from "src/favorites/favorites.module";
import { ConfigService, ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    //Se importa modulo Config para manejar variables de entorno
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
      type: "mysql",
      url: configService.get<string>('MYSQL_URL'),
      entities: [User, Session, Favorite],      
      autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    FavoritesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
