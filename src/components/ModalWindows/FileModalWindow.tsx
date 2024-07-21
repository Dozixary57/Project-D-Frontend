import { useEffect, useRef, useState } from 'react';
import "./FileModalWindow.scss"
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { FileExtensionFormatter, FileSizeFormatter, InputValueToTimestamp, TimestampToInputValue } from '../../tools/DataFormatters';
import FileService from '../../backend/services/fileService';
import { AllowedFileProperties, errorMessages, IErrorMessage } from '../../AllowedValues/AllowedFileProperties';

const FileModalWindow = () => {
  const { attachedFile } = useOutletContext<{ attachedFile: File | null }>();
  const [inFormAttachedFile, setInFormAttachedFile] = useState<File | null>(attachedFile);
  const [imageMetadata, setImageMetadata] = useState<{ width: number, height: number, url: string }>({ width: 0, height: 0, url: '' });

  const [dataIsModified, setDataIsModified] = useState<boolean>(false);

  const [isUploadToServer, setIsUploadToServer] = useState<boolean>(true);
  const [isUploadToDatabase, setIsUploadToDatabase] = useState<boolean>(true);

  const [isUploadAvailable, setIsUploadAvailable] = useState<boolean>(false);

  const [validationMessages, setValidationMessages] = useState<Array<IErrorMessage | null>>([]);

  const thisWindowRef = useRef<HTMLDivElement>(null);
  const ParamId = useParams<{ avatarId: string }>().avatarId
  const navigate = useNavigate();

  useEffect(() => {
    thisWindowRef.current?.focus();

    if (attachedFile) {
      const img = new Image();
      img.onload = function () {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setImageMetadata({
              width: img.width,
              height: img.height,
              url: reader.result as string
            })
          }
        };
        reader.readAsDataURL(attachedFile);
      };
      img.src = URL.createObjectURL(attachedFile);
    }
    else {
      navigate('../');
    }

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'initial';
      // AllowedFileProperties.isValidReset();
    };
  }, [navigate, ParamId]);

  useEffect(() => {
    setDataIsModified(attachedFile?.name !== inFormAttachedFile?.name ? true : false);
  }, [inFormAttachedFile]);

  useEffect(() => {
    setInFormAttachedFile(attachedFile);
  }, [attachedFile]);

  useEffect(() => {
    if (inFormAttachedFile)
      AllowedFileProperties.isValidName(inFormAttachedFile?.name.split('.').at(0) as string, setValidationMessages);

    if (attachedFile)
      AllowedFileProperties.isValidExtension(attachedFile?.name, setValidationMessages);

    if (imageMetadata.width && imageMetadata.height)
      AllowedFileProperties.isValidResolution(`${imageMetadata.width}x${imageMetadata.height}`, setValidationMessages);
  }, [attachedFile?.name, imageMetadata, inFormAttachedFile?.name]);

  useEffect(() => {
    console.log(validationMessages);
    console.log(isUploadAvailable);
    if (validationMessages.filter(message => message !== null).length > 0)
      setIsUploadAvailable(false);
    else
      setIsUploadAvailable(true);
  }, [validationMessages]);

  const resetName = () => {
    setInFormAttachedFile(attachedFile);
  };

  const uploadFile = () => {
    if (inFormAttachedFile) {
      const formData = new FormData();
      formData.append('file', inFormAttachedFile);
      FileService.uploadAvatar(formData);
    }
  };

  return (
    <>
      <div className="file-modal-overlay" onClick={() => navigate('../')}>
        <hr />
        <div ref={thisWindowRef} className="modal-content"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              uploadFile();
            }
            if (event.key === 'Escape') {
              navigate('../');
            }
          }}
          tabIndex={0}
        >
          <div className="content-header">
            <h2>File upload</h2>
          </div>

          <div className='main-content'>
            <div>
              {imageMetadata.url.length > 0 &&
                <img src={imageMetadata.url} />
              }
            </div>

            {<div>
              <p>ID</p>
              <input
                type="text"
                value='none'
                placeholder="ID"
                disabled
              />
            </div>}
            <div>
              <div>
                <p>Name</p>
                <button
                  onClick={resetName}
                  disabled={!dataIsModified}
                >
                  Reset
                </button>
              </div>
              <input
                type="text"
                value={inFormAttachedFile?.name.split('.')[0] || ''}
                onChange={(e) => {
                  setInFormAttachedFile(new File([attachedFile as File], e.target.value + inFormAttachedFile?.name.substring(inFormAttachedFile?.name.indexOf('.')), { type: inFormAttachedFile?.type, lastModified: inFormAttachedFile?.lastModified }));
                }}
                className='activeInput'
                placeholder="File name"
              />
            </div>
            <div>
              <p>Extension</p>
              <input
                type="text"
                value={inFormAttachedFile?.name.substring(inFormAttachedFile?.name.indexOf('.')) || ''}
                placeholder="File ext"
                readOnly
              />
            </div>
            <div>
              <p>Format</p>
              <input
                type="text"
                value={inFormAttachedFile?.type !== undefined && FileExtensionFormatter(inFormAttachedFile?.type) || ''}
                placeholder="File format"
                readOnly
              />
            </div>
            <div>
              <p>Resolution</p>
              <input
                type="text"
                value={imageMetadata?.width + ' x ' + imageMetadata?.height || ''}
                placeholder="File res"
                readOnly
              />
            </div>
            <div>
              <p>Size</p>
              <input
                type="text"
                value={inFormAttachedFile?.size !== undefined && FileSizeFormatter(inFormAttachedFile?.size) || ''}
                placeholder="File size"
                readOnly
              />
            </div>
          </div>

          <div className="checkbox-buttons">
            <button
              onClick={(e) => setIsUploadToServer(!isUploadToServer)}
              className={isUploadToServer ? 'is-checked' : 'is-not-checked'}
            >
              <input
                type='checkbox'
                checked={isUploadToServer}
                id="serverCheckbox"
                onClick={() => setIsUploadToServer(!isUploadToServer)}
              />
              <label
                htmlFor="serverCheckbox"
                onClick={(e) => e.preventDefault()}
              ></label>
              <p>Server</p>
            </button>
            <button
              onClick={() => setIsUploadToDatabase(!isUploadToDatabase)}
              className={isUploadToDatabase ? 'is-checked' : 'is-not-checked'}
            >
              <input
                type='checkbox'
                checked={isUploadToDatabase}
                onChange={() => setIsUploadToDatabase(!isUploadToDatabase)}
                id="databaseCheckbox"
              />
              <label
                htmlFor="databaseCheckbox"
                onClick={(e) => e.preventDefault()}
              ></label>
              <p>Database</p>
            </button>
          </div>

          {!isUploadAvailable && <div className='validation-error-messages'>
            <p>Validation errors:</p>
            <ul>
              {
                validationMessages
                  .filter(message => message !== null)
                  .map((message) =>
                    <li key={message?.title}>{message?.title}: {message?.message} <span>{message?.allowed}</span>.</li>
                  )}
            </ul>
          </div>}

          <div className="action-buttons">
            <button
              onClick={uploadFile}
              disabled={!((isUploadToServer || isUploadToDatabase) && isUploadAvailable)}
            >
              Upload
            </button>
            <button onClick={() => { navigate('../'); }}>
              Close
            </button>
          </div>
        </div>
        <hr />
      </div>
    </>
  );
};

export default FileModalWindow;