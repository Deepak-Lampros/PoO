import React from "react";
import "../components/profile.css";
import user from "../assests/images/user.png";
import { useRef } from "react";
import { ethers } from "ethers";
import Poo from "../artifacts/contracts/Poo.sol/Poo.json";
import react, { useState, useEffect } from "react";
import axios from "axios";

function Profile() {
  const [data, setData] = useState();
  const profile_picture = useRef(null);
  let imageUri = "";
  const dataFetchedRef = useRef(false);
  const Poo_contract_address = "0x41abd4773aC12e1C68F8b16669B0fE383944EFB4";
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const userDetails = new ethers.Contract(
    Poo_contract_address,
    Poo.abi,
    signer
  );

  const getUser = async () => {
    const fetchdata = await userDetails.getUser();
    setData(fetchdata);
    console.log(fetchdata);
  };

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    getUser();
  }, []);

  const UpdateImage = async (e) => {
    const profile_image = e.target.files[0];
    console.log(profile_image);

    const form = new FormData();
    form.append("file", profile_image);

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
  };

  const saveData = async () => {
    if (imageUri === "") {
      alert("Please Select a Profile Image");
      return;
    }
    const UpdateUserImage = await userDetails.UpdateProfileUrl(imageUri);
    console.log(UpdateUserImage);
  };
  return (
    <>
      <div className="profile-main-div">
        <div className="profile-hero-section">
          <div className="profile-form-main">
            <div className="user-profile-div">
              {data ? (
                <img src={data.profile_url} alt="" className="profile-img" />
              ) : (
                <>
                  <img src={user} alt="" className="profile-img" />
                </>
              )}
            </div>

            <div className="div-profile-info">
              <div className="div-username-main">
                <h3></h3>
              </div>
              {data ? (
                <>
                  <div className="div-email-main">
                    <h3>{data.name}</h3>
                  </div>
                  <div className="div-wallet-main">
                    <h3>{data.email}</h3>
                  </div>
                </>
              ) : null}

              <div className="button-flex">
                <div className="edit-profile font-face-gm-aquire-bold">
                  <button
                    onClick={(e) => {
                      profile_picture.current.click();
                    }}
                  >
                    EDIT PICTURE
                  </button>
                  <input
                    className="input-edit-profile"
                    type="file"
                    hidden
                    // defaultValue={nameOfUser}
                    ref={profile_picture}
                    onChange={(e) => {
                      UpdateImage(e);
                    }}
                  />
                </div>
                <div className="div-btn-main font-face-gm-aquire-bold">
                  <button onClick={() => saveData()}>Save</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
