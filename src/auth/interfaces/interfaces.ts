import { Request } from 'express';
import { Role } from 'src/user/user.entity';

export interface JwtPayload {
  sub: string;
  email: string;
  roles: Role[];
}

export interface RequestWithUser extends Request {
  user: {
    userId: string;
    email: string;
    roles: Role[];
  };
}
