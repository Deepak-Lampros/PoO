// import React from "react";
import "../components/singlecertificate.css";
// import UserProfile from './userProfile';
import Poo from "../artifacts/contracts/Poo.sol/Poo.json";
import dnft from "../assests/images/dummynft.png";
import date from "../assests/images/date.svg";
import React, { useRef, useState, useEffect } from "react";
import * as htmlToImage from "html-to-image";
import logo from "../assests/images/logo1.png";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import spin from "../assests/images/spinner.gif";

function CreationCertificate() {
  const [loader, setLoader] = useState(false);
  const [name, setName] = useState();
  const [temp, setTemp] = useState();
  const navigate = useNavigate();
  const domEl = useRef(null);
  let metdataUri = "";
  let imageUri = "";
  const dataFetchedRef = useRef(false);
  const inputRef = useRef();

  const Poo_contract_address = "0xDBB86968f591537F30a5b3FeB8D4cc6aec3c603b";
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  // const [data, setdata] = useState();
  const location = useLocation();
  const datas = location.state.data;
  console.log(datas);
  console.log("Location", location.state.data);

  const userDetails = new ethers.Contract(
    Poo_contract_address,
    Poo.abi,
    signer
  );

  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  const getUser = async () => {
    const fetchdata = await userDetails.getUser();
    setName(fetchdata);
    console.log(fetchdata);
    // console.log(UserProfile.getName());
  };

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    getUser();
  }, []);

  const downloadImage = async () => {
    // console.log("bhadresh");
    const dataUrl = await htmlToImage.toPng(domEl.current);
    var file = dataURLtoFile(dataUrl, "certificate.png");
    console.log(file);
    // console.log(dataUrl);
    // setTemp(dataUrl);
    // const link = document.createElement("a");
    // link.download = "html-to-img.png";
    // link.href = dataUrl;

    console.log(temp);
    // link.click();
    // inputRef.current.value = temp;
    // const input = document.getElementById("lname-create-certi").value;
    // console.log(input);
  };

  const mintCertificate = async (e) => {
    setLoader(true);
    e.preventDefault();

    const dataUrl = await htmlToImage.toPng(domEl.current);
    var file = dataURLtoFile(dataUrl, "hello.png");
    console.log(file);

    // console.log(dataURIToBlob(dataUrl));
    // const nftImage = dataURIToBlob(dataUrl);

    // const nftImage = e.target.nftImage_id.files[0];
    // if (nftImage == undefined) {
    //   alert("please select an Image");
    //   return;
    // }
    // console.log(nftImage);

    const form = new FormData();
    form.append("file", file);

    const options = {
      method: "POST",
      url: "https://api.nftport.xyz/v0/files",
      headers: {
        "Content-Type":
          "multipart/form-data; boundary=---011000010111000001101001",
        Authorization: "3a00a5ae-f74a-4369-820d-8da1cc435690",
      },
      data: form,
    };
    console.log(options);
    e.preventDefault();

    await axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        console.log(response.data.ipfs_url);

        imageUri = response.data.ipfs_url;
      })
      .catch(function (error) {
        console.error(error);
      });

    const metadata = {
      method: "POST",
      url: "https://api.nftport.xyz/v0/metadata",
      headers: {
        "Content-Type": "application/json",
        Authorization: "3a00a5ae-f74a-4369-820d-8da1cc435690",
      },
      data: {
        name: "Ownership Certificate",
        description: "This is Certificate of Ownership Provided By POO",
        file_url: imageUri,
      },
    };

    await axios
      .request(metadata)
      .then(function (response) {
        console.log(response.data);
        metdataUri = response.data.metadata_uri;
      })
      .catch(function (error) {
        console.error(error);
      });

    const account = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    var address = account[0];
    const mintNft = new ethers.Contract(Poo_contract_address, Poo.abi, signer);
    const mintNFT = await mintNft.storeCertificate(
      // "0xeB05322B3C154121AA9114C570e393033074E1E2",
      address,
      imageUri,
      false
    );
    console.log(mintNFT);
    setLoader(false);
    navigator("/ownershipcertificate");
  };

  return (
    <>
      {/* <div className="p-signle-certi-main">
        <div className="nft-name"> NFT Name:</div>
        <div className="p-creation-certficate">
       

          <div className="p-single-certi-info">
            <h3>NFT Details</h3>
            <div>Frome Date: dd/mm/yyyy</div>
            <div>To Date: dd/mm/yyyy</div>
          </div>
        </div>
        <div className="cetificate-name">Certificate</div>
        <div className="p-single-certificate-ownership">
          <div className="certificate-main">
            <div className="p-certificate">CERTIFICATE</div>
            <div className="p-signle-certificate-content">
              <img src={img1} className="p-single-certi-img" />
              <div className="single-certi-info2">
                <h3>Owner Name</h3>
                <h3>NFT Title</h3>
                <div>Owning Date</div>
                <div>Current Date</div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <div className="p-creation-certi-main">
        <div className="create-certi-div2">
          <div className="nft-name font-face-gm-aquire-bold">
            {" "}
            {datas.metadata.name}
          </div>
          <div className="nft-name font-face-gm-aquire-bold"> </div>
          <div className="p-creation-certficate">
            <img
              src={datas.metadata.image}
              alt={datas.metadata.name}
              className="singlecertificate-nfts-image"
            />

            <div className="creation-certi-info">
              <h3 className="creation-nft-details font-face-gm-medium">
                NFT Details
              </h3>

              <div className="input-main">
                <div className="datepicker">FROM </div>
                <img src={date} alt="" className="certificate-date-icon" />
                <div className="div5">
                  <h3 className="date-input1 font-face-gm">
                    {datas.from_date === undefined
                      ? datas.block_timestamp.slice(0, 10)
                      : datas.from_date.slice(0, 10)}
                  </h3>
                </div>
              </div>

              <div className="input-main">
                <div className="datepicker">TO </div>
                <img src={date} alt="" className="certificate-date-icon" />
                <div className="div5">
                  <h3 className="date-input1 font-face-gm">
                    {datas.from_date === undefined
                      ? new Date().toISOString().slice(0, 10)
                      : datas.block_timestamp.slice(0, 10)}
                  </h3>
                  {/* <input
                    type="file"
                    className="date-input1"
                    id="lname-create-certi"
                    name="lname-create-certi"
                    placeholder="DD/MM/YYYY"
                    value={temp}
                    ref={inputRef}

                  /> */}
                </div>
              </div>
            </div>
          </div>

          <div className="cetificate-name font-face-gm-aquire-bold">
            Certificate Preview:
          </div>
          <div id="domEl" ref={domEl}>
            <div className="p-single-certificate-ownership">
              <div className="certificate-main">
                <div className="p-certificate font-face-gm-semibold">
                  CERTIFICATE
                </div>
                <div className="p-signle-certificate-content">
                  <img
                    src={datas.metadata.image}
                    alt=""
                    className="singlecertificate-nfts-img5"
                  />
                  <div className="single-certi-info2">
                    <h3 className="p-owner-name font-face-gm-semibold">
                      {name ? name.name : null}
                    </h3>
                    <h3 className="p-owner-title">{datas.metadata.name}</h3>
                    <div className="p-certi-content10">
                      <div className="font-face-gm-extralight  owner-period1 ">
                        Ownership Period
                      </div>
                      <div className="font-face-gm-extralight owner-period2">
                        {datas.from_date === undefined
                          ? datas.block_timestamp.slice(0, 10)
                          : datas.from_date.slice(0, 10)}{" "}
                        -{" "}
                        {datas.from_date === undefined
                          ? "Present"
                          : datas.block_timestamp.slice(0, 10)}
                      </div>
                    </div>
                    <div className="p-certi-content11">
                      <div className="font-face-gm-extralight">
                        Nft was verified on
                      </div>
                      <div className="font-face-gm-extralight verify-by">
                        Verified By
                      </div>
                    </div>
                    <div className="p-certi-content12">
                      <div className="font-face-gm-extralight  owner-period3">
                        {new Date().toISOString().slice(0, 10)}
                      </div>
                      <img
                        src={logo}
                        alt=""
                        className="p-nft-verifify own-verify "
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={mintCertificate}
            className="p-mint-nft font-face-gm-bold"
          >
            {loader ? (
              <img
                src={spin}
                height="100"
                width="40"
                className="spinner-mint"
              />
            ) : (
              "MINT NFT"
            )}
          </button>
          {/* <button onclick={() => downloadImage()} >Download Image</button> */}
        </div>
      </div>
    </>
  );
}
export default CreationCertificate;
