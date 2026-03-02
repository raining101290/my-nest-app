import { UserRole } from '../user.entity';

export class UserResponseDto {
  id: number;
  email: string;
  username: string;
  phone: string;
  role: UserRole;
}
