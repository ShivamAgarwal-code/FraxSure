import React, { useState } from 'react';
import { ethers } from "ethers"
import { Container, Form, Button, Alert } from 'react-bootstrap';

const toWei = (n) => {
    return ethers.utils.parseEther(n.toString());
  };

const CryptoFaucet = ({account,FRAX}) => {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  const handleMintTokens = async() => {
    const mint = await FRAX.mint(toWei(amount));
    await mint.wait();
    setMessage(`Minted ${amount} tokens successfully!`);
    setAmount('');
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">FRAX Faucet</h2>
      <p>This is only for testing purpose, it doesnot provide real FRAX coins</p>
      <h5>Add this token contract on goerli Testnet to your wallet: </h5>
        <h3>0x4cAab96b2E442E78cA5fc72FaEd2305dE115FB36</h3>
        <hr/>
      <Form.Group className="mb-3">
        <Form.Label><h3>Enter Amount:</h3></Form.Label>
        <Form.Control
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </Form.Group>
      <Button
        variant="primary"
        onClick={handleMintTokens}
        disabled={!amount || amount <= 0}
      >
        Mint Tokens
      </Button>
      {message && (
        <Alert variant="success" className="mt-3">
          {message}
        </Alert>
      )}
    </Container>
  );
};

export default CryptoFaucet;
