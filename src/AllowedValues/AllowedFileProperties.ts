export interface IErrorMessage {
  title: string;
  message: string;
  allowed: string;
}

export interface IAllowedFileProperties {
  Names: string[];
  Extensions: string[];
  Resolutions: string[];
  isValidName: (name: string, setErrorMessages: React.Dispatch<React.SetStateAction<Array<IErrorMessage | null>>>) => void;
  isValidExtension: (extension: string, setErrorMessages: React.Dispatch<React.SetStateAction<Array<IErrorMessage | null>>>) => void;
  isValidResolution: (resolution: string, setErrorMessages: React.Dispatch<React.SetStateAction<Array<IErrorMessage | null>>>) => void;
  isValidReset: (setErrorMessages: React.Dispatch<React.SetStateAction<Array<IErrorMessage | null>>>) => void;
}

export const errorMessages: Array<IErrorMessage | null> = [];

export const AllowedFileProperties: IAllowedFileProperties = {
  Names: ['a-z', 'A-Z', '0-9'],
  Extensions: ['png'],
  Resolutions: ['128x128', '256x256', '512x512', '1024x1024'],

  isValidName: (name, setErrorMessages) => {
    setErrorMessages(prev => {
      const newMessages = [...prev];
      if (!name) {
        newMessages[0] = {
          title: 'Invalid name',
          message: 'Name cannot be empty',
          allowed: AllowedFileProperties.Names.join(', '),
        };
      } else if (!/^[A-Za-z0-9]+$/.test(name)) {
        newMessages[0] = {
          title: 'Invalid name',
          message: 'Name cannot contain special characters',
          allowed: AllowedFileProperties.Names.join(', '),
        };
      } else {
        newMessages[0] = null;
      }
      return newMessages;
    });
  },
  isValidExtension: (extension, setErrorMessages) => {
    setErrorMessages(prev => {
      const newMessages = [...prev];
      if (!AllowedFileProperties.Extensions.includes(extension.split('.').at(-1) as string)) {
        newMessages[1] = {
          title: 'Invalid extension',
          message: extension.split('.').at(-1) + '. Allowed extensions: ',
          allowed: AllowedFileProperties.Extensions.join(', '),
        };
      } else {
        newMessages[1] = null;
      }
      return newMessages;
    });
  },
  isValidResolution: (resolution, setErrorMessages) => {
    setErrorMessages(prev => {
      const newMessages = [...prev];
      if (!AllowedFileProperties.Resolutions.includes(resolution)) {
        newMessages[2] = {
          title: 'Invalid resolution',
          message: resolution + '. Allowed resolutions: ',
          allowed: AllowedFileProperties.Resolutions.join(', '),
        };
      } else {
        newMessages[2] = null;
      }
      return newMessages;
    });
  },
  isValidReset: (setErrorMessages) => {
    setErrorMessages([null, null, null]);
  },
};