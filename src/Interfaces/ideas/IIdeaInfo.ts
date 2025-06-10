export interface IIdeaInfo {
  _id: string;
  Title: string;
  Annotation?: string;
  Description?: string;
  Author?: string;
  VoteValue?: number;
  VoteAmount?: number;

  CurrentUserVote?: number;
  // tags: string[];
}