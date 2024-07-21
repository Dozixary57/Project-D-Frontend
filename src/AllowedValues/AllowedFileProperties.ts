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

const avatarExtensions: string[] = ['png'];
const avatarResolutions: string[] = ['256x256'];
const iconExtensions: string[] = ['png'];
const iconResolutions: string[] = ['256x256'];
const coverExtensions: string[] = ['jpg'];
const coverResolutions: string[] = [];

export const errorMessages: Array<IErrorMessage | null> = [];

export const AllowedFileProperties = (variety: 'avatar' | 'icon' | 'cover'): IAllowedFileProperties => {
  let Extensions: string[];
  let Resolutions: string[];

  switch (variety) {
    case 'avatar':
      Extensions = avatarExtensions;
      Resolutions = avatarResolutions;
      break;
    case 'icon':
      Extensions = iconExtensions;
      Resolutions = iconResolutions;
      break;
    case 'cover':
      Extensions = coverExtensions;
      Resolutions = coverResolutions;
      break;
    default:
      Extensions = [];
      Resolutions = [];
  }

  return {
    Names: ['a-z', 'A-Z', '0-9'],
    Extensions,
    Resolutions,

    isValidName: (name: string, setErrorMessages: React.Dispatch<React.SetStateAction<Array<IErrorMessage | null>>>) => {
      setErrorMessages((prev: Array<IErrorMessage | null>) => {
        const newMessages = [...prev];
        if (!name) {
          newMessages[0] = {
            title: 'Invalid name',
            message: 'Name cannot be empty',
            allowed: AllowedFileProperties(variety).Names.join(', '),
          };
        } else if (!/^[A-Za-z0-9]+$/.test(name)) {
          newMessages[0] = {
            title: 'Invalid name',
            message: 'Name cannot contain special characters',
            allowed: AllowedFileProperties(variety).Names.join(', '),
          };
        } else {
          newMessages[0] = null;
        }
        return newMessages;
      });
    },
    isValidExtension: (extension: string, setErrorMessages: React.Dispatch<React.SetStateAction<Array<IErrorMessage | null>>>) => {
      setErrorMessages((prev: Array<IErrorMessage | null>) => {
        const newMessages = [...prev];
        if (!AllowedFileProperties(variety).Extensions.includes(extension.split('.').at(-1) as string)) {
          newMessages[1] = {
            title: 'Invalid extension',
            message: extension.split('.').at(-1) + '. Allowed extensions: ',
            allowed: AllowedFileProperties(variety).Extensions.join(', '),
          };
        } else {
          newMessages[1] = null;
        }
        return newMessages;
      });
    },
    isValidResolution: (resolution: string, setErrorMessages: React.Dispatch<React.SetStateAction<Array<IErrorMessage | null>>>) => {
      setErrorMessages((prev: Array<IErrorMessage | null>) => {
        const newMessages = [...prev];
        if (AllowedFileProperties(variety).Resolutions.length > 0 && !AllowedFileProperties(variety).Resolutions.includes(resolution)) {
          newMessages[2] = {
            title: 'Invalid resolution',
            message: resolution + '. Allowed resolutions: ',
            allowed: AllowedFileProperties(variety).Resolutions.join(', '),
          };
        } else {
          newMessages[2] = null;
        }
        return newMessages;
      });
    },
    isValidReset: (setErrorMessages: React.Dispatch<React.SetStateAction<Array<IErrorMessage | null>>>) => {
      setErrorMessages([null, null, null]);
    },
  };
};