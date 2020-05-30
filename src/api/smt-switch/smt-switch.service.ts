import { Injectable } from '@nestjs/common';
import { SmartSwitchService } from '../../repositories/smart-switch/smart-switch.service';

@Injectable()
export class SmtSwitchService {
    constructor(
        private readonly smartSwitchService: SmartSwitchService
    ) { }

    async createSmartSwitch(data) {
        await this.smartSwitchService.save(data);
    }

    async updateSmartSwitch(id, data) {
        await this.smartSwitchService.update(id, data);
    }

    async getAllSmartSwitch():Promise<any> {
        await this.smartSwitchService.findAll();
    }

    async getSmartSwitch(id) {
        await this.smartSwitchService.findOne(id);
    } 

    async deleteSmartSwitch(id) {
        await this.smartSwitchService.delete(id);
    }
}
