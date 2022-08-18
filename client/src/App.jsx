import React from "react";
import { useState } from "react";
import Web3 from "web3";
import nftABI from "./ABI/nftABI";
import { pinFileToIPFS } from "./pinata";

const CA = "0x778d241a096F9A94e062363BEcfEA469cEDc0d19";

function App() {
  const [myAddress, setMyAddress] = useState();
  const [contract, setContract] = useState();
  const [file, setFile] = useState();

  const connect = async () => {
    if (!window.ethereum) alert("메타마스크를 설치하여 주세요.");
    const web3 = new Web3(window.ethereum);
    const [address] = await window.ethereum.enable();
    setMyAddress(address);

    const contract = new web3.eth.Contract(nftABI, CA);
    setContract(contract);
  };

  const mint = () => {
    const bitImage =
      "https://upload.wikimedia.org/wikipedia/commons/c/c5/Bitcoin_logo.svg";
    contract.methods.safeMint(myAddress, bitImage).send({
      from: myAddress,
      gas: 3000000,
    });
  };

  const _onChange = (e) => {
    setFile(e.target.files[0]);
  };

  const upload = async () => {
    const result = await pinFileToIPFS(file);
    const metadata = {
      name: "MyFi",
      description: "우주류 검술",
      image: `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`,
      attributes: [],
    };
  };

  return (
    <div>
      {myAddress ? (
        <div>{myAddress}</div>
      ) : (
        <div>
          <button onClick={connect}>지갑연결</button>
        </div>
      )}
      <div>
        <div>
          <input type="file" onChange={_onChange} />
          <button onClick={upload}>upload</button>
        </div>
        <button onClick={mint}>Mint</button>
      </div>
    </div>
  );
}

export default App;
