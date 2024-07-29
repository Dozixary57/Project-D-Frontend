import { Helmet } from "react-helmet-async";
import { Navbar } from "../../components/elements/navigation_bar/Navbar";
import "./FileManagementPage_Avatars.scss"
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { IAvatars } from "../../Interfaces/IFiles";
import FileService from "../../backend/services/fileService";
import LoadingImage from "../../components/LoadingImage/LoadingImage";

const FileManagementPage_Avatars = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [attachedFile, setAttachedFile] = useState<File | null>(null);

  const [avatarsData, setAvatarsData] = useState<IAvatars[] | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (avatarsData)
      setIsLoading(true);

    FileService.getAvatars().then((result) => {
      setAvatarsData(result);
    }).finally(() => setIsLoading(false));
  }, [navigate]);

  useEffect(() => {
    console.log(avatarsData);
  }, [avatarsData]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setAttachedFile(event.target.files[0]);
      navigate('Upload')
    }
  };

  const syncImagesStorage = (filename: string) => {
    if (filename && filename !== '') {
      FileService.syncImagesStorage(filename).then((res) => {
        if (res && (res.serverImageUrl || res.databaseImageUrl)) {
          const updatedAvatarsData = avatarsData!.map((avatar) => {
            if (avatar.filename === filename) {
              return { ...avatar, ...res };
            }
            return avatar;
          });
          setAvatarsData(updatedAvatarsData);  
        }
        console.log(res);
      });
      console.log(filename);
    }
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Management avatar files | Project D</title>
      </Helmet>
      <Navbar />
      <Outlet context={{ attachedFile }} />
      <main className="FILE_MANAGEMENT_PAGE_AVATARS">
        <div className="PageHeader">
          <p>Avatars | File management</p>
        </div>
        <div className="DropFileField">
          <label htmlFor="fileInput">
            {attachedFile ?
              <><span style={{ fontWeight: 'bold', color: 'white' }}>{attachedFile.name}</span> is attached</>
              :
              <><span style={{ fontWeight: 'bold', color: 'white' }}>Upload file</span> [ click & drop ]</>
            }
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            id="fileInput"
          />
          {attachedFile && <button onClick={() => navigate('Upload')}>Go to upload</button>}
        </div>
        <div className="StatusIndicators">
          <div>
            <p>Server</p>
            <div className="Indicator Server"></div>
          </div>
          <div>
            <p>Database</p>
            <div className="Indicator Database"></div>
          </div>
        </div>
        <div className="AvatarsList">
          {avatarsData && avatarsData.map((avatar) => (
            <Link to={`${avatar.filename.split('.')[0]}`} key={avatar.filename}>
              <div className="AvatarCard">
                <img src={avatar.serverImageUrl ? avatar.serverImageUrl : avatar.databaseImageUrl} />
                <div className="AvatarStatusIndicators">
                  {avatar.serverImageUrl && <div className="Indicator Server"></div>}
                  {avatar.databaseImageUrl && <div className="Indicator Database"></div>}
                </div>
                {avatar.serverImageUrl && avatar.databaseImageUrl
                  && <img
                    src={avatar.databaseImageUrl}
                    className="DatabaseImagePreview"
                  />}
                <caption>
                  <p>{avatar.filename.split('.')[0]}</p>
                </caption>
              </div>
              <button
                className="SynchronizeImagesStorage"
                onClick={(e) => { e.preventDefault(); syncImagesStorage(avatar.filename) }}
                disabled={!(avatar.serverImageUrl === null || avatar.databaseImageUrl === null)}
              >
                Synchronize
              </button>
            </Link>
          ))}
          {isLoading && <Link to="">
            <div className="AvatarCard">
              <LoadingImage />
            </div>
          </Link>}
        </div>
      </main>
    </>
  )
}

export { FileManagementPage_Avatars };