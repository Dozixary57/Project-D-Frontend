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

export type IFile = Partial<_IFile>;