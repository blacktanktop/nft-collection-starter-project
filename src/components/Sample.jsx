import myEpicNft from "../utils/MyEpicNFT.json";
import { useState, useEffect } from 'react';
import { ethers } from "ethers";
const MAX_SUPPLY = 50;
const CONTRACT_ADDRESS ="0x41e70AfFC39beB25A90dC9d782ad7a98D11c3E82";
const Sample = () => {
  const [mintCount, setCount] = useState(0);
  useEffect(() => {
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const connectedContract = new ethers.Contract(
      CONTRACT_ADDRESS,
      myEpicNft.abi,
      signer
    );
    // mint 後に emit された NewEpicNFTMinted から値を受け取る
    const handleEmitEvent = (_from, tokenId) => {
      const latestMintCount = tokenId.toNumber();
      // ✅ ここで state を更新させる(大事)
      setCount(latestMintCount);
    };
    // イベントリスナーの購読：
    // NewEpicNFTMinted が emit されたら、handleEmitEvent を呼ぶ宣言
    connectedContract.on("NewEpicNFTMinted", handleEmitEvent);
    return () => {
      connectedContract.off("NewEpicNFTMinted", handleEmitEvent);
    };
  }, []);
  return (
    <p className="sub-text">
      {mintCount} / {MAX_SUPPLY}
    </p>
  );
};
export default Sample
