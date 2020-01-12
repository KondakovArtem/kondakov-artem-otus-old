export interface IGuestData {
  name: string;
  uid: string;
  withPartner: boolean;
  details: string;
}

export interface IGuest extends IGuestData {
  uid: string;
}

export interface IGuestMeta extends IGuestData {
  withDetails?: boolean;
}

export interface IGuestMutateSubscription {
  added: (guest: IGuest) => void;
  changed: (guest: IGuest) => void;
  removed: (guest: IGuest) => void;
}
