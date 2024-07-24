import { useSelector } from 'react-redux';
import { RootState } from '../ReduxStore/store';
import { useState, useEffect } from 'react';

export interface IErrorMessage {
  title: string;
  message: string;
  allowed: string;
}

export interface IAllowedFileProperties {
  Names: string[];
  Extensions: string[];
  Resolutions: string[];
  isValidName: (name: string) => void;
  isValidExtension: (extension: string) => void;
  isValidResolution: (resolution: string) => void;
  errorUploadToServer: () => void;
  errorUploadToDatabase: () => void;
  resetClientErrors: () => void;
  resetServerErrors: () => void;
  resetAllErrors: () => void;
  fileUploadErrors: Array<IErrorMessage | null>;
}

const avatarExtensions: string[] = ['png'];
const avatarResolutions: string[] = ['64x64'];
const iconExtensions: string[] = ['png'];
const iconResolutions: string[] = ['256x256'];
const coverExtensions: string[] = ['jpg'];
const coverResolutions: string[] = [];

export const useAllowedFileProperties = (variety: 'avatar' | 'icon' | 'cover'): IAllowedFileProperties => {
  const [fileUploadErrors, setFileUploadErrors] = useState<Array<IErrorMessage | null>>([]);
  const reduxFileUploadErrors = useSelector((state: RootState) => state.fileUploadErrors) as Array<IErrorMessage | null>;

  useEffect(() => {
    if (Array.isArray(reduxFileUploadErrors)) {
      setFileUploadErrors(reduxFileUploadErrors);
    }
  }, [reduxFileUploadErrors]);

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
    fileUploadErrors,

    isValidName: (name: string) => {
      setFileUploadErrors(prev => {
        if (!Array.isArray(prev)) return prev;

        const newErrors = [...prev];
        if (!name) {
          newErrors[0] = {
            title: 'Invalid name',
            message: 'name cannot be empty ',
            allowed: '(' + ['a-z', 'A-Z', '0-9'].join(', ') + ')',
          };
        } else if (!/^[A-Za-z0-9]+$/.test(name)) {
          newErrors[0] = {
            title: 'Invalid name',
            message: 'Name cannot contain special characters',
            allowed: ['a-z', 'A-Z', '0-9'].join(', '),
          };
        } else {
          newErrors[0] = null;
        }
        return newErrors;
      });
    },

    isValidExtension: (extension: string) => {
      setFileUploadErrors(prev => {
        if (!Array.isArray(prev)) return prev;

        const newErrors = [...prev];
        const ext = extension.split('.').at(-1) as string;
        if (!Extensions.includes(ext)) {
          newErrors[1] = {
            title: 'Invalid extension',
            message: ext + '. Allowed extensions: ',
            allowed: Extensions.join(', '),
          };
        } else {
          newErrors[1] = null;
        }
        return newErrors;
      });
    },

    isValidResolution: (resolution: string) => {
      setFileUploadErrors(prev => {
        if (!Array.isArray(prev)) return prev;

        const newErrors = [...prev];
        if (Resolutions.length > 0 && !Resolutions.includes(resolution)) {
          newErrors[2] = {
            title: 'Invalid resolution',
            message: resolution + '. Allowed resolutions: ',
            allowed: Resolutions.join(', '),
          };
        } else {
          newErrors[2] = null;
        }
        return newErrors;
      });
    },

    errorUploadToServer: () => {
      setFileUploadErrors(prev => {
        if (!Array.isArray(prev)) return prev;

        const newErrors = [...prev];
        newErrors[3] = {
          title: 'Error upload to server',
          message: 'Current file is already exist on server',
          allowed: '',
        };
        return newErrors;
      });
    },

    errorUploadToDatabase: () => {
      setFileUploadErrors(prev => {
        if (!Array.isArray(prev)) return prev;

        const newErrors = [...prev];
        newErrors[4] = {
          title: 'Error upload to database',
          message: 'Current file is already exist on database',
          allowed: '',
        };
        return newErrors;
      });
    },

    resetClientErrors: () => {
      setFileUploadErrors(prev => {
        if (!Array.isArray(prev)) return prev;

        const newErrors = [...prev];
        for (let i = 0; i < 3; i++) {
          newErrors[i] = null;
        }
        return newErrors;
      });
    },

    resetServerErrors: () => {
      setFileUploadErrors(prev => {
        if (!Array.isArray(prev)) return prev;

        const newErrors = [...prev];
        for (let i = 3; i < newErrors.length; i++) {
          newErrors[i] = null;
        }
        return newErrors;
      });
    },
    resetAllErrors: () => {
      setFileUploadErrors(prev => {
        if (!Array.isArray(prev)) return prev;

        const newErrors = [...prev];
        for (let i = 0; i < newErrors.length; i++) {
          newErrors[i] = null;
        }
        return newErrors;
      });
    },
  };
};