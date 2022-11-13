import React, { useState } from "react";
import "../components/singlecertificate.css";
import dnft from "../assests/images/dummynft.png";
import date from "../assests/images/date.svg";
import { Link } from "react-router-dom";
import logo from "../assests/images/logo1.png";
import { useLocation } from "react-router-dom";
import Popup from "./Popup";
import Email from "../assests/images/email.png";
import Facebook from "../assests/images/facebook.png";
import Linkedln from "../assests/images/linkedin.png";
import Twitter from "../assests/images/twitter.png";
import Whatsapp from "../assests/images/whatsapp.png";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

function SingleCertificate() {
  const { width, height } = useWindowSize();
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  const location = useLocation();
  const data = location.state.data;

  return (
    <>
      <div className="p-creation-certi-main">
        <Confetti
          width="1900px"
          // height="1200px"
          recycle={false}
          numberOfPieces={500}
          frictio={5}
          className="confetti-div"
        />
        <div className="create-certi-div2">
          <div className="cetificate-name font-face-gm-aquire-bold">
            Certificate Preview:
          </div>
          <img
            src={data.tokenIpfsUri}
            alt=""
            className="singlecertificate-nfts-img4"
          />
          <button
            className="p-mint-nft font-face-gm-bold"
            onClick={togglePopup}
          >
            SHARE
          </button>
        </div>
        {isOpen && (
          <Popup
            content={
              <>
                <div className="pop-main-info">
                  <div className="div-share-content-popup">
                    <img
                      src={Email}
                      alt=""
                      href="www.google.com"
                      className="social-img"
                    />
                    <img src={Facebook} alt="" className="social-img" />
                    <img src={Twitter} alt="" className="social-img" />
                    <img src={Linkedln} alt="" className="social-img" />
                    <img src={Whatsapp} alt="" className="social-img" />
                  </div>
                </div>
              </>
            }
            handleClose={togglePopup}
          />
        )}
      </div>
    </>
  );
}
export default SingleCertificate;
