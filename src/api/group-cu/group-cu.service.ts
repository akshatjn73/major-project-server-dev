import { Injectable } from '@nestjs/common';
import { GcuService } from '../../repositories/gcu/gcu.service';
// import { SmartSwitchService } from '../../repositories/smart-switch/smart-switch.service';
import { LcuService } from '../../repositories/lcu/lcu.service';
import { TemperatureDataService } from '../../repositories/temperature-data/temperature-data.service';


@Injectable()
export class GroupCuService {
    constructor(
        private readonly gcuService: GcuService,
        // private readonly smartSwitchService: SmartSwitchService,
        private readonly lcuService: LcuService,
        private readonly temperatureService: TemperatureDataService
    ) { }

    async createGcu(data) {
        return await this.gcuService.save(data);
    }

    async getGcu(id) {
        return await this.gcuService.findOne(id);
    }

    async deleteGcu(id) {
        return await this.gcuService.delete(id);
    }

    async getAllGcu() {
        let repository = await this.gcuService.getRepository();
        let items:any
        items = await repository
            .createQueryBuilder('gcu')
            .leftJoinAndSelect('gcu.lcu', 'lcu')
            .getMany()

        return items;
    }

    async getGcuStats(gcu) {
        let sum: number = 0;
        let lcu: any;
        let temperatures = [];
        let totalPower: number = 0;
        let activeSwitchCount: number = 0;
        let switchCount: number = 0;
        for (let localCu of gcu.lcu ) {
            lcu = await this.lcuService.findOne(localCu.id)
            let switches = lcu.switches;
            switchCount = switches.length;
            for (let smartSwitch of switches) {
                sum+=smartSwitch.time;
                let highestTemp = await this.temperatureService.getHighestTemperatures(smartSwitch.id);
                temperatures.push(highestTemp);
                let power = smartSwitch.time*smartSwitch.powerRating;
                totalPower+=power;
                if (smartSwitch.state) {
                    activeSwitchCount+=1
                }
            }
        }
        const highestTemperature = Math.max(...temperatures);
        return {
            sum,
            highestTemperature,
            totalPower,
            switchCount,
            activeSwitchCount
        };
    }
}
