import { Injectable } from '@nestjs/common';
import { MemberService } from '../../repositories/member/member.service';

@Injectable()
export class UserService {
    constructor(
        private readonly memberService: MemberService
    ) { }

    async createMember(member) {
        return await this.memberService.save(member);
    }

    async updateMember(id, member) {
        return await this.memberService.update(id, member);
    }

    async getMember(id) {
        return await this.memberService.findOne(id);
    }

    async getMembers() {
        return await this.memberService.findAll();
    }

    async getMemberByEmail(email) {
        return await this.memberService.getMemberByEmail(email);
    }
}
