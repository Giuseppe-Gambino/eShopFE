export interface iUser {
  id: number;
  username: string;
  password: string;
  email: string;
  nome: string;
  cognome: string;
  avatar?: string;
  roles: Role[];
}

export enum Role {
  ROLE_USER = 'ROLE_USER',
  ROLE_ADMIN = 'ROLE_ADMIN',
  ROLE_SELLER = 'ROLE_SELLER',
}

export interface iRoleUpdateDTO {
  idUser: number;
  rolesToAdd: Role[];
  rolesToRemove: Role[];
}
