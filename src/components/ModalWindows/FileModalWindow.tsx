import { useEffect, useRef, useState } from 'react';
import "./FileModalWindow.scss"
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { FileExtensionFormatter, FileSizeFormatter } from '../../tools/DataFormatters';
import FileService from '../../backend/services/fileService';
import { useAllowedFileProperties } from '../../AllowedValues/AllowedFileProperties';

const FileModalWindow = () => {
  const { attachedFile } = useOutletContext<{ attachedFile: File | null }>();
  const [inFormAttachedFile, setInFormAttachedFile] = useState<File | null>(attachedFile);
  const [imageMetadata, setImageMetadata] = useState<{ width: number, height: number, url: string }>({ width: 0, height: 0, url: '' });

  const [dataIsModified, setDataIsModified] = useState<boolean>(false);

  const [isUploadToServer, setIsUploadToServer] = useState<boolean>(true);
  const [isUploadToDatabase, setIsUploadToDatabase] = useState<boolean>(true);

  const [serverImageUrl, setServerImageUrl] = useState<string>('');
  const [databaseImageUrl, setDatabaseImageUrl] = useState<string>('');

  const [isUploadServerRewrite, setIsUploadServerRewrite] = useState<boolean>(false);
  const [isUploadDatabaseRewrite, setIsUploadDatabaseRewrite] = useState<boolean>(false);

  const [isServerError, setIsServerError] = useState<boolean>(false);
  const [isDatabaseError, setIsDatabaseError] = useState<boolean>(false);

  // const [isServerRew]

  const allowedFileProps = useAllowedFileProperties('avatar');

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
      allowedFileProps.resetServerErrors();
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
      allowedFileProps.isValidName(inFormAttachedFile?.name.split('.').at(0) as string);

    if (attachedFile)
      allowedFileProps.isValidExtension(attachedFile?.name);

    if (imageMetadata.width && imageMetadata.height)
      allowedFileProps.isValidResolution(`${imageMetadata.width}x${imageMetadata.height}`);

    allowedFileProps.resetAllErrors();
    setIsServerError(false);
    setIsDatabaseError(false);
    setIsUploadServerRewrite(false);
    setIsUploadDatabaseRewrite(false);
    setServerImageUrl('');
    setDatabaseImageUrl('');

  }, [attachedFile?.name, imageMetadata, inFormAttachedFile?.name]);

  useEffect(() => {
    if (allowedFileProps.fileUploadErrors[3] !== null)
      setIsServerError(true);
    else
      setIsServerError(false);

    if (allowedFileProps.fileUploadErrors[4] !== null)
      setIsDatabaseError(true);
    else
      setIsDatabaseError(false);
  }, [allowedFileProps.fileUploadErrors]);

  const resetName = () => {
    setInFormAttachedFile(attachedFile);
  };

  // useEffect(() => {
  //   console.log(isUploadToServer || isUploadToDatabase);
  //   console.log(isServerError || isDatabaseError)
  // }, [isUploadToServer, isUploadToDatabase, isServerError, isDatabaseError]);

    useEffect(() => {
    console.log(serverImageUrl);
    console.log(databaseImageUrl);
  }, [serverImageUrl, databaseImageUrl]);


  const uploadFile = () => {
    if (inFormAttachedFile) {
      const formData = new FormData();
      formData.append('file', inFormAttachedFile);
      formData.append('fileProperties', JSON.stringify({
        uploadToServer: isUploadToServer,
        uploadToDatabase: isUploadToDatabase,
        uploadServerRewrite: isUploadServerRewrite,
        uploadDatabaseRewrite: isUploadDatabaseRewrite
      }));
      allowedFileProps.resetServerErrors();
      setIsUploadServerRewrite(false);
      setIsUploadDatabaseRewrite(false);
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
        } else {
          navigate(`../${inFormAttachedFile.name}`);
        }
      });
    }
  };

  return (
    <>
      <div className="file-modal-overlay" onClick={() => navigate('../')}>
        <hr />
        <div ref={thisWindowRef} className="modal-content"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(event) => {
            if (event.key === 'Enter'
              && (
                (isUploadToServer || isUploadToDatabase) &&
                (
                  !(isServerError && isDatabaseError) ||
                  (isServerError || isDatabaseError) && (isUploadServerRewrite || isUploadDatabaseRewrite)
                )
              )) {
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
            <div className="upload-image-preview">
              {imageMetadata.url.length > 0 &&
                <img src={imageMetadata.url} />
              }
            </div>

            <div className='upload-image-form'>
              <div>
                <p>ID</p>
                <input
                  type="text"
                  value='none'
                  placeholder="ID"
                  disabled
                />
              </div>
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

            {!isServerError && !isDatabaseError
              && <div className="checkbox-buttons">
                <button
                  onClick={() => setIsUploadToServer(!isUploadToServer)}
                  className={`server-checkbox ${isUploadToServer ? 'is-checked' : 'is-not-checked'}`}
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
                  className={`database-checkbox ${isUploadToDatabase ? 'is-checked' : 'is-not-checked'}`}
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
              </div>}

            {(isServerError || isDatabaseError)
              && <div className='exist-image-preview'>
                <div className='image-preview'>
                  <div className='image-preview-title'>
                    {isUploadToServer && <p>Server</p>}
                    {isUploadToDatabase && <p>Database</p>}
                  </div>
                  <div className='image-preview-images'>
                    {isUploadToServer && <div onClick={() => setIsUploadServerRewrite(!isUploadServerRewrite)}>
                      {serverImageUrl.length > 0 && <img src={serverImageUrl} />}
                      {isUploadServerRewrite
                        && <div className='rewrite-overlay'>
                          <p>Rewrite</p>
                        </div>}
                    </div>}
                    {isUploadToDatabase && <div onClick={() => setIsUploadDatabaseRewrite(!isUploadDatabaseRewrite)}>
                      {databaseImageUrl.length > 0 && <img src={databaseImageUrl} />}
                      {isUploadDatabaseRewrite
                        && <div className='rewrite-overlay'>
                          <p>Rewrite</p>
                        </div>}
                    </div>}
                  </div>
                </div>
              </div>}

            {allowedFileProps.fileUploadErrors
              && allowedFileProps.fileUploadErrors.filter(message => message !== null).length > 0
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
              </div>}

            <div className="action-buttons">
              <button
                onClick={uploadFile}
                disabled={
                  !(
                    (isUploadToServer || isUploadToDatabase) &&
                    (
                      !(isServerError && isDatabaseError) ||
                      (isServerError || isDatabaseError) && (isUploadServerRewrite || isUploadDatabaseRewrite)
                    )
                  )
                }
                className={(isServerError || isDatabaseError) ? 'rewrite-button' : 'upload-button'}
              >
                {(isServerError || isDatabaseError) ? 'Rewrite' : 'Upload'}
              </button>
              <button onClick={() => { navigate('../'); }}>
                Close
              </button>
            </div>
          </div>
        </div>
        <hr />
      </div>
    </>
  );
};

export default FileModalWindow;