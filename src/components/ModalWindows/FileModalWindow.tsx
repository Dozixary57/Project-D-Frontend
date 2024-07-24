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

  const [isUploadAvailable, setIsUploadAvailable] = useState<boolean>(false);

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

  }, [attachedFile?.name, imageMetadata, inFormAttachedFile?.name]);

  useEffect(() => {
    if (allowedFileProps.fileUploadErrors.slice(0, 3).filter(message => message !== null).length > 0)
      setIsUploadAvailable(false);
    else
      setIsUploadAvailable(true);
  }, [allowedFileProps]);

  const resetName = () => {
    setInFormAttachedFile(attachedFile);
  };

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
      FileService.uploadAvatar(formData).then((res) => {
        console.log(res);
        if (res.errorUploadToServer || res.errorUploadToDatabase) {
          if (res.errorUploadToServer) {            
            allowedFileProps.errorUploadToServer();
            setServerImageUrl(res.serverImageUrl);
          }
          if (res.errorUploadToDatabase) {
            allowedFileProps.errorUploadToDatabase();
            setDatabaseImageUrl(res.databaseImageUrl);
          }
        } else {
          navigate(`../${inFormAttachedFile.name}`);
        }
      });
    }
  };

  // useEffect(() => {
  //   console.log(serverImageUrl, databaseImageUrl);
  // }, [serverImageUrl, databaseImageUrl]);

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
            <div className="upload-image-preview">
              {imageMetadata.url.length > 0 &&
                <img src={imageMetadata.url} />
              }
            </div>

            <div className='exist-image-preview'>
              <div className='server-image-preview'>
                <p>Server</p>
                {serverImageUrl.length > 0 && <img src={serverImageUrl} />}
              </div>
              <div className='database-image-preview'>
                <p>Database</p>
                {databaseImageUrl.length > 0 && <img src={databaseImageUrl} />}
              </div>
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
          </div>

          <div className="checkbox-buttons">
            <div>
              <button
                onClick={(e) => setIsUploadToServer(!isUploadToServer)}
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
              {isUploadToServer
                && allowedFileProps.fileUploadErrors[3] !== null
                && allowedFileProps.fileUploadErrors[3] !== undefined
                && <div
                className='rewrite-checkbox'
                onClick={() => { setIsUploadServerRewrite(!isUploadServerRewrite) }}
              >
                <input type='checkbox' checked={isUploadServerRewrite} onChange={() => { setIsUploadServerRewrite(!isUploadServerRewrite) }} />
                <p>Rewrite</p>
              </div>}
            </div>
            <div>
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
              {isUploadToDatabase
                && allowedFileProps.fileUploadErrors[4] !== null
                && allowedFileProps.fileUploadErrors[4] !== undefined
                && <div
                className='rewrite-checkbox'
                onClick={() => { setIsUploadDatabaseRewrite(!isUploadDatabaseRewrite) }}
              >
                <input type='checkbox' checked={isUploadDatabaseRewrite} onChange={() => { setIsUploadDatabaseRewrite(!isUploadDatabaseRewrite) }} />
                <p>Rewrite</p>
              </div>}
            </div>
          </div>

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