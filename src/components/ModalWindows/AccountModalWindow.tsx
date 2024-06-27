import { useContext, useEffect, useState } from 'react';
import "./ModalWindows.scss"
import { Link, useNavigate, useParams } from 'react-router-dom';
import { IAccount, IPrivileges, IStatus } from '../../Interfaces/IAccounts';
import AccountService from '../../backend/services/accountService';
import { InputValueToTimestamp, TimestampToInputValue } from '../../tools/DateTimeFormatter';
import { useSelector } from 'react-redux';
import { RootState } from '../../ReduxStore/store';
import { GetCurrentUserId, CheckCurrentUserPrivilege } from '../GetUserData/GetUserData';
import LoadingImage from '../LoadingImage/LoadingImage';

const AccountModalWindow = () => {
  const ParamId = useParams<{ accountId: string }>().accountId;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [inputDateOfBirth, setInputDateOfBirth] = useState<string>('');
  const [accountDetails, setAccountDetails] = useState<IAccount | null>(null);

  const userPrivileges = useSelector((state: RootState) => state.userPrivileges) as IPrivileges[] | [];

  const [userStatusesList, setUserStatusesList] = useState<IStatus[]>([]);

  const [inFormAccountDetails, setInFormAccountDetails] = useState<IAccount | null>(accountDetails);

  const [dataIsModified, setDataIsModified] = useState<boolean>(false);

  const [isCurrentUser, setIsCurrentUser] = useState<boolean>(GetCurrentUserId() === ParamId);

  const [inFormAvailablePrivilegesList, setInFormAvailablePrivilegesList] = useState<IPrivileges[]>([]);

  const [draggableCurrentPrivilege, setDraggableCurrentPrivilege] = useState<IPrivileges | null>(null);

  const [isUser_EditPrivilege, setIsUser_EditPrivilege] = useState<boolean>(userPrivileges.map((privilege: IPrivileges) => privilege.Title).includes('UserEdit'));

  const setInFormAccountDetailsData = () => {
    if (accountDetails) {
      setInFormAccountDetails(accountDetails);
      const currentPrivilegesTitles = accountDetails.Privileges ? accountDetails.Privileges.map((privilege: IPrivileges) => privilege.Title) : [];
      const availablePrivileges = userPrivileges.filter((privilege: IPrivileges) => !currentPrivilegesTitles.includes(privilege.Title));
      setInFormAvailablePrivilegesList(availablePrivileges || []);
    }
  }

  useEffect(() => {
    AccountService.getAccountById(ParamId).then((account) => {
      if (account && !account.Privileges) {
        account.Privileges = [];
      }
      if (account) {
        setAccountDetails(account);
        setInputDateOfBirth(TimestampToInputValue(account.DateOfBirth));
      } else if (ParamId === '0') {
        let newAccount: IAccount = {
          Username: '',
          Status: {
            _id: '',
            Title: ''
          } as IStatus,
          Email: '',
          DateOfBirth: '',
          Privileges: [] as IPrivileges[],
        } as IAccount;
        setAccountDetails(newAccount);
        // setInputDateOfBirth(TimestampToInputValue(newAccount.DateOfBirth));
      }
    });

    AccountService.getUserStatuses().then((result) => {
      setUserStatusesList(result);
    });

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'initial';
    };
  }, [])

  useEffect(() => {
    if (ParamId === '0') {
      setIsLoading(false);
    }
  }, [])

  useEffect(() => {

    setInFormAccountDetailsData();
  }, [accountDetails])

  const activateAccount = () => {
    if (inFormAccountDetails) {
      setInFormAccountDetails({ ...inFormAccountDetails, AccountStatus: "Active" });
    }
  }

  const blockAccount = () => {
    if (inFormAccountDetails) {
      setInFormAccountDetails({ ...inFormAccountDetails, AccountStatus: "Blocked" });
    }
  }

  const freezeAccount = () => {
    if (inFormAccountDetails) {
      setInFormAccountDetails({ ...inFormAccountDetails, AccountStatus: "Frozen" });
    }
  }

  const restoreFormData = () => {
    setInFormAccountDetailsData();
    setInputDateOfBirth(TimestampToInputValue(accountDetails?.DateOfBirth || ''));
  }

  const saveFormData = () => {
    if (inFormAccountDetails) {
      setIsLoading(true);
      AccountService.updateUserAccount(inFormAccountDetails).then((res) => {
        setAccountDetails(res);
        setIsLoading(false);
      })
    }
  }

  useEffect(() => {
    if (JSON.stringify(accountDetails) !== JSON.stringify(inFormAccountDetails)) {
      setDataIsModified(true);
    } else {
      setDataIsModified(false);
    }
    if (inFormAccountDetails) {
      const timer = window.setTimeout(() => {
        setIsLoading(false);
      }, 500);
      return () => window.clearTimeout(timer);
    }
    if (!isLoading) {
    }
  }, [inFormAccountDetails]);

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

    if (inFormAccountDetails && draggableCurrentPrivilege !== null && !inFormAccountDetails.Privileges?.includes(draggableCurrentPrivilege)) {
      setInFormAccountDetails({
        ...inFormAccountDetails,
        Privileges: [...inFormAccountDetails.Privileges, draggableCurrentPrivilege]
      });
      setInFormAvailablePrivilegesList(inFormAvailablePrivilegesList.filter((privilege) => privilege.Title !== draggableCurrentPrivilege.Title));
    }
  }

  const dragDropHandlerAvailablePrivilegesList = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (inFormAccountDetails && draggableCurrentPrivilege !== null && !inFormAvailablePrivilegesList.includes(draggableCurrentPrivilege)) {
      setInFormAvailablePrivilegesList([...inFormAvailablePrivilegesList, draggableCurrentPrivilege]);
      setInFormAccountDetails({
        ...inFormAccountDetails,
        Privileges: inFormAccountDetails.Privileges.filter((privilege) => privilege.Title !== draggableCurrentPrivilege.Title)
      });
    }
  }

  return (
    <div className="modal-overlay" onClick={() => navigate(-1)}>
      <hr />
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* <p>{}</p> */}
        <div className="content-header">
          {!isCurrentUser && <p style={dataIsModified ? { opacity: 1 } : { opacity: 0.2 }}>{dataIsModified ? 'Changes are not saved.' : 'Changes are saved.'}</p>}
          {isLoading ? <h2>Loading...</h2> : <>
            {isCurrentUser ? (
              <h2><span>{inFormAccountDetails?.Username ? inFormAccountDetails.Username : ParamId === '0' ? 'Create new user' : 'Empty'}</span> <span style={{ color: '#7c68ff' }}>[ Current user ]</span></h2>
            ) : (
              <h2><span>{inFormAccountDetails?.Username ? inFormAccountDetails.Username : ParamId === '0' ? 'Create new user' : 'Empty'}</span> {inFormAccountDetails?.AccountStatus && (<span style={inFormAccountDetails?.AccountStatus === 'Active' ? { color: '#0F0' } : inFormAccountDetails.AccountStatus === 'Frozen' ? { color: '#00b0cf' } : { color: '#f00' }}>[ {inFormAccountDetails.AccountStatus} ]</span>)}</h2>
            )}
          </>}
          {!isCurrentUser && <button style={dataIsModified ? { opacity: 1 } : { opacity: 0.2 }} onClick={() => restoreFormData()} disabled={!dataIsModified}>Restore</button>}
        </div>

        {isLoading ?
          <LoadingImage />
          :
          <>
            <div className='main-content'>
              <div>
                <p>ID</p>
                <input
                  type="text"
                  readOnly
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                  value={inFormAccountDetails?._id || ''}
                  placeholder="ID"
                  disabled
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
                  disabled={!isUser_EditPrivilege || isCurrentUser}
                  className={!isUser_EditPrivilege || isCurrentUser ? 'disabledInput' : 'activeInput'}
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
                  disabled={!isUser_EditPrivilege || isCurrentUser}
                  className={!isUser_EditPrivilege || isCurrentUser ? 'disabledInput' : 'activeInput'}
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
                  disabled={!isUser_EditPrivilege || isCurrentUser}
                  className={!isUser_EditPrivilege || isCurrentUser ? 'disabledInput' : 'activeInput'}
                  placeholder="Email"
                />
              </div>
              <div className='profile-image'>
                <img src={require("../../images/ThePlagueDoctor.png")} alt="Profile Image" />
              </div>
              <div>
                <p>Date of Birth</p>
                <input
                  type="date"
                  value={inputDateOfBirth || ''}
                  style={{ paddingRight: '0.5em', fontSize: '1.35em' }}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setInputDateOfBirth(e.target.value);
                  }}
                  onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                    if (inFormAccountDetails?.hasOwnProperty('DateOfBirth') && inputDateOfBirth?.length > 0) {

                      if (!isNaN(Number(InputValueToTimestamp(inputDateOfBirth)))) {
                        setInFormAccountDetails({
                          ...inFormAccountDetails,
                          DateOfBirth: InputValueToTimestamp(inputDateOfBirth),
                        });
                      }
                    }
                  }}
                  disabled={!isUser_EditPrivilege || isCurrentUser}
                  className={!isUser_EditPrivilege || isCurrentUser ? 'disabledInput' : 'activeInput'}
                />
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
                  {inFormAccountDetails?.Privileges && inFormAccountDetails?.Privileges.length > 0
                    && inFormAccountDetails?.Privileges.map((privilege) =>
                      <p
                        key={privilege._id}
                        draggable={!isCurrentUser && CheckCurrentUserPrivilege.isUserPrivilegesManaging() && userPrivileges.map((privilege: IPrivileges) => privilege.Title).includes(privilege.Title) ? true : false}
                        onDragStart={(e) => dragStartHandler(e, privilege)}
                        onDragEnd={(e) => dragEndHandler(e)}
                        className={!isCurrentUser && CheckCurrentUserPrivilege.isUserPrivilegesManaging() && userPrivileges.map((privilege: IPrivileges) => privilege.Title).includes(privilege.Title) ? 'available' : 'unavailable'}
                      >
                        {privilege.Title}
                      </p>
                    )}
                </div>
              </div>
              {userPrivileges
                && CheckCurrentUserPrivilege.isUserPrivilegesManaging()
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

            {!isCurrentUser ? (
              <>
                <div className="action-buttons">
                  {inFormAccountDetails?.AccountStatus === 'Frozen' ?
                    <button onClick={() => activateAccount()} style={{ backgroundColor: 'rgba(0, 255, 0, 0.35)' }}>Activate</button>
                    :
                    <button onClick={() => freezeAccount()} style={{ backgroundColor: 'rgba(0, 176, 207, 0.35)' }}>Freeze</button> || <button style={{ backgroundColor: '#00b0cf' }}>Freeze</button>
                  }
                  {inFormAccountDetails?.AccountStatus === 'Blocked' ?
                    <button onClick={() => activateAccount()} style={{ backgroundColor: 'rgba(0, 255, 0, 0.35)' }}>Activate</button>
                    :
                    <button onClick={() => blockAccount()} style={{ backgroundColor: 'rgba(255, 0, 0, 0.35)' }}>Block</button> || <button style={{ backgroundColor: '#f00' }}>Block</button>
                  }
                  <button
                    style={dataIsModified ? { opacity: 1 } : { opacity: 0.2 }}
                    disabled={!dataIsModified}
                    onClick={() => saveFormData()}
                  >Save changes</button>
                  {ParamId !== '0' && <button className='delete-button'>Delete account</button>}
                </div>
              </>
            ) : (
              <Link to='/Account/Settings' style={{ textDecoration: 'none' }}>
                <button className='action-button'>Go to settings</button>
              </Link>
            )}
          </>
        }
      </div>
      <hr />
    </div>
  );
};

export default AccountModalWindow;