import { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import "./FileModalWindow.scss"
import { Link, useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { IAccount, IPrivileges, ITitles } from '../../Interfaces/IAccounts';
import AccountService from '../../backend/services/accountService';
import { FileExtensionFormatter, FileSizeFormatter, InputValueToTimestamp, TimestampToInputValue } from '../../tools/DataFormatters';
import { useSelector } from 'react-redux';
import { RootState } from '../../ReduxStore/store';
import { GetCurrentUserId, CurrentUserPrivilege } from '../GetUserData/GetUserData';
import LoadingImage from '../LoadingImage/LoadingImage';
import AuthService from '../../backend/services/authService';

// type ContextType = { onClose: () => void };

const FileModalWindow = () => {
  const { attachedFile } = useOutletContext<{ attachedFile: File | null }>();
  const [inFormAttachedFile, setInFormAttachedFile] = useState<File | null>(attachedFile);
  const [imageMetadata, setImageMetadata] = useState<{ width: number, height: number, url: string }>({ width: 0, height: 0, url: '' });

  const [dataIsModified, setDataIsModified] = useState<boolean>(false);

  const thisWindowRef = useRef<HTMLDivElement>(null);
  const ParamId = useParams<{ avatarId: string }>().avatarId
  const navigate = useNavigate();

  useEffect(() => {
    thisWindowRef.current?.focus();

    console.log(attachedFile)

    if (attachedFile) {
      const img = new Image();
      img.onload = function () {
        console.log("!!!");
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
    };
  }, [navigate, ParamId]);

  useEffect(() => {
    setDataIsModified(attachedFile?.name !== inFormAttachedFile?.name ? true : false);
  }, [inFormAttachedFile]);

  useEffect(() => {
    console.log(imageMetadata)
  }, [imageMetadata]);

  useEffect(() => {
    setInFormAttachedFile(attachedFile);
  }, [attachedFile]);

  useEffect(() => {
    console.log("1")
    console.log(attachedFile)
    console.log("2")
    console.log(inFormAttachedFile)
  }, [inFormAttachedFile]);

  const resetData = () => {
    setInFormAttachedFile(attachedFile);
  };

  return (
    <>
      <div className="file-modal-overlay" onClick={() => navigate('../')}>
        <hr />
        <div ref={thisWindowRef} className="modal-content"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(event) => {
            // if (dataIsModified && event.key === 'Enter') {
            //   saveFormData();
            // }
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
                  onClick={resetData}
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

          <div className="action-buttons">
            <button
            >
              Upload
            </button>
            <button
              onClick={() => {
                navigate('../');
              }}
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

export default FileModalWindow;