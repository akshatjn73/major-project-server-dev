import { Injectable } from '@nestjs/common';
import { TemperatureDataService } from '../../repositories/temperature-data/temperature-data.service';

@Injectable()
export class TemperatureService {
    constructor(
        private readonly temperatureDataService: TemperatureDataService
    ) { }

    async createTemperature(data) {
        return await this.temperatureDataService.save(data);
    }

    async getTemperature(id) {
        return await this.temperatureDataService.findOne(id);
    }

    async deleteTemperature(id) {
        return await this.temperatureDataService.delete(id);
    }

    async getTemperatureBySwitch(switchId: string, days: number) {
        const currentDate = new Date();
        const previousDate = new Date(currentDate);
        previousDate.setDate(previousDate.getDate() - days);
        let items:any
        let repository = await this.temperatureDataService.getRepository();
        items = await repository
            .createQueryBuilder('temperature')
            .where("temperature.switchId = :id", {
                id: switchId
            })
            .andWhere("temperature.createdAt > :previousDate", {
                previousDate: previousDate.toISOString()
            })
            .getMany();
        
        return items;
    }

    async getString(str, start, end) {
        let startIndex = str.search(start) + start.length;
        let endIndex = str.search(end);
        return str.slice(startIndex, endIndex);
    }
}
