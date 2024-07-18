import { Helmet } from "react-helmet-async";
import { Navbar } from "../../components/elements/navigation_bar/Navbar";
import "./FileManagementPage_Avatars.scss"
import { useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { IFile } from "../../Interfaces/IFiles";
import FileService from "../../backend/services/fileService";

const FileManagementPage_Avatars = () => {

  const [attachedFile, setAttachedFile] = useState<File | null>(null);

  // const fileInputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const location = useLocation();
  // const [fileAttached, setFileAttached] = useState<IFile | null>(null);

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   console.log(event.target.files);
  //   if (event.target.files && event.target.files[0]) {
  //     const file = event.target.files[0];
      // const reader = new FileReader();
      // reader.onload = () => {
      //   if (reader.readyState === 2) {
      //     setFileAttached({ Name: file.name, Type: file.type, SizeMB: file.size / 1024 / 1024, URL: reader.result as string });
      //   }
      // };
      // reader.readAsDataURL(file);
  //   }
  // };

  useEffect(() => {
    if (location.pathname === '/Service/File_management/Avatars/' || location.pathname === '/Service/File_management/Avatars') {
      // clearFileInput();
      console.log(attachedFile);
    }
  }, [navigate]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setAttachedFile(event.target.files[0]);
      navigate('Upload')
    }
  };

  // const handleFileUpload = () => {
  //   if (fileAttached) {
  //     const formData = new FormData();
  //     formData.append('file', fileAttached);
  //     FileService.uploadAvatar(formData);
  //   }
  // };

  // const clearFileInput = () => {
  //   console.log('clearing file input');
  //   if (fileInputRef.current) {
  //     fileInputRef.current.value = '';
  //     console.log(fileInputRef.current.value);
  //   }
  // };

  // useEffect(() => {
  //   console.log(fileAttached);
  // }, [fileAttached]);

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