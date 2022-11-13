import react, { useState, useRef, useEffect } from "react";
import "../components/currentnft.css";
import dnft from "../assests/images/dummynft.png";
import { Link } from "react-router-dom";
import axios from "axios";

function CurrentNft() {
  const [nftData, setNftData] = useState([]);
  let walletNftData = [];
  let transferNftData = [];

  const dataFetchedRef = useRef(false);
  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    fetchCurrentNft();
  }, []);

  const fetchCurrentNft = async () => {
    // console.log(address);
    const account = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    // setWalletAddress(account[0]);

    // var address = account[0];

    var address = "0x032FD736A28521e6413AD7efDf45E6918fC48DFd";
    // console.log(address);
    const walletnft = {
      method: "GET",
      url: `https://deep-index.moralis.io/api/v2/${address}/nft`,
      params: { chain: "polygon", format: "decimal" },
      headers: {
        accept: "application/json",
        "X-API-Key":
          "zx1cuyNtlU6YfCw1ARlaDUSJQLXC5uXlfM9ebpJhJSTbbglLJs6sqvHEF9avPztV",
      },
    };

    await axios
      .request(walletnft)
      .then(function (response) {
        walletNftData.push(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });

    const walletTransfers = {
      method: "GET",
      url: `https://deep-index.moralis.io/api/v2/${address}/nft/transfers`,
      params: { chain: "polygon", format: "decimal", direction: "both" },
      headers: {
        accept: "application/json",
        "X-API-Key":
          "zx1cuyNtlU6YfCw1ARlaDUSJQLXC5uXlfM9ebpJhJSTbbglLJs6sqvHEF9avPztV",
      },
    };

    await axios
      .request(walletTransfers)
      .then(function (response) {
        transferNftData.push(response.data);
        // console.log(transferNftData);
        getFinalNftData();
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  function getFinalNftData() {
    // console.log(transferNftData);
    // console.log(walletNftData);
    // console.log(walletNftData[0].result);
    for (let i = 0; i < walletNftData[0].result.length; i++) {
      for (let j = 0; j < transferNftData[0].result.length; j++) {
        if (
          walletNftData[0].result[i]["token_address"] ===
          transferNftData[0].result[j]["token_address"] &&
          walletNftData[0].result[i].token_id ===
          transferNftData[0].result[j].token_id
        ) {
          walletNftData[0].result[i] = {
            ...walletNftData[0].result[i],
            block_timestamp: transferNftData[0].result[j].block_timestamp,
          };
          break;
        }
      }
    }

    for (let i = 0; i < walletNftData[0].result.length; i++) {
      walletNftData[0].result[i].metadata = JSON.parse(
        walletNftData[0].result[i].metadata
      );
    }
    console.log(walletNftData[0].result.length);

    console.log(walletNftData);
    setNftData(walletNftData);
  }

  return (
    <>
      <div className=" current-nft-div2">
        <div className="current-grid-container">
          {/* -------------------------------------------------- */}
          {nftData.map((item) => {
            return item.result.map((item, i) => {
              return (
                <div key={i} className="div-box-owned">
                  {item.metadata !== null && item.name !== "Web3 Club Tour" ? (
                    <div className="current-certi-main">
                      <div className="curren-certi-img">
                        <video
                          src="https://ipfs.io/ipfs/QmatVFcDFH7aUr8nYZs2iDRmSgnsBsaB48FZQUEVoqibx3"
                          controls
                          alt=""
                          className="nfts-img4"
                        />
                      </div>
                      <div className="current-nft-flex">
                        <div className="current-certi-info ">
                          <h3 className="font-face-gm-aquire-bold">
                            {item.metadata.name}
                          </h3>
                          <p className="font-face-gm-aqiure"></p>
                        </div>
                      </div>
                      <div className="current-certi-mainbtn">
                        <Link to={"/createcertificate"} state={{ data: item }}>
                          <button className="current-button font-face-gm-aquire-bold">
                            Generate Certificate
                          </button>
                        </Link>
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            });
          })}
          {/* ----------------------------------------------- */}
          {/* <div className="div-box-owned">
            <div className="current-certi-main">
              <div className="curren-certi-img">
                <img src={dnft} alt="" className="nfts-img4" />
              </div>
              <div className="current-nft-flex">
                <div className="current-certi-info ">
                  <h3 className="font-face-gm-aquire-bold">NFT Name</h3>
                  <p className="font-face-gm-aqiure">Secondory Text</p>
                </div>
              </div>
              <div className="current-certi-mainbtn">
                <Link to="/createcertificate">
                  <button className="current-button font-face-gm-aquire-bold">
                    Generate Certificate
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="div-box-owned">
            <div className="current-certi-main">
              <div className="curren-certi-img">
                <img src={dnft} alt="" className="nfts-img4" />
              </div>
              <div className="current-nft-flex">
                <div className="current-certi-info ">
                  <h3 className="font-face-gm-aquire-bold">NFT Name</h3>
                  <p className="font-face-gm-aqiure">Secondory Text</p>
                </div>
              </div>
              <div className="current-certi-mainbtn">
                <Link to="/createcertificate">
                  <button className="current-button font-face-gm-aquire-bold">
                    Generate Certificate
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="div-box-owned">
            <div className="current-certi-main">
              <div className="curren-certi-img">
                <img src={dnft} alt="" className="nfts-img4" />
              </div>
              <div className="current-nft-flex">
                <div className="current-certi-info ">
                  <h3 className="font-face-gm-aquire-bold">NFT Name</h3>
                  <p className="font-face-gm-aqiure">Secondory Text</p>
                </div>
              </div>
              <div className="current-certi-mainbtn">
                <Link to="/createcertificate">
                  <button className="current-button font-face-gm-aquire-bold">
                    Generate Certificate
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="div-box-owned">
            <div className="current-certi-main">
              <div className="curren-certi-img">
                <img src={dnft} alt="" className="nfts-img4" />
              </div>
              <div className="current-nft-flex">
                <div className="current-certi-info ">
                  <h3 className="font-face-gm-aquire-bold">NFT Name</h3>
                  <p className="font-face-gm-aqiure">Secondory Text</p>
                </div>
              </div>
              <div className="current-certi-mainbtn">
                <Link to="/createcertificate">
                  <button className="current-button font-face-gm-aquire-bold">
                    Generate Certificate
                  </button>
                </Link>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}
export default CurrentNft;
