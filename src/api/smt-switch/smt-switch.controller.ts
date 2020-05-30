import { Controller, UseGuards, Res, Body, Post, HttpStatus, Logger, Get, Param } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ConfigService } from '../../config/config.service';
import { SmtSwitchService } from './smt-switch.service';
import { LcuService } from '../../repositories/lcu/lcu.service';

@Controller('switch')
export class SmtSwitchController {
    constructor(
        private readonly switchService: SmtSwitchService,
        private readonly lcuService: LcuService
    ) { }
    
    // @UseGuards(JwtAuthGuard)
    @Post()
    async createSwitch(
        @Res() res,
        @Body() body,
    ) {
        try {
            const smartSwitch = await this.switchService.createSmartSwitch(body);
            let lcu = await this.lcuService.findOne(body.lcu);
            await this.lcuService.update(lcu.id, {
                switchCount: lcu.switchCount+1,
            });
            return res.status(HttpStatus.OK).json({
                message: 'Switch created successfully',
                smartSwitch,
            });
        } catch (error) {
            Logger.error(error);
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: error.message,
            });
        }
    }

    // @UseGuards(JwtAuthGuard)
    @Get()
    async getAllSwitches(
        @Res() res,
    ) {
        try {
            const switches = await this.switchService.getAllSmartSwitch();
            if (switches) {
                return res.status(HttpStatus.OK).json({switches});
            }   
        } catch (error) {
            Logger.error(error);
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: error.message,
            });
        }
    }

    // @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getSmartSwitch(@Res() res, @Param('id') id) {
        try {
            const smartSwitch = await this.switchService.getSmartSwitch(id);
            return res.status(HttpStatus.OK).json({
                message: 'Switch fetched successfully',
                smartSwitch
            });     
        } catch (error) {
            Logger.error(error);
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: error.message,
            });
        }
    }
}
