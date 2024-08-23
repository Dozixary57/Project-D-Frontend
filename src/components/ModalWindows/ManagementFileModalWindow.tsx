import { useEffect, useRef, useState } from 'react';
import "./FileModalWindow.scss"
import { useLocation, useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { FileExtensionFormatter, FileSizeFormatter } from '../../tools/DataFormatters';
import FileService from '../../backend/services/fileService';
import { useAllowedFileProperties } from '../../AllowedValues/AllowedFileProperties';
import { IPictureMetadata, IPictureWithMetadata } from '../../Interfaces/IFiles';

const ManagementFileModalWindow = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { attachedFile } = useOutletContext<{ attachedFile: File | null }>();
  const [imageMetadata, setImageMetadata] = useState<{ width: number, height: number, url: string }>({ width: 0, height: 0, url: '' });
  const [inFormAttachedFile, setInFormAttachedFile] = useState<File | null>(null);

  const [receivedFile, setReceivedFile] = useState<IPictureWithMetadata | null>(null);
  // const [inFormReceivedFile, setInFormReceivedFile] = useState<IAvatarsWithMetadata | null>(null);
  const [receivedFileFilename, setReceivedFileFilename] = useState<string | null>(null);
  const [receivedFileServerMetadata, setReceivedFileServerMetadata] = useState<IPictureMetadata | null>(null);
  const [receivedFileDatabaseMetadata, setReceivedFileDatabaseMetadata] = useState<IPictureMetadata | null>(null);
  const [receivedFileJointMetadata, setReceivedFileJointMetadata] = useState<IPictureMetadata | null>(null);

  const [isUploadToServer, setIsUploadToServer] = useState<boolean>(true);
  const [isUploadToDatabase, setIsUploadToDatabase] = useState<boolean>(true);

  const [serverImageUrl, setServerImageUrl] = useState<string>('');
  const [databaseImageUrl, setDatabaseImageUrl] = useState<string>('');

  const [isUploadServerRewrite, setIsUploadServerRewrite] = useState<boolean>(false);
  const [isUploadDatabaseRewrite, setIsUploadDatabaseRewrite] = useState<boolean>(false);

  const [isServerError, setIsServerError] = useState<boolean>(false);
  const [isDatabaseError, setIsDatabaseError] = useState<boolean>(false);

  const allowedFileProps = useAllowedFileProperties('avatar');

  const thisWindowRef = useRef<HTMLDivElement>(null);
  const ParamId = useParams<{ avatarId: string }>().avatarId
  const navigate = useNavigate();

  useEffect(() => {
    thisWindowRef.current?.focus();

    if (attachedFile) {
      setInFormAttachedFile(attachedFile);
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
    } else if (ParamId) {
      FileService.getAvatar(ParamId).then((res) => {
        console.log(res);
        if (res && res.filename)
          setReceivedFile(res);
        else
          navigate('..');
      });
    }

    setIsLoading(false);

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'initial';
      allowedFileProps.resetServerErrors();
    };
  }, [ParamId]);

  useEffect(() => {
    allowedFileProps.resetAllErrors();
    setIsServerError(false);
    setIsDatabaseError(false);
    setIsUploadServerRewrite(false);
    setIsUploadDatabaseRewrite(false);
    setServerImageUrl('');
    setDatabaseImageUrl('');

    if (inFormAttachedFile)
      allowedFileProps.isValidName(inFormAttachedFile?.name.split('.').at(0) as string);

    if (attachedFile)
      allowedFileProps.isValidExtension(attachedFile?.name);

    if (imageMetadata.width && imageMetadata.height)
      allowedFileProps.isValidResolution(`${imageMetadata.width}x${imageMetadata.height}`);

  }, [attachedFile?.name, imageMetadata, inFormAttachedFile?.name]);

  useEffect(() => {
    if (receivedFile) {
      setReceivedFileFilename(receivedFile.filename);
      setReceivedFileServerMetadata(receivedFile.fs_stats);
      setReceivedFileDatabaseMetadata(receivedFile.db_stats);
      setReceivedFileJointMetadata(receivedFile.joint_stats);
    } else {
      setReceivedFileFilename(null);
      setReceivedFileServerMetadata(null);
      setReceivedFileDatabaseMetadata(null);
      setReceivedFileJointMetadata(null);
    }
  }, [receivedFile]);

  useEffect(() => {
    allowedFileProps.resetAllErrors();

    if (receivedFileFilename)
      allowedFileProps.isValidName(receivedFileFilename.split('.').at(0) as string);

  }, [receivedFileFilename]);

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

  const uploadFile = () => {
    if (inFormAttachedFile) {
      setIsLoading(true);
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
          // if (res.errorUploadToServer) {
          // }
          // if (res.errorUploadToDatabase) {
          // }
          if (res.serverImageUrl && res.serverImageUrl.length > 0) {
            allowedFileProps.errorUploadToServer();
            setServerImageUrl(res.serverImageUrl + `?timestamp=${new Date().getTime()}`);
          }
          if (res.databaseImageUrl && res.databaseImageUrl.length > 0) {
            allowedFileProps.errorUploadToDatabase();
            setDatabaseImageUrl(res.databaseImageUrl + `?timestamp=${new Date().getTime()}`);
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
              navigate('..');
            }
          }}
          tabIndex={0}
        >
          <div className="content-header">
            <h2>File management</h2>
          </div>

          <div className='main-content'>
            {inFormAttachedFile
              && FileExtensionFormatter(inFormAttachedFile?.type) === 'image'
              && imageMetadata.url.length > 0
              &&
              <div className="upload-image-preview">
                <p>Attached file preview</p>
                <img src={imageMetadata.url} />
              </div>
            }

            {receivedFileJointMetadata
              &&
              <div className="upload-image-preview">
                <img src={receivedFileJointMetadata.url} />
              </div>
            }

            <div className='upload-image-form'>
              <div>
                <div>
                  <p>Name</p>
                  <button
                    onClick={resetName}
                    // disabled={(location.pathname.includes('Upload') && (attachedFile?.name === inFormFileData?.name))}
                    disabled={true}
                  >
                    Reset
                  </button>
                </div>
                <input
                  type="text"
                  value={receivedFileFilename?.split('.')[0] || inFormAttachedFile?.name.split('.')[0] || ''}
                  onChange={(e) => {
                    if (receivedFileFilename)
                      setReceivedFileFilename(e.target.value + '.' + receivedFileFilename?.split('.')[1]);
                    else if (inFormAttachedFile)
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
                  value={receivedFile?.joint_stats.extension || attachedFile?.name.substring(attachedFile?.name.indexOf('.')) || ''}
                  placeholder="File ext"
                  readOnly
                />
              </div>
              <div>
                <p>Format</p>
                <input
                  type="text"
                  value={receivedFile?.joint_stats.format || attachedFile?.type !== undefined && FileExtensionFormatter(attachedFile?.type) || ''}
                  placeholder="File format"
                  readOnly
                />
              </div>
              <div>
                <p>Resolution</p>
                <input
                  type="text"
                  value={receivedFile?.joint_stats.resolution || imageMetadata?.width + ' x ' + imageMetadata?.height || ''} placeholder="File res"
                  readOnly
                />
              </div>
              <div>
                <p>Size</p>
                <input
                  type="text"
                  value={receivedFile?.joint_stats.size && FileSizeFormatter(receivedFile?.joint_stats.size) || attachedFile?.size !== undefined && FileSizeFormatter(attachedFile?.size) || ''}
                  placeholder="File size"
                  readOnly
                />
              </div>
            </div>

            {/* {!isServerError && !isDatabaseError
              && <div className="checkbox-buttons">
                <button
                  onClick={() => setIsUploadToServer(!isUploadToServer)}
                  className={`server-checkbox ${isUploadToServer ? 'is-checked' : 'is-not-checked'}`}
                >
                  <input
                    type='checkbox'
                    checked={isUploadToServer}
                    id="serverCheckbox"
                    onChange={() => setIsUploadToServer(!isUploadToServer)}
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
              </div>} */}

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

export default ManagementFileModalWindow;