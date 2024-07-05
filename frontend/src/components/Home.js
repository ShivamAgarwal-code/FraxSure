import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import FraxLogo from "./FRAX.jpeg";
import Frax2 from "./Frax2.png";
import Truflation from "./Truflation.jpg";
import infData from "./InfData.png";
import vehData from "./VehData.png";
import "./Home.css";
import {Link} from 'react-router-dom'

const Home = () => {
  return (
    <div>
    <Container>
      <div className="mt-4">
        {/* Top Section */}
        <div className="mb-4 top">
          <Row>
            <Col>
              <div className="text-center">
                <h2>FraxSurance: Revolutionizing Insurance with FRAX and Inflation Protection"</h2>
                <p>Secure Your Future with FRAX-Backed Insurance: Shielded from Inflation, Covered for Life!</p>
              </div>
            </Col>
            <Col>
              <div className="text-center">
                <h2>Claim your Insurance today in form of NFTs!</h2>
                <br></br>
                <Link to='/create'><Button className='button1' variant="primary">Get Insurance</Button></Link>
              </div>
            </Col>
          </Row>
        </div>

        {/* Bottom Section */}
        <div>
            <h3>Powered By!</h3>
          <Row>
            <Col md={4}>
              <Card>
                <Card.Img style={{maxHeight:300, minHeight:300}} variant="top" src={FraxLogo} />
                <Card.Body>
                  <Card.Title>FRAX</Card.Title>
                  <Card.Text style={{maxHeight:200, minHeight:200}}>
                  FRAX is a stablecoin that offers stability, transparency, efficiency, and security for all types of payments in insurance platforms. 
                  It is backed by collateral and an algorithmic mechanism, making it more trustworthy to insurance buyers and reducing risk exposure. 
                  It is also easy to use and secure, making it a reliable option for payments.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <Card.Img style={{maxHeight:300, minHeight:300}} variant="top" src={Truflation} />
                <Card.Body>
                  <Card.Title>TRUFLATION</Card.Title>
                  <Card.Text style={{maxHeight:200, minHeight:200}}>
                  Leveraging Chainlink, Truflation brings reliable and accurate inflation data from off-chain sources to the blockchain, enabling seamless integration of inflation rates into smart contracts. 
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <Card.Img style={{maxHeight:300, minHeight:300}} variant="top" src={Frax2} />
                <Card.Body>
                  <Card.Title>LOCK FRAX AND GET REWARDS</Card.Title>
                  <Card.Text style={{maxHeight:200, minHeight:200}}>
                  Locking FRAX is a way to earn interest on your FRAX.
                  You are essentially providing collateral to the Frax protocol. 
                  In return, you will receive a discount on your insurance premiums and earn interest on your FRAX. 
                  This is a win-win situation for everyone involved.
                  You save money on your insurance premiums, the Frax protocol becomes more stable, and the DeFi ecosystem as a whole benefits.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>

        <div style={{paddingTop:40}}>
          <h2>History Data about Inflation and Transport</h2>
          <Row >
            <Col md={6}>
                <Card >
                    <Card.Img style={{maxHeight:400, minHeight:400}} variant="top" src={infData} />
                    <Card.Body>
                    <Card.Title>Inflation Data</Card.Title>
                    </Card.Body>
                </Card>
                </Col>
                <Col md={6}>
                <Card >
                    <Card.Img style={{maxHeight:400, minHeight:400}} variant="top" src={vehData} />
                    <Card.Body>
                    <Card.Title>About Transport</Card.Title>
                    </Card.Body>
                </Card>
            </Col>
          </Row>
        </div>

        {/* Footer */}
        
      </div>
      
    </Container>
    <footer style={{ backgroundColor: "grey", color: "white", padding: "20px" }}>
    © 2023 FraxSurance. All rights reserved. Privacy Policy | Terms of Service
    </footer>
    </div>
  );
};

export default Home;
