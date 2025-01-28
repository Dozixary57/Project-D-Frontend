export interface IMediaUnit {
  Title: string;
  Description: string;
  Url: string;
}

export interface IObject {
  _id: string;
  Title: string;
  Description: {
    General: string;
    Authorial: string;
  };
  Lore: string;
  Classification: {
    Type: string;
    Subclass: string;
  }
  IconURL: string;
  ParallaxURL: string;
  ModelURL: string;
  Media: {
    Sounds: IMediaUnit[];
    Videos: IMediaUnit[];
    Images: IMediaUnit[];
  }
}