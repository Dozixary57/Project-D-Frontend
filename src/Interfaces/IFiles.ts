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

interface IImageMetadata {
  extension: string
  format: string
  resolution: string
  size: number
  url: string
}
export interface IAvatarsWithMetadata {
  filename: string
  fs_stats: IImageMetadata
  db_stats: IImageMetadata
  joint_stats: IImageMetadata
}

export type IFile = Partial<_IFile>;