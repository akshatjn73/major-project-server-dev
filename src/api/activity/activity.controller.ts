import { Controller, Post, UseGuards, Request, Res, Body, Logger, HttpStatus, Get, Param, Query } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ConfigService } from '../../config/config.service';
import { ActivityService } from './activity.service';
import { SmtSwitchService } from '../smt-switch/smt-switch.service'
import { query } from 'express';

@Controller('activity')
export class ActivityController {constructor(private readonly configService: ConfigService,
    private readonly activityService: ActivityService,
    private readonly switchService: SmtSwitchService,
 ) { }

    // @UseGuards(JwtAuthGuard)
    @Post()
    async createActivity(
        @Request() req,
        @Res() res,
        @Body() body,
    ) {
        try {
            let activityData: any;
            let result: any;
            let switchId = body.switchId;
            let status = body.switchStatus;
            activityData = {
                switchId: switchId,
            };
            if (status == 'ON'){
                activityData.operation = true
                result = await this.activityService.createActivity(activityData);
                await this.switchService.updateSmartSwitch(switchId, {state: true});
            } 
            if (status == 'OFF') {
                activityData.operation = false
                result = await this.activityService.createActivity(activityData);
                const switchData = await this.switchService.getSmartSwitch(switchId);
                let startTime = switchData.modifiedAt;
                let endTime = result.createdAt;
                const differenceInMinutes = await this.activityService.getDifferenceInMinutes(endTime, startTime);
                let newTime = switchData.time + differenceInMinutes;
                await this.switchService.updateSmartSwitch(switchId, {
                    state: false,
                    time: newTime
                });
            }
            if (result) {
                return res.status(HttpStatus.OK).json({
                    message: 'Activity created',
                    result
                });
            }
            
        } catch (error) {
            Logger.error(error);
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: error.message
            });
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getActivity(@Res() res, @Param('id') id) {
        try {
            const activity = await this.activityService.getActivity(id);
            return res.status(HttpStatus.OK).json({
                message: 'Activity fetched successfully',
                activity
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
    async getActivityBySwitch(
        @Res() res,
        @Query() queryParams,
    ) {
        try {
            let noOfDays = queryParams.days
            let d = noOfDays.substring(0, noOfDays.length-1);
            const activities = await this.activityService.getActivityBySwitch(queryParams.switchId, d);
            if (activities) {
                return res.status(HttpStatus.OK).json({
                    message: 'Activities fetched successfully',
                    activities
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
