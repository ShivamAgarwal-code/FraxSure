import React, { useEffect, useState } from 'react';
import { ethers } from "ethers"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Card, Form, Button, Table, Alert } from 'react-bootstrap';

const changeToInt=(_x)=>{
    const x= ethers.utils.formatEther(_x)*(10**18);
    return x;
}
const toWei = (n) => {
    return ethers.utils.parseEther(n.toString());
  };

const TokenLockComponent = ({marketplace,account,FRAX}) => {
  const [amount, setAmount] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedDeadline, setSelectedDeadline] = useState('');
  const [lockedTokens, setLockedTokens] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const seeLockedTokens=async()=>{
        const ltt=await marketplace.getUserLocks(account);
        // console.log(ltt);
        let activeTokens = [];
        for (let i = 0; i < ltt.length; i++) {
            const token = ltt[i];
            if (!token.unlocked) {
                activeTokens.push({
                    amount: ethers.utils.formatEther(token.amount),
                    date: new Date(token.unlockTimestamp.toNumber() * 1000).toLocaleString(),
                    active: token.unlocked
                });
            }
        }
        setLockedTokens(activeTokens);
        console.log(activeTokens);
    };
    seeLockedTokens();
    }, []);

  useEffect(() => {
    const deadline=()=>{
        const duration=new Date(selectedDate)- new Date();
        const deadline = Math.floor((new Date(selectedDate).getTime()-new Date().getTime())/ 1000);
        setSelectedDeadline(deadline);
        console.log(selectedDeadline);
    };
    deadline();
    }, [selectedDate]);


  const handleLockToken = async() => {
    const approve = await FRAX.approve(marketplace.address, toWei(amount));
    await approve.wait();
    console.log(selectedDeadline);
    const lock=await marketplace.lockTokens(toWei(amount),selectedDeadline);
    await lock.wait();
  };

  const handleUnlockToken = async() => {
    const unlock=await marketplace.unlockTokens();
    await unlock.wait();
  };

  const getDiscountPercentage = () => {
    const days = getLockedDays();
    if (days >= 10) return 10;
    if (days >= 5) return 5;
    return 0;
  };

  const getLockedDays = () => {
    // Calculate the number of locked days based on the selected date.
    // For the frontend example, we'll simulate it by returning a random number between 1 and 15.
    return Math.floor(Math.random() * 15) + 1;
  };

  return (
    <Container className="mt-4">
      <Card className="mb-4">
        <Card.Body>
          <h2>Lock Tokens</h2>
          <p>
            Minimum Lock value: 100 FRAX
            <br />
            &gt;= 10 days - {10}% discount on any Insurance
            <br />
            &gt;= 5 days - {5}% discount on any Insurance
          </p>
          <h4>APY: 5%</h4>
          <hr/>
          <Form.Group className="mb-3">
            <Form.Label>Amount:</Form.Label>
            <Form.Control
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Choose Date:</Form.Label>
            <Form.Control
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" onClick={handleLockToken}>
            Lock Token
          </Button>
          {errorMessage && <Alert variant="danger" className="mt-3">{errorMessage}</Alert>}
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <h2>Unlock Tokens</h2>
          {lockedTokens.length === 0 ? (
            <Alert variant="info">No tokens are locked.</Alert>
          ) : (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {lockedTokens.map((token, index) => (
                  <tr key={index}>
                    <td>{token.amount}</td>
                    <td>{token.date}</td>
                    <td>
                      <Button variant="danger" onClick={() => handleUnlockToken(index)}
                      disabled={Date.now() < token.date ? false : true}
                      >
                        Unlock
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default TokenLockComponent;
