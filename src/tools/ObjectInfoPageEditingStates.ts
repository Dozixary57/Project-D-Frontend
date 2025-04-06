export interface IObjectInfoPageEditingStateFlags {
  title: boolean;
  category: boolean;
  description: boolean;
  acquisition: boolean;
  usedFor: boolean;
  story: boolean;
  media: boolean;
  visualData: boolean;
  definition: boolean;
}

export class ObjectInfoPageEditingStates implements IObjectInfoPageEditingStateFlags {
  title = false;
  category = false;
  description = false;
  acquisition = false;
  usedFor = false;
  story = false;
  media = false;
  visualData = false;
  definition = false;
}