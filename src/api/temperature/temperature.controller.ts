import { Controller, Post, Request, Res, Body, UseFilters, UseGuards, HttpStatus, Logger, Get, Param, Query } from '@nestjs/common';
import { LocalAuthGuard } from '../../auth/guards/local-auth.guard';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ConfigService } from '../../config/config.service';
import { TemperatureService } from './temperature.service';

@Controller('temperature')
export class TemperatureController {
 constructor(private readonly configService: ConfigService,
    private readonly temperatureService: TemperatureService,
 ) { }

    // @UseGuards(JwtAuthGuard)
    @Post()
    async createTemperature(
        @Request() req,
        @Res() res,
        @Body() body,
        ) {
        try {
            Logger.log(body);
            let data = body.toString();
            let switchId = await this.temperatureService.getString(data,'switchId=','temp=');
            let value = await this.temperatureService.getString(data, 'temp=','&headers');
            const temperatureData = {
                switchId: switchId,
                value: value,
            };
            const result = await this.temperatureService.createTemperature(temperatureData);
            if (result) {
                return res.status(HttpStatus.OK).json({
                    message: 'Temperature created',
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
    async getTemperature(@Res() res, @Param('id') id) {
        try {
            const temperature = await this.temperatureService.getTemperature(id);
            return res.status(HttpStatus.OK).json({
                message: 'Temperature fetched successfully',
                temperature
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
    async getTemperatureBySwitch(
        @Res() res,
        @Query() queryParams,
    ) {
        try {
            const temperatures = await this.temperatureService.getTemperatureBySwitch(queryParams.switchId, queryParams.days);
            if (temperatures) {
                return res.status(HttpStatus.OK).json({
                    message: 'temperatures fetched successfully',
                    temperatures
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
