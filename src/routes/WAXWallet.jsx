import React from "react";
import { Helmet } from "react-helmet-async";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useParams } from "react-router-dom";
import WAX2CollectionList from "../components/API_WAX_Transformers/WAX2CollectionList";

const WAXWallet = () => {
  const { walletid } = useParams();

  return (
    <React.Fragment>
      <Helmet>
        <title>WAX Wallet</title>
      </Helmet>
      <Container>
        <Row>
          <Col lg={12}>
            <WAX2CollectionList walletid={walletid} />
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default WAXWallet;
