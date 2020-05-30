import { Controller, Post, Request, Res, Body, Logger, HttpStatus, UseGuards, Get, Param } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ConfigService } from '../../config/config.service';
import { LocalCuService } from './local-cu.service';
import { identity } from 'rxjs';
import { MemberService } from '../../repositories/member/member.service';

@Controller('lcu')
export class LocalCuController {    
    constructor(private readonly configService: ConfigService,
        private readonly localCuService: LocalCuService,
        private readonly memberService: MemberService
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

    // @Get(':id')
    // async getGcu(
    //     @Param('id') id 
    // ) {
    //     return await this.localCuService.getLcu(id);
    // }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAllLcu(
        @Request() req,
        @Res() res,
    ) {
        try {
            const user = await this.memberService.findOne(req.user.id);
            let lcus = user.authLCU;
            const data = await this.localCuService.getAllLcuStats(lcus);
            if (data) {
                return res.status(HttpStatus.OK).json({
                    message: 'lcu data fetched successfully',
                    data
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
    async getLcu(
        @Res() res,
        @Param('id') id
    ) {
        try {
            let lcu = await this.localCuService.getLcu(id);
            const data = await this.localCuService.getLcuStats(lcu);
            if (data) {
                return res.status(HttpStatus.OK).json({
                    message: 'Stats fetched successfully',
                    lcu,
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
