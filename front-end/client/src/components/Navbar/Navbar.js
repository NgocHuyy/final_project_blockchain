import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Navbar.css";
import getWeb3 from "../../getWeb3";
import axios from "axios";

const Navbar = (props) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [addressUser, setAddressUser] = useState();
  const [isMobile, setIsMobile] = useState(false);

  const [isShowUserLogin, setIsShowUserLogin] = useState(false);
  const [web3, setWeb3] = useState();
  let history = useHistory();

  const handleShowUserLogin = () => {
    setIsShowUserLogin(!isShowUserLogin);
  };

  useEffect(() => {
    if(props.addressUser){
      console.log("addressUser",addressUser)
      setAddressUser(props.addressUser);
    }
  }, [props.addressUser]);

  useEffect(() => {
    if (props.web3) {
      setWeb3(props.web3);
      if (localStorage.getItem("accessToken")) {
        const addrr = JSON.parse(localStorage.getItem("accessToken"));
        if (addressUser != addrr.userAddress && addressUser) {
          localStorage.removeItem("accessToken");
          history.replace("/login")
        }
        setIsAdmin(addrr.admin);
      }
    }
  }, [props.web3])

  const address = async () => {
    const web3 = await getWeb3();
    const accounts = await web3.eth.getAccounts();
    setAddressUser(accounts[0]);
  }

  const changeStateUser = async () => {
    const user = await axios.patch(`http://localhost:5000/auth/updateStateUser/${addressUser}`, {
      state: false
    }).then(res =>{ 
      const person = res.data;
      console.log(person)
    });
  }

  const logout = () => {
    localStorage.removeItem("accessToken");
    history.replace("/login");
    changeStateUser();
    setIsShowUserLogin(!isShowUserLogin);
    props.handleClickSuccess();
  }

  return (
    <nav className="navbar">
      <h3 className="logo">
        <Link to="/" className="logo">MARKET PLACE</Link>
      </h3>
      <ul className={isMobile ? "nav-links-mobile" : "nav-links"} >
        
        {
          localStorage.getItem("accessToken")
            ? <>
            <Link to="/createProduct" className="create">
              <li>Create</li>
            </Link>
              <div className="header__log" onClick={handleShowUserLogin}>
                <svg
                  className="header__log--icon"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                >
                  {/* <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" /> */}
                </svg>
                <p className="header__log--text">{addressUser}</p>
              </div>
              <div
                className={
                  !isShowUserLogin ? `dropdown-menu` : `dropdown-menu active`
                }
              >

                {isAdmin &&
                
                  <>
                    <Link
                      to="/dashboard"
                      className="menu-content"
                      onClick={handleShowUserLogin}
                    >
                     
                      <p className="menu-title">Dashboard</p>
                    </Link>
                  </>
                }

              

                <Link
                  className="menu-content"
                  to="/login"
                  onClick={() => { logout() }}
                >
                  
                  <p className="menu-title">Logout</p>
                </Link>
              </div>
            </>
            : <Link to="login" className="signup">
              {/* <li>Sign Up</li> */}
            </Link>
        }
      </ul>
      <button className="mobile-menu-icon"
        onClick={() => setIsMobile(!isMobile)}
      >
        {isMobile ? <i className="fas fa-times"></i> : <i className="fas fa-bars"></i>}
      </button>
    </nav>
  )
}

export default Navbar;