import { Controller, Post, Delete, Get, Param, UseGuards, Request } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { AuthGuard } from '../auth/auth.guard'; 
import { User } from '../users/entities/user.entity'; 
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('favorites')
@ApiBearerAuth()
@Controller('/favorites')
@UseGuards(AuthGuard)
export class FavoritesController {
    constructor(private favoritesService: FavoritesService) {}

    
    @ApiOperation({ summary: 'Agregar una película a favoritos para usuario logueado' })
    @ApiResponse({ status: 201, description: 'Favorito agregado exitosamente' })
    @ApiResponse({ status: 400, description: 'Solicitud incorrecta' })
    @Post('/addFavorite/:movieId')
    async addFavorite(@Request() req, @Param('movieId') movieId: number) {
        const userId = req.user.sub; 
        return this.favoritesService.addFavorite(userId, movieId);
    }

    @ApiOperation({ summary: 'Eliminar una película de favoritos para usuario logueado' })
    @ApiResponse({ status: 200, description: 'Favorito eliminado exitosamente' })
    @ApiResponse({ status: 404, description: 'Favorito no encontrado' })
    @Delete('/deleteFavorite/:movieId')
    async removeFavorite(@Request() req, @Param('movieId') movieId: number) {
        const userId = req.user.sub;
        return await this.favoritesService.removeFavorite(userId, movieId);
    }

    @Get("/allFavorites")
    @ApiOperation({ summary: 'Obtener lista de películas favoritas del usuario logueado.' })
    @ApiResponse({ status: 200, description: 'Lista de favoritos' })
    async getFavorites(@Request() req) {
        const userId = req.user.sub;
        return this.favoritesService.getFavorites(userId);
    }
}
