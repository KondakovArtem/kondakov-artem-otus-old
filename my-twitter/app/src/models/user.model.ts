export interface IUserInfo extends IModifiableUserInfo {
  email: string;
  initial: string;
  avatar: string;
  registrationDate: Date;
  follows: string[];
}

export interface IModifiableUserInfo {
  about: string;
  birthDate?: Date;
  location: string;
  webSite: string;
  name: string;
}
