import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LCU } from './lcu.entity'

@Injectable()
export class LcuService {
    constructor(
        @InjectRepository(LCU)
        private readonly repository: Repository<LCU>,
    ) { }

    async save(data): Promise<any> {
        const item = this.repository.create(data);
        return await this.repository.save(item);
    }

    async findOne(id): Promise<LCU> {
        return await this.repository.findOne(id, 
            {
                relations: ['switches'],
            });
    }

    async delete(id): Promise<any> {
        return await this.repository.delete({ id });
    }

    async getRepository(): Promise<Repository<LCU>> {
        return this.repository;
    }
}
