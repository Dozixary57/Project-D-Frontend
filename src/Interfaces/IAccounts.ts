export interface IAccount {
  _id: string;
  Username: string;
  Status?: string;
  Title?: ITitles;
  Email: string;
  DateOfBirth?: string;
  Privileges: IPrivileges[];
}

export interface IPrivileges {
  _id: string;
  Title: string;
}

export interface ITitles {
  _id: string;
  Title: string;
}