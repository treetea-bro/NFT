import React from "react";
import { useState } from "react";
import Web3 from "web3";
import nftABI from "./ABI/nftABI";
import { pinFileToIPFS, pinJSONToIPFS } from "./pinata";
import axios from "axios";

const CA = "0xB5ECAb3e0c3Af5FB0D017437585D7c37A261B78C";

function App() {
  const [myAddress, setMyAddress] = useState();
  const [contract, setContract] = useState();
  const [file, setFile] = useState();
  const [imageUriList, setImageUriList] = useState([]);

  const connect = async () => {
    if (!window.ethereum) alert("메타마스크를 설치하여 주세요.");
    const web3 = new Web3(window.ethereum);
    const [address] = await window.ethereum.enable();
    setMyAddress(address);

    const contract = new web3.eth.Contract(nftABI, CA);
    setContract(contract);
  };

  const mint = (uri) => {
    contract.methods.safeMint(myAddress, uri).send({
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

    const jsonResult = await pinJSONToIPFS(metadata);
    console.log(jsonResult);
    mint(`https://gateway.pinata.cloud/ipfs/${jsonResult.IpfsHash}`);
  };

  const getImages = async () => {
    const metadatas = await contract.methods.getMetadataList(myAddress).call();
    let resultList = [];
    for (const metadata of metadatas) {
      const res = await axios.get(metadata);
      resultList.push(res.data.image);
    }
    setImageUriList(resultList);
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
        <button onClick={getImages}>이미지조회</button>
      </div>
      <div>
        {imageUriList.map((v) => (
          <div key={v}>
            <img src={v} alt="v" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
