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

  type AccountContextType = [IAccount | null, React.Dispatch<React.SetStateAction<IAccount | null>>];
  const [accountDetails, setAccountDetails] = useOutletContext<AccountContextType>();

  const userPrivileges = useSelector((state: RootState) => state.userPrivileges);

  const [userStatusesList, setUserStatusesList] = useState<IStatus[]>([]);

  const [inFormAccountDetails, setInFormAccountDetails] = useState<IAccount | null>(accountDetails);

  const [dataIsModified, setDataIsModified] = useState<boolean>(false);

  const [isCurrentUser, setIsCurrentUser] = useState<boolean>(GetCurrentUserId() === ParamId);

  const [currentUserCurrentPrivilegesList, setCurrentUserCurrentPrivilegesList] = useState<IPrivileges[]>([]);
  const [currentUserAvailablePrivilegesList, setCurrentUserAvailablePrivilegesList] = useState<IPrivileges[]>([]);

  // const [currentUserPrivilegesList, setCurrentUserPrivilegesList] = useState<IPrivileges[]>([]);

  useEffect(() => {
    if (!accountDetails) {
      AccountService.getAccountById(ParamId).then((account) => {
        setAccountDetails(account);
        setInFormAccountDetails(account);
        setCurrentUserCurrentPrivilegesList(account?.Privileges || []);
      });
    }

    AccountService.getUserStatuses().then((result) => {
      setUserStatusesList(result);
    });

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'initial';
    };
  }, [])

  useEffect(() => {
    setInFormAccountDetails(accountDetails);
  }, [accountDetails]);

  useEffect(() => {
    const currentPrivilegesTitles = currentUserCurrentPrivilegesList.map(privilege => privilege.Title);
    const availablePrivileges = userPrivileges.filter((privilege: string) => !currentPrivilegesTitles.includes(privilege));
    // setCurrentUserAvailablePrivilegesList(availablePrivileges);
    console.log(availablePrivileges)
  }, [currentUserCurrentPrivilegesList])

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

  return (
    <div className="modal-overlay" onClick={() => navigate(-1)}>
      <hr />
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="content-header">
          <p style={dataIsModified ? { opacity: 1 } : { opacity: 0.2 }}>{dataIsModified ? 'Changes are not saved.' : 'Changes are saved.'}</p>
          <h2><span>{accountDetails?.Username}</span> {accountDetails?.AccountStatus && (<span style={accountDetails?.AccountStatus === 'Active' ? { color: '#0F0' } : accountDetails.AccountStatus === 'Frozen' ? { color: '#00b0cf' } : { color: '#f00' }}>[ {accountDetails.AccountStatus} ]</span>)}</h2>
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
            <div className='current-privileges-list'>
              {currentUserCurrentPrivilegesList && currentUserCurrentPrivilegesList.length > 0 && currentUserCurrentPrivilegesList.map((privilege) =>
                <p key={privilege._id}>{privilege.Title}</p>
              )}
            </div>
          </div>
          {userPrivileges && userPrivileges.includes('UserPrivilegesManaging') && !isCurrentUser && <div className='available-privileges'>
            <p>Available privileges</p>
            <div className='available-privileges-list'>
              {currentUserAvailablePrivilegesList && currentUserAvailablePrivilegesList.length > 0 && currentUserAvailablePrivilegesList.map((privilege) =>
                <p key={privilege._id}>{privilege.Title}</p>
              )}
            </div>
          </div>}
        </div>

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
      </div>
      <hr />
    </div>
  );
};

export default AccountModalWindow;