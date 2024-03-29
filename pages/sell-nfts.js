/* pages/create-item.js */
import { useState } from "react";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { useRouter } from "next/router";
import Web3Modal from "web3modal";
import Image from "next/image";

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

import { nftaddress, nftmarketaddress } from "../config";

import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import Market from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";

export default function CreateItem() {
  const [fileUrl, setFileUrl] = useState(null);
  const [loader, setLoader] = useState(false);
  const [createNFTLoader, setCreateNFTLLoader] = useState(false);
  const [formInput, updateFormInput] = useState({
    price: "",
    name: "",
    description: "",
  });
  const router = useRouter();

  async function onChange(e) {
    setLoader(true);
    const file = e.target.files[0];

    try {
      const added = await client.add(file, {
        progress: (prog) => console.log(`received: ${prog}`),
      });
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setLoader(false);
      setFileUrl(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }
  async function createMarket() {
    setCreateNFTLLoader(true);
    const { name, description, price } = formInput;
    if (!name || !description || !price || !fileUrl) return;
    /* first, upload to IPFS */
    const data = JSON.stringify({
      name,
      description,
      image: fileUrl,
    });
    try {
      const added = await client.add(data);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
      createSale(url);
    } catch (error) {
      setCreateNFTLLoader(false);
      console.log("Error uploading file: ", error);
    }
  }

  async function createSale(url) {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    /* next, create the item */
    let contract = new ethers.Contract(nftaddress, NFT.abi, signer);
    let transaction = await contract.createToken(url);
    let tx = await transaction.wait();
    let event = tx.events[0];
    let value = event.args[2];
    let tokenId = value.toNumber();
    const price = ethers.utils.parseUnits(formInput.price, "ether");

    /* then list the item for sale on the marketplace */
    contract = new ethers.Contract(nftmarketaddress, Market.abi, signer);
    let listingPrice = await contract.getListingPrice();
    listingPrice = listingPrice.toString();

    transaction = await contract.createMarketItem(nftaddress, tokenId, price, {
      value: listingPrice,
    });
    await transaction.wait();
    router.push("/");
    setCreateNFTLLoader(false);
  }
  function thisFileUpload() {
    document.getElementById("file").click();
  }

  return (
    <div className="px-20 py-10 flex justify-evenly">
      {fileUrl ? (
        <div>
          <Image
            className="rounded-xl mt-4"
            width={500}
            height={500}
            src={fileUrl}
          />
        </div>
      ) : loader ? (
        <div class=" flex justify-center items-center">
          <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-cyan-900"></div>
        </div>
      ) : (
        <div
          id="div"
          name="button"
          onClick={() => {
            thisFileUpload();
          }}
          className="w-1/3 flex border-4 border-dashed rounded-3xl hover:bg-gray-100 transition ease-in-out cursor-pointer"
        >
          <div className="flex flex-col basis-full justify-center items-center text-center">
            <span className="text-3xl font-semibold text-gray-400">
              Upload File
            </span>
            <br />
            <span className="text-md text-gray-400">
              Currently we support only Images and GIFs
            </span>
            <span className="text-xs w-9/12 font-medium text-gray-400">
              File types supported: JPG, PNG, GIF and SVG. <br /> Max size: 100
              MB
            </span>
          </div>
        </div>
      )}

      <input type="file" id="file" className="hidden" onChange={onChange} />

      <div className="w-1/2 flex flex-col pb-12">
        <input
          placeholder="NFT Name"
          className="mt-8 border rounded-xl p-4"
          onChange={(e) =>
            updateFormInput({ ...formInput, name: e.target.value })
          }
        />
        <textarea
          placeholder="NFT's Description"
          className="mt-2 border rounded-xl p-4"
          onChange={(e) =>
            updateFormInput({
              ...formInput,
              description: e.target.value,
            })
          }
        />
        <input
          placeholder="Price in Matic"
          className="mt-2 border rounded-xl p-4"
          onChange={(e) =>
            updateFormInput({ ...formInput, price: e.target.value })
          }
        />

        <button
          onClick={createMarket}
          className="font-bold mt-4 bg-gradient-to-l from-cyan-500 to-indigo-700 shadow-lg text-white rounded-xl p-4"
        >
          {createNFTLoader ? (
            <div class="flex justify-center items-center">
              <span> Creating your NFT</span>
              <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-white ml-3"></div>
            </div>
          ) : (
            "Create NFT"
          )}
        </button>
      </div>
    </div>
  );
}
