import { useEffect, useRef, useState } from 'react';
import "./FileModalWindow.scss"
import { useLocation, useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { FileExtensionFormatter, FileSizeFormatter } from '../../tools/DataFormatters';
import FileService from '../../backend/services/fileService';
import { useAllowedFileProperties } from '../../AllowedValues/AllowedFileProperties';
import LoadingImage from '../LoadingImage/LoadingImage';

const UploadFileModalWindow = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [successfulMessage, setSuccessfulMessage] = useState<boolean>(false);

  const { attachedFile } = useOutletContext<{ attachedFile: File | null }>();
  const [inFormAttachedFile, setInFormAttachedFile] = useState<File | null>(attachedFile);
  const [imageMetadata, setImageMetadata] = useState<{ width: number, height: number, url: string }>({ width: 0, height: 0, url: '' });

  const [serverImageUrl, setServerImageUrl] = useState<string>('');
  const [databaseImageUrl, setDatabaseImageUrl] = useState<string>('');

  const allowedFileProps = useAllowedFileProperties('avatar');
  const [uploadErrors, setUploadErrors] = useState<boolean>(true);

  const thisWindowRef = useRef<HTMLDivElement>(null);
  const ParamId = useParams<{ avatarId: string }>().avatarId
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    thisWindowRef.current?.focus();

    if (attachedFile && location.pathname.includes('Upload')) {
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

      setIsLoading(false);
    } else {
      navigate('..');
    }

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'initial';
      allowedFileProps.resetServerErrors();
    };
  }, [navigate, ParamId]);

  useEffect(() => {
    setInFormAttachedFile(attachedFile);
  }, [attachedFile]);

  useEffect(() => {
    if (allowedFileProps.fileUploadErrors.filter(message => message !== null).length > 0)
      setUploadErrors(true);
    else
      setUploadErrors(false);
  }, [allowedFileProps.fileUploadErrors]);

  useEffect(() => {
    allowedFileProps.resetAllErrors();
    setServerImageUrl('');
    setDatabaseImageUrl('');

    if (inFormAttachedFile)
      allowedFileProps.isValidName(inFormAttachedFile?.name.split('.').at(0) as string);

    if (attachedFile)
      allowedFileProps.isValidExtension(attachedFile?.name);

    if (imageMetadata.width && imageMetadata.height)
      allowedFileProps.isValidResolution(`${imageMetadata.width}x${imageMetadata.height}`);

  }, [attachedFile?.name, imageMetadata, inFormAttachedFile?.name]);

  const resetName = () => {
    setInFormAttachedFile(attachedFile);
  };

  const uploadFile = () => {
    setIsLoading(true);
    allowedFileProps.resetServerErrors();
    if (inFormAttachedFile) {
      const formData = new FormData();
      formData.append('file', inFormAttachedFile);
      setServerImageUrl('');
      setDatabaseImageUrl('');
      FileService.uploadAvatar(formData).then((res) => {
        // console.log(res);
        if (res) {
          if (res.errorUploadToServer) {
            allowedFileProps.errorUploadToServer();
          }
          if (res.errorUploadToDatabase) {
            allowedFileProps.errorUploadToDatabase();
          }
          if (res.serverImageUrl) {
            setServerImageUrl(res.serverImageUrl + `?timestamp=${new Date().getTime()}`);
          }
          if (res.databaseImageUrl) {
            setDatabaseImageUrl(res.databaseImageUrl + `?timestamp=${new Date().getTime()}`);
          }
          if (res.errorUploadToServer !== true && res.errorUploadToDatabase !== true) {
            // console.log(message);
            // console.log(res.errorUploadToServer !== true && res.errorUploadToDatabase !== true);
            setSuccessfulMessage(true);
          }
        } else {
          navigate(`../${inFormAttachedFile.name}`);
        }
      }).finally(() => {
        setIsLoading(false);
      });
    }
  };

  return (
    <>
      <div className="file-modal-overlay" onClick={() => navigate('..')}>
        <hr />
        <div ref={thisWindowRef} className="modal-content"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && !uploadErrors && !isLoading)
              uploadFile();
            if (event.key === 'Escape')
              navigate('..');
          }}
          tabIndex={0}
        >
          <div className="content-header">
            <h2>File upload</h2>
          </div>

          {isLoading ?
            <div className='loading-indicator'>
              <LoadingImage />
              <p>Loading...</p>
            </div>
            :
            successfulMessage ?
              <p
                style={{ fontSize: '1.25em', textAlign: 'center', lineHeight: '1.25em', letterSpacing: '0.1em' }}
              >File is successfully uploaded to server and database</p>
              :
              <div className='main-content'>
                <div className="upload-image-preview">
                  {imageMetadata.url.length > 0 &&
                    <img src={imageMetadata.url} />
                  }
                </div>

                <div className='upload-image-form'>
                  <div>
                    <div>
                      <p>Name</p>
                      <button
                        onClick={resetName}
                        disabled={attachedFile?.name === inFormAttachedFile?.name}
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

                {(allowedFileProps.fileUploadErrors[3] || allowedFileProps.fileUploadErrors[4])
                  && <div className='exist-image-preview'>
                    <div className='image-preview'>
                      <div className='image-preview-title'>
                        <p>Server</p>
                        <p>Database</p>
                      </div>
                      <div className='image-preview-images'>
                        <div>
                          {serverImageUrl.length > 0 && <img src={serverImageUrl} />}
                        </div>
                        <div>
                          {databaseImageUrl.length > 0 && <img src={databaseImageUrl} />}
                        </div>
                      </div>
                    </div>
                  </div>}

                {allowedFileProps.fileUploadErrors
                  && uploadErrors
                  && <div className='validation-error-messages'>
                    <p>Validation errors:</p>
                    <ul>
                      {
                        allowedFileProps.fileUploadErrors
                          .filter(message => message !== null)
                          .map((message) =>
                            <li key={message?.title}>{message?.title}: {message?.message} <span>{message?.allowed}</span>.</li>
                          )}
                    </ul>
                  </div>
                }
              </div>
          }
          <div className="action-buttons">
            <button
              className="upload-button"
              onClick={uploadFile}
              disabled={uploadErrors || isLoading || successfulMessage}
            >
              {uploadErrors ? 'There are errors' : successfulMessage ? 'Uploaded' : 'Upload'}
            </button>
            <button
              className="close-button"
              onClick={() => { navigate('..'); }}
            >
              Close
            </button>
          </div>
        </div>
        <hr />
      </div>
    </>
  );
};

export default UploadFileModalWindow;