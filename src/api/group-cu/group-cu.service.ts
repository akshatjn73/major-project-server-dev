import { Injectable } from '@nestjs/common';
import { GcuService } from '../../repositories/gcu/gcu.service';

@Injectable()
export class GroupCuService {
    constructor(
        private readonly gcuService: GcuService
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
}
