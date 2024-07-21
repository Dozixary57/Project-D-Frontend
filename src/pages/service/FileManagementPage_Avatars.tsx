import { Helmet } from "react-helmet-async";
import { Navbar } from "../../components/elements/navigation_bar/Navbar";
import "./FileManagementPage_Avatars.scss"
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const FileManagementPage_Avatars = () => {

  const [attachedFile, setAttachedFile] = useState<File | null>(null);

  const navigate = useNavigate();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setAttachedFile(event.target.files[0]);
      navigate('Upload')
    }
  };

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
        <div className="PageContent">
        </div>
      </main>
    </>
  )
}

export { FileManagementPage_Avatars };