import { Injectable, Logger } from '@nestjs/common';
import { LcuService } from '../../repositories/lcu/lcu.service';
import { async } from 'rxjs/internal/scheduler/async';
import { TemperatureDataService } from '../../repositories/temperature-data/temperature-data.service';

@Injectable()
export class LocalCuService {
    constructor(
        private readonly lcuService: LcuService,
        private readonly temperatureService: TemperatureDataService,
    ) { }

    async createLcu(data) {
        return await this.lcuService.save(data);
    }

    async getLcu(id) {
        return await this.lcuService.findOne(id);
    }

    async deleteLcu(id) {
        return await this.lcuService.delete(id);
    }

    async getAllLcu() {
        let repository = await this.lcuService.getRepository();
        let items:any
        items = await repository
            .createQueryBuilder('lcu')
            .leftJoinAndSelect('lcu.switches', 'switches')
            .getMany()

        return items;
    }

    async getAllLcuStats(lcus) {
        let switchPower: number = 0;
        let powers = [];
        let names = []
        for (let id of lcus) {
            let lcu = await this.lcuService.findOne(id);
            names.push(lcu.name);
            for (let smartSwitch of lcu.switches) {
                let power = smartSwitch.time*smartSwitch.powerRating;
                switchPower+=power;
            }
            powers.push(switchPower);
            switchPower=0;         
        }
        return {
            powers,
            names
        }
    }

    async getLcuStats(lcu) {
        let sum: number = 0;
        let temperatures = []
        let totalPower: number = 0;
        let activeSwitchCount: number = 0;
        let switches = lcu.switches;
        const switchCount: number = switches.length;
        for (let smartSwitch of switches) {
            sum+=smartSwitch.time;
            let highestTemp = await this.temperatureService.getHighestTemperatures(smartSwitch.id);
            temperatures.push(highestTemp.maxTemp);
            let power = smartSwitch.time*smartSwitch.powerRating;
            totalPower+=power;
            if (smartSwitch.state) {
                activeSwitchCount+=1
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

    async getHighestTemperatures(lcus) {
        let temperatures = [];
        let timestamps = [];
        let times = [];
        let time:any;
        let names = []
        let data = []
        for (let id of lcus) {
            let lcu = await this.getLcu(id);
            names.push(lcu.name);
            for (let smartSwitch of lcu.switches) {
                let highestTemp = await this.temperatureService.getHighestTemperatures(smartSwitch.id);
                temperatures.push(highestTemp.maxTemp);
                if (highestTemp.createdAt == null) {
                    time = highestTemp.createdAt;
                } else {
                    let timeString = highestTemp.createdAt.toString();
                    let startIndex = timeString.search('2020 ') + 5;
                    time = await this.getString(timeString,startIndex, startIndex+5);
                }
                timestamps.push(time);
            }
            let temperatureData = {
                data: temperatures,
                label: lcu.name
            };
            data.push(temperatureData);
            temperatures = [];
        }
        Logger.log(timestamps)
        let timeData = {
            timestamp: timestamps
        }
        Logger.log(timeData)
        times.push(timeData)
        return {
            data,
            times
        }
    }

    async getString(str, start, end) {
        return str.slice(start, end);
    }
}
