import react, { useEffect, useState } from "react";
import user from "../assests/images/profile.png";
import "../components/navbar.css";
import { Link } from "react-router-dom";
import logo from "../assests/images/logo1.png";
import { useLocation } from "react-router-dom";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [newButton, setNewButton] = useState({ hidden: false });
  const navigate = new useNavigate();
  let location = useLocation();
  useEffect(() => {
    console.log(window.location.pathname);
    console.log(window.location.pathname);
    if (
      window.location.pathname === "/" &&
      window.location.pathname === "/register"
    ) {
      window.location.reload();
    }
  }, [location]);
  const takeToProfile = () => {
    setNewButton({ hidden: true });
    setTimeout(navigate("/profile"), 3000);
  };
  const takeToLogout = () => {
    setNewButton({ hidden: true });
    setTimeout(navigate("/"), 3000);
  };

  return (
    <>
      {window.location.pathname !== "/" &&
      window.location.pathname !== "/register" ? (
        <div className="main-header">
          <div className="header-container">
            <div className="logo">
              <img src={logo} className="logo-navbar" />
            </div>
            <div className="left-navbar">
              <div className="navigation ">
                <ul className="navigation-menu font-face-gm-medium">
                  <li className="submenu home-nav ">
                    <Link to="/currentnft">Currently Owned NFTs</Link>
                  </li>
                  <li className="submenu">
                    <Link to="/previousnft">Previously Owned NFTs</Link>
                  </li>
                  <li className="submenu">
                    <Link to="/ownershipcertificate">
                      Ownership Certificate
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="user-img">
                <Link to="/profile">
                  <img
                    class="p-user"
                    src={user}
                    alt="Rounded avatar"
                    onClick={() => {
                      takeToProfile();
                    }}
                  />{" "}
                </Link>
              </div>
              <div className="download-btn">
                <button
                  className="navbar-button  "
                  onClick={() => {
                    takeToLogout();
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Navbar;
