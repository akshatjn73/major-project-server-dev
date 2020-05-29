import { Injectable, Logger } from '@nestjs/common';
import { Member } from './member.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as Joi from 'joi';
import { ConfigService } from './../../config/config.service';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private readonly repository: Repository<Member>,
    private readonly configService: ConfigService,
  ) { }

  private getMemberSchema() {

    const schema = Joi.object().keys({
      id: Joi.string().default(),
      name: Joi.string(),
      email: Joi.string().email(),
      active: Joi.boolean(),
      createdAt: Joi.date(),
      modifiedAt: Joi.date(),
      modifiedBy: Joi.string(),
    });
    return schema.requiredKeys('name', 'email');
  }

  async save(data): Promise<any> {
    data = Joi.validate(data, this.getMemberSchema());
    const item = this.repository.create(data.value);
    return await this.repository.save(item);
  }

  async findOne(id): Promise<Member> {
    return await this.repository.findOne(id);
  }

  async findAll(): Promise<Member[]> {
    return await this.repository.find();
  }

  async update(id, data): Promise<any> {
    return await this.repository.update(id, data);
  }

  async delete(id): Promise<any> {
    return await this.repository.delete({ id });
  }

  async getRepository(): Promise<Repository<Member>> {
    return this.repository;
  }

  async getMemberByEmail(email): Promise<any> {
    return await this.repository.findOne({
      where: {
        email: email,
      }
    });
  }
}