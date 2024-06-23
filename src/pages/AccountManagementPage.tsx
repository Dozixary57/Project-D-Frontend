import { Helmet } from "react-helmet-async";
import { Navbar } from "../components/elements/navigation_bar/Navbar";
import "./AccountManagementPage.scss"
import { useEffect, useState } from "react";
import AccountService from "../backend/services/accountService";
import { RootState } from "../ReduxStore/store";
import { useSelector } from "react-redux";
import { DateFormatter } from "../tools/DateTimeFormatter";
import LoadingImage from "../components/LoadingImage/LoadingImage";
import { Link, Outlet } from "react-router-dom";
import { IAccount } from "../Interfaces/IAccounts";
import { GetCurrentUserId } from "../components/GetUserData/GetUserData";

const AccountManagementPage = () => {
  const userPrivileges = useSelector((state: RootState) => state.userPrivileges);

  const [accountList, setAccountList] = useState<IAccount[]>([]);
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);
  const [accountDetails, setAccountDetails] = useState<IAccount | null>(null);
  const [accountDetailsIsLoading, setAccountDetailsIsLoading] = useState<boolean>(false);

  useEffect(() => {
    AccountService.getAccounts().then((result) => {
      setAccountList(result);
    });
  }, []);

  const handleSelectAccount = (accountId: string) => {
    if (selectedAccountId === accountId) {
      setSelectedAccountId(null);
      setAccountDetails(null);
    } else {
      setAccountDetailsIsLoading(true);
      setSelectedAccountId(accountId);
      AccountService.getAccountById(accountId).then((account) => {
        setAccountDetails(account);
        setAccountDetailsIsLoading(false);
      });
    }
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Account management | Project D</title>
      </Helmet>
      <Navbar />
      <Outlet />
      <main className="ACCOUNT_MANAGEMENT_PAGE">
        <div className="PageHeader">
          <p>Account management</p>
        </div>
        <div className="PageContent">
          <div className="AccountContent">
            <div className="SearchBar">
              <input type="text" placeholder="Search..." />
            </div>

            <Link to="0" className="CreateNewAccount">
              <button>
                Create new account
              </button>
            </Link>

            <div className="AccountList">
              {accountList && accountList.length > 0 ?
                accountList.map((account) => (
                  <button className="AccountElement" key={account._id} style={selectedAccountId === account._id? { backgroundColor: 'rgba(170, 170, 170, 0.15)', boxShadow: '0 0 0 0.1em rgba(170, 170, 170, 0.5)', color: 'white' } : { color: '#AAA'}} onClick={() => handleSelectAccount(account._id)}>
                    <div className="AccountIcon">
                      <img src={require("../images/ThePlagueDoctor.png")} alt="Account Icon" />
                    </div>
                    <div className="AccountInfo">
                      <div>
                        <p>{account.Username}</p>
                        <p>{account.Email}</p>
                      </div>
                      {!selectedAccountId &&
                      <div>
                        {account._id === GetCurrentUserId() ? (<p className="current-user">[ Current user ]</p>) : (<p style={account.AccountStatus === 'Active' ? { color: '#0F0' } : account.AccountStatus === 'Frozen' ? { color: '#00b0cf' } : { color: '#f00' }}>{account.AccountStatus? `[ ${account.AccountStatus} ]` : ''}</p>)}
                      </div>}
                    </div>
                  </button>
                ))
                :
                (
                  <p>No accounts found</p>
                )}
            </div>
          </div>
          {selectedAccountId && (
            <div className="AccountDetailsPanel">
              <div className="AccountDetails">
                <h3>Account details</h3>
                {accountDetailsIsLoading ? (
                  <LoadingImage />
                )
                :
                accountDetails && (
                  <>
                    <div>
                      <p>Account ID:</p>
                      <p>{accountDetails._id}</p>
                    </div>
                    <div>
                      <p>Username:</p>
                      <p> {accountDetails.Username}</p>
                    </div>
                    <div>
                      <p>Email:</p>
                      <p>{accountDetails.Email}</p>
                    </div>
                    {accountDetails.DateOfBirth && (<div>
                      <p>Date of birth:</p>
                      <p>{DateFormatter(accountDetails.DateOfBirth)}</p>
                    </div>)}                  
                    {accountDetails.Privileges && (
                      <div>
                        <p>Privileges:</p>
                        <ul>
                          {accountDetails.Privileges.map((privilege) => <li key={privilege._id}>{privilege.Title}</li>)}
                        </ul>
                      </div>
                    )}
                    <Link to={`${accountDetails._id}`}>
                      <button>Account modification</button>
                    </Link>
                  </>
                )}
              </div>
            </div>)}
          </div>
      </main>
    </>
  )
}

export { AccountManagementPage };