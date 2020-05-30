import { Controller, Post, Request, Res, Body, Logger, HttpStatus, UseGuards, Get, Param } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ConfigService } from '../../config/config.service';
import { LocalCuService } from './local-cu.service';

@Controller('lcu')
export class LocalCuController {    
    constructor(private readonly configService: ConfigService,
        private readonly localCuService: LocalCuService
    ) { }
    
    // @UseGuards(JwtAuthGuard)
    @Post()
    async createLcu(
        @Request() req,
        @Res() res,
        @Body() body,
    ) {
        try {
            const lcu = await this.localCuService.createLcu(body);
            if (lcu) {
                return res.status(HttpStatus.OK).json({
                    message: 'Lcu created',
                    lcu
                });
            }
        } catch (error) {
            Logger.error(error);
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: error.message
            });
        }
    }

    @Get(':id')
    async getGcu(
        @Param('id') id 
    ) {
        return await this.localCuService.getLcu(id);
    }

    // @UseGuards(JwtAuthGuard)
    @Get()
    async getAllLcu(
        @Res() res,
    ) {
        try {
            const lcu = await this.localCuService.getAllLcu();
            if (lcu) {
                return res.status(HttpStatus.OK).json({
                    message: 'Lcus fetched successfully',
                    lcu
                });
            }    
        } catch (error) {
            Logger.error(error);
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: error.message,
            });
        }
    }
}
