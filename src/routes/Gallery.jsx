import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import styled from "styled-components";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import OBJKT2CollectionList from "../components/API_Objkt_Transformers/OBJKT2CollectionList";
import WAX2CollectionList from "../components/API_WAX_Transformers/WAX2CollectionList";
import RAR2CollectionList from "../components/API_RAR_Transformers/RAR2CollectionList";
import Alert from "react-bootstrap/Alert";
import Accordion from "react-bootstrap/Accordion";

const SectionHeader = styled.h1`
  margin-top: 5rem;
  font-size: 5rem;
`;

const ContentBreak = styled.div`
  margin-top: 5rem;

  border-bottom: thin solid;

  h2 {
    font-size: 4rem;
  }
`;

const Gallery = () => {
  const [expanded, setExpanded] = useState("0");

  const expandedToggle = (e) => {
    setExpanded(e);
    console.log(e);
  };

  return (
    <Container>
      <Helmet>
        <title>Gallery</title>
      </Helmet>
      <Row>
        <Col xg={12}>
          <SectionHeader>Demo Multichain Wallets</SectionHeader>

          <Alert key={"info"} variant={"info"} style={{ fontSize: "1.2rem" }}>
            <strong>Multiple blockchains on the same page.</strong>
            <br /> Users will be able to create their own gallery pages by
            selecting wallets from any blockchains in their CC Connect wallet
            list to create a public gallery display wallet with a social media
            share link.
          </Alert>
          <Accordion
            defaultActiveKey="0"
            activeKey={expanded}
            onSelect={expandedToggle}
          >
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <h2>WAX Wallet</h2>
              </Accordion.Header>
              <Accordion.Body>
                {expanded === "0" && (
                  <WAX2CollectionList walletid={`uz414.c.wam`} />
                )}
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                <h2>Tezos Wallet</h2>
              </Accordion.Header>
              <Accordion.Body>
                {expanded === "1" && (
                  <OBJKT2CollectionList walletid={`waxworks.tez`} />
                )}
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>
                <h2>Ethereum and Polygon Wallet</h2>
              </Accordion.Header>
              <Accordion.Body>
                {expanded === "2" && (
                  <RAR2CollectionList
                    walletid={`ETHEREUM:0x06faf4c761f23328cc2ec36f556c01cd7a4da8f1`}
                  />
                )}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
};

export default Gallery;
