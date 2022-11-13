import React, { useState, useRef } from "react";
import "../components/registrration.css";
import user from "../assests/images/user.svg";
import email from "../assests/images/Email.svg";
import pass from "../assests/images/password.svg";
import logo from "../assests/images/logo1.png";
import { ethers } from "ethers";
import Poo from "../artifacts/contracts/Poo.sol/Poo.json";
import { useNavigate } from "react-router-dom";
import spin from "../assests/images/spinner.gif";
// import spin2 from "../assests/images/dot.gif";

function Registration() {
  const [loader, setLoader] = useState(false);
  const [userData, setUserData] = useState({ name: "", email: "" });
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const navigate = useNavigate();
  const registerUser = async () => {
    setLoader(true);
    console.log(userData);
    const Poo_contract_address = "0xDBB86968f591537F30a5b3FeB8D4cc6aec3c603b";

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    // console.log(signer);

    const registerUser = new ethers.Contract(
      Poo_contract_address,
      Poo.abi,
      signer
    );
    const saveUserData = await registerUser.registerUser(
      userData.name,
      userData.email,
      ""
    );
    navigate("/profile");
    usernameRef.current.value = "";
    emailRef.current.value = "";

    // console.log(saveUserData);
    const fetchdata = await registerUser.getUser();
    console.log(fetchdata);
    setLoader(false);
  };

  return (
    <>
      <div className="poo-registration">
        <div className="p-signup-main-div">
          <div className="logo-register-main">
            <img src={logo} className="logo-register" />
          </div>
          <div className="signup-title font-face-gm-aqiure">REGISTER HERE</div>
          <div className="p-main-register">
            <div className="user-info-poo">
              <div className="user-main">
                <div className="register-icons1">
                  <img src={user} alt="" className="register-icons2" />
                </div>
                <input
                  type="text"
                  id="first_name"
                  class="bg-gray-50 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 p-register-input p-username"
                  placeholder="Username"
                  ref={usernameRef}
                  required
                  onChange={(e) => {
                    setUserData({ ...userData, name: e.target.value });
                  }}
                />
              </div>
              <div className="user-main">
                <div className="register-icons1">
                  <img src={email} alt="" className="register-icons2" />
                </div>
                <input
                  type="email"
                  id="first_name"
                  class="bg-gray-50 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 p-register-input p-username"
                  placeholder="Email"
                  ref={emailRef}
                  required
                  onChange={(e) => {
                    setUserData({ ...userData, email: e.target.value });
                  }}
                />
              </div>
              <div className="p-button">
                <button
                  type="button"
                  class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium  rounded-full border signup-btn font-face-gm-aquire-bold"
                  onClick={() => registerUser()}
                >
                  {loader ? (
                    <img
                      src={spin}
                      height="100"
                      width="40"
                      className="spinner2-mint"
                    />
                  ) : (
                    " REGISTER"
                  )}
                </button>
              </div>
              <div class="mb-6"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Registration;
