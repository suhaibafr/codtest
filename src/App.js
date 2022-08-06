import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import Web3 from "web3";
// import { ethers } from 'ethers';
import Calculator from "../src/contracts/Calculator.json";

const App = () => {
  const [result, setResult] = useState("");
  const [firstValue, setFirstValue] = useState(0);
  const [secondValue, setSecondValue] = useState(0);
  const inputRef = useRef(null);
  const [walletAddress, setWalletAddress] = useState("");
  const [contract, setContract] = useState();

  let accounts;
  // Helper Functions
  // Requests access to the user's META MASK WALLET
  // https://metamask.io
  async function requestAccount() {
    console.log("Requesting account...");

    // ❌ Check if Meta Mask Extension exists
    if (window.ethereum) {
      console.log("detected");

      try {
        accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
        console.log("1");
        const web3 = new Web3(Web3.givenProvider);
        console.log("web", web3);
        setContract(
          new web3.eth.Contract(
            Calculator.abi,
            "0x2B2d27bD0F77D5A0658Cdb38aCEd42D3F6dF4Da4"
          )
        );
      } catch (error) {
        console.log("Error connecting...");
      }
    } else {
      alert("Meta Mask not detected");
    }
  }
  console.log("cont", contract);

  useEffect(() => inputRef.current.focus());

  const handleClick = (e) => {
    setResult(result.concat(e.target.name));
  };

  const backspace = () => {
    setResult(result.slice(0, -1));
  };

  const clear = () => {
    setResult("");
  };

  const calculate = async () => {
    if (contract) {
      const Result = await contract?.methods
        .add(firstValue, secondValue)
        .send({ from: walletAddress, gas: 1000000 })
        .on("transactionHash", function (hash) {
          console.log(" trxID: " + hash, Result);
        });
    } else if (contract) {
      const Result = await contract?.methods
        .minus(1, 2)
        .send({ from: walletAddress, gas: 1000000 })
        .on("transactionHash", function (hash) {
          console.log(" trxID: " + hash, Result);
        });
    } else if (contract) {
      const Result = await contract?.methods
        .multiply(1, 2)
        .send({ from: walletAddress, gas: 1000000 })
        .on("transactionHash", function (hash) {
          console.log(" trxID: " + hash, Result);
        });
    } else if (contract) {
      const Result = await contract?.methods
        .divide(1, 2)
        .send({ from: walletAddress, gas: 1000000 })
        .on("transactionHash", function (hash) {
          console.log(" trxID: " + hash, Result);
        });
    } else console.log("error");
  };

  return (
    <div className="calc-app">
      <button onClick={requestAccount}>Request Account</button>
      <h3>Wallet Address: {walletAddress}</h3>
      <from>
        <input type="text" value={result} ref={inputRef} />
      </from>

      <div className="keypad">
        <button id="clear" onClick={clear}>
          Clear
        </button>
        <button id="backspace" onClick={backspace}>
          C
        </button>
        <button name="+" onClick={handleClick}>
          +
        </button>
        <button name="7" onClick={handleClick}>
          7
        </button>
        <button name="8" onClick={handleClick}>
          8
        </button>
        <button name="9" onClick={handleClick}>
          9
        </button>
        <button name="-" onClick={handleClick}>
          -
        </button>
        <button name="4" onClick={handleClick}>
          4
        </button>
        <button name="5" onClick={handleClick}>
          5
        </button>
        <button name="6" onClick={handleClick}>
          6
        </button>
        <button name="*" onClick={handleClick}>
          &times;
        </button>
        <button name="1" onClick={handleClick}>
          1
        </button>
        <button name="2" onClick={handleClick}>
          2
        </button>
        <button name="3" onClick={handleClick}>
          3
        </button>
        <button name="/" onClick={handleClick}>
          /
        </button>
        <button name="0" onClick={handleClick}>
          0
        </button>
        <button name="." onClick={handleClick}>
          .
        </button>
        <button id="result" onClick={calculate}>
          Result
        </button>
      </div>
    </div>
  );
};

export default App;
