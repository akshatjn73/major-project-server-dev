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
        let temperatures = [];
        let timestamps = [];
        const currentDate = new Date();
        const previousDate = new Date(currentDate);
        previousDate.setDate(previousDate.getDate() - days);
        let items:any;
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
        for (let item of items) {
            temperatures.push(item.value);
            let timestamp = item.createdAt;
            let timeString = timestamp.toString();
            let startIndex = timeString.search('20200') + 5;
            let time = await this.getString(timeString,startIndex, startIndex+5);
            timestamps.push(time);
        }
        return {
            temperatures,
            timestamps
        };
    }

    async getString(str, start, end) {
        return str.slice(start, end);
    }

    async getHighestTemp(switchId) {
        return await this.temperatureDataService.getHighestTemperatures(switchId);
    }
}
