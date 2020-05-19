interface ButtonProps {
  title: string;
  type?: string;
}

export interface ButtonActionProps extends ButtonProps {
  key: string;
}

export interface IModalDialog {
  uid?: string;
  title?: string;
  buttons?: ButtonActionProps[];
  action?: DialogAction;
  data: any;
}

export interface IDialogButtonAction {
  key: string;
  dialog: IModalDialog;
}

export enum DialogAction {
  DELETE_POST = 'deletePost',
}
