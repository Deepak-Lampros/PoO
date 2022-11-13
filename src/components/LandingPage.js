import React from "react";
import Cookies from "universal-cookie";

// import UserProfile from './userProfile';

import bigbg from "../assests/images/background.svg";
import topwave from "../assests/images/top-waves.svg";
import "../components/landingpage.css";
import nftvideo from "../assests/video.mp4";
import circle2 from "../assests/images/circle2.svg";
import circle1 from "../assests/images/circle1.svg";
import abort1 from "../assests/images/abortwave.svg";
import img1 from "../assests/images/img1.svg";
import img2 from "../assests/images/img2.svg";
import img3 from "../assests/images/img3.svg";
import img4 from "../assests/images/img4.svg";
import img5 from "../assests/images/img5.svg";
import img6 from "../assests/images/img6.svg";
import img7 from "../assests/images/img7.svg";
import img8 from "../assests/images/img8.svg";
import coin from "../assests/images/coin.svg";
import certificate from "../assests/images/certificate.svg";
import certiImg from "../assests/images/certificate-img.svg";
import verify from "../assests/images/logo1.png";
import Poo from "../artifacts/contracts/Poo.sol/Poo.json";
import { ethers } from "ethers";

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function LandingPage() {
  const cookies = new Cookies();
  const [walletAddress, setWalletAddress] = useState("");
  const navigate = useNavigate();
  const Poo_contract_address = "0xDBB86968f591537F30a5b3FeB8D4cc6aec3c603b";
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  // console.log(signer);

  useEffect(() => {
    // getCurrentWalletConnected();
    // addWalleteListener();
  }, []);

  const connectWallet = async () => {
    if (typeof window != "undefined" && window.ethereum != "undefined") {
      try {
        const account = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(account[0]);
        const userDetails = new ethers.Contract(Poo_contract_address, Poo.abi, signer);
        const fetchdata = await userDetails.getUser();
        if (fetchdata.email === "") {
          navigate("/register");
        }
        else {
          navigate("/profile");
        }
        console.log(account[0]);
      } catch (err) {
        console.error(err.message);
      }
    } else {
      console.log("Please Install Metamast");
    }
  };


  //   if (typeof window != "undefined" && window.ethereum != "undefined") {
  //     try {
  //       const account = await window.ethereum.request({
  //         method: "eth_requestAccounts",
  //       });
  //       setWalletAddress(account[0]);
  //       // UserProfile.setName(account[0]);
  //       console.log(walletAddress);
  //       console.log(account[0]);
  //       // console.log(Cookies.get("wallet_address"));
  //       // console.log(UserProfile.getName());

  //       const { chainId } = await provider.getNetwork();
  //       console.log(chainId);
  //       const polygon_chainId = "0x13881"; //Its in HEX of 647426021
  //       if (chainId == polygon_chainId) {
  //         console.log("Bravo!, you are on the correct network");
  //       } else {
  //         console.log("oulalal, switch to the correct network");
  //         try {
  //           await window.ethereum.request({
  //             method: "wallet_switchEthereumChain",
  //             params: [{ chainId: "0x13881" }],
  //           });
  //           console.log("You have switched to the right network");
  //         } catch (switchError) {
  //           // The network has not been added to MetaMask
  //           if (switchError.code === 4902) {
  //             console.log("this chainId does not exist");
  //           }
  //           console.log("Cannot switch to the network");
  //         }
  //       }

  //       const userDetails = new ethers.Contract(
  //         Poo_contract_address,
  //         Poo.abi,
  //         signer
  //       );
  //       const fetchdata = await userDetails.getUser();
  //       console.log(fetchdata);
  //       if (fetchdata.email === "") {
  //         navigate("/register");
  //       } else {
  //         navigate("/profile");
  //       }
  //       console.log(account[0]);
  //     } catch (err) {
  //       console.error(err.message);
  //     }
  //   } else {
  //     console.log("Please Install Metamast");
  //   }
  // };

  const getCurrentWalletConnected = async () => {
    if (typeof window != "undefined" && window.ethereum != "undefined") {
      try {
        const account = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        if (account.length > 0) {
          setWalletAddress(account[0]);
          console.log(account[0]);
        } else {
          console.log("connect to metamask using connect button");
        }
      } catch (err) {
        console.error(err.message);
      }
    } else {
      alert("Please Install Metamast");
    }
  };

  const addWalleteListener = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      window.ethereum.on("accountChanged", (account) => {
        setWalletAddress(account[0]);
        console.log(account[0]);
      });
    } else {
      setWalletAddress("");
      console.log("Please Install Metamast");
    }
  };
  return (
    <>
      <section className="poo-main-section">
        <div className="poo-section1-landingpage">
          <div className="logo-landingpage-main">
            <img src={verify} className="logo-register" />
          </div>
          <div className="p-navbar-main">
            <button
              onClick={() => {
                connectWallet();
              }}
              className="p-connect-btn font-face-gm-aqiure"
            >
              {walletAddress && walletAddress.length > 0
                ? `Connected: ${walletAddress.substring(
                  0,
                  6
                )}...${walletAddress.substring(38)}`
                : " Connect Wallet"}
            </button>
          </div>
          <div className="p-wave1-main">
            <img src={topwave} alt="waves" className="p-top1-waves" />
          </div>
          <div className="d-hero">
            <video autoPlay loop muted className="p-middle-video">
              <source src={nftvideo} type="video/mp4" />
              <source src={nftvideo} type="video/ogg" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="p-wave2-main">
            <img src={topwave} alt="waves" className="p-top2-waves" />
          </div>
        </div>

        <section className="p-section2-landingpage">
          <div className="section2-main-div">
            <div className="p-nft-content font-face-gm">
              <h3>
                "Claim the ownership of your prized possessions - your NFTs!
              </h3>
            </div>
            <div className="temp-svg">
              <div className="p-circle1-svg">
                <img src={circle1} alt="" className="p-circle1" />
              </div>
              <div className="p-circle2-svg">
                <img src={circle1} alt="" className="p-circle2" />
              </div>
            </div>

            <div className="p-abortwave-main ">
              <img src={abort1} alt="abort" className="p-abort-wave" />
            </div>
            <div className="temp-svg2">
              <div className="p-circle3-svg">
                <img src={circle1} alt="" className="p-circle3" />
              </div>
              <div className="p-circle4-svg">
                <img src={circle1} alt="" className="p-circle4" />
              </div>
            </div>

            <div className="p-nfts-main">
              <img src={img1} alt="" className="nfts p-img1" />
              <img src={img2} alt="" className="nfts p-img2" />
              <img src={img3} alt="" className="nfts p-img3" />
              <img src={img4} alt="" className="nfts p-img4" />
              <img src={img5} alt="" className="nfts p-img5" />
              <img src={img6} alt="" className="nfts p-img6" />
              <img src={img7} alt="" className="nfts p-img7" />
              <img src={img8} alt="" className="nfts p-img8" />
            </div>
          </div>
        </section>

        <section className="p-section3-landingpage">
          <div className="certi-heading font-face-gm">
            <h3>
              PoO parses the blockchain data and creates a digital certificate
              as a proof of ownership
            </h3>
          </div>
          <div className="section3-main-div">
            <div className="coin-circle-flex">
              <div className="p-coin-main">
                <img src={coin} alt="" className="p-nft-coin" />
              </div>
              <div className="p-circle-main">
                <img src={circle1} alt="" className="p-circle-5" />
              </div>
            </div>

            <div className="p-nft-certi-main-poo">
              <img src={certificate} alt="" className="p-nft-certificate" />

              <div className="img-content-flex">
                <img src={certiImg} alt="" className="p-nft-certificateImage" />
                <div className="certi-title font-face-gm-extralight ">
                  Certificate Of Ownership
                </div>

                <div className="p-certi-content3">
                  <div className="font-face-gm ownership-periods">
                    Ownership Periods
                  </div>
                  <div className="font-face-gm-thin">
                    10th Oct 2022 - 12th Oct 2022
                  </div>
                </div>
                <div className="p-certi-content">
                  <div className="font-face-gm">Nft was verified on</div>
                  <div className="font-face-gm">Verified By</div>
                </div>
                <div className="p-certi-content2">
                  <div className="font-face-gm-thin">17/10/2022</div>
                  <img src={verify} alt="" className="p-nft-verifify" />
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="landigpage-footer font-face-gm">
          <h3>Copyright © 2022 PoO. All Rights Reserved</h3>
        </div>
      </section>
    </>
  );
}

export default LandingPage;
