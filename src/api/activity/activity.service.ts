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
        let data:any;
        let activities = [];
        let timestamps = [];
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
        
        for (let item of items) {
            if (item.operation) data=1;
            else data=0;
            activities.push(data);
            let timestamp = item.createdAt;
            let startIndex = timestamp.search('20200') + 5;
            let time = await this.getString(timestamp.toString(),startIndex, startIndex+5);
            timestamps.push(time);
        }
        
        return {
            activities,
            timestamps            
        };
    }

    async getString(str, start, end) {
        return str.slice(start, end);
    }

    async getDifferenceInMinutes(dt2, dt1) {
        let difference = (dt2.getTime() - dt1.getTime()) / 1000;
        difference /= 60;
        return Math.abs(Math.round(difference));
    }
}
