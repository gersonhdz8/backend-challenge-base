import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Favorite } from "./entities/favorite.entity";
import { User } from "src/users/entities/user.entity";
import { UsersService } from "src/users/users.service";

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private favoritesRepository: Repository<Favorite>,
    private usersService: UsersService,
  ) {}

  //Agregar favorito
  async addFavorite(userId: number, movieId: number): Promise<Favorite> {
    const favorite = this.favoritesRepository.create({
        movieId,
        user: { id: userId } 
    });
    return await this.favoritesRepository.save(favorite);
}

  //Eliminar favorito
  async removeFavorite(userId: number, movieId: number): Promise<{ message: string }> {
    // Verificar si el favorito existe
    const favorite = await this.favoritesRepository.findOne({
        where: { user: { id: userId }, movieId },
    });

    if (favorite) {
        // Si existe, eliminarlo
        await this.favoritesRepository.delete(favorite.id);
        return{
            message: 'Favorito eliminado exitosamente',            
        };
    } else {
        // Lanzar un error o manejar el caso en que no se encontró
        throw new HttpException(
            { message: 'No se encuentra este favorito para el usuario' },
            HttpStatus.NOT_FOUND,
        );
        
    }
}

  //Obtener lista de favoritos
  async getFavorites(userId: number): Promise<Favorite[]> {
    return this.favoritesRepository.find({
        where: { user: { id: userId }}});
  }
}
