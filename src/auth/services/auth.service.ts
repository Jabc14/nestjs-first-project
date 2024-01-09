import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(email: string, pws: string) {
    const user = await this.usersService.findByEmail(email);
    const matched = await bcrypt.compare(pws, user.password);

    if (user && matched) return user;
    return null;
  }
}
