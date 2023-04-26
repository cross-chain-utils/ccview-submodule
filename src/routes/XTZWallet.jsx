import React from "react";
import { Helmet } from "react-helmet-async";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useParams } from "react-router-dom";
import RAR2CollectionList from "../components/API_RAR_Transformers/RAR2CollectionList";
import OBJKT2CollectionList from "../components/API_Objkt_Transformers/OBJKT2CollectionList";

const XTZWallet = () => {
  const { walletid } = useParams();

  return (
    <React.Fragment>
      <Helmet>
        <title>XTZ Wallet</title>
      </Helmet>
      <Container>
        <Row>
          <Col lg={12}>
            <OBJKT2CollectionList walletid={`${walletid}`} />
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default XTZWallet;
