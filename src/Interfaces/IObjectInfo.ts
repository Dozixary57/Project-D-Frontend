export interface IObjectInfo {
  _id: string;
  Category: string;
  Title: string;
  Description: string;
  Acquisition: any;
  Lore: string;
  Classification: {
    Type: string;
    Subclass: string;
  }
  Characteristics: Record<string, string>[];
  IconURL: string;
  ModelURL: string;
  Media: {
    Sounds: IMediaUnit[];
    Videos: IMediaUnit[];
    Images: IMediaUnit[];
  }
}

export interface IMediaUnit {
  Title: string;
  Description: string;
  Url: string;
}

