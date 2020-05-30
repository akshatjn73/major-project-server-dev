import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SmartSwitch } from './smart-switch.entity';

@Injectable()
export class SmartSwitchService {
    constructor(
        @InjectRepository(SmartSwitch)
        private readonly repository: Repository<SmartSwitch>,
    ) { }

    async save(data): Promise<any> {
        const item = this.repository.create(data);
        return await this.repository.save(item);
    }

    async findOne(id): Promise<SmartSwitch> {
        return await this.repository.findOne(id);
    }

    async findAll(): Promise<SmartSwitch[]> {
        return await this.repository.find();
      }

    async delete(id): Promise<any> {
        return await this.repository.delete({ id });
    }

    async update(id, data): Promise<any> {
        return await this.repository.update(id, data);
    }
    
    async getRepository(): Promise<Repository<SmartSwitch>> {
        return this.repository;
    }
}
