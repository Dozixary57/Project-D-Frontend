export interface IAccount {
  _id: string;
  Username: string;
  AccountStatus: string;
  Status?: IStatus;
  Email: string;
  DateOfBirth: string;
  Privileges: IPrivileges[];
}

export interface IPrivileges {
  _id: string;
  Title: string;
}

export interface IStatus {
  _id: string;
  Title: string;
}