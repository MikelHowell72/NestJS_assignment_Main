import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService
  ) { }

  canActivate(context: ExecutionContext): boolean {
    const role = this.reflector.get('role', context.getHandler());
    if (!role) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization.split(' ')[1];
    const decoded = this.jwtService.verify(token)

    if (decoded.role !== role) {
      return false;
    }
    return true;
  }
}
