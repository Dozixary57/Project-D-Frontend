import { useContext, useEffect, useRef, useState } from 'react';
import "./ModalWindows.scss"
import { Link, useNavigate, useParams } from 'react-router-dom';
import { IAccount, IPrivileges, ITitles } from '../../Interfaces/IAccounts';
import AccountService from '../../backend/services/accountService';
import { InputValueToTimestamp, TimestampToInputValue } from '../../tools/DateTimeFormatter';
import { useSelector } from 'react-redux';
import { RootState } from '../../ReduxStore/store';
import { GetCurrentUserId, CurrentUserPrivilege } from '../GetUserData/GetUserData';
import LoadingImage from '../LoadingImage/LoadingImage';
import AuthService from '../../backend/services/authService';

const AccountModalWindow = () => {
  const thisWindowRef = useRef<HTMLDivElement>(null);
  const ParamId = useParams<{ accountId: string }>().accountId;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [inputDateOfBirth, setInputDateOfBirth] = useState<string>('');
  const [accountDetails, setAccountDetails] = useState<IAccount | null>(null);

  const userPrivileges = useSelector((state: RootState) => state.userPrivileges) as IPrivileges[] | [];

  const [userTitlesList, setUserTitlesList] = useState<ITitles[]>([]);

  const [inFormAccountDetails, setInFormAccountDetails] = useState<IAccount | null>(accountDetails);

  const [dataIsModified, setDataIsModified] = useState<boolean>(false);

  const [isCurrentUser] = useState<boolean>(GetCurrentUserId() === ParamId);

  const [inFormAvailablePrivilegesList, setInFormAvailablePrivilegesList] = useState<IPrivileges[]>([]);

  const [dragAndDropIsDisabled, setDragIsDisabled] = useState<boolean>(true);
  const [inputIsDisabled, setInputIsDisabled] = useState<boolean>(true);

  const [draggableCurrentPrivilege, setDraggableCurrentPrivilege] = useState<IPrivileges | null>(null);

  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState<boolean>(false);
  const [restoreModalIsOpen, setRestoreModalIsOpen] = useState<boolean>(false);
  const [modalIsLoading, setModalIsLoading] = useState<boolean>(false);

  const SetIsLoading = (value: boolean) => {
    if (value) {
      setIsLoading(true);
    } else {
      const timer = window.setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return () => window.clearTimeout(timer);
    }
  }

  const setInFormAccountDetailsData = () => {
    if (accountDetails) {
      setInFormAccountDetails(accountDetails);
      const currentPrivilegesTitles = accountDetails.Privileges ? accountDetails.Privileges.map((privilege: IPrivileges) => privilege.Title) : [];
      const availablePrivileges = userPrivileges.filter((privilege: IPrivileges) => !currentPrivilegesTitles.includes(privilege.Title));
      setInFormAvailablePrivilegesList(availablePrivileges || []);
    } else {
      setInFormAccountDetails(null);
    }
  }

  useEffect(() => {
    thisWindowRef.current?.focus();
    AccountService.getAccountById(ParamId).then((account) => {
      if (account) {
        if (!account.Privileges) {
          account.Privileges = [];
        }
        setAccountDetails(account);
        setInputDateOfBirth(TimestampToInputValue(account.DateOfBirth));
      }
      if (ParamId === '0') {
        let newAccount: IAccount = {
          Username: '',
          Title: {
            _id: '',
            Title: ''
          } as ITitles,
          Email: '',
          DateOfBirth: '',
          Privileges: [] as IPrivileges[],
        } as IAccount;
        setAccountDetails(newAccount);
      }
    });

    AccountService.getUserTitles().then((result) => {
      setUserTitlesList(result);
    });

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'initial';
    };
  }, [navigate, ParamId]);

  useEffect(() => {
    if (ParamId === '0') {
      SetIsLoading(false);
    }
  }, [])

  useEffect(() => {
    setInFormAccountDetailsData();
  }, [accountDetails])

  //
  useEffect(() => {
    if (!CurrentUserPrivilege.isUserEdit() || isCurrentUser || inFormAccountDetails?.Status === "Deleted") {
      setInputIsDisabled(true);
    } else {
      setInputIsDisabled(false);
    }
  }, [inFormAccountDetails?.Status])
  //

  const activateAccount = () => {
    if (inFormAccountDetails) {
      setInFormAccountDetails({ ...inFormAccountDetails, Status: "Active" });
    }
  }

  const blockAccount = () => {
    if (inFormAccountDetails) {
      setInFormAccountDetails({ ...inFormAccountDetails, Status: "Blocked" });
    }
  }

  const freezeAccount = () => {
    if (inFormAccountDetails) {
      setInFormAccountDetails({ ...inFormAccountDetails, Status: "Frozen" });
    }
  }

  const restoreFormData = () => {
    setInFormAccountDetailsData();
    setInputDateOfBirth(TimestampToInputValue(accountDetails?.DateOfBirth || ''));
  }

  const saveFormData = async () => {
    SetIsLoading(true);
    if (inFormAccountDetails && ParamId !== '0') {
      await AuthService.isAuth();
      await AccountService.updateUserAccount(inFormAccountDetails).then((res) => {
        if (res) {
          if (!res.Privileges) {
            res.Privileges = [];
          }
          setAccountDetails(res);
        } else {
          SetIsLoading(false);
        }
      })
    } else if (inFormAccountDetails && ParamId === '0') {
      createAccount();
    }
  }

  const createAccount = () => {
    if (ParamId === '0' && inFormAccountDetails) {
      AccountService.createUserAccount(inFormAccountDetails).then((res) => {
        if (res && res !== '/0')
          navigate(`../${res}`);
        SetIsLoading(false);
      })
      
    }
  }

  const deleteAccount = () => {
    if (deleteModalIsOpen) {
      setModalIsLoading(true);
      AccountService.deleteUserAccount(ParamId).then((res) => {
        if (res) {
          if (res.account) {
            setAccountDetails(res.account);
          } else {
            setAccountDetails(null);
            navigate('../');
          }
          setDeleteModalIsOpen(false);
          setRestoreModalIsOpen(false);
          setModalIsLoading(false);
        }
      })
    } else {
      setDeleteModalIsOpen(true);
    }
  }

  const restoreAccount = () => {
    if (restoreModalIsOpen) {
      setModalIsLoading(true);
      AccountService.restoreUserAccount(ParamId).then((res) => {
        if (res) {
          if (res.account) {
            setAccountDetails(res.account);
          }
          setRestoreModalIsOpen(false);
          setDeleteModalIsOpen(false);
          setModalIsLoading(false);
        }
      })
    } else {
      setRestoreModalIsOpen(true);
    }
  }

  useEffect(() => {
    if (JSON.stringify(accountDetails) !== JSON.stringify(inFormAccountDetails)) {
      setDataIsModified(true);
    } else {
      setDataIsModified(false);
      SetIsLoading(false);
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
    <>
      {(deleteModalIsOpen || restoreModalIsOpen) &&
        <div className='delete-modal-overlay' onClick={() => { setDeleteModalIsOpen(false); setRestoreModalIsOpen(false) }}>
          <div className='delete-modal-content' onClick={(e) => e.stopPropagation()}>
            {modalIsLoading ?
              <LoadingImage />
              :
              <>
                {deleteModalIsOpen && <>
                  <p>
                    {`Are you sure you want to delete account ${inFormAccountDetails?.Username} [${inFormAccountDetails?.Email}] `}
                    <span style={{ fontWeight: 'bold', color: 'white', letterSpacing: '0.05em' }}>
                      {inFormAccountDetails?.Status === "Deleted" ? 'permanently' : 'preliminarily'}
                    </span>
                    ?
                  </p>
                  <div>
                    <button
                      onClick={() => setDeleteModalIsOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => deleteAccount()}>Confirm</button>
                  </div>
                </>}
                {restoreModalIsOpen && <>
                  <p>
                    Are you sure you want to <span style={{ fontWeight: 'bold', color: 'white', letterSpacing: '0.05em' }}>restore</span> account {inFormAccountDetails?.Username} [{inFormAccountDetails?.Email}]
                    ?
                  </p>
                  <div>
                    <button
                      onClick={() => setRestoreModalIsOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => restoreAccount()}>Confirm</button>
                  </div>
                </>}
              </>}
          </div>
        </div>
      }
      <div className="modal-overlay" onClick={() => navigate('../')}>
        <hr />
        <div ref={thisWindowRef} className="modal-content"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(event) => {
            if (dataIsModified && event.key === 'Enter') {
              saveFormData();
            }
            if (event.key === 'Escape') {
              if (dataIsModified) {
                restoreFormData();
              } else {
                navigate('../');
              }
            }
          }}
          tabIndex={0}
        >
          {!inFormAccountDetails && <>
            <p style={{ textAlign: 'center', fontSize: '1.5em' }}>This account isn't exist</p>
          </>}
          {inFormAccountDetails && <>
            <div className="content-header">
              {!isCurrentUser && <p style={dataIsModified ? { opacity: 1 } : { opacity: 0.2 }}>{dataIsModified ? 'Changes are not saved.' : 'Changes are saved.'}</p>}
              {isLoading ? <h2>Loading...</h2> : <>
                {isCurrentUser ? (
                  <h2><span>{inFormAccountDetails?.Username ? inFormAccountDetails.Username : ParamId === '0' ? 'Create new user' : 'Empty'}</span> <span style={{ color: '#7c68ff' }}>[ Current user ]</span></h2>
                ) : (
                  <>
                    {inFormAccountDetails?.Status === "Deleted" ? (
                      <h2><span>{inFormAccountDetails?.Username ? inFormAccountDetails.Username : 'Empty'}</span> <span style={{ color: 'black' }}>[ Deleted ]</span></h2>
                    )
                      :
                      (
                        <h2><span>{inFormAccountDetails?.Username ? inFormAccountDetails.Username : ParamId === '0' ? 'Create new user' : 'Empty'}</span> {inFormAccountDetails?.Status && (<span style={inFormAccountDetails?.Status === 'Active' ? { color: '#0F0' } : inFormAccountDetails.Status === 'Frozen' ? { color: '#00b0cf' } : { color: '#f00' }}>[ {inFormAccountDetails.Status} ]</span>)}</h2>
                      )}
                  </>
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
                      disabled={inputIsDisabled}
                      className={inputIsDisabled ? 'disabledInput' : 'activeInput'}
                      placeholder="Username"
                    />
                  </div>
                  <div>
                    <p>Title</p>
                    <select
                      value={inFormAccountDetails?.Title?._id || ''}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        if (inFormAccountDetails) {
                          setInFormAccountDetails({
                            ...inFormAccountDetails,
                            Title: userTitlesList.find((title) => title._id === e.target.value),
                          });
                        }
                      }}
                      disabled={inputIsDisabled}
                      className={inputIsDisabled ? 'disabledInput' : 'activeInput'}
                    >
                      <option disabled={true} value={''}>Select Status</option>
                      {userTitlesList.map((title) => (
                        <option key={title._id} value={title._id || ''}>{title.Title}</option>
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
                      disabled={inputIsDisabled}
                      className={inputIsDisabled ? 'disabledInput' : 'activeInput'}
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
                      disabled={inputIsDisabled}
                      className={inputIsDisabled ? 'disabledInput' : 'activeInput'}
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
                            draggable={!isCurrentUser && CurrentUserPrivilege.isUserPrivilegesManaging() && inFormAccountDetails.Status !== 'Deleted' && userPrivileges.map((privilege: IPrivileges) => privilege.Title).includes(privilege.Title) ? true : false}
                            onDragStart={(e) => dragStartHandler(e, privilege)}
                            onDragEnd={(e) => dragEndHandler(e)}
                            className={!isCurrentUser && CurrentUserPrivilege.isUserPrivilegesManaging() && inFormAccountDetails.Status !== 'Deleted' && userPrivileges.map((privilege: IPrivileges) => privilege.Title).includes(privilege.Title) ? 'available' : 'unavailable'}
                          >
                            {privilege.Title}
                          </p>
                        )
                      }
                      {inFormAccountDetails?.Privileges
                        && inFormAccountDetails?.Privileges.length === 0
                        && <p>No privileges</p>
                      }
                    </div>
                  </div>
                  {userPrivileges
                    && CurrentUserPrivilege.isUserPrivilegesManaging()
                    && !isCurrentUser
                    && inFormAccountDetails?.Status !== 'Deleted'
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

                {isCurrentUser &&
                  <Link to='/Account/Settings' style={{ textDecoration: 'none' }}>
                    <button className='to-settings-button'>Go to settings</button>
                  </Link>
                }
                {!isCurrentUser &&
                  <div className="action-buttons">
                    {CurrentUserPrivilege.isUserStatusManaging() &&
                      <>
                        <button
                          className={inFormAccountDetails?.Status === 'Frozen' ? 'activate-button' : 'freeze-button'}
                          onClick={() => inFormAccountDetails?.Status === 'Frozen' ? activateAccount() : freezeAccount()}
                        >
                          {inFormAccountDetails?.Status === 'Frozen' ? 'Unfreeze' : 'Freeze'}
                        </button>
                        <button
                          className={inFormAccountDetails?.Status === 'Blocked' ? 'activate-button' : 'block-button'}
                          onClick={() => inFormAccountDetails?.Status === 'Blocked' ? activateAccount() : blockAccount()}
                        >
                          {inFormAccountDetails?.Status === 'Blocked' ? 'Unblock' : 'Block'}
                        </button>
                      </>
                    }
                    <button
                      className='save-changes-button'
                      disabled={!dataIsModified}
                      onClick={() => saveFormData()}
                    >
                      {dataIsModified ? 'Save changes' : 'Changes saved'}
                    </button>
                    <div className='delete-or-restore-buttons'>
                      {ParamId !== '0'
                        && inFormAccountDetails?.Status === 'Deleted'
                        &&
                        <>
                          {CurrentUserPrivilege.isUserRestore() && <button
                            className='restore-button'
                            onClick={() => restoreAccount()}
                          >
                            Restore account
                          </button>}

                          {CurrentUserPrivilege.isUserDeletePermanently() && <button
                            className='delete-permanently-button'
                            onClick={() => deleteAccount()}
                          >
                            Delete account permanently
                          </button>}
                        </>
                      }
                      {CurrentUserPrivilege.isUserDeletePreliminarily()
                        && ParamId !== '0'
                        && inFormAccountDetails?.Status !== 'Deleted'
                        &&
                        <button
                          className='delete-preliminary-button'
                          onClick={() => deleteAccount()}
                        >
                          Delete account preliminarily
                        </button>
                      }
                    </div>
                  </div>
                }
              </>
            }

          </>}

        </div>
        <hr />
      </div>
    </>
  );
};

export default AccountModalWindow;