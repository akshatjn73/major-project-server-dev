import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActiveData } from './active-data.entity';

@Injectable()
export class ActiveDataService {
    constructor(
        @InjectRepository(ActiveData)
        private readonly repository: Repository<ActiveData>,
    ) { }

    async save(data): Promise<any> {
        const item = this.repository.create(data);
        return await this.repository.save(item);
    }

    async findOne(id): Promise<ActiveData> {
        return await this.repository.findOne(id);
    }

    async delete(id): Promise<any> {
        return await this.repository.delete({ id });
    }

    async getRepository(): Promise<Repository<ActiveData>> {
        return this.repository;
    }
}
