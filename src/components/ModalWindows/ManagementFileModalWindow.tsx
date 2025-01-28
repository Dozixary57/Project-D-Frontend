import { useEffect, useRef, useState } from 'react';
import "./FileModalWindow.scss"
import { useLocation, useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { FileExtensionFormatter, FileSizeFormatter } from '../../tools/DataFormatters';
import FileService from '../../backend/services/fileService';
import { useAllowedFileProperties } from '../../AllowedValues/AllowedFileProperties';
import { IPictureMetadata, IPictureWithMetadata } from '../../interfaces/IFiles';
import LoadingImage from '../LoadingImage/LoadingImage';

const ManagementFileModalWindow = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [successfulMessage, setSuccessfulMessage] = useState<boolean>(false);

  // const { attachedFile } = useOutletContext<{ attachedFile: File | null }>();
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [imageMetadata, setImageMetadata] = useState<{ width: number, height: number, url: string }>({ width: 0, height: 0, url: '' });
  const [inFormAttachedFile, setInFormAttachedFile] = useState<File | null>(null);

  const [receivedFile, setReceivedFile] = useState<IPictureWithMetadata | null>(null);
  const [inFormFileData, setInFormFileData] = useState<IPictureWithMetadata | null>(null);
  // const [inFormReceivedFile, setInFormReceivedFile] = useState<IAvatarsWithMetadata | null>(null);
  // const [receivedFileFilename, setReceivedFileFilename] = useState<string | null>(null);
  // const [receivedFileServerMetadata, setReceivedFileServerMetadata] = useState<IPictureMetadata | null>(null);
  // const [receivedFileDatabaseMetadata, setReceivedFileDatabaseMetadata] = useState<IPictureMetadata | null>(null);
  // const [receivedFileJointMetadata, setReceivedFileJointMetadata] = useState<IPictureMetadata | null>(null);

  // const [filename, setFilename] = useState<string | null>(null);
  // const [jointFileMetadata, setJointFileMetadata] = useState<IPictureMetadata | null>(null);
  // const [serverFileMetadata, setServerFileMetadata] = useState<IPictureMetadata | null>(null);
  // const [databaseFileMetadata, setDatabaseFileMetadata] = useState<IPictureMetadata | null>(null);

  // const [isUploadToServer, setIsUploadToServer] = useState<boolean>(true);
  // const [isUploadToDatabase, setIsUploadToDatabase] = useState<boolean>(true);

  // const [serverImageUrl, setServerImageUrl] = useState<string>('');
  // const [databaseImageUrl, setDatabaseImageUrl] = useState<string>('');

  // const [isUploadServerRewrite, setIsUploadServerRewrite] = useState<boolean>(false);
  // const [isUploadDatabaseRewrite, setIsUploadDatabaseRewrite] = useState<boolean>(false);

  // const [isServerError, setIsServerError] = useState<boolean>(false);
  // const [isDatabaseError, setIsDatabaseError] = useState<boolean>(false);

  const allowedFileProps = useAllowedFileProperties('avatar');

  const thisWindowRef = useRef<HTMLDivElement>(null);
  const ParamId = useParams<{ avatarId: string }>().avatarId
  const navigate = useNavigate();

  useEffect(() => {
    thisWindowRef.current?.focus();

    // if (attachedFile) {
    //   setInFormAttachedFile(attachedFile);
    //   const img = new Image();
    //   img.onload = function () {
    //     const reader = new FileReader();
    //     reader.onload = () => {
    //       if (reader.readyState === 2) {
    //         setImageMetadata({
    //           width: img.width,
    //           height: img.height,
    //           url: reader.result as string
    //         })
    //       }
    //     };
    //     reader.readAsDataURL(attachedFile);
    //   };
    //   img.src = URL.createObjectURL(attachedFile);
    // } else if (ParamId) {
    //   console.log(ParamId);
    //   FileService.getAvatar(ParamId).then((res) => {
    //     console.log(res);
    //     if (res && res.filename)
    //       setReceivedFile(res);
    //     else
    //       navigate('..');
    //   });
    // }

    if (ParamId) {
      // console.log(ParamId);
      FileService.getAvatar(ParamId).then((res) => {
        if (res && res.filename) {
          setReceivedFile(res);
          setInFormFileData(res);
        }
        else
          navigate('..');
      }).finally(() => {
        setIsLoading(false);
      });
    }

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'initial';
      allowedFileProps.resetServerErrors();
    };
  }, [ParamId]);

  useEffect(() => {
    allowedFileProps.isValidName(inFormFileData?.filename.split('.').at(0) as string);
  }, [inFormFileData]);

  // useEffect(() => {
  //   allowedFileProps.resetAllErrors();
  //   setIsServerError(false);
  //   setIsDatabaseError(false);
  //   setIsUploadServerRewrite(false);
  //   setIsUploadDatabaseRewrite(false);
  //   setServerImageUrl('');
  //   setDatabaseImageUrl('');

  //   if (inFormAttachedFile)
  //     allowedFileProps.isValidName(inFormAttachedFile?.name.split('.').at(0) as string);

  //   if (attachedFile)
  //     allowedFileProps.isValidExtension(attachedFile?.name);

  //   if (imageMetadata.width && imageMetadata.height)
  //     allowedFileProps.isValidResolution(`${imageMetadata.width}x${imageMetadata.height}`);

  // }, [attachedFile?.name, imageMetadata, inFormAttachedFile?.name]);

  // useEffect(() => {
  //   if (receivedFile) {
  //     setReceivedFileFilename(receivedFile.filename);
  //     setReceivedFileServerMetadata(receivedFile.fs_stats);
  //     setReceivedFileDatabaseMetadata(receivedFile.db_stats);
  //     setReceivedFileJointMetadata(receivedFile.joint_stats);
  //   } else {
  //     setReceivedFileFilename(null);
  //     setReceivedFileServerMetadata(null);
  //     setReceivedFileDatabaseMetadata(null);
  //     setReceivedFileJointMetadata(null);
  //   }
  // }, [receivedFile]);

  // useEffect(() => {
  //   allowedFileProps.resetAllErrors();

  //   if (receivedFileFilename)
  //     allowedFileProps.isValidName(receivedFileFilename.split('.').at(0) as string);

  // }, [receivedFileFilename]);

  // useEffect(() => {
  //   if (allowedFileProps.fileUploadErrors[3] !== null)
  //     setIsServerError(true);
  //   else
  //     setIsServerError(false);

  //   if (allowedFileProps.fileUploadErrors[4] !== null)
  //     setIsDatabaseError(true);
  //   else
  //     setIsDatabaseError(false);
  // }, [allowedFileProps.fileUploadErrors]);

  const uploadFile = () => {
    if (inFormAttachedFile) {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('file', inFormAttachedFile);
      formData.append('fileProperties', JSON.stringify({
        // uploadToServer: isUploadToServer,
        // uploadToDatabase: isUploadToDatabase,
        // uploadServerRewrite: isUploadServerRewrite,
        // uploadDatabaseRewrite: isUploadDatabaseRewrite
      }));
      allowedFileProps.resetServerErrors();
      // setIsUploadServerRewrite(false);
      // setIsUploadDatabaseRewrite(false);
      // setServerImageUrl('');
      // setDatabaseImageUrl('');
      FileService.uploadAvatar(formData).then((res) => {
        // console.log(res);
        if (res) {
          // if (res.errorUploadToServer) {
          // }
          // if (res.errorUploadToDatabase) {
          // }
          // if (res.serverImageUrl && res.serverImageUrl.length > 0) {
          //   allowedFileProps.errorUploadToServer();
          //   setServerImageUrl(res.serverImageUrl + `?timestamp=${new Date().getTime()}`);
          // }
          // if (res.databaseImageUrl && res.databaseImageUrl.length > 0) {
          //   allowedFileProps.errorUploadToDatabase();
          //   setDatabaseImageUrl(res.databaseImageUrl + `?timestamp=${new Date().getTime()}`);
          // }
        } else {
          // navigate(`../${inFormAttachedFile.name}`);
        }
      }).finally(() => {
        setIsLoading(false);
      });
    }
  };

  // useEffect(() => {
  //   console.log(receivedFile);
  // }, [receivedFile])

  // useEffect(() => {
  //   console.log(inFormFileData?.filename === '');
  // }, [inFormFileData])

  const syncImagesStorage = (filename: string) => {
    setIsLoading(true);
    if (filename && filename !== '') {
      FileService.syncImagesStorage(filename).then((res) => {
        if (res && (res.serverImageUrl || res.databaseImageUrl)) {
          if (ParamId) {
            FileService.getAvatar(ParamId).then((r) => {
              if (r && r.filename) {
                setReceivedFile(r);
                setInFormFileData(r);
              }
              else
                navigate('..');
            });
          }
        }
      }).finally(() => {
        setIsLoading(false);
      });
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setAttachedFile(event.target.files[0]);
    }
  };

  return (
    <>
      <div className="file-modal-overlay" onClick={() => navigate('..')}>
        <hr />
        <div ref={thisWindowRef} className="modal-content"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(event) => {
            // if (event.key === 'Enter'
            //   && (
            //     (isUploadToServer || isUploadToDatabase) &&
            //     (
            //       !(isServerError && isDatabaseError) ||
            //       (isServerError || isDatabaseError) && (isUploadServerRewrite || isUploadDatabaseRewrite)
            //     )
            //   )) {
            //   uploadFile();
            // }
            if (event.key === 'Escape') {
              navigate('..');
            }
          }}
          tabIndex={0}
        >
          <div className="content-header">
            <p
              style={receivedFile === inFormFileData ? { opacity: '0.35' } : { opacity: '1' }}
            >{attachedFile === inFormAttachedFile ? 'Used default changes' : 'Used new changes'}</p>
            <h2>File management</h2>
            <button
              onClick={() => setInFormFileData(receivedFile)}
              disabled={receivedFile === inFormFileData}
            >Reset</button>
          </div>

          {isLoading ?
            <div className='loading-indicator'>
              <LoadingImage />
            </div>
            :
            successfulMessage ?
              <p></p>
              :
              <div className={`main-content ${receivedFile?.joint_stats ? 'single-form' : 'multiple-form'}`}>
                {inFormFileData?.joint_stats &&
                  <>
                    <div className='image-preview'>
                      <img src={inFormFileData?.joint_stats.url} />
                    </div>
                    <div className='data-image-form joint-form'>
                      <div>
                        <p>Name</p>
                        <input
                          type="text"
                          value={inFormFileData?.filename?.split('.')[0]}
                          onChange={(e) => {
                            if (inFormFileData)
                              setInFormFileData({ ...inFormFileData, filename: e.target.value + '.' + inFormFileData.filename?.split('.')[1] });
                          }}
                          placeholder="File name"
                        />
                      </div>
                      <div>
                        <p>Extension</p>
                        <input
                          type="text"
                          value={inFormFileData?.joint_stats.extension || ''}
                          placeholder="File ext"
                          readOnly
                        />
                      </div>
                      <div>
                        <p>Format</p>
                        <input
                          type="text"
                          value={inFormFileData?.joint_stats.format || ''}
                          placeholder="File format"
                          readOnly
                        />
                      </div>
                      <div>
                        <p>Resolution</p>
                        <input
                          type="text"
                          value={inFormFileData?.joint_stats.resolution || ''}
                          placeholder="File res"
                          readOnly
                        />
                      </div>
                      <div>
                        <p>Size</p>
                        <input
                          type="text"
                          value={inFormFileData?.joint_stats.size && FileSizeFormatter(inFormFileData?.joint_stats.size) || ''}
                          placeholder="File size"
                          readOnly
                        />
                      </div>
                    </div>
                  </>
                }

                {(inFormFileData?.fs_stats || inFormFileData?.db_stats) &&
                  <>
                    {/* <div> */}
                    <h3 className='server-header'>Server</h3>
                    <h3 className='database-header'>Database</h3>
                    <div className='image-preview server-image'>
                      {inFormFileData.fs_stats?.url ?
                        <img src={inFormFileData.fs_stats.url} />
                        :
                        <img src={require('../../images/HideImageIcon.png')} />
                      }
                    </div>
                    <div className='image-preview database-image'>
                      {inFormFileData.db_stats?.url ?
                        <img src={inFormFileData.db_stats.url} />
                        :
                        <img src={require('../../images/HideImageIcon.png')} />
                      }
                    </div>
                    <div className='image-filename-field'>
                      <p>Name</p>
                      <input
                        type="text"
                        value={inFormFileData?.filename?.split('.')[0]}
                        onChange={(e) => {
                          if (inFormFileData)
                            setInFormFileData({ ...inFormFileData, filename: e.target.value + '.' + inFormFileData.filename?.split('.')[1] });
                        }}
                        placeholder="File name"
                      />
                    </div>
                    <div className='data-image-form server-form'>
                      {inFormFileData.fs_stats ?
                        <>
                          <div>
                            <p>Extension</p>
                            <input
                              type="text"
                              value={inFormFileData?.fs_stats.extension || ''}
                              placeholder="File ext"
                              readOnly
                            />
                          </div>
                          <div>
                            <p>Format</p>
                            <input
                              type="text"
                              value={inFormFileData?.fs_stats.format || ''}
                              placeholder="File format"
                              readOnly
                            />
                          </div>
                          <div>
                            <p>Resolution</p>
                            <input
                              type="text"
                              value={inFormFileData?.fs_stats.resolution || ''}
                              placeholder="File res"
                              readOnly
                            />
                          </div>
                          <div>
                            <p>Size</p>
                            <input
                              type="text"
                              value={inFormFileData?.fs_stats.size && FileSizeFormatter(inFormFileData?.fs_stats.size) || ''}
                              placeholder="File size"
                              readOnly
                            />
                          </div>
                        </>
                        :
                        <>
                          <p>No image data</p>
                          <button
                            onClick={() => {
                              syncImagesStorage(inFormFileData.filename);
                            }}
                            disabled={isLoading || inFormFileData.filename.split('.')[0] === ''}
                          >Synchronize with the database?</button>
                          <p>or</p>
                          <div className="drop-file-field">
                            <label htmlFor="fileInput" style={attachedFile ? { padding: '2.1em 0 2.9em 0' } : {}}>
                              {attachedFile ?
                                <>
                                  <span style={{ fontWeight: 'bold', color: 'white' }}>{attachedFile.name}</span> is attached
                                </>
                                :
                                <>
                                  <span style={{ fontWeight: 'bold', color: 'white' }}>Upload file</span>
                                  <br />
                                  <span>[ click & drop ]</span>
                                </>
                              }
                            </label>
                            <input
                              type="file"
                              accept="image/png"
                              onChange={handleFileChange}
                              id="fileInput"
                            />
                            {attachedFile && <button onClick={() => navigate('Upload')}>Go to upload</button>}
                          </div>
                        </>
                      }
                    </div>
                    {/* </div> */}
                    {/* <div> */}
                    <div className='data-image-form database-form'>
                      {inFormFileData.db_stats ?
                        <>
                          <div>
                            <p>Extension</p>
                            <input
                              type="text"
                              value={inFormFileData?.db_stats.extension || ''}
                              placeholder="File ext"
                              readOnly
                            />
                          </div>
                          <div>
                            <p>Format</p>
                            <input
                              type="text"
                              value={inFormFileData?.db_stats.format || ''}
                              placeholder="File format"
                              readOnly
                            />
                          </div>
                          <div>
                            <p>Resolution</p>
                            <input
                              type="text"
                              value={inFormFileData?.db_stats.resolution || ''}
                              placeholder="File res"
                              readOnly
                            />
                          </div>
                          <div>
                            <p>Size</p>
                            <input
                              type="text"
                              value={inFormFileData?.db_stats.size && FileSizeFormatter(inFormFileData?.db_stats.size) || ''}
                              placeholder="File size"
                              readOnly
                            />
                          </div>
                        </>
                        :
                        <>
                          <p>No image data</p>
                          <button
                            onClick={() => {
                              syncImagesStorage(inFormFileData.filename);
                            }}
                            disabled={isLoading || inFormFileData.filename.split('.')[0] === ''}
                          >Synchronize with the server?</button>
                          <p>OR</p>
                        </>
                      }
                    </div>
                    {/* </div> */}
                  </>
                }
                {/* {receivedFileJointMetadata
              &&
              <div className="upload-image-preview">
                <img src={receivedFileJointMetadata.url} />
              </div>
            } */}

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

                {/* {(isServerError || isDatabaseError)
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
              </div>} */}

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
                  {/* <button
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
              </button> */}
                  <button
                    className='close-button'
                    onClick={() => { navigate('../'); }}
                  >
                    Close
                  </button>
                </div>
              </div>
          }
        </div>
        <hr />
      </div>
    </>
  );
};

export default ManagementFileModalWindow;