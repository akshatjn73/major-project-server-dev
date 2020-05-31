import { Controller, Post, Request, Res, Body, HttpStatus, Logger, Get, Query, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ConfigService } from '../../config/config.service';
import { GroupCuService } from './group-cu.service';
import { MemberService } from '../../repositories/member/member.service';
import { LcuService } from '../../repositories/lcu/lcu.service';

@Controller('gcu')
export class GroupCuController {
    constructor(private readonly configService: ConfigService,
        private readonly groupCuService: GroupCuService,
        private readonly memberService: MemberService,
        private readonly lcuService: LcuService
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
    // @Get()
    // async getAllGcu(
    //     @Res() res,
    // ) {
    //     try {
    //         const gcu = await this.groupCuService.getAllGcu();
    //         if (gcu) {
    //             return res.status(HttpStatus.OK).json({
    //                 message: 'gcus fetched successfully',
    //                 gcu
    //             });
    //         }    
    //     } catch (error) {
    //         Logger.error(error);
    //         return res.status(HttpStatus.BAD_REQUEST).json({
    //             message: error.message,
    //         });
    //     }
    // }

    @Get(':id')
    async getGcu(
        @Param('id') id 
    ) {
        return await this.groupCuService.getGcu(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getGcuInfo(
        @Request() req,
        @Res() res,
    ) {
        try {
            const user = await this.memberService.findOne(req.user.id);
            if (user.authGCU == null) {
                let lcuId = user.authLCU[0];
                let newArray = [];
                let lcu = await this.lcuService.findOne(lcuId);
                let gcu = await this.groupCuService.getGcu(lcu.gcu.id);
                const data = {
                    sum: 0,
                    highestTemperature: 0,
                    totalPower: 0,
                    switchCount: 0,
                    activeSwitchCount: 0
                }
                let lcuLength = gcu.lcu.length;
                let lcuArray = gcu.lcu
                for (let i = 0; i < lcuLength; i++ ) {
                    if (user.authLCU.includes(lcuArray[i].id)) {
                        newArray.push(gcu.lcu[i]);
                    }
                }
                gcu.lcu = newArray;
                if (data) {
                    return res.status(HttpStatus.OK).json({
                        message: 'Stats fetched successfully',
                        gcu,
                        data,
                        admin: false                    
                    });    
                }

            } else {
                let gcuId = user.authGCU[0];
                let gcu = await this.groupCuService.getGcu(gcuId);
                const data = await this.groupCuService.getGcuStats(gcu);
                if (data) {
                    return res.status(HttpStatus.OK).json({
                        message: 'Stats fetched successfully',
                        gcu,
                        data,
                        admin: true
                    });
                } 
            }   
        } catch (error) {
            Logger.error(error);
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: error.message
            });
        }
    }
}
