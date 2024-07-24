import { Helmet } from "react-helmet-async";
import { Navbar } from "../../components/elements/navigation_bar/Navbar";
import "./FileManagementPage.scss"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IFile } from "../../Interfaces/IFiles";
import FileService from "../../backend/services/fileService";
import { FileSizeFormatter } from "../../tools/DataFormatters";

const FileManagementPage = () => {

  const [avatarsData, setAvatarsData] = useState<IFile | null>(null);

  useEffect(() => {
    FileService.getAvatarsInfo().then((result) => {
      setAvatarsData(result);
    });
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>File management | Project D</title>
      </Helmet>
      <Navbar />
      <main className="FILE_MANAGEMENT_PAGE">
        <div className="PageHeader">
          <p>File management</p>
        </div>
        <div className="Partition">
          <hr />
          <p>Images</p>
          <hr />
        </div>
        <div className="PageContent">
          {/* <div className="Avatars">
            <img src={require('../../images/objects/ThumbnailObjectIcon.png')} />
            <p>Avatars</p>
            <div>
              <p>4 qty</p>
              <p>300 kB</p>
            </div>
            <button>Manage</button>
          </div> */}

          {avatarsData && <div className="Avatars">
            <img src={require('../../images/objects/ThumbnailObjectIcon.png')} />
            <p>Avatars</p>
            <div>
              <p>x {avatarsData?.Quality}</p>
              <p>{avatarsData?.Size !== undefined && FileSizeFormatter(avatarsData?.Size)}</p>
            </div>
            <Link to="Avatars">
              <button>Manage</button>
            </Link>
          </div>}
        </div>
      </main>
    </>
  )
}

export { FileManagementPage };