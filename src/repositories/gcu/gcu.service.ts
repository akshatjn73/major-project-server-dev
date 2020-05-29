import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GCU } from './gcu.entity'

@Injectable()
export class GcuService {
    constructor(
        @InjectRepository(GCU)
        private readonly repository: Repository<GCU>,
    ) { }

    async save(data): Promise<any> {
        const item = this.repository.create(data);
        return await this.repository.save(item);
    }

    async findOne(id): Promise<GCU> {
        return await this.repository.findOne(id);
    }

    async delete(id): Promise<any> {
        return await this.repository.delete({ id });
    }

    async getRepository(): Promise<Repository<GCU>> {
        return this.repository;
    }
}
