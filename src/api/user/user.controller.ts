import { Controller, Post, Res, Body, HttpStatus, Logger, Patch, Param, UseGuards, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';


@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }

    @Post()
    async addUser(@Res() res, @Body() body) {
        try {
            const member = await this.userService.createMember(body);
            return res.status(HttpStatus.OK).json({
                message: 'Member created successfully',
                member,
            });
        } catch (err) {
            Logger.error(err);
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: err.message,
            });
        }
    }

    @Get()
    async getAllUsers(@Res() res) {
        try {
            const members = await this.userService.getMembers();
            if (members) {
                return res.status(HttpStatus.OK).json({members});
            }    
        } catch (error) {
            Logger.error(error);
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: error.message,
            });
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getUser(@Res() res, @Param('id') id) {
        try {
            const member = await this.userService.getMember(id);
            return res.status(HttpStatus.OK).json({
                message: 'User fetched successfully',
                member
            });     
        } catch (error) {
            Logger.error(error);
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: error.message,
            });
        }
    }
}


    // @UseGuards(JwtAuthGuard)
    // @Patch('/member/:id')
    // async deactivateMember(@Res() res, @Param('id') id) {
    //     try {
    //         const member = await this.adminService.deactivateMember(id);

    //         return res.status(HttpStatus.OK).json({
    //             message: 'Member deactivated successfully',
    //             member
    //         })
    //     } catch (err) {
    //         Logger.error(err);
    //         return res.status(HttpStatus.BAD_REQUEST).json({
    //             message: err.message,
    //         });
    //     }
    // }

