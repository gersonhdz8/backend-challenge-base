import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { Favorite } from './entities/favorite.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports:[TypeOrmModule.forFeature([Favorite]),
AuthModule, UsersModule],
  controllers: [FavoritesController],
  providers: [FavoritesService],
  exports: [TypeOrmModule, FavoritesService]
})
export class FavoritesModule {}
