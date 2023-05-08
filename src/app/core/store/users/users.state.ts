import { UserModel } from '../../../models/user.model';
import { Readiness } from '../../models/readiness.model';

export interface UsersState {
  users: {
    records: UserModel[];
    readiness: Readiness;
  };
  editUser: UserModel | null;
}

export const initialUsersState: UsersState = {
  users: {
    records: [],
    readiness: Readiness.Initial,
  },
  editUser: null,
};
