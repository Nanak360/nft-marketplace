import { useState } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import Image from "next/image";

function WalletConnectButton() {
  const [address, setAddress] = useState("");
  const [balence, setBalence] = useState("");
  const [avatar, setAvatar] = useState("");
  const [wallet, setWallet] = useState(null);

  const connectWallet = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    setWallet(web3Modal);
    const signer = provider.getSigner();
    setAddress(await signer.getAddress());
    setBalence(await signer.getBalance());
    setAvatar(`https://avatars.dicebear.com/api/bottts/${address}.svg`);
  };

  const disconnectWallet = async () => {
    await wallet.clearCachedProvider();
    setAddress("");
    setAvatar("");
    setBalence("");
  };

  return address ? (
    <button
      onClick={() => disconnectWallet()}
      className="flex items-center w-1/3 rounded-lg px-2 py-1 focus:outline-none transition ease-in-out hover:text-white hover:border-transparent active:bg-inherit bg-gray-900 border-2 border-blue-400"
    >
      {avatar && (
        <Image
          width={50}
          height={50}
          className="h-8 w-8 rounded-full"
          src={avatar}
          alt="avatar"
        />
      )}

      <span className="ml-2 truncate text-center text-blue-300 font-bold">
        {address}
      </span>
    </button>
  ) : (
    <button
      onClick={() => connectWallet()}
      className="text-center text-blue-300 font-bold rounded-lg px-2 py-1 focus:outline-none transition ease-in-out hover:text-white hover:border-transparent active:bg-inherit bg-gray-900 border-2 border-blue-400"
    >
      Connect wallet
    </button>
  );
}

export default WalletConnectButton;
