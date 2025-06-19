import { User } from '../../user/model/user.entity';

export type SafeUser = Omit<User, 'password'>;
