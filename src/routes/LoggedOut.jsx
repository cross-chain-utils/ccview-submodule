import React from "react";
import { Helmet } from "react-helmet-async";
import Card from "react-bootstrap/Card";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import styled from "styled-components";

const Header = styled.h1`
  margin: 0 0 0.5rem 0;
`;

const Subhead = styled.h2`
  margin: 0 0 3rem 0;
`;

const LoggedOut = () => {
  return (
    <Container>
      <Helmet>
        <title>Home - CCSHOW Tech Demo - PRE-ALPHA v0.1</title>
      </Helmet>
      <Row>
        <Col xg={12}>
          <Card style={{ marginTop: 90, padding: 20 }}>
            <Header>Multichain Wallet Viewer Tech Demo</Header>
            <Subhead>PRE ALPHA v0.1</Subhead>
            <p>Please select a demo wallet from the navigation bar above!</p>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoggedOut;
