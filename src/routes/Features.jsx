import React from "react";
import { Helmet } from "react-helmet-async";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styled from "styled-components";
import Container from "react-bootstrap/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons/faGlobe";
import { faSitemap } from "@fortawesome/free-solid-svg-icons/faSitemap";
import { faGears } from "@fortawesome/free-solid-svg-icons/faGears";
import { faSitemap } from "@fortawesome/free-solid-svg-icons/faSitemap";
import { faUserShield } from "@fortawesome/free-solid-svg-icons/faUserShield";

const Subhead = styled.h2`
  text-align: center;
  margin: 2rem;
`;

const Features = () => {
  return (
    <React.Fragment>
      <Helmet>
        <title>Log In</title>
      </Helmet>
      <Container>
        <Row>
          <Col style={{ textAlign: "center", margin: 50 }}>
            <h1>Modular Blockchain Integration</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <Subhead>
              <FontAwesomeIcon icon={faGlobe} style={{ marginRight: "2rem" }} />
              Utilizing Public Data
            </Subhead>
            <p>
              This tech demo shows the implementation of public blockchain APIs
              as well as the use of a custom IPFS gateway.
              <ul>
                <li>OBJKT's API is being used for TEZOS.</li>
                <li>AtomicAssets for WAX.</li>
                <li>Rarible for ETH/POLY.</li>
              </ul>
              New APIs can can be easily added and they could even be hot
              swapped based on user preference (or combined to enrich data.)
            </p>
          </Col>
          <Col>
            <Subhead>
              <FontAwesomeIcon
                icon={faSitemap}
                style={{ marginRight: "2rem" }}
              />{" "}
              Smart Organization
            </Subhead>
            <ul>
              <li>Wallet contents are organized around collections.</li>
              <li>Each collection can be paged.</li>
              <li>
                Blockchain data is loaded dynamically as-needed to save
                bandwidth.
              </li>
              <li>Mobile friendly layout and scaled images.</li>
            </ul>
            <p>
              All user preferences and wallet data is being stored in the CC
              Pass wallet-as-a-service provider.
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <Subhead>
              <FontAwesomeIcon
                icon={faUserShield}
                style={{ marginRight: "2rem" }}
              />
              Low Risk
            </Subhead>
            <p>
              All data displayed is read-only and collections can be
              server-filtered for extra security. No contract signing will be
              requested. The CC Pass login system is being used to load user's
              wallets without them needing to access a crypto wallet.
            </p>
          </Col>
          <Col>
            <Subhead>
              <FontAwesomeIcon icon={faGears} style={{ marginRight: "2rem" }} />
              Highly Customizable
            </Subhead>
            <p>
              Since this is a tradtional web application it can be customized
              using any existing Web 2 technology. Specific NFTs can be
              server-validated to unlock content, bespoke collections could
              include NFTs in a branded experience, media players can be
              implemented for specific NFT types...
            </p>
            <p>
              It bridges the gap in including blockchain content in your
              existing application!
            </p>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default Features;
