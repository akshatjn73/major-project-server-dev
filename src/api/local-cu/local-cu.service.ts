import { Injectable } from '@nestjs/common';
import { LcuService } from '../../repositories/lcu/lcu.service';
import { async } from 'rxjs/internal/scheduler/async';

@Injectable()
export class LocalCuService {
    constructor(
        private readonly lcuService: LcuService
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
}
