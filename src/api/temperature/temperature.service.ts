import { Injectable } from '@nestjs/common';
import { TemperatureDataService } from '../../repositories/temperature-data/temperature-data.service';

@Injectable()
export class TemperatureService {
    constructor(
        private readonly temperatureDataService: TemperatureDataService
    ) { }

    async createTemperature(member) {
        return await this.temperatureDataService.save(member);
    }

    async getTemperature(id) {
        return await this.temperatureDataService.findOne(id);
    }

    async deleteTemperature(id) {
        return await this.temperatureDataService.delete(id);
    }

    async getString(str, start, end) {
        let startIndex = str.search(start) + start.length;
        let endIndex = str.search(end);
        return str.slice(startIndex, endIndex);
    }
}
