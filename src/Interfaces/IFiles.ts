interface _IFile {
  Name: string
  Type: string
  Size: number
  Quality: number
  URL: string
}

export interface IAvatar {
  _id?: string
  filename: string
  extension: string
  format: string
  resolution: string
  size: number
  url: string
}

export interface IAvatars {
  filename: string
  serverImageUrl: string
  databaseImageUrl: string
}

export interface IPictureMetadata {
  extension: string
  format: string
  resolution: string
  size: number
  url: string
}
export interface IPictureWithMetadata {
  filename: string
  fs_stats: IPictureMetadata
  db_stats: IPictureMetadata
  joint_stats: IPictureMetadata
}

export type IFile = Partial<_IFile>;