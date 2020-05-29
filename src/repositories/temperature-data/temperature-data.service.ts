import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Temperature } from './temperature-data.entity';

@Injectable()
export class TemperatureDataService {
    constructor(
        @InjectRepository(Temperature)
        private readonly repository: Repository<Temperature>,
    ) { }

    async save(data): Promise<any> {
        const item = this.repository.create(data);
        return await this.repository.save(item);
    }

    async findOne(id): Promise<Temperature> {
        return await this.repository.findOne(id);
    }

    async delete(id): Promise<any> {
        return await this.repository.delete({ id });
    }

    async getRepository(): Promise<Repository<Temperature>> {
        return this.repository;
    }
}
