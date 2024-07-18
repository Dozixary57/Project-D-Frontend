interface _IFile {
  Name: string
  Type: string
  Size: number
  Quality: number
  URL: string
}

export type IFile = Partial<_IFile>;