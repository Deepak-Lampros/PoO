import react, { useState, useRef, useEffect } from "react";
import "../components/currentnft.css";
import axios from "axios";
// import dnft from "../assests/images/dummynft.png";
import { Link } from "react-router-dom";
import nft1 from "../assests/images/nft1.webp";
import nft2 from "../assests/images/nft2.jpg";
// import nft3 from "../assests/images/nft3.jpg";
import nft4 from "../assests/images/nft4.jpeg";
import nft5 from "../assests/images/nft5.webp";
import nft6 from "../assests/images/nft6.jpeg";

function PreviousNft() {
  const [loading, setLoading] = useState(false);
  const [previousnftData, setPreviousNftData] = useState([]);
  let perviousNftData = [];
  let previousTransferNftData = [];
  let previousnfts = [];
  const dataFetchedRef = useRef(false);

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    fetchpreviousNft();
  }, []);

  const fetchpreviousNft = async (chain) => {
    setLoading(true);
    const account = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    // var address = account[0];
    var address = "0x6E212f16749300664e70496FDcf6F6e61f9E77E5";
    const options = {
      method: "GET",
      url: `https://deep-index.moralis.io/api/v2/${address}/nft/transfers`,

      params: {
        chain: chain ? `${chain}` : "mumbai",
        format: "decimal",
        direction: "from",
      },
      headers: {
        accept: "application/json",
        "X-API-Key":
          "zx1cuyNtlU6YfCw1ARlaDUSJQLXC5uXlfM9ebpJhJSTbbglLJs6sqvHEF9avPztV",
      },
    };

    await axios
      .request(options)
      .then(function (response) {
        console.log(response.data.result);
        perviousNftData = response.data.result;
        console.log(perviousNftData);
      })
      .catch(function (error) {
        console.error(error);
      });

    const walletTransfers = {
      method: "GET",
      url: `https://deep-index.moralis.io/api/v2/${address}/nft/transfers`,
      params: {
        chain: chain ? `${chain}` : "mumbai",
        format: "decimal",
        direction: "to",
      },
      headers: {
        accept: "application/json",
        "X-API-Key":
          "zx1cuyNtlU6YfCw1ARlaDUSJQLXC5uXlfM9ebpJhJSTbbglLJs6sqvHEF9avPztV",
      },
    };

    await axios
      .request(walletTransfers)
      .then(function (response) {
        previousTransferNftData = response.data.result;
        console.log(previousTransferNftData);
        getFinalNftData();
      })
      .catch(function (error) {
        console.error(error);
      });
    setLoading(false);
    async function getFinalNftData() {
      //for adding block_timestamp

      console.log(perviousNftData.length);
      for (let i = 0; i < perviousNftData.length; i++) {
        for (let j = 0; j < previousTransferNftData.length; j++) {
          if (
            perviousNftData[i]["token_address"] ===
              previousTransferNftData[j]["token_address"] &&
            perviousNftData[i].token_id === previousTransferNftData[j].token_id
          ) {
            perviousNftData[i] = {
              ...perviousNftData[i],
              from_date: previousTransferNftData[j].block_timestamp,
            };
            break;
          }
        }
      }
      console.log(perviousNftData);

      // for adding the meta data
      for (let i = 0; i < perviousNftData.length; i++) {
        const options = {
          method: "GET",
          url: `https://deep-index.moralis.io/api/v2/nft/${perviousNftData[i].token_address}/${perviousNftData[i].token_id}`,
          params: {
            chain: chain ? `${chain}` : "mumbai",
            format: "decimal",
          },
          headers: {
            accept: "application/json",
            "X-API-Key":
              "zx1cuyNtlU6YfCw1ARlaDUSJQLXC5uXlfM9ebpJhJSTbbglLJs6sqvHEF9avPztV",
          },
        };

        await axios
          .request(options)
          .then(function (response) {
            console.log(response.data);

            perviousNftData[i] = {
              ...perviousNftData[i],
              metadata: response.data.metadata,
              token_uri: response.data.token_uri,
            };

            console.log(perviousNftData);
          })
          .catch(function (error) {
            console.error(error);
          });
      }
      for (let i = 0; i < perviousNftData.length; i++) {
        // console.log(perviousNftData[i].metadata);
        perviousNftData[i].metadata = JSON.parse(perviousNftData[i].metadata);
      }

      console.log(perviousNftData);
      setPreviousNftData(perviousNftData);
    }
  };
  function onChangeValue(e) {
    fetchpreviousNft(e);
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
                <option value="goerlli">goerlli</option>
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
                <option value="0xa86a"></option>
                <option value="avalanche testnet"></option>
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
              {previousnftData.map((item, i) => {
                return (
                  console.log("item", item),
                  (
                    <div key={i} className="div-box-owned">
                      <div className="current-certi-main">
                        <div className="curren-certi-img">
                          <img
                            src={item.metadata.image}
                            alt=""
                            className="nfts-img4"
                          />
                        </div>
                        <div className="current-certi-info">
                          <div>
                            <h3 className="font-face-gm-aquire-bold">
                              {item.metadata.name}
                            </h3>
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
                      </div>
                    </div>
                  )
                );
              })}
              {/* <div className="div-box-owned">
          <div className="current-certi-main">
            <div className="curren-certi-img">
              <img src={nft2} alt="" className="nfts-img4" />
            </div>
            <div className="current-certi-info">
              <div>
                <h3 className="font-face-gm-aquire-bold">NFT Name</h3>
                <p className="font-face-gm-aqiure">Secondory Text</p>
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
        </div>
        <div className="div-box-owned">
          <div className="current-certi-main">
            <div className="curren-certi-img">
              <img src={nft5} alt="" className="nfts-img4" />
            </div>
            <div className="current-certi-info">
              <div>
                <h3 className="font-face-gm-aquire-bold">NFT Name</h3>
                <p className="font-face-gm-aqiure">Secondory Text</p>
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
        </div>
        <div className="div-box-owned">
          <div className="current-certi-main">
            <div className="curren-certi-img">
              <img src={nft4} alt="" className="nfts-img4" />
            </div>
            <div className="current-certi-info">
              <div>
                <h3 className="font-face-gm-aquire-bold">NFT Name</h3>
                <p className="font-face-gm-aqiure">Secondory Text</p>
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
        </div>
        <div className="div-box-owned">
          <div className="current-certi-main">
            <div className="curren-certi-img">
              <img src={nft1} alt="" className="nfts-img4" />
            </div>
            <div className="current-certi-info">
              <div>
                <h3 className="font-face-gm-aquire-bold">NFT Name</h3>
                <p className="font-face-gm-aqiure">Secondory Text</p>
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
        </div> */}
            </div>
          </>
        )}
      </div>
    </>
  );
}
export default PreviousNft;
