import { Injectable } from '@nestjs/common';
import { SmartSwitchService } from '../../repositories/smart-switch/smart-switch.service';

@Injectable()
export class SmtSwitchService {
    constructor(
        private readonly smartSwitchService: SmartSwitchService
    ) { }

    async createSmartSwitch(data) {
        return await this.smartSwitchService.save(data);
    }

    async updateSmartSwitch(id, data) {
        return await this.smartSwitchService.update(id, data);
    }

    async getAllSmartSwitch():Promise<any> {
        return await this.smartSwitchService.findAll();
    }

    async getSmartSwitch(id) {
        return await this.smartSwitchService.findOne(id);
    } 

    async deleteSmartSwitch(id) {
        return await this.smartSwitchService.delete(id);
    }
}
