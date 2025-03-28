import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './decorators/roles.decorator';
import { ERole } from './enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    return true;
    // Get the required roles from the metadata
    const requiredRoles = this.reflector.getAllAndOverride<ERole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true; // no roles required, allow access
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Make sure the user exists and has a roles property
    if (!user || !user.roles) {
      return false;
    }

    // Check if the user has at least one of the required roles
    return requiredRoles.some((role) => user.roles.includes(role));
  }
}
