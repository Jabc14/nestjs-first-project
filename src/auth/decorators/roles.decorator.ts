import { SetMetadata } from '@nestjs/common';
import { Role } from '../models/roles.model';
//isPublic se encuentra en SetMetadata de app.controller
export const ROLES_KEY = 'roles';

export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
