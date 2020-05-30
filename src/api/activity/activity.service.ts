import { Injectable } from '@nestjs/common';
import { ActiveDataService } from '../../repositories/active-data/active-data.service';
import { createQueryBuilder } from 'typeorm';

@Injectable()
export class ActivityService {
    constructor(
        private readonly activeDataService: ActiveDataService
    ) { }

    async createActivity(data) {
        return await this.activeDataService.save(data);
    }

    async getActivity(id) {
        return await this.activeDataService.findOne(id);
    }

    async deleteActivity(id) {
        return await this.activeDataService.delete(id);
    }

    async getActivityBySwitch(switchId: string, days: number) {
        const currentDate = new Date();
        const previousDate = new Date(currentDate);
        previousDate.setDate(previousDate.getDate() - days);
        let items:any
        let repository = await this.activeDataService.getRepository();
        items = await repository
            .createQueryBuilder('activeData')
            .where("activeData.switchId = :id", {
                id: switchId
            })
            .andWhere("activeData.createdAt > :previousDate", {
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

    async getDifferenceInMinutes(dt2, dt1) {
        let difference = (dt2.getTime() - dt1.getTime()) / 1000;
        difference /= 60;
        return Math.abs(Math.round(difference));
    }
}
