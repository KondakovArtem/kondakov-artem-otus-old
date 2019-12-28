export interface IGuestData {
  name: string;
  uid: string;
  withPartner: boolean;
}

export interface IGuest extends IGuestData {
  uid: string;
}

export interface IGuestMutateSubscription {
  added: (guest: IGuest) => void;
  changed: (guest: IGuest) => void;
  removed: (guest: IGuest) => void;
}
