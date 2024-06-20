import { useContext, useEffect, useState } from 'react';
import "./ModalWindows.scss"
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { IAccount, IPrivileges, IStatus } from '../../Interfaces/IAccounts';
import AccountService from '../../backend/services/accountService';
import { TimestampToInputValue } from '../../tools/DateTimeFormatter';
import { useSelector } from 'react-redux';
import { RootState } from '../../ReduxStore/store';
import { GetCurrentUserId } from '../GetUsersData/GetUsersData';

const AccountModalWindow = () => {
  const ParamId = useParams<{ accountId: string }>().accountId;
  const navigate = useNavigate();

  const [accountDetails, setAccountDetails] = useState<IAccount | null>(null);

  const userPrivileges = useSelector((state: RootState) => state.userPrivileges) as IPrivileges[] | [];

  const [userStatusesList, setUserStatusesList] = useState<IStatus[]>([]);

  const [inFormAccountDetails, setInFormAccountDetails] = useState<IAccount | null>(accountDetails);

  const [dataIsModified, setDataIsModified] = useState<boolean>(false);

  const [isCurrentUser, setIsCurrentUser] = useState<boolean>(GetCurrentUserId() === ParamId);

  const [currentUserCurrentPrivilegesList, setCurrentUserCurrentPrivilegesList] = useState<IPrivileges[]>([]);
  const [currentUserAvailablePrivilegesList, setCurrentUserAvailablePrivilegesList] = useState<IPrivileges[]>([]);

  const [inFormCurrentPrivilegesList, setInFormCurrentPrivilegesList] = useState<IPrivileges[]>([]);
  const [inFormAvailablePrivilegesList, setInFormAvailablePrivilegesList] = useState<IPrivileges[]>([]);

  const [draggableCurrentPrivilege, setDraggableCurrentPrivilege] = useState<IPrivileges | null>(null);

  useEffect(() => {
    AccountService.getAccountById(ParamId).then((account) => {
      setAccountDetails(account);
      setInFormAccountDetails(account);
      setCurrentUserCurrentPrivilegesList(account?.Privileges || []);
      const currentPrivilegesTitles = account.Privileges ? account.Privileges.map((privilege: IPrivileges) => privilege.Title) : [];
      const availablePrivileges = userPrivileges.filter((privilege: IPrivileges) => !currentPrivilegesTitles.includes(privilege.Title));
      setCurrentUserAvailablePrivilegesList(availablePrivileges);

      setInFormCurrentPrivilegesList(account?.Privileges || []);
      setInFormAvailablePrivilegesList(availablePrivileges || []);
    });

    AccountService.getUserStatuses().then((result) => {
      setUserStatusesList(result);
    });

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'initial';
    };
  }, [])

  const restoreFormData = () => {
    setInFormAccountDetails(accountDetails);
    console.log(accountDetails?.DateOfBirth)
  }

  useEffect(() => {
    if (JSON.stringify(accountDetails) !== JSON.stringify(inFormAccountDetails)) {
      setDataIsModified(true);
    } else {
      setDataIsModified(false);
    }
  }, [accountDetails, inFormAccountDetails]);

  const dragStartHandler = (event: React.DragEvent<HTMLDivElement>, privilege: IPrivileges) => {
    setDraggableCurrentPrivilege(privilege);
  }

  const dragEndHandler = (event: React.DragEvent<HTMLDivElement>) => {
    setDraggableCurrentPrivilege(null);
  }

  const dragOverHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }

  const dragLeaveHandler = (event: React.DragEvent<HTMLDivElement>) => {
  }

  const dragDropHandlerCurrentPrivilegesList = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (draggableCurrentPrivilege !== null && !inFormCurrentPrivilegesList.includes(draggableCurrentPrivilege)) {
      setInFormCurrentPrivilegesList([...inFormCurrentPrivilegesList, draggableCurrentPrivilege]);
      setInFormAvailablePrivilegesList(inFormAvailablePrivilegesList.filter((privilege) => privilege.Title !== draggableCurrentPrivilege.Title));
    }
  }

  const dragDropHandlerAvailablePrivilegesList = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (draggableCurrentPrivilege !== null && !inFormAvailablePrivilegesList.includes(draggableCurrentPrivilege)) {
      setInFormAvailablePrivilegesList([...inFormAvailablePrivilegesList, draggableCurrentPrivilege]);
      setInFormCurrentPrivilegesList(inFormCurrentPrivilegesList.filter((privilege) => privilege.Title !== draggableCurrentPrivilege.Title));
    }
  }

  return (
    <div className="modal-overlay" onClick={() => navigate(-1)}>
      <hr />
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="content-header">
          <p style={dataIsModified ? { opacity: 1 } : { opacity: 0.2 }}>{dataIsModified ? 'Changes are not saved.' : 'Changes are saved.'}</p>
          {isCurrentUser ? (
            <h2><span>{accountDetails?.Username}</span> <span style={{ color: '#7c68ff' }}>[ Current user ]</span></h2>
          ) : (
            <h2><span>{accountDetails?.Username}</span> {accountDetails?.AccountStatus && (<span style={accountDetails?.AccountStatus === 'Active' ? { color: '#0F0' } : accountDetails.AccountStatus === 'Frozen' ? { color: '#00b0cf' } : { color: '#f00' }}>[ {accountDetails.AccountStatus} ]</span>)}</h2>
          )}
          <button style={dataIsModified ? { opacity: 1 } : { opacity: 0.2 }} onClick={() => restoreFormData()} disabled={!dataIsModified}>Restore</button>
        </div>

        <div className='main-content'>
          <div className='left-side'>
            <div>
              <p>ID</p>
              <input
                type="text"
                readOnly
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                value={inFormAccountDetails?._id || ''}
                placeholder="ID"
              />
            </div>
            <div>
              <p>Username</p>
              <input
                type="text"
                value={inFormAccountDetails?.Username || ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (inFormAccountDetails) {
                    setInFormAccountDetails({
                      ...inFormAccountDetails,
                      Username: e.target.value,
                    });
                  }
                }}
                placeholder="Username"
              />
            </div>
            <div>
              <p>Status</p>
              <select
                value={inFormAccountDetails?.Status?._id || ''}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  if (inFormAccountDetails) {
                    setInFormAccountDetails({
                      ...inFormAccountDetails,
                      Status: userStatusesList.find((status) => status._id === e.target.value),
                    });
                  }
                }}
              >
                <option disabled={true} value={''}>Select Status</option>
                {userStatusesList.map((status) => (
                  <option key={status._id} value={status._id || ''}>{status.Title}</option>
                ))}
              </select>
            </div>
            <div>
              <p>Email</p>
              <input
                type="email"
                value={inFormAccountDetails?.Email || ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (inFormAccountDetails) {
                    setInFormAccountDetails({
                      ...inFormAccountDetails,
                      Email: e.target.value,
                    });
                  }
                }}
                placeholder="Email"
              />
            </div>
          </div>
          <div className='right-side'>
            <div className='profile-image'>
              <img src={require("../../images/ThePlagueDoctor.png")} alt="Profile Image" />
            </div>
            <div>
              <p>Date of Birth</p>
              <input
                type="date"
                value={inFormAccountDetails?.DateOfBirth && TimestampToInputValue(String(inFormAccountDetails?.DateOfBirth)) || ''}
                style={{ paddingRight: '0.5em', fontSize: '1.35em' }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  console.log(e.target.value)
                  if (inFormAccountDetails) {
                    setInFormAccountDetails({
                      ...inFormAccountDetails,
                      DateOfBirth: new Date(e.target.value),
                    });
                  }
                }}
              />
            </div>
          </div>
        </div>

        <div className='user-privileges'>
          <div className='current-privileges'>
            <p>Current privileges</p>
            <div
              className='current-privileges-list'
              onDrop={(e) => dragDropHandlerCurrentPrivilegesList(e)}
              onDragOver={(e) => dragOverHandler(e)}
              onDragLeave={(e) => dragLeaveHandler(e)}
              style={{ userSelect: 'none' }}
            >
              {inFormCurrentPrivilegesList && inFormCurrentPrivilegesList.length > 0
                && inFormCurrentPrivilegesList.map((privilege) =>
                  <p
                    key={privilege._id}
                    draggable={!isCurrentUser && userPrivileges.map((privilege: IPrivileges) => privilege.Title).includes(privilege.Title) ? true : false}
                    onDragStart={(e) => dragStartHandler(e, privilege)}
                    onDragEnd={(e) => dragEndHandler(e)}
                    className={!isCurrentUser && userPrivileges.map((privilege: IPrivileges) => privilege.Title).includes(privilege.Title) ? 'available' : 'unavailable'}
                  >
                    {privilege.Title}
                  </p>
                )}
            </div>
          </div>
          {userPrivileges
            && userPrivileges.map((privelege: IPrivileges) => privelege.Title).includes('UserPrivilegesManaging')
            && !isCurrentUser
            && <div className='available-privileges'>
              <p>Available privileges</p>
              <div
                className='available-privileges-list'
                onDrop={(e) => dragDropHandlerAvailablePrivilegesList(e)}
                onDragOver={(e) => dragOverHandler(e)}
                onDragLeave={(e) => dragLeaveHandler(e)}
                style={{ userSelect: 'none' }}
              >
                {inFormAvailablePrivilegesList && inFormAvailablePrivilegesList.length > 0
                  && inFormAvailablePrivilegesList.map((privilege) =>
                    <p
                      key={privilege._id}
                      draggable={true}
                      onDragStart={(e) => dragStartHandler(e, privilege)}
                      onDragEnd={(e) => dragEndHandler(e)}
                      onDrop={(e) => dragDropHandlerAvailablePrivilegesList(e)}
                      className={!isCurrentUser && userPrivileges.map((privilege: IPrivileges) => privilege.Title).includes(privilege.Title) ? 'available' : 'unavailable'}
                    >
                      {privilege.Title}
                    </p>
                  )}
              </div>
            </div>}
        </div>

        {!isCurrentUser? (
          <div className="action-buttons">
          {accountDetails?.AccountStatus === 'Frozen' ?
            <button style={{ backgroundColor: 'rgba(0, 255, 0, 0.35)' }}>Activate</button>
            :
            <button style={{ backgroundColor: 'rgba(0, 176, 207, 0.35)' }}>Freeze</button> || <button style={{ backgroundColor: '#00b0cf' }}>Freeze</button>
          }
          {accountDetails?.AccountStatus === 'Blocked' ?
            <button style={{ backgroundColor: 'rgba(0, 255, 0, 0.35)' }}>Activate</button>
            :
            <button style={{ backgroundColor: 'rgba(255, 0, 0, 0.35)' }}>Block</button> || <button style={{ backgroundColor: '#f00' }}>Block</button>
          }
          <button style={dataIsModified ? { opacity: 1 } : { opacity: 0.2 }} disabled={!dataIsModified}>Save changes</button>
        </div>
        ) : (
          <button className='action-button' style={dataIsModified ? { opacity: 1 } : { opacity: 0.2 }} disabled={!dataIsModified}>Save changes</button>
        )}
      </div>
      <hr />
    </div>
  );
};

export default AccountModalWindow;