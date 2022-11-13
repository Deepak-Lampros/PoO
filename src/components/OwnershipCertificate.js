import react, { useEffect, useState } from "react";
import "../components/ownershipcertificate.css";
import Poo from "../artifacts/contracts/Poo.sol/Poo.json";

import { Link } from "react-router-dom";
import { ethers } from "ethers";

function OwnershipCertificate() {
  const Poo_contract_address = "0x41abd4773aC12e1C68F8b16669B0fE383944EFB4";
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const [certificateData, setCertificateData] = useState([]);

  const fetchCertificate = async (e) => {

    const account = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    var address = account[0];
    const mintNft = new ethers.Contract(Poo_contract_address, Poo.abi, signer);
    const certificates = await mintNft.getTokenIds(
      // "0xeB05322B3C154121AA9114C570e393033074E1E2"
      address
    );
    console.log(certificates);
    setCertificateData(certificates);
  };
  useEffect(() => {
    fetchCertificate();
  }, []);
  return (
    <>
      <div className="ownership-grid-container">
        {certificateData.map((item, i) => {
          return (
            <>
              {" "}
              <div className="ownrship-certi-main">
                <div key={i} className="z-index-main-div">
                  <div className="nft-main-div">
                    <img src={item.tokenIpfsUri}></img>
                  </div>
                  <div className="p-btn-main ">
                    <Link to={"/singlecertificate"} state={{ data: item }}>
                      {/* <Link to={"/createcertificate"} state={{ data: item }}> */}
                      <button className="ownership-btn  font-face-gm-aquire-bold ">
                        Share Certificate
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}
export default OwnershipCertificate;
