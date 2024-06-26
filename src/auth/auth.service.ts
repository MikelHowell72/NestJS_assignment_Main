import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';


@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async login(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        if (user?.password !== pass) {
            throw new UnauthorizedException();
        }

        const payload = { sub: user.userId, username: user.username, role: user.role };
        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }
}
