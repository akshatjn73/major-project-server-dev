import { Controller, Post, Request, Res, Body, HttpStatus, Logger, Get, Query, Param } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ConfigService } from '../../config/config.service';
import { GroupCuService } from './group-cu.service';

@Controller('gcu')
export class GroupCuController {
    constructor(private readonly configService: ConfigService,
        private readonly groupCuService: GroupCuService,
    ) { }

    // @UseGuards(JwtAuthGuard)
    @Post()
    async createGcu(
        @Request() req,
        @Res() res,
        @Body() body,
    ) {
        try {
            const gcu = await this.groupCuService.createGcu(body);
            if (gcu) {
                return res.status(HttpStatus.OK).json({
                    message: 'gcu created',
                    gcu
                });
            }
        } catch (error) {
            Logger.error(error);
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: error.message
            });
        }
    }

    // @UseGuards(JwtAuthGuard)
    @Get()
    async getAllGcu(
        @Res() res,
    ) {
        try {
            const gcu = await this.groupCuService.getAllGcu();
            if (gcu) {
                return res.status(HttpStatus.OK).json({
                    message: 'gcus fetched successfully',
                    gcu
                });
            }    
        } catch (error) {
            Logger.error(error);
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: error.message,
            });
        }
    }

    @Get(':id')
    async getGcu(
        @Param('id') id 
    ) {
        return await this.groupCuService.getGcu(id);
    }

    @Get('info')
    async getGcuInfo(
        @Res() res,
        @Query() queryParams
    ) {
        try {
            let gcu = await this.groupCuService.getGcu(queryParams.gcuId);
            const data = await this.groupCuService.getGcuStats(gcu);
            if (data) {
                return res.status(HttpStatus.OK).json({
                    message: 'Stats fetched successfully',
                    data
                });
            }    
        } catch (error) {
            Logger.error(error);
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: error.message
            });
        }
    }
}
