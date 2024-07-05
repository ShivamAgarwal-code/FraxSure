import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Spinner } from 'react-bootstrap';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Marketplace from './contracts/Marketplace.json';
import NFT from './contracts/NFT.json';
import Truflation from './contracts/TruflationTester.json';
import Frax from './contracts/FraxTest.json';
import Navbar from './components/Navbar';
import Create from "./components/Create";
import MyListedItems from "./components/MyListedItem";
import NFTDetails from './components/NFTDetails';
import Profile from './components/Profile';
import Rewards from './components/Rewards';
import Home from './components/Home';
import Faucet from './components/Faucet';
import { useState } from 'react';
const { ethers } = require("ethers");

function App() {

  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState(null);
  const [marketplace, setMarketplace] = useState(null);
  const [nft, setNft] = useState(null);
  const [truflation, setTruflation] = useState(null);
  const [FRAX, setFRAX] = useState(null);
  const [id,setId]=useState(0);

  const web3Handler = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(accounts[0]);
    //Get Provider from Metamask
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    //Set up signer
    const signer = provider.getSigner();
    loadContracts(signer);
  }

  const loadContracts = async (signer) => {
    const marketplace = new ethers.Contract("0xdD763779e89838B1B4d99593D27337411635164E", Marketplace.abi, signer);
    setMarketplace(marketplace);
    const nft = new ethers.Contract("0xDA173A032664057ec0A55461Fe2c87aF01E7aB48", NFT.abi, signer);
    setNft(nft);
    const truflation = new ethers.Contract("0x1dFD39Ae186E0cC1a81Bc231A508BC1aBcB8eAC2", Truflation.abi, signer);
    setTruflation(truflation);
    const FRAX = new ethers.Contract("0x4cAab96b2E442E78cA5fc72FaEd2305dE115FB36", Frax.abi, signer);
    setFRAX(FRAX);
    setLoading(false);
  }

  function setIdfunc(_id){
    setId(_id);
  }




  return (
    <div className="App">
      <BrowserRouter>
        <Navbar web3Handler={web3Handler} account={account} marketplace={marketplace}/>
        {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <Spinner animation="border" style={{ display: 'flex' }} />
        <p className='mx-3 my-0'>Awaiting Metamask Connection...Connect to Goerli Testnet</p>
      </div>
      ):(
      <Routes>
        <Route path="/" element={<Home marketplace={marketplace} nft={nft} />}/>
        <Route path="/create" element={<Create marketplace={marketplace} nft={nft} truflation={truflation} FRAX={FRAX} account={account}/>}/>
        <Route path="/my-listed-items" element={<MyListedItems marketplace={marketplace} nft={nft} account={account} setid={setIdfunc}/>}/>
        <Route path='/NFTDetails/:id' element={<NFTDetails marketplace={marketplace} nft={nft} truflation={truflation} FRAX={FRAX} account={account} id={id}/>}/>
        <Route path="/profile" element={<Profile marketplace={marketplace} nft={nft} account={account} FRAX={FRAX}/> }/>
        <Route path="/rewards" element={<Rewards marketplace={marketplace} account={account} FRAX={FRAX}/> }/>
        <Route path="/faucet" element={<Faucet account={account} FRAX={FRAX}/> }/>
        {/* <Route path="/my-purchases" element={<MyPurchases marketplace={marketplace} nft={nft} account={account}/>}/> */}
      </Routes>
      )}
      </BrowserRouter>
    </div>
  );
}

export default App;
