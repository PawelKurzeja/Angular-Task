import { Identifiable } from '../../core/models/object.models';
import { UserModel } from '../../models/user.model';

export interface UserBaseDTO {
  name: string;
  email: string;
}

export interface UserReadDTO extends UserBaseDTO, Identifiable<number> {}

export const fromUserReadDTO = ({ name, email, id }: UserReadDTO): UserModel => ({
  name,
  email,
  id,
});
