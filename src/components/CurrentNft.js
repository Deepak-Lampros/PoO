import react, { useState, useRef, useEffect } from "react";
import "../components/currentnft.css";
import dnft from "../assests/images/dummynft.png";
import { Link } from "react-router-dom";
import axios from "axios";

function CurrentNft() {
  const [loading, setLoading] = useState(false);
  const [chain, setChain] = useState("polygon");
  const [nftData, setNftData] = useState([]);
  let walletNftData = [];
  let transferNftData = [];

  const dataFetchedRef = useRef(false);
  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    fetchCurrentNft();
  }, []);

  const fetchCurrentNft = async (chain) => {
    setLoading(true);
    // console.log(address);
    const account = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    // setWalletAddress(account[0]);

    // var address = account[0];

    var address = "0xF50699109cA8AdB470dC8430Dbc36Cd7622D022f";
    // console.log(address);
    const walletnft = {
      method: "GET",
      url: `https://deep-index.moralis.io/api/v2/${address}/nft`,
      params: { chain: chain ? `${chain}` : "mumbai", format: "decimal" },
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
      params: { chain: "mumbai", format: "decimal", direction: "both" },
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
    setLoading(false);
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
  function onChangeValue(e) {
    fetchCurrentNft(e);
    console.log(e);
  }

  return (
    <>
      <div className=" current-nft-div2">
        {loading ? (
          <div class="center">
            <div class="wave"></div>
            <div class="wave"></div>
            <div class="wave"></div>
            <div class="wave"></div>
            <div class="wave"></div>
            <div class="wave"></div>
            <div class="wave"></div>
            <div class="wave"></div>
            <div class="wave"></div>
            <div class="wave"></div>
          </div>
        ) : (
          <>
            <div className="poo-current-nft-block ">
              <label
                for="language "
                className="font-face-gm-aquire-bold drop-down-lbl"
              >
                Select Chain:
              </label>
              <select
                name="language"
                id="language-dropdown "
                className="font-face-gm-medium language-dropdown "
                onChange={(e) => {
                  onChangeValue(e.target.value);
                }}
              >
                <option value="select">select</option>
                <option value="eth">eth</option>
                <option value="0x1">0x1</option>
                <option value="goerli">goerli</option>
                <option value="0x5">0x5</option>
                <option value="sepolia">sepolia</option>
                <option value="0xaa36a7">0xaa36a7</option>
                <option value="polygon">polygon</option>
                <option value="0x89">0x89</option>
                <option value="mumbai">mumbai</option>
                <option value="0x13881">0x13881</option>
                <option value="bsc">bsc</option>
                <option value="0x38">0x38</option>
                <option value="bsc testnet">bsc testnet</option>
                <option value="0x61">0x61</option>
                <option value="avalanche">avalanche</option>
                <option value="0xa86a">0xa86a</option>
                <option value="avalanche testnet">avalanche testnet</option>
                <option value="0xa869">0xa869</option>
                <option value="fantom">fantom</option>
                <option value="0xfa">0xfa</option>
                <option value="cronos">cronos</option>
                <option value="0x19">0x19</option>
                <option value="cronos">cronos testnet</option>
                <option value="0x152">0x152</option>
              </select>
            </div>
            <div className="current-grid-container">
              {/* -------------------------------------------------- */}
              {nftData.map((item) => {
                return item.result.map((item, i) => {
                  return (
                    <div key={i} className="div-box-owned">
                      {item.metadata !== null &&
                        item.name !== "Web3 Club Tour" ? (
                        <div className="current-certi-main">
                          <div className="curren-certi-img">
                            <img
                              src={item.metadata.image}
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
                            <Link
                              to={"/createcertificate"}
                              state={{ data: item }}
                            >
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
            </div>
          </>
        )}
      </div>
    </>
  );
}
export default CurrentNft;
