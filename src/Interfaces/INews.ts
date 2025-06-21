export interface INews {
  _id: string;
  Title: string;
  Type?: string;
  Annotation?: string;
  Content?: {
  }
  CoverURL?: string;
  Author?: string;
  PublicationDate?: string;
}

export interface INewsType {
  _id: string;
  Title: string;
  Description?: string;
  Sequence?: number;
}